import { useState, useEffect } from 'react'
import axios from 'axios'

interface PopUpProps {
    pokemonId: number
    setPokemonId: (id: number) => void
    setShowPopUp: (show: boolean) => void
}

function Popup(props: PopUpProps) {
    const [details, setDetails] = useState<any>()

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemonId}/`)
            .then((response) => {
                setDetails(response.data)
            })
    }, [props.pokemonId])

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
                className="previousPokemon"
                onClick={() => props.setPokemonId(props.pokemonId - 1)} // dodać disabled na index 0
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
                    <label htmlFor="chooseData">Choose a car:</label>
                    <select id="chooseData">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
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
                className="nextPokemon"
                onClick={() => props.setPokemonId(props.pokemonId + 1)}
            >
                {'>'}
            </button>
        </div>
    )
}

export default Popup
