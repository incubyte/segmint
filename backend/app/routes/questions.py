from typing import Any, Dict, List

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.constants import PERSONA_CREATION_QUESTIONS

router = APIRouter(prefix="/questions", tags=["questions"])


class Question(BaseModel):
    id: str
    type: str
    question: str
    placeholder: str
    required: bool
    description: str


class QuestionsResponse(BaseModel):
    questions: List[Question]


@router.get("", response_model=QuestionsResponse)
async def get_questions() -> Dict[str, List[Dict[str, Any]]]:
    """
    Get a list of personality assessment questions related to social media behavior.

    Returns a structured list of questions used to assess various personality traits
    based on social media usage patterns.
    """
    return {"questions": PERSONA_CREATION_QUESTIONS}
