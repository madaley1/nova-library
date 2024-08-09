from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv('../.env')
mysql_user = os.getenv('MYSQL_USER')
mysql_pass = os.getenv('MYSQL_PASSWORD')
mysql_host = os.getenv('MYSQL_PUBLIC_HOST')
mysql_port = os.getenv('MYSQL_PORT')
mysql_database = os.getenv('MYSQL_DATABASE')
conn_string = "mysql+mysqlconnector://{mysql_user}:{mysql_pass}@{mysql_host}:{mysql_port}/{mysql_database}".format(
  mysql_user=mysql_user, 
  mysql_pass=mysql_pass, 
  mysql_host=mysql_host, 
  mysql_port=mysql_port, 
  mysql_database=mysql_database
)
engine = create_engine(conn_string, echo=True)
