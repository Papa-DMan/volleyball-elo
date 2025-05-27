from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.player import Player
from database import get_db
from models.session import Session as DbSession
from schemas.session import SessionCreate, PlayerSessionUpdate

router = APIRouter()

@router.post("/")
def start_session(session: SessionCreate, db: Session = Depends(get_db)):
    db_session = DbSession(**session.dict())
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return {'data': db_session}

@router.post("/{session_id}/end")
def end_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(DbSession).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    session.ended = True
    db.commit()
    return {"message": "Session ended"}

@router.post("/{session_id}/players")
def add_player_to_session(session_id: str, update: PlayerSessionUpdate, db: Session = Depends(get_db)):
    session = db.query(DbSession).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    session.players.append(update.player_id)
    db.commit()

@router.get("/{session_id}/players")
def get_players_in_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(DbSession).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    players = []
    for player_id in session.players:
        players.append(db.query(Player).filter_by(id=player_id).first())
    return {"data" : players}

@router.delete("/{session_id}/players/{player_id}")
def remove_player_from_session(session_id: str, player_id: str, db: Session = Depends(get_db)):
    # Logic to remove player
    pass

@router.post("/{session_id}/generate-teams")
def generate_teams(session_id: str, db: Session = Depends(get_db)):
    # Logic to balance teams
    pass

@router.get('/{session_id}')
def get_session_by_id(session_id : str, db : Session = Depends(get_db)):
    db_session = db.query(DbSession).filter_by(id=session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    return {'data' : db_session}

@router.get("/")
def get_all_sessions(db : Session = Depends(get_db)):
    db_sessions = db.query(DbSession).all()
    return {'data' : db_sessions}