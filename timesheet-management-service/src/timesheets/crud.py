from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from src.timesheets.models import Timesheet
from uuid import UUID
from datetime import datetime, date, timedelta
from src.exceptions import BaseConflictException, BaseNotFoundException, GeneralException
from sqlalchemy import and_
from typing import Union
class TimesheetCRUD:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create_timesheet(self, user_id: UUID, task_id: UUID) -> Timesheet:
        try:
            db_timesheet = Timesheet(task_id=task_id, user_id=user_id)
            self.db.add(db_timesheet)
            self.db.commit()
            self.db.refresh(db_timesheet)
            return db_timesheet
        except IntegrityError:
            raise BaseConflictException("This user has already clocked in this Task.")
        except Exception as raised_exception:
            raise GeneralException(raised_exception)
        
    def update_timesheet(
        self, user_id: UUID, task_id: UUID,
    ) -> Timesheet:
        try:
            db_timesheet = self.get_user_task_timesheet(task_id=task_id, user_id=user_id)
            if db_timesheet is None:
                raise BaseNotFoundException("The task does not exist.")

            if db_timesheet:
                db_timesheet.date_clocked_out = datetime.utcnow()
                self.db.commit()
                self.db.refresh(db_timesheet)
                return db_timesheet

        except Exception as raised_exception:
            raise GeneralException(str(raised_exception))

    def get_user_timesheets(self, user_id: UUID) -> list[Timesheet]:
        return self.db.query(Timesheet).filter(Timesheet.user_id == user_id).all()

    def get_task_timesheets(self, task_id: UUID) -> list[Timesheet]:
        return self.db.query(Timesheet).filter(Timesheet.task_id == task_id).all()

    def get_user_task_timesheet(self, task_id: UUID, user_id: UUID) -> Timesheet:
        return (
            self.db.query(Timesheet)
            .filter(Timesheet.task_id == task_id, Timesheet.user_id == user_id)
            .first()
        )
    
    def get_timesheet(
        self,
        only_clocked_out: bool,
        start_date: date,
        end_date: date
    ) -> Timesheet:
        query_filter =  (self.db.query(Timesheet)
            .filter(and_(
                Timesheet.date_recorded<=start_date+timedelta(days=1), Timesheet.date_recorded>=end_date
            ))
        )
        if only_clocked_out:
            query_filter = query_filter.filter(Timesheet.date_clocked_out.isnot(None))

        return query_filter.all()

    def timesheets_total(
        self,
        only_clocked_out: bool,
        start_date: date,
        end_date: date
    ):
        query_filter =  (self.db.query(Timesheet)
            .filter(and_(
                Timesheet.date_recorded<=start_date+timedelta(days=1), Timesheet.date_recorded>=end_date
            ))
        )
        if only_clocked_out:
            query_filter = query_filter.filter(Timesheet.date_clocked_out.isnot(None))

        return query_filter.count()

    def get_total_user_timesheets(self, user_id: UUID) -> int:
        return self.db.query(Timesheet).filter(Timesheet.user_id == user_id).count()

    def get_total_task_timesheets(self, task_id: UUID) -> int:
        return self.db.query(Timesheet).filter(Timesheet.task_id == task_id).count()