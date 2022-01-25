import { useState, useEffect } from 'react'
import Popup from './Popup'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import {
    ExtendedPokemonSummary,
    PokemonSummary,
    PokemonSummaryResponse,
} from './interfaces/pokemon-summary.interface'

interface ContainerProps {
    offset: number
    setOffset: (offset: number) => void
}

function Container(props: ContainerProps) {
    const [pokemonId, setPokemonId] = useState(1)
    const [pokemons, setPokemons] = useState<ExtendedPokemonSummary[]>([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [cachedOffset, setCachedOffset] = useState(new Set())

    useEffect(() => {
        getPokemon()
    }, [])

    const getPokemon = (id?: number, newOffset = props.offset) => {
        if (cachedOffset.has(newOffset)) {
            console.log('returning', props.offset, newOffset)
            return
        }

        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${newOffset}`
            )
            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                normalizePokemons(response.data.results)
                setCachedOffset(new Set([...cachedOffset, newOffset]))
                console.log(typeof id)

                if (typeof id !== 'undefined') {
                    setPokemonId(id)
                }
            })
    }

    const displayPopup = (newPokemonId: number) => {
        setPokemonId(newPokemonId)
        setShowPopUp(true)
        console.log(newPokemonId)
    }

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
        <>
            <div className="gridContainer">
                {pokemons
                    .slice(props.offset, props.offset + 16)
                    .map((pokemon: any) => {
                        return (
                            <button
                                className="pokemon"
                                onClick={() => {
                                    displayPopup(pokemon.id)
                                }}
                                key={pokemon.id}
                            >
                                <div>
                                    <img
                                        className="image"
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                        alt={pokemon.name}
                                    />
                                    <p className="name">{pokemon.name}</p>
                                </div>
                            </button>
                        )
                    })}
            </div>
            {showPopUp ? (
                <Popup
                    getPokemon={getPokemon}
                    offset={props.offset}
                    setOffset={props.setOffset}
                    setPokemonId={setPokemonId}
                    pokemonId={pokemonId}
                    setShowPopUp={setShowPopUp}
                ></Popup>
            ) : null}
        </>
    )
}
export default Container
