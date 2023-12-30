from uuid import UUID
from datetime import date, timedelta
from fastapi import APIRouter, Query, Security, BackgroundTasks
from typing import Optional
from src.payments import schemas
from src.payments.service import PaymentService
from src.service import handle_result
from src.payments.dependencies import initiate_payment_service
from src.service import AppResponseModel

router = APIRouter(tags=["payments"])

@router.post("/send-payment/{user_id}", response_model=schemas.ManyWagesOut)
def send_user_payment(
    user_id: UUID,
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]),
):
    result = payment_service.send_user_payment(user_id)

    return handle_result(result, schemas.ManyWagesOut)
    
@router.post("/{task_id}/compute-task-wages", response_model=schemas.ManyWagesOut)
def compute_task_wages(
    task_id: UUID,
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]),
):
    result = payment_service.compute_task_wages(task_id)
    return handle_result(result, schemas.ManyWagesOut)

@router.get("/compute-all-wages", response_model=schemas.ManyWagesOut)
def compute_all_tasks_wages(
    start_date: date = Query(
        date.today(), description="Computes wages starting from today."
    ),
    end_date: date  = Query(
        date.today() - timedelta(days=7), description="Compute all task untill this day."
    ),
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]),
):
    result = payment_service.compute_all_task_wages(
        start_date=start_date,
        end_date=end_date
        )
    return handle_result(result, schemas.ManyWagesOut)

@router.get("/tasks-wages/amount", response_model=schemas.TotalTaskWageAmount)
def get_all_task_wage_amount(
    unpaid: Optional[bool] = Query(
        None, description="To get amount of unpaid wages."
    ),
    start_date: date = Query(
        date.today(), description="Get wages from this day."
    ),
    end_date: date = Query(
        date.today()-timedelta(days=7), description="Get all wages till this day from start day."
    ),
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]), 
):
    result = payment_service.get_all_tasks_wages_total(
        unpaid=unpaid,
        start_date=start_date,
        end_date=end_date,
    )
    return handle_result(result, schemas.TotalTaskWageAmount)

@router.get("/{task_id}/amount", response_model=schemas.TotalTaskWageAmount)
def get_task_wages_amount(
    task_id: UUID,
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]),
):
    result = payment_service.get_task_wages_total(task_id)
    return handle_result(result, schemas.TotalTaskWageAmount)

@router.get("/{task_id}/wages", response_model=schemas.ManyWagesOut)
def get_task_wages(
    task_id: UUID,
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]),
):
    result = payment_service.get_task_wages(task_id)
    return handle_result(result, schemas.ManyWagesOut)

@router.get("/{user_id}/user-wages", response_model=schemas.ManyWagesOut)
def get_user_wages(
    user_id: UUID,
    payment_service: PaymentService = Security(initiate_payment_service, scopes=[]),
):
    result = payment_service.get_user_wages(user_id)
    return handle_result(result, schemas.ManyWagesOut)
