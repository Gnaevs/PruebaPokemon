import { pokeApi } from "./pokeApi";

//Datos para la paginción
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}

export interface PokemonRowResponse {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    abilities: {
        name: string;
    }[];
}


//Resultado
export const getPokemons = async (limit = 5, offset = 0): Promise<PokemonListResponse> => {
    const response = await pokeApi.get<PokemonListResponse>(`pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
};

export const getPokemonRow = async (pokeId = 1): Promise<PokemonRowResponse> => {
    const response = await pokeApi.get<PokemonRowResponse>(`pokemon/${pokeId}`);
    return response.data;
};