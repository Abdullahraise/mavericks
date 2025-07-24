from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
import uuid

router = APIRouter(prefix="/recommend", tags=["Recommendation"])

class RecommendRequest(BaseModel):
    scores: Dict[str, float]

MODULE_CATALOG = {
    "Python": ["Python Fundamentals", "Advanced Python", "Python for Data Science"],
    "JavaScript": ["JS Essentials", "ES6+", "Async Patterns"],
    # add more as needed
}

@router.post("/", response_model=dict)
async def recommend_modules(payload: RecommendRequest):
    if not payload.scores:
        raise HTTPException(status_code=400, detail="Scores are required")
    recs = []
    for skill, score in payload.scores.items():
        if score < 7.0 and skill in MODULE_CATALOG:
            for title in MODULE_CATALOG[skill]:
                recs.append({
                    "id": str(uuid.uuid4()),
                    "title": title,
                    "skill": skill,
                    "level": "Intermediate" if score < 5 else "Beginner",
                    "url": f"https://example.com/modules/{title.replace(' ', '-').lower()}"
                })
    if not recs:
        recs.append({
            "id": str(uuid.uuid4()),
            "title": "Full Stack Bootcamp",
            "skill": "Full Stack",
            "level": "Beginner",
            "url": "https://example.com/modules/full-stack-bootcamp"
        })
    return {"modules": recs[:5]}
