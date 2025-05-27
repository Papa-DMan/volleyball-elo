from sqlalchemy import Column, ForeignKey, Integer, ARRAY, Enum
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.ext.mutable import MutableList
import uuid, enum
from sqlalchemy.sql import func
from database import Base

from models.location import Location


# Define the Python Enum matching the PostgreSQL ENUM
class StatusType(enum.Enum):
    active = 'active'
    ended = 'ended'

class Session(Base):
    __tablename__ = 'sessions'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    location_id = Column(UUID(as_uuid=True), ForeignKey(Location.id, ondelete='SET NULL'), nullable=True)
    start_time = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    end_time = Column(TIMESTAMP(timezone=True), nullable=True)
    num_courts = Column(Integer, nullable=True)
    players = Column(MutableList.as_mutable(ARRAY(UUID(as_uuid=True))))
    status = Column(Enum(StatusType, name='status_type'), nullable=False, server_default='active')

