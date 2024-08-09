from sqlalchemy import text
from utils.connection import engine

def delete_existing_library(library_title:str):
  drop_tables = "DROP TABLES {library_title}_data, {library_title}_columns, {library_title}_select, {library_title}_multiselect;".format(library_title=library_title)
  delete_library_entry = "DELETE FROM libraries WHERE library='{library_title}';".format(library_title=library_title)

  with engine.connect() as connection:
    connection.execute(text(drop_tables))
    connection.execute(text(delete_library_entry))

    connection.commit()
    connection.close()
  return {"message": "library successfully deleted"}