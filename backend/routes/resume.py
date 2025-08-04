from fastapi import APIRouter, UploadFile, File, HTTPException
from utils.skill_extraction import extract_technical_skills

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.post("/process")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        # ✅ Just pass the file stream directly
        skills = extract_technical_skills(file.file)
        return {"technical_skills": skills}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process file: {e}")
