from backend.models.player import Player

def update_elo_ratings(game, db):
    # Placeholder: basic ELO logic
    team_a_ids = game.team_a_player_ids
    team_b_ids = game.team_b_player_ids

    winner = game.winner_team

    base_change = 25
    a_change = base_change if winner == 'A' else -base_change
    b_change = -a_change

    for player_id in team_a_ids:
        player = db.query(Player).filter_by(id=player_id).first()
        player.global_elo += a_change

    for player_id in team_b_ids:
        player = db.query(Player).filter_by(id=player_id).first()
        player.global_elo += b_change

    game.elo_updated = True
    db.commit()