import { Player, Location, Session, Game, APIResponse, TeamGenerationOptions } from "./types";

async function fetchAPI<T>( endpoint : string, options : RequestInit = {}): Promise<T> {
    const url = `http://127.0.0.1:8000${endpoint}`
    const headers = {
        'Content-Type' : 'application/json',
        ...options.headers,
    }
    const config = {
        ...options, headers,
    }

    try {
        const response = await fetch(url, config)
        if (!response.ok) {
            const error_data = await response.json();
            throw new Error(error_data.message || 'API Request Failed')
        }
        return await response.json()
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
};

export const LocationsAPI = {
    create: (data : Partial<Location>): Promise<APIResponse<Location>> => fetchAPI('/locations', {method : 'POST', body : JSON.stringify(data)}),
    update: (id : string, data : Partial<Location>) : Promise<APIResponse<Location>> => fetchAPI(`/locations/${id}`, {method : 'PUT', body : JSON.stringify(data)}),
    getAll: (): Promise<APIResponse<Location[]>> => fetchAPI('/locations'),
    getById: (id : string) : Promise<APIResponse<Location>> => fetchAPI(`/locations/${id}`)
}

export const PlayersAPI = {
    create: (data : Partial<Player>): Promise<APIResponse<Player>> => fetchAPI('/players', {method : 'POST', body : JSON.stringify(data)}),
    update: (id : string, data : Partial<Player>) : Promise<APIResponse<Player>> => fetchAPI(`/players/${id}`, {method : 'PUT', body : JSON.stringify(data)}),
    getAll: (params? : {active? : boolean}): Promise<APIResponse<Player[]>> => {
        const queryParams = params ? `/?${new URLSearchParams(params as Record<string, string>)}` : '';
        return fetchAPI(`/players${queryParams}`)
    },
    getById: (id : string) : Promise<APIResponse<Player>> => fetchAPI(`/players/${id}`)
}

export const SessionsAPI = {
    create: (data: Partial<Session>): Promise<APIResponse<Session>> => 
    fetchAPI('/sessions/', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    
  end: (id: string): Promise<APIResponse<Session>> => 
    fetchAPI(`/sessions/${id}/end`, { 
      method: 'POST' 
    }),
    
  addPlayer: (sessionId: string, playerId: string): Promise<APIResponse<Session>> => 
    fetchAPI(`/sessions/${sessionId}/players/`, { 
      method: 'POST', 
      body: JSON.stringify({ playerId }) 
    }),
    
  removePlayer: (sessionId: string, playerId: string): Promise<APIResponse<Session>> => 
    fetchAPI(`/sessions/${sessionId}/players/${playerId}`, { 
      method: 'DELETE' 
    }),
    
  getAll: (params?: { active?: boolean }): Promise<APIResponse<Session[]>> => {
    const queryParams = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
    return fetchAPI(`/sessions/${queryParams}`);
  },
    
  getById: (id: string): Promise<APIResponse<Session>> => 
    fetchAPI(`/sessions/${id}`),
    
  generateTeams: (sessionId: string, options: TeamGenerationOptions): Promise<APIResponse<Session>> => 
    fetchAPI(`/sessions/${sessionId}/generate-teams`, { 
      method: 'POST', 
      body: JSON.stringify(options) 
    }),
};

export const GamesAPI = {
  create: (data: Partial<Game>): Promise<APIResponse<Game>> => 
    fetchAPI('/games/', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
    
  getActive: (): Promise<APIResponse<Game[]>> => 
    fetchAPI('/games/active/'),
    
  getAll: (): Promise<APIResponse<Game[]>> => 
    fetchAPI('/games/'),
    
  getById: (id: string): Promise<APIResponse<Game>> => 
    fetchAPI(`/games/${id}`),
};

export default {
  Locations: LocationsAPI,
  Players: PlayersAPI,
  Sessions: SessionsAPI,
  Games: GamesAPI,
};