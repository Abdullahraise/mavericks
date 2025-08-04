from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()  # Load GEMINI_API_KEY from .env
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter(prefix="/assessment", tags=["Assessment"])

class SkillList(BaseModel):
    skills: List[str]

@router.post("/generate")
async def generate_assessment(payload: SkillList):
    if not payload.skills:
        raise HTTPException(status_code=400, detail="No skills provided")

    model = genai.GenerativeModel("gemini-pro")
    questions = []

    for skill in payload.skills:
        try:
            prompt = (
                f"Generate 2 multiple-choice questions to assess a beginner's knowledge in '{skill}'. "
                f"Each question should have 4 options and indicate the correct one. Format:\n\n"
                f"Question: <text>\nOptions: A. <>, B. <>, C. <>, D. <>\nAnswer: <A/B/C/D>\n\n---"
            )

            response = model.generate_content(prompt)
            result = response.text.strip().split("---")[0].strip()

            for block in result.split("Question:")[1:]:
                parts = block.strip().split("\n")
                q_text = parts[0]
                opts_line = next((line for line in parts if line.startswith("Options:")), "")
                answer_line = next((line for line in parts if line.startswith("Answer:")), "")

                options = opts_line.replace("Options:", "").strip().split(", ")
                options = [opt[3:] if opt.startswith(("A. ", "B. ", "C. ", "D. ")) else opt for opt in options]
                correct = answer_line.replace("Answer:", "").strip()

                questions.append({
                    "skill": skill,
                    "question": q_text,
                    "options": options,
                    "answer": correct
                })

        except Exception as e:
            print(f"⚠️ Failed to generate question for {skill}: {e}")
            continue

    if not questions:
        raise HTTPException(status_code=500, detail="No questions generated.")

    return {"questions": questions}
