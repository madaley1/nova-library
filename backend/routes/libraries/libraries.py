from fastapi import APIRouter
from pydantic import BaseModel
import json
from . import select
from . import items
from utils.libraries.get_existing_libraries import get_existing_libraries
from utils.libraries.create_new_library import create_new_library
from utils.libraries.get_specific_library import get_specific_library
from utils.libraries.delete_existing_library import delete_existing_library


router = APIRouter()

#general library routes
@router.get('/libraries')
def get_libraries(): 
  libraries = get_existing_libraries()
  return {"libraries": libraries}

class Add_Library(BaseModel):
  library_title: str
  columns: dict[str, str]

@router.post('/libraries')
def add_library(body: Add_Library): 
  new_library = create_new_library(library_title=body.library_title, columns=body.columns)
  return new_library

#specific library routes
@router.get('/libraries/{library}')
def get_existing_library(library: str): 
  specific_library = get_specific_library(library_title=library)
  for data in specific_library: 
    i = 0
    if not data == 'column_data': 
      # translates tuples into lists for json
      for i in range(len(specific_library[data])):
        newRow = [*specific_library[data][i]]
        specific_library[data][i] = newRow
    else:
      for i in range(len(specific_library[data])):
        newRow = {
          "column_name": specific_library[data][i][0],
          "column_type": specific_library[data][i][1],
          "column_required": specific_library[data][i][2]
        }
        specific_library[data][i] = newRow
  print(specific_library)
  return {**specific_library}

# commented out since I think I need to build out some ideas for how to achieve this more solidly
# @router.post('/libraries/{library}')
# def edit_specific_library(library: str): 
#   return {"path": "to edit a specific library that exists"}

@router.delete('/libraries/{library}')
def delete_specific_library(library: str): 
  delete_library = delete_existing_library(library_title=library)
  return {**delete_library}

router.include_router(items.router)
router.include_router(select.router)
