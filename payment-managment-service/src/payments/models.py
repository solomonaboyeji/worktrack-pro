"""Contains the DB modules"""
import uuid

from sqlalchemy import (
    Column,
    DateTime,
    String,
    Integer,
    Float,
    Boolean,
    UniqueConstraint,
)
from sqlalchemy.dialects import postgresql
from sqlalchemy.sql.functions import func
from src.database import Base


class Wage(Base):
    __tablename__ = "wages"

    id = Column(postgresql.UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    task_id = Column(postgresql.UUID(as_uuid=True), nullable=False)
    user_id = Column(postgresql.UUID(as_uuid=True), nullable=False)
    total_hours = Column(Float(asdecimal=True, decimal_return_scale=2), default=0)
    total_amount = Column(Float(asdecimal=True, decimal_return_scale=2), default=0)
    paid = Column(Boolean, default=False)

    date_created = Column(DateTime(timezone=True), server_default=func.now())
    date_updated = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    UniqueConstraint(task_id, user_id)