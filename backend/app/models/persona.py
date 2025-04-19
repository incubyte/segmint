from pydantic import BaseModel


class PersonaQuestionAnswer(BaseModel):
    question_id: str
    answer: str
    question: str


class Trait(BaseModel):
    name: str
    description: str
    value: int
