import { useState, useEffect } from 'react'
// import logo from './logo.svg'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import './App.css'
import {
    PokemonSummary,
    PokemonSummaryResponse,
} from './interfaces/pokemon-summary.interface'

import Header from './Header'
import Container from './Container'
import Footer from './Footer'

function App() {
    const [pokemons, setPokemons] = useState<PokemonSummary[]>([])
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`
            )

            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                setPokemons(response.data.results)
                // console.log(response.data)
            })
    }, [offset])

    return (
        <div className="wrapper">
            <Header></Header>
            <Container pokemons={pokemons} setPokemons={setPokemons}>
                cos tam
            </Container>
            <Footer offset={offset} setOffset={setOffset}></Footer>
        </div>
    )
}

export default App

// https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon
// https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png
/* <Button offset={offset} setOffset={setOffset}> */
