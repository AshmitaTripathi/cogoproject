from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

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


@router.get("/get_searches", response_model=List[schemas.SearchV2])
def get_searches(db: Session = Depends(get_db) , skip : int =0 , limit : int = 100):
    console.log("inside get_searches")
    db_searches = crud.get_all_searches(db , skip , limit)
    console.log(db_searches)
    if not db_searches:
        raise HTTPException(status_code=404, detail="No configurations found")
    return db_searches


@router.put("/update_search/{id}", response_model=schemas.SearchV2)
def update_search( id: int , search: schemas.SearchV2Update, db: Session = Depends(get_db)):
   return crud.update_search(db , id , search)
    
