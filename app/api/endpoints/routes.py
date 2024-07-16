# from fastapi import APIRouter, Depends, HTTPException , Query
# from sqlalchemy.orm import Session
# from typing import List
# import datetime
# from pydantic.types import Json

# from ... import schemas, crud
# from ...database import get_db

# router = APIRouter()

# @router.post("/create_search", response_model=schemas.SearchV2)
# def create_search(search: schemas.SearchV2Create, db: Session = Depends(get_db)):
#     return crud.create_search(db, search)

# @router.get("/get_search/{id}", response_model=schemas.SearchV2)
# def get_search(id: int, db: Session = Depends(get_db)):
#     db_search = crud.get_search(db, id)
#     if db_search is None:
#         raise HTTPException(status_code=404, detail="Search data not found")
#     return db_search


# @router.get("/get_searches", response_model=schemas.PaginatedSearchResponse)
# def get_searches(
#     filters: Json = Query({}),
#     db: Session = Depends(get_db),
# ):
#     print("inside get_searches")
#     db_searches, total_count = crud.get_all_searches(db=db, filters=filters)
#     print(db_searches)
#     if not db_searches:
#         raise HTTPException(status_code=404, detail="No configurations found")

#     page = filters.get('page', 1)
#     page_size = filters.get('page_size', 5)
#     total_pages = (total_count + page_size - 1) // page_size

#     return {
#         "list": db_searches,
#         "page": page,
#         "total_count": total_count,
#         "page_size": page_size,
#         "total_pages": total_pages,
#     }

# @router.put("/update_search/{id}", response_model=schemas.SearchV2)
# def update_search( id: int , search: schemas.SearchV2Update, db: Session = Depends(get_db)):
#    return crud.update_search(db , id , search)


# @router.delete("/delete_search/{id}", response_model=schemas.SearchV2)
# def delete_search(id: int, db: Session = Depends(get_db)):
#     deleted_search = crud.delete_search(db, id)
#     if not deleted_search:
#         raise HTTPException(status_code=404, detail=f"Search with id {id} not found")
#     return deleted_search
    

# @router.post("/create_fcl", response_model=schemas.FCL)
# def create_fcl(fcl: schemas.FCLCreate, db: Session = Depends(get_db)):
#     return crud.create_fcl(db, fcl)

# @router.post("/create_air", response_model=schemas.AIR)
# def create_air(air: schemas.AIRCreate, db: Session = Depends(get_db)):
#     return crud.create_air(db, air)

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from typing import List
from pydantic.types import Json
from ... import schemas, crud , models
from ...database import get_db
import requests
import httpx
from typing import Dict, Any


router = APIRouter()

# @router.post("/create_search", response_model=schemas.SearchSystemBase)
# def create_search(search: schemas.SearchSystemBase, db: Session = Depends(get_db)):
#     res = crud.create_search_base(db, search)
#     if(search.service_type =="FCL"):
#         res1 = crud.create_fcl(db , {"search_id":res.id})
#     else :
#         res2 = crud.create_air(db , {"search_id":res.id})
#     return res

# @router.post("/create_search", response_model=schemas.SearchSystemWithDetails)
# def create_search(search: schemas.SearchSystemBase, db: Session = Depends(get_db)):
#     created_search = crud.create_search_base(db, search)
    
#     # Check service type and create associated FCL or AIR entries
#     if search.service_type == schemas.ServiceTypeEnum.FCL:
#         fcl_data = schemas.FCLCreate(**search.dict(), search_id=created_search.id)
#         crud.create_fcl(db, fcl_data)
#     elif search.service_type == schemas.ServiceTypeEnum.AIR:
#         air_data = schemas.AIRCreate(**search.dict(), search_id=created_search.id)
#         crud.create_air(db, air_data)
    

#     return created_search

@router.post("/create_search", response_model=schemas.SearchSystemWithDetails)
def create_search(search: schemas.SearchSystemBase, db: Session = Depends(get_db)):
    created_search = crud.create_search_base(db, search)
    
    details = schemas.SearchSystemWithDetails(**search.dict(), id=created_search.id)
    
    # if search.service_type == schemas.ServiceTypeEnum.FCL:
    #     fcl_data = schemas.FCLCreate(**search.dict(), search_id=created_search.id)
    #     created_fcl = crud.create_fcl(db, fcl_data)
    #     details.fcl = [schemas.FCLResponse(**created_fcl.dict(), origin=search.origin, destination=search.destination)]
    # elif search.service_type == schemas.ServiceTypeEnum.AIR:
    #     air_data = schemas.AIRCreate(**search.dict(), search_id=created_search.id)
    #     created_air = crud.create_air(db, air_data)
    #     details.air = [schemas.AIRResponse(**created_air.dict(), origin=search.origin, destination=search.destination)]

    if search.service_type == schemas.ServiceTypeEnum.FCL:
            fcl_data = schemas.FCLCreate(**search.dict(), search_id=created_search.id)
            created_fcl = crud.create_fcl(db, fcl_data)
            fcl_entries = []
            details.fcl = fcl_entries
    elif search.service_type == schemas.ServiceTypeEnum.AIR:
            air_data = schemas.AIRCreate(**search.dict(), search_id=created_search.id)
            created_air = crud.create_air(db, air_data)
            air_entries = []
            details.air = air_entries
    
    return details




