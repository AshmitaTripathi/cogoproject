from pydantic import BaseModel
from datetime import datetime


class SearchV2Base(BaseModel):
    origin : str
    destination : str
    size : str
    type : str
    commodity : str
    count : int

class SearchV2Create(SearchV2Base):
    pass

class SearchV2Update(SearchV2Base):
    pass

class SearchV2(SearchV2Base):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
