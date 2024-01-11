import uuid
import random
from datetime import date, datetime, timedelta
import requests
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, func, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy.dialects import sqlite
# SQLite database configuration
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
Base = declarative_base()

def gen_uuidstr():
    return str(uuid.uuid4())

# Define the model
class Task(Base):
    __tablename__ = "tasks"
    id = Column(sqlite.TEXT, primary_key=True, index=True, default=gen_uuidstr)
    Amount_Per_Hour = Column(Float(asdecimal=True, decimal_return_scale=2))
    created_on = Column(DateTime, default=func.now())

class Users(Base):
    __tablename__ = "users"
    id = Column(sqlite.TEXT, primary_key=True, index=True, default=gen_uuidstr)
    name = Column(String, index=True)
    created_on = Column(DateTime, default=func.now())

class Timesheets(Base):
    __tablename__ = "timesheets"
    id = Column(sqlite.TEXT, primary_key=True, index=True, default=gen_uuidstr)
    task_id = Column(sqlite.TEXT, ForeignKey("tasks.id"))
    user_id = Column(sqlite.TEXT, ForeignKey("users.id"))
    DateClockedIn = Column(DateTime(timezone=True))
    DateClockedOut = Column(DateTime(timezone=True))
    created_at = Column(DateTime, default=func.now())

# Create the database tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # open data base connection
    pass
    yield
    Base.metadata.drop_all(bind=engine)

# Create a FastAPI app instance
app = FastAPI(
    lifespan=lifespan,
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    max_age=600,
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency to get the database session factory
def get_db_session():
    return sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get the database session for each request
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

"""
    THIS ARE FUNCTIONS TO POPULATE THE TEST DATABASE WITH DUMMY DATA FOR USE.
"""
def populate_users(counts: int, db: Session):
    new_users = []
    for i in range(counts):
        new_users.append(
            Users(name="test_user_{}".format(i))
        )

    db.add_all(new_users)
    db.commit()
    for user in new_users:
        db.refresh(user)
    return new_users

def populate_tasks(counts: int, db: Session):
    amount_per_hours = random.sample(range(10,100), counts)
    print(amount_per_hours)
    tasks_ = []
    for amount in amount_per_hours:
        tasks_.append(
            Task(
                Amount_Per_Hour = amount,
            )
        )
    
    db.add_all(tasks_)
    db.commit()
    for task in tasks_:
        db.refresh(task)
    return tasks_


def populate_timesheets(db: Session):
    hours_worked_list = random.sample(range(1,30), 20)
    
    users = db.query(Users).all()
    tasks = db.query(Task).all()

    timesheets_ = []
    for user in users:
        sample_tasks = random.sample(tasks, 10)
        for task in sample_tasks:
            hours_worked = hours_worked_list[random.randint(0, len(hours_worked_list)-1)]
            clock_out = datetime.now()
            clock_in = datetime.now() - timedelta(hours=hours_worked)
            timesheets_.append(
                Timesheets(
                    task_id = task.id,
                    user_id = user.id,
                    DateClockedIn = clock_in,
                    DateClockedOut = clock_out,
                )
            )

    db.add_all(timesheets_)
    db.commit()
    tsheets_query = db.query(Timesheets)
    tsheet_count = tsheets_query.count()
    return {"total":tsheet_count, "sheets": tsheets_query.all()}

"""
    END OF POPULATION FUNCTIONS
"""

"""
    THIS SECTION DEFINES ONLY THE NEEDED ENDPOINTS
"""
@app.get("/")
def root_endpoint():
    a = requests.get("http://172.19.0.1:8100/")
    return {"hello mr test api"}

@app.post("/populate-timesheets/")
def add_timesheets(task_user_counts: int=10,
    db: Session = Depends(get_db),
):
    populate_users(task_user_counts, db)
    populate_tasks(task_user_counts, db)
    new_sheets = populate_timesheets(db=db)
    return new_sheets

@app.get("/task/{task_id}")
def get_task(task_id:str, db: Session=Depends(get_db)):
    result = db.query(Task).filter(Task.id==task_id).first()
    return result

@app.get("/timesheet/{timesheet_id}")
def get_timesheet(timesheet_id:str, db: Session=Depends(get_db)):
    return db.query(Timesheets).filter(Timesheets.id==timesheet_id).first()

@app.get("/timesheets/")
def get_timesheets(
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
    db: Session=Depends(get_db)
):
    my_query = db.query(Timesheets)
    return {"total":my_query.count(), "timesheets":my_query.all()}

@app.get("/timesheets/task/{task_id}")
def get_timesheets_by_task_id(
    task_id,
    db: Session=Depends(get_db)
):
    my_query = db.query(Timesheets).filter(Timesheets.task_id==task_id)
    return {"total":my_query.count(), "timesheets":my_query.all()}