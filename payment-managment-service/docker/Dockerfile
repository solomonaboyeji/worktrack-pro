FROM python:3.9-slim-bullseye

RUN apt-get update -y
RUN apt-get install gcc -y

WORKDIR /usr/src/payments-mgt-api
RUN mkdir /usr/src/payments-mgt-api/requirements

COPY requirements.txt /usr/src/payments-mgt-api/requirements/prod.txt

RUN python -m pip install --upgrade pip
RUN python -m pip install -r /usr/src/payments-mgt-api/requirements/prod.txt

ADD .. /usr/src/payments-mgt-api/
WORKDIR /usr/src/payments-mgt-api/
EXPOSE 8100

CMD ["gunicorn", "-w 1", "-b 0.0.0.0:8300", "-t 30" , "-k", "uvicorn.workers.UvicornWorker", "src.main:app" ]