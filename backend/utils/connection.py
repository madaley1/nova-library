from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv('../.env')
mysql_user = os.getenv('MYSQL_USER')
mysql_pass = os.getenv('MYSQL_PASSWORD')
mysql_host = os.getenv('MYSQL_HOST')
mysql_port = os.getenv('MYSQL_PORT')
mysql_db = os.getenv('MYSQL_DATABASE')
conn_string = "mysql+mysqlconnector://{mysql_user}:{mysql_pass}@{mysql_host}:{mysql_port}/{mysql_db}".format(
  mysql_user=mysql_user, 
  mysql_pass=mysql_pass, 
  mysql_host=mysql_host, 
  mysql_port=mysql_port, 
  mysql_db=mysql_db
)
engine = create_engine(conn_string, echo=True)
