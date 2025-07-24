from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import all routers
from routes import resume, assessment, recommend, hackathon, progress, admin

app = FastAPI(title="Mavericks Coding Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume.router)
app.include_router(assessment.router)
app.include_router(recommend.router)
app.include_router(hackathon.router)
app.include_router(progress.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {"message": "Backend is up and running ✅"}
