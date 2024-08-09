FROM mysql:5.7 AS db
WORKDIR /db
ADD ./database /db
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_DATABASE

EXPOSE 3306
WORKDIR /
ADD database/sql/db.sql /docker-entrypoint-initdb.d
CMD ["mysqld"]

FROM python:3.12 AS backend
WORKDIR /app
ADD ./backend/requirements.txt /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

ADD ./backend /app

EXPOSE 8000
CMD ["fastapi", "dev", "/app/main.py", "--host", "0.0.0.0", "--port", "8000" ]

FROM node:20.16 AS dashboard
WORKDIR /app
ADD ./dashboard/package.json /app

RUN npm i
ADD ./dashboard /app
EXPOSE 3000
CMD ["npm", "run", "dev"]