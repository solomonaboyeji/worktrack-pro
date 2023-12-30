FROM python:3.9-slim-bullseye

RUN apt-get update -y
RUN apt-get install gcc -y

WORKDIR /usr/src/test-api

COPY requirements.txt /usr/src/test-api/requirements.txt

RUN python -m pip install --upgrade pip
RUN python -m pip install -r /usr/src/test-api/requirements.txt

ADD ../../tests/test_api/ /usr/src/test-api/
WORKDIR /usr/src/test-api/
EXPOSE 5000

CMD ["uvicorn", "main:app", "--reload", "--port", "5000", "--host", "0.0.0.0"]