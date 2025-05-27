from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, ENUM
from database import Base

class LocationPlayer(Base):
    __tablename__ = "player_preferences"

    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), primary_key=True)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), primary_key=True)
    other_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), primary_key=True)
    preference = Column(ENUM)
    