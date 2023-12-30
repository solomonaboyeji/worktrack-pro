from datetime import date
from uuid import UUID
from typing import Union
from src.service import ServiceResult, success_service_result, failed_service_result
from src.payments import schemas
from src.exceptions import BaseForbiddenException
from src.payments.crud import PaymentCrud
from src.schemas import UrlsConfiguration

class PaymentService():
    def __init__(self, client, requesting_user, db, app_settings) -> None:
        self.client = client
        self.requesting_user = requesting_user
        self.db = db
        self.app_settings = app_settings
        self.crud = PaymentCrud(
            client=client, db=db, urls=UrlsConfiguration.parse_obj(app_settings.external_urls),
            )
        
    def get_task_wages(
        self,
        task_id: UUID
    )->ServiceResult[Union[schemas.ManyWagesOut, Exception]]:
        try:
            # if not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            wages = self.crud.get_wages(task_id=task_id)
            total = self.crud.total_wages(task_id=task_id)
            data = {
                "total":total,
                "wages":wages,
            }
            return success_service_result(
                schemas.ManyWagesOut.parse_obj(data)
            )
        except Exception as raised_exception:
            return failed_service_result(raised_exception)
    
    def get_user_wages(
        self,
        user_id: UUID,
    )->ServiceResult[Union[schemas.ManyWagesOut, Exception]]:
        try:
            # if not self.requesting_user.id==user_id and not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            wages = self.crud.get_wages(user_id=user_id)
            total = self.crud.total_wages(user_id=user_id)
            data = {
                "total":total,
                "wages":wages,
            }
            return success_service_result(
                schemas.ManyWagesOut.parse_obj(data)
            )
        except Exception as raised_exception:
            return failed_service_result(raised_exception)
    
    def get_task_wages_total(
        self,
        task_id: UUID,
    )->ServiceResult[Union[schemas.TotalTaskWageAmount, Exception]]:
        try:
            # if not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            wages_total = self.crud.calculate_single_task_wages(task_id=task_id)
            data = {
                "total_amount":wages_total,
            }
            return success_service_result(schemas.TotalTaskWageAmount.parse_obj(data))
        except Exception as raised_exception:
            return failed_service_result(raised_exception)
        
    def get_all_tasks_wages_total(
        self,
        start_date: date,
        end_date: date,
        unpaid: Union[bool,None] = None,       
    )->ServiceResult[Union[schemas.TotalTaskWageAmount, Exception]]:
        try:
            # if not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            wages_total = self.crud.calculate_all_task_wage(
                start_date=start_date, 
                end_date=end_date, 
                unpaid=unpaid)
            data = {
                "total_amount":wages_total,
            }
            return success_service_result(schemas.TotalTaskWageAmount.parse_obj(data))
        except Exception as raised_exception:
            return failed_service_result(raised_exception)
        
    def compute_all_task_wages(
        self,
        start_date: date,
        end_date: date,
    )->ServiceResult[Union[schemas.ManyWagesOut, Exception]]:
        try:
            # if not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            wages = self.crud.compute_all_tasks_wages(start_date, end_date)
            data = {
                "total":len(wages),
                "wages":wages,
            }
            return success_service_result(
                schemas.ManyWagesOut.parse_obj(data)
            )
        except Exception as raised_exception:
            return failed_service_result(raised_exception)
    
    def compute_task_wages(
        self,
        task_id: UUID,
    )->ServiceResult[Union[schemas.ManyWagesOut, Exception]]:
        try:
            # if not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            
            wages = self.crud.compute_task_wages(task_id)

            data = {
                "total":len(wages),
                "wages":wages,
            }
            return success_service_result(schemas.ManyWagesOut.parse_obj(data))
        except Exception as raised_exception:
            return failed_service_result(raised_exception)
    
    def send_user_payment(
        self,
        user_id: UUID,
    )->ServiceResult[Union[schemas.ManyWagesOut, Exception]]:
        try:
            # if not self.requesting_user.Role == "ADMIN":
            #     return failed_service_result(
            #         BaseForbiddenException("You are not allowed to perform this operation.")
            #         )
            wages_paid = self.crud.send_user_payments(user_id)
            data = {
                "total":len(wages_paid),
                "wages":wages_paid,
            }
            return success_service_result(
                schemas.ManyWagesOut.parse_obj(data)
            )
        except Exception as raised_exception:
            return failed_service_result(
                raised_exception
            )