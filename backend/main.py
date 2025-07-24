from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resume

app = FastAPI(title="Mavericks Coding Platform")

# Allow frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the resume routes
app.include_router(resume.router)

@app.get("/")
def root():
    return {"message": "Backend is up and running ✅"}
