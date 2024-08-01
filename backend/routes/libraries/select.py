from fastapi import APIRouter

router = APIRouter()

#select routes
@router.get('/libraries/{library}/select')
def get_library_select_values(library: str): 
  return {"path": "to get valid select values for library"}

@router.post('/libraries/{library}/select')
def add_library_select_values(library: str, select_values: list[str]): 
  return {"path": "to add valid select values for library"}

@router.delete('/libraries/{library}/select')
def delete_library_select_values(library: str, select_values: list[str]): 
  return {"path": "to delete valid select values for library"}

#multiselect routes
@router.get('/libraries/{library}/multiselect')
def get_library_multiselect_values(library: str): 
  return {"path": "to get valid multiselect values for library"}

@router.post('/libraries/{library}/multiselect')
def add_library_multiselect_values(library: str, multiselect_values: list[str]): 
  return {"path": "to add valid multiselect values for library"}

@router.delete('/libraries/{library}/multiselect')
def delete_library_multiselect_values(library: str, multiselect_values: list[str]): 
  return {"path": "to delete valid multiselect values for library"}