from pydantic import BaseModel
from datetime import datetime
from typing import Optional , List
from datetime import date


class SearchV2Base(BaseModel):
    origin : str
    destination : str
    size : str
    type : str
    commodity : str
    count : int


class SearchQuery(BaseModel):
    page: int=1
    page_size: int=5
    origin: Optional[str] = None
    destination: Optional[str] = None
    size: Optional[str] = None
    type: Optional[str] = None
    commodity: Optional[str] = None
    sort_by: Optional[str] = "updated_at"
    sort_type: Optional[str] = "desc"

class SearchV2Create(SearchV2Base):
    pass

class SearchV2Update(SearchV2Base):
    id: int
    created_at: datetime
    updated_at: datetime
    pass

class SearchV2(SearchV2Base):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PaginatedSearchResponse(BaseModel):
    list: List[SearchV2]
    page: int
    total_count: int
    page_size: int
    total_pages: int