FROM mysql:5.7 AS db
WORKDIR /db
ADD ./database /db

EXPOSE 3306

CMD ["mysqld"]

FROM python:3.12 AS backend
WORKDIR /app
ADD ./backend/requirements.txt /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

ADD ./backend /app

EXPOSE 8000
CMD ["fastapi", "dev", "/app/main.py" ]

FROM node:22.4 AS dashboard
WORKDIR /app
ADD ./dashboard/package.json /app

RUN npm i
ADD ./dashboard /app
EXPOSE 3000
CMD ["npm", "run", "dev"]