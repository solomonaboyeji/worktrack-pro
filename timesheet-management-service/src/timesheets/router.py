from datetime import date, timedelta
from fastapi import APIRouter, Security, Query
from uuid import UUID
from src.timesheets.service import TimesheetService
import src.timesheets.schemas as schemas
from src.timesheets.dependencies import (
    initiate_timesheet_service,
)


router = APIRouter(tags=["Timesheet"], prefix="/timesheet")

@router.get("/", response_model=schemas.TimesheetOut)
def get_timesheets(
    start_date: date = Query(
        date.today(), description="Gets timesheets starting from this day."
    ),
    end_date: date = Query(
        date.today()-timedelta(days=7), description="Gets timesheets until this day."
    ),
    only_clocked_out: bool = Query(
        False, description="Returns Only timesheets that have been clocked out."
    ),
    timesheet_service: TimesheetService = Security(initiate_timesheet_service, scopes=[]),
):
    result = timesheet_service.get_timesheets(
        only_clocked_out=only_clocked_out,
        start_date=start_date,
        end_date=end_date,
    )
    return result

@router.post("/clock-in", response_model=schemas.Timesheet)
def clock_in(
    data: schemas.TimesheetCreate,
    timesheet_service: TimesheetService = Security(initiate_timesheet_service),
):
    result = timesheet_service.clock_in(data=data)
    return result


@router.post("/clock-out", response_model=schemas.Timesheet)
def clock_out(
    data: schemas.TimesheetClockOut,
    timesheet_service: TimesheetService = Security(initiate_timesheet_service),
):
    result = timesheet_service.clock_out(data=data)
    return result

@router.get("/tasks/{task_id}", response_model=schemas.TimesheetOut)
def get_task_timesheet(
    task_id: UUID,
    timesheet_service: TimesheetService = Security(initiate_timesheet_service),
):
    result = timesheet_service.get_task_timesheets(task_id=task_id)
    return result

@router.get("/{user_id}", response_model=schemas.TimesheetOut)
def get_user_timesheets(
    user_id: UUID,
    timesheet_service: TimesheetService = Security(initiate_timesheet_service),
):
    result = timesheet_service.get_user_timesheets(user_id=user_id)
    return result


@router.get("/{user_id}/{task_id}", response_model=schemas.Timesheet)
def get_user_task_timesheet(
    task_id: UUID,
    user_id: UUID,
    timesheet_service: TimesheetService = Security(initiate_timesheet_service),
):
    result = timesheet_service.get_user_task_timesheet(task_id=task_id, user_id=user_id)
    return result
