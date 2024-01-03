from sqlalchemy.orm import Session
from fastapi import Depends
from src.database import get_db_sess
from src.timesheets.service import TimesheetService


def initiate_timesheet_service(
    db: Session = Depends(get_db_sess),
):
    return TimesheetService(db=db)
