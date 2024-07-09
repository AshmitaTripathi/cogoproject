from fastapi import FastAPI
from .api.endpoints import routes
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(routes.router)
