import { useState, useEffect } from 'react'
import axios from 'axios'

interface PopUpProps {
    pokemonId: number
    setPokemonId: (id: number) => void
    setShowPopUp: (show: boolean) => void
    offset: number
    setOffset: (offset: number) => void
    getPokemon: (id?: number, offset?: number) => void
    pokemonsAmount: number
}

function Popup(props: PopUpProps) {
    const [details, setDetails] = useState<any>()
    const [abilities, setAbilities] = useState<any>()

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemonId}/`)
            .then((response) => {
                setDetails(response.data)
            })
    }, [props.pokemonId])

    const previousPokemon = () => {
        if ((props.pokemonId - 1) % 16 === 0) {
            props.setOffset(props.offset - 16)
            props.getPokemon(props.pokemonId - 1, props.offset - 16)
        }
        props.setPokemonId(props.pokemonId - 1)
    }

    const nextPokemon = () => {
        if (props.pokemonId % 16 === 0) {
            props.setOffset(props.offset + 16)
            props.getPokemon(props.pokemonId + 1, props.offset + 16)
        } else {
            props.setPokemonId(props.pokemonId + 1)
        }
    }

    return (
        <div className="popUpContainer">
            <div className="popupBackground"> </div>
            <button
                className="closePopUp"
                onClick={() => props.setShowPopUp(false)}
            >
                x
            </button>
            <button
                className={
                    'previousPokemon ' +
                    (props.pokemonId === 1 ? 'disabled' : '')
                }
                onClick={previousPokemon}
            >
                {'<'}
            </button>
            <div className="pokemonData">
                <div className="pokemonImgContainer">
                    <img
                        className="pokemonImg"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemonId}.png`}
                        alt=""
                    ></img>
                </div>
                <div className="selectContainer">
                    <label htmlFor="chooseData">Choose a skill:</label>
                    <select id="chooseData">
                        <option value="">attack</option>
                        <option value="">defence</option>
                        <option value="">health points</option>
                    </select>
                </div>
                <div className="pokemonInfo">
                    <ul>
                        {details?.abilities.map((data: any) => {
                            return (
                                <li key={data.ability.name}>
                                    {data.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <button
                className={
                    'nextPokemon ' +
                    (props.pokemonId === props.pokemonsAmount ? 'disabled' : '')
                }
                onClick={nextPokemon}
            >
                {'>'}
            </button>
        </div>
    )
}

export default Popup
