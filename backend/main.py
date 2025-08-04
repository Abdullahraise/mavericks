from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ Import all route modules
from routes import resume, assessment, recommend, hackathon, progress, admin

app = FastAPI(title="Mavericks Coding Platform")

# ✅ CORS setup to allow frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🚨 In production, change this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register all routers
app.include_router(resume.router)       # /upload           ← resume → skills
app.include_router(assessment.router)   # /assess           ← skill quiz + score
app.include_router(recommend.router)    # /recommend        ← learning path
app.include_router(hackathon.router)    # /hackathon        ← events, list
app.include_router(progress.router)     # /user             ← progress, analytics
app.include_router(admin.router)        # /admin            ← admin views

# ✅ Health check route
@app.get("/")
def root():
    return {"message": "✅ Backend is up and running"}
