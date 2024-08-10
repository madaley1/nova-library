from sqlalchemy import text
from utils.connection import engine
from dateutil.parser import parse

def is_date(string: str, fuzzy=False):
    try: 
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False

def add_new_items(library_title: str, items: list[dict[str,str]]): 
  add_new_items_query = 'INSERT INTO {library_title}_data ('.format(library_title=library_title)
  select_column_table = 'SELECT * FROM {library_title}_columns;'.format(library_title=library_title)

  required_cols: list[str] = []

  with engine.connect() as connection:
    columns = connection.execute(text(select_column_table)).fetchall()
    i = 0

    col_len = len(columns)
    c = 0
    for c in range(col_len):
      if c+1 < col_len:
        add_new_items_query += '{column_name}, '.format(column_name = columns[c][0])
      else: 
        add_new_items_query += '{column_name}) '.format(column_name = columns[c][0])
      if columns[c-1][2] is 1:
        required_cols.append(columns[c-1][0])
      c += 1

    value_string = 'VALUES '
    for i in range(len(items)):
      item = items[i]
      value_string += '('

      j = 0
      for entry in item:
        if item[entry] is None and entry in required_cols:
          raise Exception('Required column value missing, please resubmit with all required data included')
        elif type(item[entry]) is str:
          entry_is_date = is_date(string=item[entry])
          if entry_is_date: value_string += "'{entry}'".format(entry=item[entry])
          else: value_string += '"{entry}"'.format(entry=item[entry])
        elif type(item[entry]) == int or type(entry=item[entry]) == float:
          value_string += '{entry}'.format(entry=item[entry])
        elif type(item[entry]) is None:
          value_string += 'null'
        j+=1
        if j < len(item):
          value_string += ', '
        else:
          value_string += ')'
      
      if i+1 < len(items):
        value_string += ', '
      else:
        value_string += ';'
    add_new_items_query += value_string
    connection.execute(text(add_new_items_query))

    connection.commit()
    connection.close()
  return {"message": "items successfully added"}