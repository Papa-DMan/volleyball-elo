-- Skip this if you're already in the `volleyball_dev` database
CREATE DATABASE volleyball_dev;

\c volleyball_dev

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    global_elo FLOAT DEFAULT 1000,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE player_location_elo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    elo_rating FLOAT DEFAULT 1000,
    last_updated TIMESTAMPTZ DEFAULT now(),
    UNIQUE(player_id, location_id)
);

CREATE TYPE preference_type AS ENUM ('prefer', 'avoid');

CREATE TABLE player_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    target_player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    preference_type preference_type NOT NULL,
    UNIQUE(player_id, target_player_id)
);

CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    datetime TIMESTAMPTZ NOT NULL DEFAULT now(),
    team_a_player_ids UUID[] NOT NULL,
    team_b_player_ids UUID[] NOT NULL,
    winner_team TEXT CHECK (winner_team IN ('A', 'B')),
    elo_updated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);
