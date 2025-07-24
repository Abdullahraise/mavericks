from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random

router = APIRouter(prefix="/assess", tags=["Assessment"])

class AssessRequest(BaseModel):
    skills: list[str]

@router.post("/", response_model=dict)
async def assess_skills(payload: AssessRequest):
    if not payload.skills:
        raise HTTPException(status_code=400, detail="Skills list is empty")
    scores = {skill: round(random.uniform(1, 10), 1) for skill in payload.skills}
    return {"scores": scores}
    