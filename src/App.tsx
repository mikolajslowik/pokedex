import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios, { AxiosResponse } from 'axios'
import {
    PokemonSummary,
    PokemonSummaryResponse,
} from './interfaces/pokemon-summary.interface'

function App() {
    const [pokemons, setPokemons] = useState<PokemonSummary[]>([])

    useEffect(() => {
        axios
            .get<PokemonSummaryResponse>(
                'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
            )
            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                setPokemons(response.data.results)
                console.log(response.data)
            })
    }, [])

    return (
        <div>
            {pokemons.map((pokemon: PokemonSummary) => (
                <div>{pokemon.name}</div>
            ))}
        </div>
    )
}

export default App
