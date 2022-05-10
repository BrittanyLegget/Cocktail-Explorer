FROM python:3.10-buster

RUN mkdir -p /microservice
RUN mkdir -p /pages
WORKDIR /microservice

COPY microservice/pyproject.toml /microservice/pyproject.toml
COPY microservice/poetry.lock /microservice/poetry.lock
RUN pip install poetry==1.1.4
RUN poetry config virtualenvs.create false
RUN poetry install --no-root --no-dev

COPY microservice/ /microservice
COPY pages/ /pages
