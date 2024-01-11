"""main.py"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.openapi import simplify_operation_ids

from src.exceptions import GeneralException
from src.init_platform import init_platform
from src import models
from src.database import engine
from src.config import setup_logger
from src.service import custom_openapi_with_scopes, get_settings
from src.database import open_db_connections, close_db_connections
from src.timesheets.router import router as timesheets_router
from src.database import open_db_connections, close_db_connections

models.Base.metadata.create_all(bind=engine)

logger = setup_logger()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # open data base connection
    check_dependencies()
    open_database_connection_pools()
    yield
    close_database_connection_pools()

app = FastAPI(
    title=get_settings().app_name,
    docs_url=get_settings().doc_url,
    redoc_url=get_settings().redoc_url,
    openapi_url=get_settings().openapi_url,
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    max_age=600,
    allow_headers=["*"],
    allow_origin_regex=get_settings().allow_origin_regex,
)

app.include_router(timesheets_router)

simplify_operation_ids(app)

app.openapi_schema = custom_openapi_with_scopes(app, get_settings())


@app.get("/")
def root():
    """An unauthenticated root endpoint"""

    return {"message": "Hello, Welcome to work track pro timesheets service."}

def check_dependencies():
    if not get_settings().is_database_credentials_set():
        logger.error("Database URL not configured")
        raise GeneralException("Database URL has not been configured.")

    init_platform()


def open_database_connection_pools():
    open_db_connections()


def close_database_connection_pools():
    close_db_connections()
