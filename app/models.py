from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .database import Base

class SearchSystem(Base):
    __tablename__ = 'searchv2'

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String, index=True, nullable=False)
    destination = Column(String, nullable=False)
    size = Column(String, nullable=False)
    type = Column(String, nullable=False)
    commodity = Column(String, nullable=False)
    count = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
