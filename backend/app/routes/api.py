from fastapi import APIRouter

router = APIRouter(prefix="/api")


@router.get("/", tags=["api"])
async def get_api_info():
    return {"message": "API is working"}
