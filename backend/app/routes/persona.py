from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.agents import generate_persona
from app.models.persona import PersonaQuestionAnswer
from app.utils.db import get_persona_by_id
from app.utils.db import list_personas as db_list_personas

router = APIRouter(prefix="/persona", tags=["persona"])


class PersonaRequest(BaseModel):
    user_email: str
    initial_data: List[PersonaQuestionAnswer]


class PersonaResponse(BaseModel):
    persona: Dict[str, Any]
    id: Optional[str] = None


@router.post("/create-persona", response_model=PersonaResponse)
async def create_persona(request: PersonaRequest) -> Dict[str, Any]:
    """
    Create a professional persona from user data including personality questions.

    This endpoint takes user email and initial question answers, then
    generates a formatted professional persona.
    """
    try:
        result = await generate_persona(request.initial_data, request.user_email)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating persona: {str(e)}"
        )


@router.get("/{persona_id}", response_model=Dict[str, Any])
async def get_persona(persona_id: str) -> Dict[str, Any]:
    """
    Get a persona by ID.

    Args:
        persona_id: The ID of the persona to retrieve

    Returns:
        Dict[str, Any]: The persona data
    """
    persona = await get_persona_by_id(persona_id)
    if not persona:
        raise HTTPException(status_code=404, detail="Persona not found")
    return persona


@router.get("/", response_model=List[Dict[str, Any]])
async def list_personas(
    user_id: Optional[str] = None, limit: int = 10
) -> List[Dict[str, Any]]:
    """
    List personas, optionally filtered by user_id.

    Args:
        user_id: Optional user ID to filter by
        limit: Maximum number of personas to return

    Returns:
        List[Dict[str, Any]]: List of persona documents
    """
    return await db_list_personas(user_id, limit)
