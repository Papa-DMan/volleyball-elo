from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.game import GameCreate

router = APIRouter()

@router.post("/")
def record_game(game: GameCreate, db: Session = Depends(get_db)):
    # Logic to record and update ELO
    pass

@router.get("/active")
def get_active_games(db: Session = Depends(get_db)):
    # Logic to fetch active games
    pass
