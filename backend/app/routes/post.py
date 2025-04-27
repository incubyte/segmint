import json
import os
import uuid
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

import httpx
from fastapi import APIRouter, HTTPException
from firebase_admin import firestore
from pydantic import BaseModel, Field

from app.utils.db import get_firestore_client

router = APIRouter(prefix="/post", tags=["post"])

db = get_firestore_client()


class PlatformEnum(str, Enum):
    TWITTER = "Twitter"
    LINKEDIN = "LinkedIn"
    FACEBOOK = "Facebook"
    INSTAGRAM = "Instagram"
    YOUTUBE = "Youtube"
    BLOG = "Blog"


class ContentTypeEnum(str, Enum):
    POST = "Post"
    THREAD = "Thread"
    ARTICLE = "Article"
    VIDEO_SCRIPT = "Video Script"
    STORY = "Story"
    CAPTION = "Caption"


class PersonaEnum(str, Enum):
    DEFAULT = "Default"
    THOUGHT_LEADER = "Thought Leader"
    EXPERT = "Expert"
    STORYTELLER = "Storyteller"


class GenerationParameters(BaseModel):
    variations: int = Field(ge=1, le=5, default=2)
    temperature: float = Field(ge=0.1, le=1.0, default=0.4)


class Context(BaseModel):
    current_date_time: Optional[str] = None
    location: Optional[str] = None


class PostRequest(BaseModel):
    platform: PlatformEnum
    content_type: ContentTypeEnum
    tone: str
    persona_id: Optional[str] = None
    core_message: Optional[str] = None
    number_of_suggestions: int = Field(ge=1, le=5, default=2)
    temperature: float = Field(ge=0.1, le=1.0, default=0.75)


class PostResponse(BaseModel):
    id: str
    suggestions: List[str]
    created_at: str
    platform: str
    content_type: str
    tone: str
    persona_id: Optional[str] = None
    user_id: str
    request_details: Optional[Dict[str, Any]] = None


