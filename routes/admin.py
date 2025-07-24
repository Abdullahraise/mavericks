from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/admin", tags=["Admin"])

# In‑memory user profiles
USERS = []

@router.get("/users", response_model=List[dict])
async def list_users():
    # Each user: id, latest skills, latest scores, progress events count
    return USERS

# Populate USERS list when new resume uploaded or assessment run

