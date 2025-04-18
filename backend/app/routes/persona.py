from typing import Any, Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.agents import generate_persona

router = APIRouter(prefix="/persona", tags=["persona"])


class PersonaRequest(BaseModel):
    linkedin_url: str


class PersonaResponse(BaseModel):
    persona: str
    steps: list


@router.post("/create-persona", response_model=PersonaResponse)
async def create_persona(request: PersonaRequest) -> Dict[str, Any]:
    """
    Create a professional persona from a LinkedIn profile URL.

    This endpoint takes a LinkedIn URL, extracts profile information,
    and generates a formatted professional persona.
    """
    try:
        result = await generate_persona(request.linkedin_url)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error generating persona: {str(e)}"
        )
