from sqlalchemy import Column, Boolean, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.sql import func
from database import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"))
    ended = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
