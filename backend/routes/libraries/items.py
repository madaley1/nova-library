from fastapi import APIRouter
from pydantic import BaseModel
from utils.items.add_new_items import add_new_items
from utils.items.delete_items_from_library import delete_items_from_library

router = APIRouter()

@router.post('/libraries/{library_title}/items')
def add_items_to_library(library_title: str, items: list[dict[str,str | int | float | None]]):
  add_items = add_new_items(library_title=library_title, items=items)
  return add_items

@router.put('/libraries/{library_title}/{item_id}')
def edit_item_in_library(library_title: str, item_id: str):
  return {"path": "to edit a specific item in a library"}

@router.delete('/libraries/{library_title}/items')
def delete_item_in_library(library_title: str, item_ids: list[str]):
  delete_items = delete_items_from_library(library_title=library_title, item_ids=item_ids)
  return delete_items