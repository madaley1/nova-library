from sqlalchemy import text, Sequence
from utils.connection import engine

def get_existing_libraries():
  get_existing_libraries_query = "SELECT * FROM libraries;"

  libraries_response: list[str] = []
  with engine.connect() as connection:
    response = connection.execute(text(get_existing_libraries_query)).fetchall()
    processed_response: list[str] = []
    for row in response:
      processed_response.append(row[0])
    libraries_response = processed_response
    connection.commit()
  return libraries_response