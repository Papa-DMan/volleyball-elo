from pydantic import BaseModel
from typing import Optional

class GameCreate(BaseModel):
    location_id: str
    team_a_player_ids: list[str]
    team_b_player_ids: list[str]
    winner_team: Optional[str]  # 'A' or 'B'