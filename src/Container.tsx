import { PokemonSummary } from './interfaces/pokemon-summary.interface'

interface ContainerProps {
    pokemons: PokemonSummary[]
    setPokemons: React.Dispatch<React.SetStateAction<PokemonSummary[]>>
    children: any
}

function Container(props: ContainerProps) {
    return (
        <div className="gridContainer">
            {props.children}
            {props.pokemons.map((pokemon: any) => {
                const idSource = pokemon.url.split('/')
                const id = idSource[idSource.length - 2]
                return (
                    <div className="pokemon" key={id}>
                        <img
                            className="image"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                            alt=""
                        />
                        <p className="name">{pokemon.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default Container
