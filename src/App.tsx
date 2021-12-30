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
    const [offset, setOffset] = useState<number>(0)

    useEffect(() => {
        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
            )

            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                setPokemons(response.data.results)
                console.log(response.data)
            })
    }, [offset])

    return (
        <div>
            {pokemons.map((pokemon: PokemonSummary) => {
                const idSource = pokemon.url.split('/')
                const id = idSource[idSource.length - 2]
                // console.log(id)
                return (
                    <div className="pokemon" key={id}>
                        <img
                            className="image"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                            alt=""
                        />
                        <p className="name">{pokemon.name}</p>
                    </div>
                )
            })}
            <div className="wrapper">
                <div onClick={() => setOffset(offset - 20)}> {'<'} </div>
                <div onClick={() => setOffset(offset + 20)}> {'>'} </div>
            </div>
        </div>
    )
}

export default App

// https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon
// https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png
/* <Button offset={offset} setOffset={setOffset}> */
