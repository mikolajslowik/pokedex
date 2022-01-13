export interface PokemonSummaryResponse {
    results: any[]
    count: number
}

export interface PokemonSummary {
    name: string
    url: string
}

export interface ExtendedPokemonSummary extends PokemonSummary {
    id: number
}

export interface WievProps {
    view: boolean
    setView: React.Dispatch<React.SetStateAction<boolean>>
}
