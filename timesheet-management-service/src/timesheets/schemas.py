from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import List, Optional


class ParentPydanticModel(BaseModel):
    # model_config = ConfigDict(from_attributes=True)

    class Config:
        orm_mode = True


class Timesheet(ParentPydanticModel):
    id: UUID
    task_id: str
    user_id: str
    date_clocked_in: datetime
    date_clocked_out: Optional[datetime]
    date_recorded: datetime


class TimesheetCreate(ParentPydanticModel):
    task_id: str
    user_id: str
    hours_spent: int


class TimesheetClockOut(TimesheetCreate):
    pass


class TimesheetOut(ParentPydanticModel):
    total: int
    timesheets: List[Timesheet]


class User(ParentPydanticModel):
    id: str
    username: str


class UserCreate(ParentPydanticModel):
    username: str


class Task(ParentPydanticModel):
    id: str
