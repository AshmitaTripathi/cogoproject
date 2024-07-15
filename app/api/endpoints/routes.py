from fastapi import APIRouter, Depends, HTTPException , Query
from sqlalchemy.orm import Session
from typing import List
import datetime
from pydantic.types import Json

from ... import schemas, crud
from ...database import get_db

router = APIRouter()

@router.post("/create_search", response_model=schemas.SearchV2)
def create_search(search: schemas.SearchV2Create, db: Session = Depends(get_db)):
    return crud.create_search(db, search)

@router.get("/get_search/{id}", response_model=schemas.SearchV2)
def get_search(id: int, db: Session = Depends(get_db)):
    db_search = crud.get_search(db, id)
    if db_search is None:
        raise HTTPException(status_code=404, detail="Search data not found")
    return db_search


sample_searches = [
    schemas.SearchV2(id=1, origin='A', destination='B', size='large', type='type1', commodity='commodity1', count=10, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now()),
    # Add more sample data as needed
]

# @router.get("/get_searches", response_model=List[schemas.SearchV2])
# def get_searches(
#                 db: Session = Depends(get_db), 
#                 page: int = Query(1, ge=1), 
#                 page_size: int = Query(5, ge=1), 
#                 skip : int =0 ,
#                 limit : int = 100):
#     print("inside get_searches")
#     db_searches = crud.get_all_searches(db , page=page , page_size=page_size)
#     print(db_searches)
#     if not db_searches:
#         raise HTTPException(status_code=404, detail="No configurations found")
#     return db_searches


# @router.get("/get_searches", response_model=List[schemas.SearchV2])
# def get_searches(
#                 filters : Json = Query({}),
#                 db: Session = Depends(get_db), 
#                 ):
#     print("inside get_searches")
#     db_searches = crud.get_all_searches(db=db , filters=filters)
#     print(db_searches)
#     if not db_searches:
#         raise HTTPException(status_code=404, detail="No configurations found")
#     return db_searches

@router.get("/get_searches", response_model=schemas.PaginatedSearchResponse)
def get_searches(
    filters: Json = Query({}),
    db: Session = Depends(get_db),
):
    print("inside get_searches")
    db_searches, total_count = crud.get_all_searches(db=db, filters=filters)
    print(db_searches)
    if not db_searches:
        raise HTTPException(status_code=404, detail="No configurations found")

    page = filters.get('page', 1)
    page_size = filters.get('page_size', 5)
    total_pages = (total_count + page_size - 1) // page_size

    return {
        "list": db_searches,
        "page": page,
        "total_count": total_count,
        "page_size": page_size,
        "total_pages": total_pages,
    }

@router.put("/update_search/{id}", response_model=schemas.SearchV2)
def update_search( id: int , search: schemas.SearchV2Update, db: Session = Depends(get_db)):
   return crud.update_search(db , id , search)


@router.delete("/delete_search/{id}", response_model=schemas.SearchV2)
def delete_search(id: int, db: Session = Depends(get_db)):
    deleted_search = crud.delete_search(db, id)
    if not deleted_search:
        raise HTTPException(status_code=404, detail=f"Search with id {id} not found")
    return deleted_search
    
