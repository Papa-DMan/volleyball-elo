from fastapi import APIRouter, HTTPException
from schemas.location import LocationCreate, LocationUpdate
from models.location import Location
from database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends

router = APIRouter()

@router.post("/")
def create_location(location: LocationCreate, db: Session = Depends(get_db)):
    db_location = Location(name=location.name, address=location.address)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

@router.put("/{location_id}")
def update_location(location_id: str, data: LocationUpdate, db: Session = Depends(get_db)):
    location = db.query(Location).filter_by(id=location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    for attr, value in data.dict(exclude_unset=True).items():
        setattr(location, attr, value)
    db.commit()
    return location
