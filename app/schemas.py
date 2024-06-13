from pydantic import BaseModel
from typing import Optional

class ConfigurationBase(BaseModel):
    country_code: str
    business_name: str
    registration_number: Optional[str] = None
    additional_details: Optional[str] = None

class ConfigurationCreate(ConfigurationBase):
    pass

class ConfigurationUpdate(ConfigurationBase):
    pass

class Configuration(ConfigurationBase):
    id: int

    class Config:
        orm_mode = True