from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import List, Optional


class ParentPydanticModel(BaseModel):
    # model_config = ConfigDict(from_attributes=True)

    class Config:
        orm_mode = True


class Timesheet(ParentPydanticModel):
    task_id: UUID
    user_id: UUID
    date_clocked_in: datetime
    date_clocked_out: Optional[datetime]
    date_recorded: datetime


class TimesheetCreate(ParentPydanticModel):
    task_id: UUID
    user_id: UUID


class TimesheetClockOut(TimesheetCreate):
    pass


class TimesheetOut(ParentPydanticModel):
    total: int
    timesheets: List[Timesheet]


class User(ParentPydanticModel):
    id: UUID
    username: str


class UserCreate(ParentPydanticModel):
    username: str


class Task(ParentPydanticModel):
    id: UUID
