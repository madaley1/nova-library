from sqlalchemy import text
from utils.connection import engine

def delete_items_from_library(library_title: str, item_ids: list[str]):
  print('delete')
  id_str = '('
  for item_id in item_ids:
    id_str += '({item_id}),'.format(item_id=item_id)
  id_str = id_str.strip(',')
  id_str += ')'
  delete_items_query = 'DELETE FROM {library_title}_data WHERE ID IN {id_str};'.format(library_title=library_title, id_str=id_str)
  print(delete_items_query)
  with engine.connect() as connection:
    connection.execute(text(delete_items_query))
    connection.commit()
    connection.close()
  return {"message": "Items {item_ids} have been deleted".format(item_ids=item_ids)}


delete_items_from_library(library_title='test', item_ids=[3])
