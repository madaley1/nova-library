FROM mysql:5.7 as db
WORKDIR /db
ADD ./database /db

EXPOSE 3306

CMD ["mysqld"]

FROM python:3.12 as backend
WORKDIR /app
ADD ./backend/requirements.txt /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

ADD ./backend /app

EXPOSE 5000
CMD ["flask", "run", "--host", "0.0.0.0", "--debug"]

FROM node:22.4 as dashboard
WORKDIR /app
ADD ./dashboard/package.json /app

RUN npm i
ADD ./dashboard /app
EXPOSE 3000
CMD ["npm", "run", "dev"]