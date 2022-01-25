import { useState, useEffect } from 'react'
import Popup from './Popup'
import {
    PokemonSummary,
    ExtendedPokemonSummary,
} from './interfaces/pokemon-summary.interface'

interface ContainerProps {
    offset: number
    setOffset: (offset: number) => void
    getPokemon: (id?: number | undefined, newOffset?: number) => void
    setPokemonId: React.Dispatch<React.SetStateAction<number>>
    pokemonId: number
    pokemons: ExtendedPokemonSummary[]
}

function Container(props: ContainerProps) {
    const [showPopUp, setShowPopUp] = useState(false)

    const displayPopup = (newPokemonId: number) => {
        props.setPokemonId(newPokemonId)
        setShowPopUp(true)
        console.log(newPokemonId)
    }

    return (
        <>
            <div className="gridContainer">
                {props.pokemons
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
                    getPokemon={props.getPokemon}
                    offset={props.offset}
                    setOffset={props.setOffset}
                    setPokemonId={props.setPokemonId}
                    pokemonId={props.pokemonId}
                    setShowPopUp={setShowPopUp}
                ></Popup>
            ) : null}
        </>
    )
}
export default Container
