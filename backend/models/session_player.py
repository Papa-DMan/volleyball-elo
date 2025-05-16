from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class SessionPlayer(Base):
    __tablename__ = "session_players"

    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id"), primary_key=True)
    player_id = Column(UUID(as_uuid=True), ForeignKey("players.id"), primary_key=True)