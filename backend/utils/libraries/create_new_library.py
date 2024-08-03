from sqlalchemy import text
from utils.connection import engine

column_types = ['string', 'number', 'date', 'select', 'multiSelect']      

# class New_Library(BaseModel): 
#   library_title: str
#   columns: dict[str, str]

def check_if_library_exists(library_title: str): 
  with engine.connect() as connection:
    libraries_list = connection.execute(text('SELECT * FROM libraries')).fetchall()
    if any('{library_title}'.format(library_title=library_title) in x for x in libraries_list):
      raise Exception('Library name not unique, please provide a unique library name')

def create_new_library(library_title: str, columns: dict[str, str]):
  check_if_library_exists(library_title=library_title)

  add_library_to_list = "INSERT INTO libraries VALUES ('{library_title}')".format(library_title=library_title)
  create_data_table = 'CREATE TABLE {library_title}_data ('.format(library_title=library_title)
  create_column_table = 'CREATE TABLE {library_title}_columns (columns VARCHAR(256) NOT NULL UNIQUE, type TEXT NOT NULL, required BOOLEAN);'.format(library_title=library_title)
  create_select_values_table = 'CREATE TABLE {library_title}_select (columns VARCHAR(256) NOT NULL UNIQUE, select_values TEXT);'.format(library_title=library_title)
  create_multiselect_values_table = 'CREATE TABLE {library_title}_multiselect (columns VARCHAR(256) NOT NULL UNIQUE, multiselect_values TEXT);'.format(library_title=library_title)

  add_columns = 'INSERT INTO {library_title}_columns (columns, type) VALUES '.format(library_title=library_title)
  add_select = 'INSERT INTO {library_title}_select (columns) VALUES '.format(library_title=library_title)
  add_multiselect = 'INSERT INTO {library_title}_multiselect (columns) VALUES '.format(library_title=library_title)

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
      add_columns = add_columns + "('{column}', '{type}')".format(column=column, type=columns[column])
      if columns[column] == "select": add_select = add_select + "('{column}')".format(column=column)
      if columns[column] == "multiSelect": add_multiselect = add_multiselect + "('{column}')".format(column=column)
    else: 
      create_data_table = create_data_table + '{column} {mysql_type}, '.format(column=column, mysql_type=mysql_type)
      add_columns = add_columns + "('{column}', '{type}'), ".format(column=column, type=columns[column])
      if columns[column] == "select": add_select = add_select + "('{column}'), ".format(column=column)
      if columns[column] == "multiSelect": add_multiselect = add_multiselect + "('{column}'), ".format(column=column)


  create_data_table = create_data_table + ');'
  add_columns = add_columns + ';'

  add_select = add_select.strip(', ')
  add_select = add_select + ';'

  add_multiselect = add_multiselect.strip(', ')
  add_multiselect = add_multiselect + ';'

  with engine.connect() as connection:
    table_list = connection.execute(text('SHOW TABLES;')).fetchall()
    print(table_list)
    if not any('libraries' in x for x in table_list):
      connection.execute(text('CREATE TABLE libraries (library VARCHAR(256) NOT NULL UNIQUE);'))

    connection.execute(text(create_data_table))
    connection.execute(text(create_column_table))
    connection.execute(text(create_select_values_table))
    connection.execute(text(create_multiselect_values_table))

    connection.execute(text(add_columns))
    if "select" in columns.values(): connection.execute(text(add_select))
    if "multiSelect" in columns.values(): connection.execute(text(add_multiselect))
    connection.execute(text(add_library_to_list))
    connection.commit()
    connection.close()

create_new_library("test", {"test": "string", "test2": "select", "test3": "multiSelect", "test4": "select"})