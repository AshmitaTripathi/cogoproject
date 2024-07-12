from datetime import datetime
from http.client import HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import Query
import datetime

def create_search(db: Session, search: schemas.SearchV2Create):
    db_search = models.SearchSystem(**search.dict())
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

def get_search(db: Session, id: int):
    return db.query(models.SearchSystem).filter(models.SearchSystem.id == id).first()

# def get_all_searches(db: Session , skip : int , limit : int):
#     return db.query(models.SearchSystem).offset(skip).limit(limit).all()


def get_all_searches(
    db: Session , 
    page: int, 
    page_size: int, 
    
):
    offset = (page - 1) * page_size
    db_shipments = (
        db.query(models.SearchSystem)
        .order_by(desc(models.SearchSystem.updated_at))
        .offset(offset)
        .limit(page_size)
        .all()
    )
    
    if not db_shipments:
        raise HTTPException(status_code=404, detail="No Shipments found")
    
    return db_shipments

def update_search(db: Session , id : int , search: schemas.SearchV2Update):
    db_search = db.query(models.SearchSystem).filter(models.SearchSystem.id == id).first()
    if db_search is None:
        print("User not found")
        raise HTTPException(status_code=404, detail="User not found")
    if db_search:
        for key, value in search.dict().items():
            # if key == "updated_at":
            #     setattr(db_search, key, datetime.utcnow())  # Update with current timestamp
            # else:
                setattr(db_search, key, value)
        db.commit()
        db.refresh(db_search)
    return db_search
    
def delete_search(db: Session, id: int):
    db_search = db.query(models.SearchSystem).filter(models.SearchSystem.id == id).first()
    if db_search:
        db.delete(db_search)
        db.commit()
    return db_search