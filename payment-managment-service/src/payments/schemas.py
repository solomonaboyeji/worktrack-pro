"""Pydantic Models"""
from uuid import UUID
from datetime import datetime
from typing import Optional, Union
from src.schemas import ParentPydanticModel

class WageOut(ParentPydanticModel):
    id: UUID
    task_id: UUID
    user_id: UUID
    total_hours: float
    total_amount: float
    paid: bool
    date_created: datetime
    date_updated: Optional[datetime]

class ManyWagesOut(ParentPydanticModel):
    total: int
    wages: list[WageOut]

class TotalTaskWageAmount(ParentPydanticModel):
    total_amount: Union[float, None]
