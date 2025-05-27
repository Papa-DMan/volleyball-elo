from backend.models.location_player import SessionPlayer
from models.player import Player
def generate_balanced_teams(session_id, db):
    players = (
        db.query(Player)
        .join(SessionPlayer, SessionPlayer.player_id == Player.id)
        .filter(SessionPlayer.session_id == session_id)
        .all()
    )
    players.sort(key=lambda p: p.global_elo, reverse=True)

    team_a = []
    team_b = []
    for i, p in enumerate(players):
        (team_a if i % 2 == 0 else team_b).append(p.id)

    return {"team_a": team_a, "team_b": team_b}