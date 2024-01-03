import uuid
from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from src.database import Base


class Timesheet(Base):
    __tablename__ = "timesheet"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    task_id = Column(UUID(as_uuid=True))
    user_id = Column(UUID(as_uuid=True))
    date_clocked_in = Column(DateTime(timezone=True), server_default=func.now())
    date_clocked_out = Column(
        DateTime(timezone=True), nullable=True, server_default=None
    )
    date_recorded = Column(DateTime(timezone=True), server_default=func.now())
