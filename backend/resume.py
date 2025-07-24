from fastapi import APIRouter, UploadFile, File, HTTPException
from services.parser import extract_skills_from_resume

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith((".pdf", ".txt")):
        raise HTTPException(status_code=400, detail="Only .pdf or .txt files allowed.")

    contents = await file.read()
    text = contents.decode("utf-8", errors="ignore")  # basic read for txt files

    # Extract skills (for now, a dummy function)
    skills = extract_skills_from_resume(text)

    return {"skills": skills, "filename": file.filename}
