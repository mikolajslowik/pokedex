export interface PokemonSummaryResponse {
    results: any[];
    count: number;
    next: string;
    previous: string;
}

export interface PokemonSummary {
    name: string;
    url: string;
}
