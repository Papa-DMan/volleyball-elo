from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import (
    player_routes, location_routes,
    session_routes, game_routes
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(player_routes.router, prefix="/players", tags=["Players"])
app.include_router(location_routes.router, prefix="/locations", tags=["Locations"])
app.include_router(session_routes.router, prefix="/sessions", tags=["Sessions"])
app.include_router(game_routes.router, prefix="/games", tags=["Games"])

