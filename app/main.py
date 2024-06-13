from fastapi import FastAPI
from .api.endpoints import configurations
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(configurations.router, prefix="/configurations", tags=["configurations"])