from fastapi import APIRouter, UploadFile, File, HTTPException
from ai.utils import extract_skills
from openai import OpenAI
from PyPDF2 import PdfReader
import docx

router = APIRouter(prefix="/upload", tags=["Resume"])
openai_client = OpenAI()

@router.post("/")
async def upload_resume(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1].lower()

    try:
        content = await file.read()

        if ext == "txt":
            text = content.decode("utf-8", errors="ignore")

        elif ext == "pdf":
            pdf = PdfReader(file.file)
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)

        elif ext in ["doc", "docx"]:
            doc = docx.Document(file.file)
            text = "\n".join([p.text for p in doc.paragraphs])

        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        skills = await extract_skills(text, openai_client)
        return {"skills": skills}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process file: {e}")