@router.post("/create_fcl", response_model=schemas.FCL)
def create_fcl(fcl: schemas.FCLCreate, db: Session = Depends(get_db)):
    return crud.create_fcl(db, fcl)

@router.post("/create_air", response_model=schemas.AIR)
def create_air(air: schemas.AIRCreate, db: Session = Depends(get_db)):
    return crud.create_air(db, air)

# @router.get("/get_containers/{id}" , response_model = schemas.SearchSystemWithDetails)
# def get_container_details(id : int , db: Session = Depends(get_db)):
#     res = crud.get_container_info(id , db)
#     return res

@router.get("/get_containers/{id}")
def get_container_details(id: int, db: Session = Depends(get_db)):
    search= db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == id).first()
    
    details = {
        'id': search.id,
        'origin': search.origin,
        'destination': search.destination,
        'service_type': search.service_type,
        'fcl': [],
        'air': []
    }
    
    if search.service_type == models.ServiceTypeEnum.FCL:
        fcl_entries = db.query(models.FCL).filter(models.FCL.search_id == search.id).all()
        for fcl in fcl_entries:
            details['fcl'].append({
                'id': fcl.id,
                'search_id': fcl.search_id,
                'size': fcl.size or '0',
                'type': fcl.type or 'NA',
                'commodity': fcl.commodity or 'NA',
                'count': fcl.count or 0
            })
    elif search.service_type == models.ServiceTypeEnum.AIR:
        air_entries = db.query(models.AIR).filter(models.AIR.search_id == search.id).all()
        for air in air_entries:
            details['air'].append({
                'id': air.id,
                'search_id': air.search_id,
                'cargo_date': air.cargo_date or 'NA',
                'commodity': air.commodity or 'NA',
                'sub_commodity': air.sub_commodity or 'NA' ,
                'type': air.type or 'NA',
                'package_type': air.package_type or 'NA',
                'no_of_units' : air.no_of_units or 0,
                'tot_vol' : air.tot_vol or 0,
                'tot_weight' : air.tot_weight or 0,
                'handling' : air.handling or 'NA'

            })
    

    return details

@router.get("/get_search/{id}", response_model=schemas.responseBase)
def get_search(id: int, db: Session = Depends(get_db)):
    db_search = crud.get_search(db, id)
    if not db_search:
        raise HTTPException(status_code=404, detail="Search not found")
    return db_search

@router.get("/get_searches", response_model=schemas.PaginatedSearchResponse)
def get_searches(filters: Json = Query({}), db: Session = Depends(get_db)):
    db_searches, total_count = crud.get_all_searches(db, filters)
    if not db_searches:
        raise HTTPException(status_code=404, detail="No searches found")

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


@router.get("/get_fcl/{id}", response_model=schemas.FCLResponse)
def get_fcl(id: int, db: Session = Depends(get_db)):
    fcl = crud.get_fcl(db, id)
    if not fcl:
        raise HTTPException(status_code=404, detail="FCL not found")
    return fcl

@router.get("/get_air/{id}", response_model=schemas.AIRResponse)
def get_air(id: int, db: Session = Depends(get_db)):
    air = crud.get_air(db, id)
    if not air:
        raise HTTPException(status_code=404, detail="AIR not found")
    return air

@router.get("/get_all_fcl", response_model=List[schemas.FCLResponse])
def get_all_fcl(db: Session = Depends(get_db)):
    fcl_list = crud.get_all_fcls(db)
    if not fcl_list:
        raise HTTPException(status_code=404, detail="No FCL entries found")
    return fcl_list

@router.get("/get_all_air", response_model=List[schemas.AIRResponse])
def get_all_air(db: Session = Depends(get_db)):
    air_list = crud.get_all_airs(db)
    if not air_list:
        raise HTTPException(status_code=404, detail="No AIR entries found")
    return air_list

@router.put("/update_search/{id}", response_model=schemas.SearchSystemBase)
def update_search(id: int, search: schemas.SearchSystemBase, db: Session = Depends(get_db)):
    return crud.update_search(db, id, search)

@router.delete("/delete_search/{id}", response_model=schemas.SearchSystemBase)
def delete_search(id: int, db: Session = Depends(get_db)):
    deleted_search = crud.delete_search(db, id)
    if not deleted_search:
        raise HTTPException(status_code=404, detail="Search not found")
    return deleted_search


