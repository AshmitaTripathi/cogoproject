from http.client import HTTPException
from sqlalchemy.orm import Session
from . import models, schemas

def create_search(db: Session, search: schemas.SearchV2Create):
    db_search = models.SearchSystem(**search.dict())
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

def get_search(db: Session, id: int):
    return db.query(models.SearchSystem).filter(models.SearchSystem.id == id).first()

def get_all_searches(db: Session , skip : int , limit : int):
    return db.query(models.SearchSystem).offset(skip).limit(limit).all()

def update_search(db: Session , id : int , search: schemas.SearchV2Update):
    db_search = db.query(models.SearchSystem).filter(models.SearchSystem.id == id).first()
    if db_search is None:
        print("User not found")
        raise HTTPException(status_code=404, detail="User not found")
    if db_search:
        for key, value in search.dict().items():
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