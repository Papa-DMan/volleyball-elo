from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.session import Session as DbSession
from models.session_player import SessionPlayer
from models.player import Player
from uuid import UUID

def create_session(location_id: UUID, db: Session) -> DbSession:
    session = DbSession(location_id=location_id)
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def end_session(session_id: UUID, db: Session):
    session = db.query(DbSession).filter_by(id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    session.ended = True
    db.commit()
    return session

def add_player_to_session(session_id: UUID, player_id: UUID, db: Session):
    # Ensure session exists
    if not db.query(DbSession).filter_by(id=session_id).first():
        raise HTTPException(status_code=404, detail="Session not found")
    # Ensure player exists
    if not db.query(Player).filter_by(id=player_id).first():
        raise HTTPException(status_code=404, detail="Player not found")
    
    association = SessionPlayer(session_id=session_id, player_id=player_id)
    db.add(association)
    db.commit()
    return {"message": "Player added to session"}

def remove_player_from_session(session_id: UUID, player_id: UUID, db: Session):
    deleted = db.query(SessionPlayer).filter_by(session_id=session_id, player_id=player_id).delete()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Player not in session")
    db.commit()
    return {"message": "Player removed from session"}

def get_players_in_session(session_id: UUID, db: Session):
    player_ids = db.query(SessionPlayer.player_id).filter_by(session_id=session_id).all()
    return [pid[0] for pid in player_ids]
