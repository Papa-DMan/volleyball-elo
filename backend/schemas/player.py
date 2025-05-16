from pydantic import BaseModel
from typing import Optional

class PlayerCreate(BaseModel):
    name: str