import { useState, useEffect } from 'react'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'
import { AxiosResponse } from 'axios'
import axios from 'axios'
import {
    ExtendedPokemonSummary,
    PokemonSummary,
    PokemonSummaryResponse,
} from './interfaces/pokemon-summary.interface'

function App() {
    const [cachedOffset, setCachedOffset] = useState(new Set())
    const [offset, setOffset] = useState(0)
    const [pokemonId, setPokemonId] = useState(1)
    const [pokemons, setPokemons] = useState<ExtendedPokemonSummary[]>([])
    const [pokemonsAmount, setPokemonsAmount] = useState(0)

    useEffect(() => {
        getPokemon()
    }, [])

    useEffect(() => {
        getPokemonsAmount()
    }, [])

    const getPokemon = (id?: number, newOffset = offset) => {
        if (cachedOffset.has(newOffset)) {
            console.log('returning', offset, newOffset)
            return
        }

        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${newOffset}`
            )
            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                normalizePokemons(response.data.results)
                setCachedOffset(new Set([...cachedOffset, newOffset]))

                if (typeof id !== 'undefined') {
                    setPokemonId(id)
                }
            })
    }

    const getPokemonsAmount = () => {
        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=16&offset=16`
            )
            .then((response: AxiosResponse<PokemonSummaryResponse>) =>
                setPokemonsAmount(response.data.count)
            )
    }

    console.log(pokemonsAmount)

    const normalizePokemons = (rawPokemons: PokemonSummary[]) => {
        const normalizedPokemons = rawPokemons.map(
            (rawPokemon: PokemonSummary) => {
                const idSource = rawPokemon.url.split('/')
                const id = Number(idSource[idSource.length - 2])
                return { ...rawPokemon, id }
            }
        )
        console.log(rawPokemons, normalizedPokemons)
        setPokemons([...pokemons, ...normalizedPokemons])
    }

    return (
        <div className="wrapper">
            <Header></Header>
            <Container
                offset={offset}
                setOffset={setOffset}
                getPokemon={getPokemon}
                setPokemonId={setPokemonId}
                pokemonId={pokemonId}
                pokemons={pokemons}
                pokemonsAmount={pokemonsAmount}
            ></Container>

            <Footer
                offset={offset}
                setOffset={setOffset}
                pokemonId={pokemonId}
                getPokemon={getPokemon}
                // pokemonsAmount={pokemonsAmount}
            ></Footer>
        </div>
    )
}

export default App
