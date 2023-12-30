from datetime import datetime, timedelta, date
from uuid import UUID
from typing import Union
from httpx import Client,RequestError
from sqlalchemy import func, and_

from src.exceptions import HTTPException, GeneralException
from src.schemas import UrlsConfiguration
from src.payments.models import Wage

class PaymentCrud():
    def __init__(self, client: Client, db, urls: UrlsConfiguration):
        self.db = db
        self.urls: UrlsConfiguration   = urls
        self.client: Client = client

    def get_wages(
        self,
        task_id: Union[UUID, None] = None, 
        user_id: Union[UUID, None] = None,
    ):
        try:
            query_filter = self.db.query(Wage)

            if task_id is not None:
                query_filter = query_filter.filter(Wage.task_id==task_id)

            if user_id is not None:
                query_filter = query_filter.filter(Wage.user_id==user_id)
            
            query_filter = query_filter.all()
            return query_filter
        except Exception as raised_exception:
            raise raised_exception

    def total_wages(
        self,
        task_id: Union[UUID, None] = None,
        user_id: Union[UUID, None] = None,
    ):
        try:
            query_filter = self.db.query(Wage)

            if task_id is not None:
                query_filter = query_filter.filter(Wage.task_id==task_id)

            if user_id is not None:
                query_filter = query_filter.filter(Wage.user_id==user_id)
            
            query_counts = query_filter.count()
            return query_counts
        except Exception as raised_exception:
            raise raised_exception
        
    def calculate_single_task_wages(
        self,
        task_id: UUID,
    ):
        try:
            task_wages_total = self.db.query(func.sum(Wage.total_amount)).filter(Wage.task_id==task_id)
            return task_wages_total.scalar()
        except Exception as raised_exception:
            raise raised_exception
    
    def calculate_all_task_wage(
        self,
        start_date: date,
        end_date: date,
        unpaid: Union[bool, None] = None,
    ):
        try:
            task_wages = (self.db.query(func.sum(Wage.total_amount))
                          .filter(Wage.date_created<=start_date+timedelta(days=1), Wage.date_created>=end_date))
            
            if unpaid is not None:
                paid_status = False if unpaid else True
                task_wages = task_wages.filter(Wage.paid == paid_status)

            task_wages = task_wages.scalar()
            
            return task_wages
        except Exception as raised_exception:
            raise raised_exception

    def compute_all_tasks_wages(
        self,
        start_date: date,
        end_date: date,
    ):
        try:
            #get task timesheets
            endpoint = self.urls.get_timesheets_url+"/?start_date={}&end_date={}".format(start_date, end_date)
            print(endpoint)
            
            response = self.client.get(endpoint)
            response.raise_for_status()

            timesheets = response.json()["timesheets"]

            tasks_amount_per_hour = {}
            db_wages = []
            for timesheet in timesheets:
                task_id = timesheet["task_id"]

                #check if taskid not already queried and query the new task id.
                if task_id not in tasks_amount_per_hour.keys():
                    endpoint = self.urls.get_task_url + "/{}".format(task_id)
                    response = self.client.get(
                        endpoint,
                    )
                    response.raise_for_status()
                    if response.json() == None:
                        raise GeneralException("Task id not found, error: {}".format(response.json()))
            
                    tasks_amount_per_hour[task_id] = float(response.json()["Amount_Per_Hour"])

                amount_per_hour = tasks_amount_per_hour[task_id]
                db_wage = self.get_or_create_new_wage(amount_per_hour, task_id, timesheet)
                db_wages.append(db_wage)
            return db_wages
        except Exception as raised_exception:
            raise raised_exception
        
    def compute_task_wages(
        self,
        task_id: UUID,
    ):
        try:
            #get task amount per hour
            endpoint = self.urls.get_task_url +"/{}".format(task_id)
            response = self.client.get(
                endpoint,
            )
            response.raise_for_status()

            if response.json() == None:
                raise GeneralException("Task with id not found, error: {}".format(response.json()))
            
            amount_per_hour = float(response.json()["Amount_Per_Hour"])
            #get timesheets of task
            endpoint = self.urls.get_timesheets_by_task_id_url+"/{}".format(task_id)
            response = self.client.get(endpoint)

            response.raise_for_status()

            if response.json() == None:
                raise GeneralException("timesheets is empty, error: {}".format(response.json()))
            timesheets = response.json()["timesheets"]
            
            db_wages = []
            for timesheet in timesheets:
                db_wages.append(self.get_or_create_new_wage(amount_per_hour, task_id, timesheet))
            return db_wages
        except Exception as raised_exception:
            raise raised_exception
    
    def get_or_create_new_wage(
        self,
        amount_per_hour: float,
        task_id: UUID,
        timesheet: dict,
    ):
        try:
            user_id = timesheet["user_id"]
            db_wage = self.db.query(Wage).filter(Wage.task_id==task_id, Wage.user_id==user_id).first()
            if db_wage:
                return db_wage
            
            clock_out = datetime.strptime(timesheet["DateClockedOut"], "%Y-%m-%dT%H:%M:%S.%f")
            clock_in  = datetime.strptime(timesheet["DateClockedIn"], "%Y-%m-%dT%H:%M:%S.%f")

            hours_worked = float((clock_out - clock_in).total_seconds()/timedelta(hours=1).total_seconds())

            db_wage = Wage(
                task_id=task_id,
                user_id=user_id,
                total_hours=hours_worked,
                total_amount=float(amount_per_hour*hours_worked),
                paid=False,
            )
            self.db.add(db_wage)
            self.db.commit()
            self.db.refresh(db_wage)
            return db_wage
        except Exception as raised_exception:
            raise raised_exception
    
    def send_user_payments(
        self,
        user_id: UUID,
    ):
        try:
            user_unpaid_wages = (self.db.query(Wage)
                    .filter(and_(
                        Wage.user_id==user_id,
                        Wage.paid==False))
                    .all())
            
            for wage in user_unpaid_wages:
                setattr(wage, "paid", True)
            
            self.db.add_all(user_unpaid_wages)
            self.db.commit()
            for wage in user_unpaid_wages:
                self.db.refresh(wage)
            return user_unpaid_wages
        except Exception as raised_exception:
            raise raised_exception