@router.post("", response_model=PostResponse)
async def create_post(request: PostRequest) -> Dict[str, Any]:
    """
    Generate post content based on user preferences.

    This endpoint takes platform, content type, tone, persona, and
    number of suggestions to generate social media content.
    """
    try:
        # Get persona from database if persona_id is provided
        persona = None
        if request.persona_id:
            from app.utils.db import get_persona_by_id

            persona = await get_persona_by_id(request.persona_id)
            if not persona:
                raise HTTPException(
                    status_code=404,
                    detail=f"Persona not found with ID: {request.persona_id}",
                )
        questionaire = []
        if persona:
            # Check if persona is a dictionary and access raw_questionaries as a key
            if isinstance(persona, dict):
                questionaire = persona.get("raw_questionaries", [])
                print(questionaire)
            else:
                # Fallback to attribute access if it's an object
                questionaire = getattr(persona, "raw_questionaries", [])

        user_email = None
        user_position = None
        user_company = None
        for answer in questionaire:
            if answer["question_id"] == "user_email":
                user_email = answer["answer"]
            elif (
                answer["question_id"] == "current_role"
                or answer["question_id"] == "job_title"
            ):
                user_position = answer["answer"]
            elif answer["question_id"] == "company_name":
                user_company = answer["answer"]
        # Prepare user info
        user_info = {
            "email": user_email,
            "position": user_position,
            "company": user_company,
        }

        # Clean up user_info by removing None values
        user_info = {k: v for k, v in user_info.items() if v is not None}

        # Prepare request details
        request_details = {
            "core_message": request.core_message,
            "target_platform": request.platform,
        }

        # Clean up request_details by removing None values
        request_details = {k: v for k, v in request_details.items() if v is not None}

        # Prepare generation parameters
        generation_parameters = {
            "variations": request.number_of_suggestions,
            "temperature": 0.4,
        }

        # Prepare context with current date and time
        context = {
            "current_date_time": datetime.now().isoformat(),
            "location": None,  # Optional: You can add location logic if needed
        }

        # Build the final request object for the webhook
        webhook_data = {
            "request": {
                "request_details": request_details,
                "user_info": user_info,
                "generation_parameters": generation_parameters,
                "context": context,
            }
        }

        # Add persona to the request if available
        if persona:
            # Convert persona to a serializable format
            if isinstance(persona, dict):
                # Handle any datetime objects in the persona dictionary
                serializable_persona = {}
                for key, value in persona.items():
                    if isinstance(value, datetime):
                        serializable_persona[key] = value.isoformat()
                    else:
                        serializable_persona[key] = value
                webhook_data["request"]["persona"] = serializable_persona
            else:
                # If it's an object with attributes, convert to dictionary
                serializable_persona = {}
                for key in dir(persona):
                    if not key.startswith("_"):  # Skip private attributes
                        value = getattr(persona, key)
                        if isinstance(value, datetime):
                            serializable_persona[key] = value.isoformat()
                        else:
                            serializable_persona[key] = value
                webhook_data["request"]["persona"] = serializable_persona

        # Send to Make.com webhook
        webhook_url = os.getenv("MAKE_WEBHOOK_POST_URL")
        if not webhook_url:
            raise HTTPException(
                status_code=500, detail="Missing webhook URL configuration"
            )

        try:
            response = httpx.post(webhook_url, json=webhook_data, timeout=30.0)
            response.raise_for_status()

            # Parse the response JSON (removing any surrounding backticks if present)
            response_text = response.text
            if response_text.startswith("```json"):
                response_text = response_text.replace("```json", "", 1)
            if response_text.endswith("```"):
                response_text = response_text[:-3]

            # Strip whitespace and parse JSON
            response_data = json.loads(response_text.strip())

            # Extract suggestions from the response
            suggestions = response_data.get("post_suggestions", [])

            # Generate UUID for document ID
            doc_id = str(uuid.uuid4())

            # Store in Firestore
            post_ref = db.collection("posts").document(doc_id)

            user_id = user_email or "anonymous"

            post_data = {
                "id": doc_id,
                "user_id": user_id,
                "created_at": firestore.SERVER_TIMESTAMP,
                "platform": request.platform,
                "content_type": request.content_type,
                "tone": request.tone,
                "persona_id": request.persona_id,
                "suggestions": suggestions,
                "raw_request": webhook_data,
                "request_details": request_details,
            }

            # Save to Firestore
            post_ref.set(post_data)

            # Create response data (with timestamp as string for JSON serialization)
            response_data = post_data.copy()
            response_data["created_at"] = datetime.now().isoformat()

            return response_data

        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=500, detail=f"Error communicating with webhook: {str(e)}"
            )

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating post content: {str(e)}"
        )


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: str) -> Dict[str, Any]:
    """
    Get a post by ID.

    Args:
        post_id: The ID of the post to retrieve

    Returns:
        Dict[str, Any]: The post data
    """
    post_ref = db.collection("posts").document(post_id)
    post = post_ref.get()

    if not post.exists:
        raise HTTPException(status_code=404, detail="Post not found")

    post_data = post.to_dict()

    # Convert Firestore timestamp to string
    if "created_at" in post_data and post_data["created_at"]:
        post_data["created_at"] = post_data["created_at"].isoformat()

    return post_data


@router.get("", response_model=List[PostResponse])
async def list_posts(
    user_id: Optional[str] = None, limit: int = 10
) -> List[Dict[str, Any]]:
    """
    List posts, optionally filtered by user_id.

    Args:
        user_id: Optional user ID to filter by
        limit: Maximum number of posts to return

    Returns:
        List[Dict[str, Any]]: List of post documents
    """
    query = db.collection("posts")

    if user_id:
        query = query.where("user_id", "==", user_id)

    query = query.order_by("created_at", direction=firestore.Query.DESCENDING).limit(
        limit
    )
    posts = query.stream()

    result = []
    for post in posts:
        post_data = post.to_dict()

        # Convert Firestore timestamp to string
        if "created_at" in post_data and post_data["created_at"]:
            post_data["created_at"] = post_data["created_at"].isoformat()

        result.append(post_data)

    return result
