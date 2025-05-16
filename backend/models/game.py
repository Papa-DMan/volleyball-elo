from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime, ARRAY
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.sql import func
from database import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"))
    datetime = Column(DateTime(timezone=True), default=func.now())
    team_a_player_ids = Column(ARRAY(UUID(as_uuid=True)), nullable=False)
    team_b_player_ids = Column(ARRAY(UUID(as_uuid=True)), nullable=False)
    winner_team = Column(String)
    elo_updated = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
