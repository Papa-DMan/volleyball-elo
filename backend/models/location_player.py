from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class LocationPlayer(Base):
    __tablename__ = "location_players"

    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), primary_key=True)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), primary_key=True)
    elo = Column(float, default=1000.0)
    active = Column(bool, default=False)