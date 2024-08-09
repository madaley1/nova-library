from sqlalchemy import text
from utils.connection import engine

def get_specific_library(library_title: str):
  select_data_table = "SELECT * FROM {library_title}_data;".format(library_title=library_title)
  select_column_table = "SELECT * FROM {library_title}_columns;".format(library_title=library_title)
  select_select_values_table = "SELECT * FROM {library_title}_select;".format(library_title=library_title)
  select_multiselect_values_table = "SELECT * FROM {library_title}_multiselect;".format(library_title=library_title)
  
  library_data = {
    'data': [],
    'column_data': [],
    'select_data': [],
    'multislect_data': []
  }
  
  with engine.connect() as connection:
    data_table = connection.execute(text(select_data_table)).fetchall()
    column_table = connection.execute(text(select_column_table)).fetchall()

    column_types: list[str] = []

    library_data['data'] = data_table
    library_data['column_data'] = column_table
    if len(column_table) > 0:
      for row in column_table:
        column_types.append(row[1])

    if 'select' in column_types:
      select_values_table = connection.execute(text(select_select_values_table)).fetchall()
      library_data['select_data'] = select_values_table

    if 'multiSelect' in column_types:
      multiselect_values_table = connection.execute(text(select_multiselect_values_table)).fetchall()
      library_data['multislect_data'] = multiselect_values_table

    connection.commit()
    connection.close()
  return library_data
