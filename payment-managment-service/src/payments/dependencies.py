from fastapi import Depends
from sqlalchemy.orm import Session
from httpx import Client

from src.dependencies import get_current_active_user
from src.security import oauth2_scheme
from src.database import get_db_sess
from src.service import get_settings
from src.config import Settings
from src.payments.service import PaymentService


def initiate_payment_service(
    # current_user_token: str = Depends(oauth2_scheme),
    # current_user: dict = Depends(get_current_active_user),
    db: Session = Depends(get_db_sess),
    app_settings: Settings = Depends(get_settings),
):
    user_headers = {"Authorization":"Bearer {}".format("current_user_token")}
    httpxclient = Client(headers=user_headers, timeout=app_settings.external_api_requests_timeout)
    return PaymentService(
        httpxclient, requesting_user={"current_user":"empty"}, db=db, app_settings=app_settings
    )
