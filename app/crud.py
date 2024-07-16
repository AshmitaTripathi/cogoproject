# from datetime import datetime
# from http.client import HTTPException
# from sqlalchemy import desc , asc
# from sqlalchemy.orm import Session
# from . import models, schemas
# from fastapi import Query
# from datetime import date
# from pydantic.types import Json

# import datetime

# def create_search(db: Session, search: schemas.SearchV2Create):
#     db_search = models.SearchSystem(**search.dict())
#     db.add(db_search)
#     db.commit()
#     db.refresh(db_search)
#     return db_search

# def create_fcl(db: Session, fcl: schemas.FCLCreate):
#     db_fcl = models.FCL(**fcl.dict())
#     db.add(db_fcl)
#     db.commit()
#     db.refresh(db_fcl)
#     return db_fcl

# def create_air(db: Session, air: schemas.AIRCreate):
#     db_air = models.AIR(**air.dict())
#     db.add(db_air)
#     db.commit()
#     db.refresh(db_air)
#     return db_air

# def get_search(db: Session, id: int):
#     return db.query(models.SearchSystem).filter(models.SearchSystem.id == id).first()



# def get_all_searches(
#     db: Session, 
#     filters: Json = Query({})
# ):
#     page = filters.get('page', 1)
#     page_size = filters.get('page_size', 5)
#     origin = filters.get('origin', None)
#     destination = filters.get('destination', None)
#     size = filters.get('size', None)
#     type = filters.get('type', None)
#     commodity = filters.get('commodity', None)
#     start_date = filters.get('start_date', None)
#     end_date = filters.get('end_date', None)
#     sort_by = filters.get('sort_by', 'updated_at')
#     sort_type = filters.get('sort_type', 'desc')

    
#     offset = (page - 1) * page_size
#     db_shipments = db.query(models.SearchSystem)

#     if origin:
#         db_shipments = db_shipments.filter(models.SearchSystem.origin == origin)
#     if destination:
#         db_shipments = db_shipments.filter(models.SearchSystem.destination == destination)
#     if size:
#         db_shipments = db_shipments.filter(models.SearchSystem.size == size)
#     if type:
#         db_shipments = db_shipments.filter(models.SearchSystem.type == type)
#     if commodity:
#         db_shipments = db_shipments.filter(models.SearchSystem.commodity == commodity)
#     if start_date:
#         db_shipments = db_shipments.filter(models.SearchSystem.updated_at >= start_date)
#     if end_date:
#         db_shipments = db_shipments.filter(models.SearchSystem.updated_at <= end_date)

#     # Apply sorting
#     if sort_by and sort_type:
#         sort_attr = getattr(models.SearchSystemBase, sort_by)
#         if sort_type == "desc":
#             db_shipments = db_shipments.order_by(desc(sort_attr))
#         else:
#             db_shipments = db_shipments.order_by(sort_attr)

    

  
#     total_count = db_shipments.count()
#     db_shipmentss = db_shipments.offset(offset).limit(page_size).all()
    
#     if not db_shipmentss:
#         raise HTTPException(status_code=404, detail="No Shipments found")
    
#     return db_shipmentss , total_count

# def update_search(db: Session , id : int , search: schemas.SearchSystemBase):
#     db_search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == id).first()
#     if db_search is None:
#         print("User not found")
#         raise HTTPException(status_code=404, detail="User not found")
#     if db_search:
#         for key, value in search.dict().items():
#             # if key == "updated_at":
#             #     setattr(db_search, key, datetime.utcnow())  # Update with current timestamp
#             # else:
#                 setattr(db_search, key, value)
#         db.commit()
#         db.refresh(db_search)
#     return db_search
    
# def delete_search(db: Session, id: int):
#     db_search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == id).first()
#     if db_search:
#         db.delete(db_search)
#         db.commit()
#     return db_search


from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import HTTPException , Query
from pydantic.types import Json

from sqlalchemy import desc , asc

def create_search_base(db: Session, search: schemas.SearchSystemBase):
    db_search = models.SearchSystemBase(**search.dict())
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

def create_fcl(db: Session, fcl: schemas.FCLCreate):
    db_fcl = models.FCL(**fcl.dict())
    db.add(db_fcl)
    db.commit()
    db.refresh(db_fcl)
    return db_fcl

def create_air(db: Session, air: schemas.AIRCreate):
    db_air = models.AIR(**air.dict())
    db.add(db_air)
    db.commit()
    db.refresh(db_air)
    return db_air

def get_search(db: Session, id: int):
    return db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == id).first()


# def get_all_searches(
#     db: Session, 
#     filters: Json = Query({})
# ):
#     page = filters.get('page', 1)
#     page_size = filters.get('page_size', 5)
#     origin = filters.get('origin', None)
#     destination = filters.get('destination', None)
#     service_type = filters.get('service_type', None)
#     start_date = filters.get('start_date', None)
#     end_date = filters.get('end_date', None)
#     sort_by = filters.get('sort_by', 'updated_at')
#     sort_type = filters.get('sort_type', 'desc')

#     offset = (page - 1) * page_size
#     query = db.query(models.SearchSystemBase)

#     if origin:
#         query = query.filter(models.SearchSystemBase.origin == origin)
#     if destination:
#         query = query.filter(models.SearchSystemBase.destination == destination)
#     if service_type:
#         query = query.filter(models.SearchSystemBase.service_type == service_type)
#     if start_date:
#         query = query.filter(models.SearchSystemBase.updated_at >= start_date)
#     if end_date:
#         query = query.filter(models.SearchSystemBase.updated_at <= end_date)

