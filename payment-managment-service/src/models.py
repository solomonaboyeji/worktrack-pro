from email.policy import default
import uuid
from sqlalchemy import Column, ForeignKey, Date, String, DateTime, Integer

from sqlalchemy.dialects import postgresql
from sqlalchemy.sql.functions import func
from sqlalchemy.orm import relationship

from src.database import Base
