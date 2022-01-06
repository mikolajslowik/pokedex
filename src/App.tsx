import { useState, useEffect } from 'react'
// import logo from './logo.svg'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import './App.css'
import {
    PokemonSummary,
    PokemonSummaryResponse,
} from './interfaces/pokemon-summary.interface'
// import { ViewSummary } from './interfaces/pokemon-summary.interface'

import Header from './Header'
import Container from './Container'
import Footer from './Footer'
import PopUp from './PopUp'

function App() {
    const [pokemons, setPokemons] = useState<PokemonSummary[]>([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [offset, setOffset] = useState(0)
    const [pokemon, setPokemon] = useState({} as PokemonSummary)

    useEffect(() => {
        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`
            )
            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                setPokemons(response.data.results)
            })
    }, [offset])

    return (
        <div className="wrapper">
            <Header></Header>
            <Container
                pokemons={pokemons}
                setPokemon={setPokemon}
                setView={setShowPopUp}
            ></Container>
            {showPopUp ? <PopUp pokemon={pokemon} offset={offset} setOffset={setOffset}></PopUp> : null}
            <Footer offset={offset} setOffset={setOffset}></Footer>
        </div>
    )
}

export default App

// https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon
// https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png
/* <Button offset={offset} setOffset={setOffset}> */
