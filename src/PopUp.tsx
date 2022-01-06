import { PokemonSummary } from './interfaces/pokemon-summary.interface'

interface PopUpProps {
    pokemon: PokemonSummary
    offset: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

function PopUp(props: PopUpProps) {
    const idSource = props.pokemon.url.split('/')
    const id = idSource[idSource.length - 2]
    let pokemonNumber = Number(id)

    const previousPokemon = () => {
        props.setOffset(props.offset - 1)
        props.pokemon.id = Number(id) - 1
    }

    return (
        <div className="popUpContainer">
            <button className="previousPokemon" onClick={previousPokemon}>
                {'<'}
            </button>
            <div className="pokemonData">
                <img
                    className="pokemonImg"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon?.id}.png`}
                    alt=""
                ></img>
                <div className="pokemonData"></div>
            </div>
            <button className="nextPokemon">{'>'}</button>
        </div>
    )
}

export default PopUp
