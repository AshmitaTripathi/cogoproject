from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ... import schemas, crud
from ...database import get_db

router = APIRouter()

@router.post("/create_configuration", response_model=schemas.Configuration)
def create_configuration(configuration: schemas.ConfigurationCreate, db: Session = Depends(get_db)):
    db_configuration = crud.get_configuration(db, country_code=configuration.country_code)
    if db_configuration:
        raise HTTPException(status_code=400, detail="Configuration already exists")
    return crud.create_configuration(db, configuration=configuration)

@router.get("/get_configuration/{country_code}", response_model=schemas.Configuration)
def get_configuration(country_code: str, db: Session = Depends(get_db)):
    db_configuration = crud.get_configuration(db, country_code=country_code)
    if db_configuration is None:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return db_configuration

@router.get("/get_configurations", response_model=List[schemas.Configuration])
def get_configurations(db: Session = Depends(get_db)):
    db_configurations = crud.get_all_configurations(db)
    if not db_configurations:
        raise HTTPException(status_code=404, detail="No configurations found")
    return db_configurations

@router.post("/update_configuration/{country_code}", response_model=schemas.Configuration)
def update_configuration(country_code: str, configuration: schemas.ConfigurationUpdate, db: Session = Depends(get_db)):
    db_configuration = crud.get_configuration(db, country_code=country_code)
    if db_configuration is None:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return crud.update_configuration(db, country_code=country_code, configuration=configuration)

@router.delete("/delete_configuration/{country_code}", response_model=schemas.Configuration)
def delete_configuration(country_code: str, db: Session = Depends(get_db)):
    db_configuration = crud.get_configuration(db, country_code=country_code)
    if db_configuration is None:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return crud.delete_configuration(db, country_code=country_code)