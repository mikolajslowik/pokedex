import { PokemonSummary } from './interfaces/pokemon-summary.interface'
import { useState, useEffect } from 'react'

interface ContainerProps {
    pokemons: PokemonSummary[]
    setView: React.Dispatch<React.SetStateAction<boolean>>
    setPokemon: React.Dispatch<React.SetStateAction<PokemonSummary>>
}

function Container(props: ContainerProps) {
    const popup = (pokemon: PokemonSummary) => {
        props.setView(true)
        props.setPokemon(pokemon)
    }

    return (
        <div className="gridContainer">
            {props.pokemons.map((pokemon: any) => {
                const idSource = pokemon.url.split('/')
                const id = idSource[idSource.length - 2]
                
                return (
                    <button
                        className="pokemon"
                        onClick={() => {
                            const extendedPokemon = { ...pokemon, id }
                            popup(extendedPokemon)
                        }}
                        key={id}
                    >
                        <div>
                            <img
                                className="image"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                alt={pokemon.name}
                            />
                            <p className="name">{pokemon.name}</p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
export default Container
