from datetime import date
from sqlalchemy.orm import Session
from uuid import UUID
from src.timesheets.crud import TimesheetCRUD
from src.exceptions import GeneralException
import src.timesheets.schemas as schemas


class TimesheetService:
    def __init__(
        self,
        db: Session,
    ) -> None:
        self.crud = TimesheetCRUD(db)

    def clock_in(self, data: schemas.TimesheetCreate):
        try:
            result = self.crud.create_timesheet(
                task_id=data.task_id, user_id=data.user_id
            )
            return schemas.Timesheet.parse_obj(result.__dict__)

        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))

    def clock_out(self, data: schemas.TimesheetClockOut):
        try:
            result = self.crud.update_timesheet(
                task_id=data.task_id, user_id=data.user_id
            )
            return schemas.Timesheet.parse_obj(result.__dict__)
        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))

    def get_user_timesheets(self, user_id: UUID):
        try:
            timesheets = self.crud.get_user_timesheets(user_id=user_id)
            total = self.crud.get_total_user_timesheets(user_id=user_id)
            return schemas.TimesheetOut.parse_obj(
                {
                    "total": total,
                    "timesheets": timesheets,
                }
            )
        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))

    def get_task_timesheets(self, task_id: UUID):
        try:
            timesheets = self.crud.get_task_timesheets(task_id=task_id)
            total = self.crud.get_total_task_timesheets(task_id = task_id)
            return schemas.TimesheetOut.parse_obj(
                {
                    "total": total,
                    "timesheets": timesheets,
                }
            )
        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))

    def get_user_task_timesheet(self, task_id: UUID, user_id: UUID):
        try:
            timesheet = self.crud.get_user_task_timesheet(
                task_id=task_id, user_id=user_id
            )
            return schemas.Timesheet.parse_obj(timesheet.__dict__)
        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))

    def get_timesheets(
        self,
        only_clocked_out: bool,
        start_date: date,
        end_date: date,
    ):
        try:
            timesheets = self.crud.get_timesheet(
                only_clocked_out=only_clocked_out,
                start_date=start_date,
                end_date=end_date,
            )
            total = self.crud.timesheets_total(
                only_clocked_out=only_clocked_out,
                start_date=start_date,
                end_date=end_date,
            )
            return schemas.TimesheetOut.parse_obj(
                {
                    "total": total,
                    "timesheets": timesheets,
                }
            )
        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))