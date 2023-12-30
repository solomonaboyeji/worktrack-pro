FROM python:3.9-slim-bullseye

RUN apt-get update -y
RUN apt-get install gcc -y

WORKDIR /usr/src/timesheets-mgt-api
RUN mkdir /usr/src/timesheets-mgt-api/requirements

COPY requirements.txt /usr/src/timesheets-mgt-api/requirements/prod.txt

RUN python -m pip install --upgrade pip
RUN python -m pip install -r /usr/src/timesheets-mgt-api/requirements/prod.txt

ADD .. /usr/src/timesheets-mgt-api/
WORKDIR /usr/src/timesheets-mgt-api/
EXPOSE 8100

CMD ["gunicorn", "-w 1", "-b 0.0.0.0:8300", "-t 30" , "-k", "uvicorn.workers.UvicornWorker", "src.main:app" ]