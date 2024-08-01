from fastapi import APIRouter

router = APIRouter()

@router.post('/libraries/{library}/{item_id}')
def add_item_in_library(library: str, item_id: str):
  return {"path": "to add a specific item in a library"}

@router.put('/libraries/{library}/{item_id}')
def edit_item_in_library(library: str, item_id: str):
  return {"path": "to edit a specific item in a library"}

@router.delete('/libraries/{library}/items')
def delete_item_in_library(library: str, item_ids: list[str]):
  return {"path": "to delete items in a library"}