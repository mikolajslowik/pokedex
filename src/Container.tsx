import { useState, useEffect } from 'react'
import PopUpNewIdea from './PopUpNewIdea'
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
    const [pokemon, setPokemon] = useState({} as ExtendedPokemonSummary)
    const [pokemons, setPokemons] = useState<ExtendedPokemonSummary[]>([])
    const [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        axios
            .get<PokemonSummaryResponse>(
                `https://pokeapi.co/api/v2/pokemon?limit=16&offset=${props.offset}`
            )
            .then((response: AxiosResponse<PokemonSummaryResponse>) => {
                normalizePokemons(response.data.results)
            })
    }, [props.offset])

    const displayPopup = (pokemon: ExtendedPokemonSummary) => {
        setPokemon(pokemon)
        setShowPopUp(true)
    }

    function selectPokemon(id: number) {
        const foundPokemon = pokemons.find((pokemon) => {
            return pokemon.id === id
        }) as ExtendedPokemonSummary
        setPokemon(foundPokemon)
    }

    function normalizePokemons(rawPokemons: PokemonSummary[]) {
        const normalizedPokemons = rawPokemons.map(
            (rawPokemon: PokemonSummary) => {
                const idSource = rawPokemon.url.split('/')
                const id = Number(idSource[idSource.length - 2])
                return { ...rawPokemon, id }
            }
        )
        setPokemons(normalizedPokemons)
    }
    return (
        <>
            <div className="gridContainer">
                {pokemons.map((pokemon: any) => {
                    return (
                        <button
                            className="pokemon"
                            onClick={() => {
                                displayPopup(pokemon)
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
                <PopUpNewIdea
                    setPokemonId={(id: number) => selectPokemon(id)}
                    pokemonId={pokemon.id}
                    setShowPopUp={setShowPopUp}
                ></PopUpNewIdea>
            ) : null}
        </>
    )
}
export default Container
