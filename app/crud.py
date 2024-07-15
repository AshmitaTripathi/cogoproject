from datetime import datetime
from http.client import HTTPException
from sqlalchemy import desc , asc
from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import Query
from datetime import date
from pydantic.types import Json

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


# def get_all_searches(
#     db: Session , 
#     page: int, 
#     page_size: int, 
# ):
#     offset = (page - 1) * page_size
#     db_shipments = (
#         db.query(models.SearchSystem)
#         .order_by(desc(models.SearchSystem.updated_at))
#         .offset(offset)
#         .limit(page_size)
#         .all()
#     )
    
#     if not db_shipments:
#         raise HTTPException(status_code=404, detail="No Shipments found")
    
#     return db_shipments

def get_all_searches(
    db: Session, 
    filters: Json = Query({})
):
    page = filters.get('page', 1)
    page_size = filters.get('page_size', 5)
    origin = filters.get('origin', None)
    destination = filters.get('destination', None)
    size = filters.get('size', None)
    type = filters.get('type', None)
    commodity = filters.get('commodity', None)
    start_date = filters.get('start_date', None)
    end_date = filters.get('end_date', None)
    sort_by = filters.get('sort_by', 'updated_at')
    sort_type = filters.get('sort_type', 'desc')

    
    offset = (page - 1) * page_size
    db_shipments = db.query(models.SearchSystem)

    if origin:
        db_shipments = db_shipments.filter(models.SearchSystem.origin == origin)
    if destination:
        db_shipments = db_shipments.filter(models.SearchSystem.destination == destination)
    if size:
        db_shipments = db_shipments.filter(models.SearchSystem.size == size)
    if type:
        db_shipments = db_shipments.filter(models.SearchSystem.type == type)
    if commodity:
        db_shipments = db_shipments.filter(models.SearchSystem.commodity == commodity)
    if start_date:
        db_shipments = db_shipments.filter(models.SearchSystem.updated_at >= start_date)
    if end_date:
        db_shipments = db_shipments.filter(models.SearchSystem.updated_at <= end_date)

    # Apply sorting
    if sort_by and sort_type:
        sort_attr = getattr(models.SearchSystem, sort_by)
        if sort_type == "desc":
            db_shipments = db_shipments.order_by(desc(sort_attr))
        else:
            db_shipments = db_shipments.order_by(sort_attr)

    

  
    total_count = db_shipments.count()
    db_shipmentss = db_shipments.offset(offset).limit(page_size).all()
    
    if not db_shipmentss:
        raise HTTPException(status_code=404, detail="No Shipments found")
    
    return db_shipmentss , total_count

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