from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ai.utils import extract_skills
from openai import OpenAI

router = APIRouter(prefix="/upload", tags=["Resume"])
openai_client = OpenAI()  # your configured client

class ResumeIn(BaseModel):
    resume: str

@router.post("/", response_model=dict)
async def upload_resume(payload: ResumeIn):
    text = payload.resume
    skills = await extract_skills(text, openai_client)
    return {"skills": skills}
