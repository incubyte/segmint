import json
import os
import uuid
from datetime import datetime
from typing import Any, Dict, List

import httpx
from dotenv import load_dotenv
from firebase_admin import firestore
from firecrawl import FirecrawlApp
from langchain_core.tools import BaseTool
from pydantic import BaseModel, Field

from app.models.persona import PersonaQuestionAnswer
from app.utils.db import get_firestore_client

load_dotenv(override=True)

# Get Firestore client
db = get_firestore_client()
app = FirecrawlApp(api_key=os.getenv("FIRECRAWL_API_KEY"))


class ExtractSchema(BaseModel):
    writing_style: str
    tone_of_voice: str
    values: List[str]
    preferred_formats: List[str]


class LinkedInScraperInput(BaseModel):
    url: str = Field(description="The LinkedIn profile URL to scrape")


class PersonaCreatorInput(BaseModel):
    profile_data: Dict[str, Any] = Field(
        description="The profile data to create a persona from"
    )


class WebhookPersonaRequest(BaseModel):
    questionaries: List[Dict[str, str]] = Field(
        description="List of question and answer pairs from the webhook"
    )


class BlogScrapper(BaseTool):
    name: str = "blog_scrapper"
    description: str = "Scrape blog data from a public profile URL"

    def _run(self, url: str) -> Dict[str, Any]:
        """Run the LinkedIn scraper tool on the given URL."""
        response = app.extract(
            [
                url,
            ],
            prompt="analyse the blogs and analyse the writing style, tone of voice, values and preferred formats",
            schema=ExtractSchema.model_json_schema(),
        )
        print(response.data)
        return response.data

    async def _arun(self, url: str) -> Dict[str, Any]:
        """Async implementation of the LinkedIn scraper tool."""
        return self._run(url)


class PersonaCreatorTool(BaseTool):
    name: str = "persona_creator"
    description: str = "Generate a professional persona in markdown"

    def _run(
        self,
        initial_data: List[PersonaQuestionAnswer],
        user_id: str = None,
        blog_data: Dict[str, Any] = None,
    ) -> str:
        """Create a formatted markdown persona from the profile data."""

        questionaries_with_question_id = [
            {
                "question": qa.question,
                "answer": qa.answer,
                "question_id": qa.question_id,
            }
            for qa in initial_data
        ]
        request_data = {
            "questionaries": questionaries_with_question_id,
            "blog_data": blog_data,
        }
        # Send persona to Make.com webhook
        webhook_url = os.getenv("MAKE_WEBHOOK_URL")

        # Since we're in a synchronous method, we need to handle the webhook differently
        # We can use httpx in synchronous mode
        try:
            response = httpx.post(webhook_url, json=request_data)

            # Parse the response JSON (removing any surrounding backticks if present)
            response_text = response.text
            if response_text.startswith("```json"):
                response_text = response_text.replace("```json", "", 1)
            if response_text.endswith("```"):
                response_text = response_text[:-3]

            # Strip whitespace and parse JSON
            response_data = json.loads(response_text.strip())

            # Store in Firestore
            try:
                # Generate UUID for document ID
                doc_id = str(uuid.uuid4())

                # Create a reference in the "personas" collection with the UUID
                persona_ref = db.collection("personas").document(doc_id)

                if user_id:
                    user_id = user_id
                else:
                    user_id = "anonymous"

                # Store the full persona data
                persona_data = {
                    "id": doc_id,  # Also store ID in the document
                    "user_id": user_id,
                    "created_at": firestore.SERVER_TIMESTAMP,
                    "goals": response_data.get("goals", []),
                    "target_audience": response_data.get("target_audience"),
                    "tone_of_voice": response_data.get("tone_of_voice", []),
                    "key_topics": response_data.get("key_topics", []),
                    "values": response_data.get("values", []),
                    "preferred_formats": response_data.get("preferred_formats", []),
                    "persona_summary": response_data.get("persona_summary", ""),
                    "raw_questionaries": questionaries_with_question_id,
                }

                # Set the data
                persona_ref.set(persona_data)

                # Make a copy for the return value without SERVER_TIMESTAMP
                response_persona_data = persona_data.copy()
                response_persona_data["created_at"] = datetime.now().isoformat()

                # Return success with the persona ID
                return response_persona_data

            except Exception as e:
                print(f"Failed to store in Firestore: {str(e)}")
                return {
                    "error": "Persona created but failed to store in database",
                    "message": str(e),
                }

        except Exception as e:
            # Log the error but continue with returning the persona
            print(f"Failed to send persona to webhook: {str(e)}")
            return {
                "error": "Failed to generate persona from webhook",
                "message": str(e),
            }

    async def _arun(
        self,
        initial_data: List[PersonaQuestionAnswer],
        user_id: str = None,
        blog_data: Dict[str, Any] = None,
    ) -> str:
        """Async implementation of the persona creator tool."""
        return self._run(initial_data, user_id, blog_data)


async def generate_persona(
    initial_data: List[PersonaQuestionAnswer], user_id: str = None
) -> Dict[str, Any]:
    """Generate a professional persona from a LinkedIn URL by directly invoking the tools."""
    blog_scrapper = BlogScrapper()
    persona_tool = PersonaCreatorTool()
    blog_data = {}

    try:
        # Get blog data if URL is provided
        blog_url = next(
            (item.answer for item in initial_data if item.question_id == "blog_url"),
            None,
        )
        if blog_url:
            blog_data = await blog_scrapper._arun(blog_url)
        persona_result = await persona_tool._arun(initial_data, user_id, blog_data)

        # Extract ID if it exists in the persona_result dictionary
        persona_id = None
        if isinstance(persona_result, dict) and "id" in persona_result:
            persona_id = persona_result["id"]

        return {"persona": persona_result, "id": persona_id}
    except Exception as e:
        raise Exception(f"Error generating persona: {str(e)}")
