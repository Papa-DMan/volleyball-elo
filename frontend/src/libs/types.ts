export interface Player {
    id : string;
    name : string;
}

export interface LocationPlayer {
    location_id : string;
    id : string;
    elo : number;
    active : boolean;
}

export enum PlayerPreferenceType {
    PREFER,
    AVOID   
}

export interface PlayerPreference {
    id : string;
    player_id : string;
    target_player_id : string;
    preference : PlayerPreferenceType
}

export interface PlayerLocationElo {
    id : string;
    player_id : string;
    location_id : string;
    elo_rating : number;
    last_updated : string;
}

export interface Location {
    id : string;
    name : string;
    address : string;
    created_at : string;
}

export interface Game {
    id : string;
    location_id : string;
    datetime : string;
    team_a_player_ids : string[];
    team_b_player_ids : string[];
    winner_team : string;
    elo_updated : boolean;
    created_at : string;
}

export interface Team {
    id : string
    name : string
    player_ids : string[]
    team_elo : number
}

export interface Session {
    id : string
    location_id : string
    start_time : string
    end_time? : string
    num_courts : number
    status : 'active' | 'ended'
    players : Player[]
}

export interface APIResponse<T> { 
    data : T
    success : boolean;
    message? : string
}

// export interface PaginatedResponse<T> {
//     data : T[];
//     total_count : number
//     page : number
//     page_size : number
//     total_pages : number
// }

export interface TeamGenerationOptions {
    balance_by_elo : boolean
    consider_player_prefs : boolean
    number_of_teams : number
}