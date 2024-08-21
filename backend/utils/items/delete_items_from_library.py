from sqlalchemy import text
from utils.connection import engine

def delete_items_from_library(library_title: str, item_ids: list[str]):
  print('delete')