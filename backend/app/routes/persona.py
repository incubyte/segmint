from typing import Any, Dict, List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.agents import generate_persona
from app.models.persona import PersonaQuestionAnswer, Trait

router = APIRouter(prefix="/persona", tags=["persona"])


class PersonaRequest(BaseModel):
    user_email: str
    initial_data: List[PersonaQuestionAnswer]


class PersonaResponse(BaseModel):
    user_email: str
    persona: str
    traits: List[Trait]
    initial_data: List[PersonaQuestionAnswer]


@router.post("/create-persona", response_model=PersonaResponse)
async def create_persona(request: PersonaRequest) -> Dict[str, Any]:
    """
    Create a professional persona from user data including personality questions.

    This endpoint takes user email and initial question answers, then
    generates a formatted professional persona.
    """
    try:
        linkedin_url = next(
            (
                item.answer
                for item in request.initial_data
                if item.question_id == "linkedin_url"
            ),
            None,
        )

        result = await generate_persona(linkedin_url, request.initial_data)

        # Add user email and initial data to response
        result["user_email"] = request.user_email
        result["initial_data"] = request.initial_data

        return result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating persona: {str(e)}"
        )
