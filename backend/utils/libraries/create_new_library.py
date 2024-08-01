from sqlalchemy import text
from utils.connection import engine
from pydantic import BaseModel
from enum import Enum

column_types = ['string', 'number', 'date', 'select', 'multiSelect']      

# class New_Library(BaseModel): 
#   library_title: str
#   columns: dict[str, str]

def create_new_library(library_title: str, columns: dict[str, str]):
  # print(library_title),
  # print(columns)
  create_data_table = 'CREATE TABLE {library_title}_data ('.format(library_title=library_title)

  create_column_table = 'CREATE TABLE {library_title}_columns (columns VARCHAR(256) NOT NULL UNIQUE, type TEXT NOT NULL, required BOOLEAN);'.format(library_title=library_title)

  create_select_values_table = 'CREATE TABLE {library_title}_select (columns VARCHAR(256) NOT NULL UNIQUE, select_values TEXT);'.format(library_title=library_title)

  create_multiselect_values_table = 'CREATE TABLE {library_title}_multiselect (columns VARCHAR(256) NOT NULL UNIQUE, multiselect_values TEXT);'.format(library_title=library_title)
  numCols = len(columns)
  for index, column in enumerate(columns):
    if columns[column] not in column_types: raise Exception('Invalid column type provided')

    mysql_type = ''
    if columns[column] == column_types[0]: mysql_type = 'TEXT'
    elif columns[column] == column_types[1]: mysql_type = 'INT'
    elif columns[column] == column_types[2]: mysql_type = 'DATE'
    elif columns[column] == column_types[3]: mysql_type = 'TEXT'
    elif columns[column] == column_types[4]: mysql_type = 'TEXT'

    if(index+1 == numCols): 
      create_data_table = create_data_table + '{column} {mysql_type}'.format(column=column, mysql_type=mysql_type)
    else: 
      create_data_table = create_data_table + '{column} {mysql_type}, '.format(column=column, mysql_type=mysql_type)


  create_data_table = create_data_table + ');'
  print(create_data_table)
  print(create_column_table)
  print(create_select_values_table)
  print(create_multiselect_values_table)
  with engine.connect() as connection:
    connection.execute(text(create_data_table))
    connection.execute(text(create_column_table))
    connection.execute(text(create_select_values_table))
    connection.execute(text(create_multiselect_values_table))
    connection.execute(text("SHOW TABLES;"))
    connection.close()

create_new_library(library_title="test", columns={"test": "string", "test2": "number"})