from pydantic import BaseModel
from typing import List

class SessionCreate(BaseModel):
    location_id: str

class PlayerSessionUpdate(BaseModel):
    player_id: str