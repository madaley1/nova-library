from sqlalchemy import text
from utils.connection import engine
from pydantic import BaseModel
from enum import Enum

column_types = ['string', 'number', 'date', 'select', 'multiSelect']      

class New_Library(BaseModel): 
  library_title: str
  columns: dict[str, str]

def create_new_library(new_library: New_Library):
  for column in new_library.columns:
    if column not in column_types:
      Exception('Invalid column type provided')

  with engine.connect() as connection:
    connection.execute(text("SHOW TABLES;"))
    connection.close()
    
  create_data_table = 'CREATE TABLE {library_table}_data'

  create_column_table = ''

  create_select_values_table = ''

  create_multiselect_values_table = ''
