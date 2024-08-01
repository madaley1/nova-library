from fastapi import APIRouter
from . import select
from . import items

router = APIRouter()

#general library routes
@router.get('/libraries')
def get_libraries(): 
  return {"path": "to get libraries"}

@router.post('/libraries')
def add_library(): 
  return {"path": "to Add a new library"}

#specific library routes
@router.get('/libraries/{library}')
def get_specific_library(library: str): 
  return {"path": "to get data in a specific library that exists"}

@router.post('/libraries/{library}')
def edit_specific_library(library: str): 
  return {"path": "to edit a specific library that exists"}

@router.delete('/libraries/{library}')
def delete_specific_library(library: str): 
  return {"path": "to delete a specific library that exists"}

router.include_router(items.router)
router.include_router(select.router)