#     if sort_by and sort_type:
#         sort_attr = getattr(models.SearchSystemBase, sort_by)
#         if sort_type == "desc":
#             query = query.order_by(desc(sort_attr))
#         else:
#             query = query.order_by(asc(sort_attr))

#     total_count = query.count()
#     search_list = query.offset(offset).limit(page_size).all()

#     search_details = []
#     for search in search_list:
#         details = search.__dict__
#         if search.service_type == models.ServiceTypeEnum.FCL:
#             fcl_entries = db.query(models.FCL).filter(models.FCL.search_id == search.id).all()
#             details['fcl'] = fcl_entries
#         elif search.service_type == models.ServiceTypeEnum.AIR:
#             air_entries = db.query(models.AIR).filter(models.AIR.search_id == search.id).all()
#             details['air'] = air_entries
#         search_details.append(details)

#     total_pages = (total_count + page_size - 1) // page_size

#     return search_details , total_count



def get_all_searches(
    db: Session, 
    filters: Json = Query({})
):
    page = filters.get('page', 1)
    page_size = filters.get('page_size', 5)
    origin = filters.get('origin', None)
    destination = filters.get('destination', None)
    service_type = filters.get('service_type', None)
    start_date = filters.get('start_date', None)
    end_date = filters.get('end_date', None)
    sort_by = filters.get('sort_by', 'updated_at')
    sort_type = filters.get('sort_type', 'desc')

    offset = (page - 1) * page_size
    query = db.query(models.SearchSystemBase)

    if origin:
        query = query.filter(models.SearchSystemBase.origin == origin)
    if destination:
        query = query.filter(models.SearchSystemBase.destination == destination)
    if service_type:
        query = query.filter(models.SearchSystemBase.service_type == service_type)
    if start_date:
        query = query.filter(models.SearchSystemBase.updated_at >= start_date)
    if end_date:
        query = query.filter(models.SearchSystemBase.updated_at <= end_date)

    if sort_by and sort_type:
        sort_attr = getattr(models.SearchSystemBase, sort_by)
        if sort_type == "desc":
            query = query.order_by(desc(sort_attr))
        else:
            query = query.order_by(asc(sort_attr))

    total_count = query.count()
    search_list = query.offset(offset).limit(page_size).all()

    search_details = []
    for search in search_list:
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
           air_entries = db.query(models.FCL).filter(models.FCL.search_id == search.id).all()
           for fcl in air_entries:
                details['air'].append({
                    'id': fcl.id,
                    'search_id': fcl.search_id,
                    'size': fcl.size,
                    'type': fcl.type,
                    'commodity': fcl.commodity,
                    'count': fcl.count
                })
        
        search_details.append(details)

    total_pages = (total_count + page_size - 1) // page_size

    return search_details, total_count



def get_all_fcls(db: Session):
    fcls = db.query(models.FCL).all()
    fcl_list = []
    for fcl in fcls:
        search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == fcl.search_id).first()
        fcl_list.append({
            "id": fcl.id,
            "origin": search.origin,
            "destination": search.destination,
            "size": fcl.size,
            "type": fcl.type,
            "commodity": fcl.commodity,
            "count": fcl.count
        })
    return fcl_list

def get_all_airs(db: Session):
    airs = db.query(models.AIR).all()
    air_list = []
    for air in airs:
        search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == air.search_id).first()
        air_list.append({
            "id": air.id,
            "origin": search.origin,
            "destination": search.destination,
            "cargo_date": air.cargo_date,
            "commodity": air.commodity,
            "sub_commodity": air.sub_commodity,
            "type": air.type,
            "package_type": air.package_type,
            "no_of_units": air.no_of_units,
            "tot_vol": air.tot_vol,
            "tot_weight": air.tot_weight,
            "handling": air.handling
        })
    return air_list


def get_fcl(db: Session, id: int):
    fcl = db.query(models.FCL).filter(models.FCL.id == id).first()
    if fcl:
        search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == fcl.search_id).first()
        return {
            "id": fcl.id,
            "origin": search.origin,
            "destination": search.destination,
            "size": fcl.size,
            "type": fcl.type,
            "commodity": fcl.commodity,
            "count": fcl.count
        }
    return None

def get_air(db: Session, id: int):
    air = db.query(models.AIR).filter(models.AIR.id == id).first()
    if air:
        search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == air.search_id).first()
        return {
            "id": air.id,
            "origin": search.origin,
            "destination": search.destination,
            "cargo_date": air.cargo_date,
            "commodity": air.commodity,
            "sub_commodity": air.sub_commodity,
            "type": air.type,
            "package_type": air.package_type,
            "no_of_units": air.no_of_units,
            "tot_vol": air.tot_vol,
            "tot_weight": air.tot_weight,
            "handling": air.handling
        }
    return None


def update_search(db: Session, id: int, search: schemas.SearchSystemBase):
    db_search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == id).first()
    if not db_search:
        raise HTTPException(status_code=404, detail="Search not found")

    for key, value in search.dict().items():
        setattr(db_search, key, value)
    
    db.commit()
    db.refresh(db_search)
    return db_search

def delete_search(db: Session, id: int):
    db_search = db.query(models.SearchSystemBase).filter(models.SearchSystemBase.id == id).first()
    if db_search:
        db.delete(db_search)
        db.commit()
    return db_search
