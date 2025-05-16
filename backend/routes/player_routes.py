# backend/routes/player_routes.py
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from models.player import Player
from schemas.player import PlayerCreate

router = APIRouter()

@router.post("/")
def create_player(player: PlayerCreate, db: Session = Depends(get_db)):
    db_player = Player(**player.dict())
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return {'data' : db_player}

@router.get("/")
def get_all_players(db : Session = Depends(get_db)):
    db_players = db.query(Player).all()
    return {'data': db_players}