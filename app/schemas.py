# from pydantic import BaseModel
# from datetime import datetime
# from typing import Optional , List
# from datetime import date


# class SearchV2Base(BaseModel):
#     origin : str
#     destination : str
#     size : str
#     type : str
#     commodity : str
#     count : int


# class SearchQuery(BaseModel):
#     page: int=1
#     page_size: int=5
#     origin: Optional[str] = None
#     destination: Optional[str] = None
#     size: Optional[str] = None
#     type: Optional[str] = None
#     commodity: Optional[str] = None
#     sort_by: Optional[str] = "updated_at"
#     sort_type: Optional[str] = "desc"

# class SearchV2Create(SearchV2Base):
#     pass

# class SearchV2Update(SearchV2Base):
#     id: int
#     created_at: datetime
#     updated_at: datetime
#     pass

# class SearchV2(SearchV2Base):
#     id: int
#     created_at: datetime
#     updated_at: datetime

#     class Config:
#         orm_mode = True


# class PaginatedSearchResponse(BaseModel):
#     list: List[SearchV2]
#     page: int
#     total_count: int
#     page_size: int
#     total_pages: int

from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum

class ServiceTypeEnum(str, Enum):
    FCL = "FCL"
    AIR = "AIR"


class responseBase(BaseModel):
    id : int
    origin: str
    destination: str
    service_type: ServiceTypeEnum

    class Config:
        orm_mode = True

class SearchSystemBase(BaseModel):
    origin: str
    destination: str
    service_type: ServiceTypeEnum

    class Config:
        orm_mode = True

class FCLBase(BaseModel):
    size: str
    type: str
    commodity: str
    count: Optional[int] = None

class FCLCreate(BaseModel):
    size: Optional[str]= None
    type: Optional[str]= None
    commodity: Optional[str]= None
    count: Optional[int] = None
    search_id: int

class FCL(FCLBase):
    id: int
    search_id : int 
   

    class Config:
        orm_mode = True

class FCLResponse(FCL):
    origin: str
    destination: str

    class Config:
        orm_mode = True

class AIRBase(BaseModel):
    cargo_date: datetime
    commodity: str
    sub_commodity: str
    type: str
    package_type: str
    no_of_units: int
    tot_vol: int
    tot_weight: int
    handling: Optional[str] = None

class AIRCreate(BaseModel):
    cargo_date: Optional[datetime] = None
    commodity: Optional[str]=None 
    sub_commodity: Optional[str]=None 
    type: Optional[str]=None 
    package_type: Optional[str]=None 
    no_of_units: Optional[int]=None 
    tot_vol: Optional[int]=None
    tot_weight: Optional[int]=None
    handling: Optional[str] = None
    search_id: int

    class Config:
        orm_mode = True

class AIR(AIRBase):
    id: int 
    search_id :int 

    class Config:
        orm_mode = True

class AIRResponse(AIR):
    origin: str
    destination: str

    class Config:
        orm_mode = True

class SearchSystemWithDetails(SearchSystemBase):
    id : int
    fcl: Optional[List[FCL]] = []
    air: Optional[List[AIR]] = []

class PaginatedSearchResponse(BaseModel):
    list: List[SearchSystemWithDetails]
    page: int
    total_count: int
    page_size: int
    total_pages: int