from pydantic import BaseModel
from typing import Optional

class LocationCreate(BaseModel):
    name: str
    address: Optional[str]

class LocationUpdate(BaseModel):
    name: Optional[str]
    address: Optional[str]
