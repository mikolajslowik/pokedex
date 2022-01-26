interface FooterProps {
    offset: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
    pokemonId: number
    // pokemonsAmount: number
    getPokemon: (id?: number | undefined, newOffset?: number) => void
}

function Footer(props: FooterProps) {
    const nextPage = () => {
        // if ( === ) {
        //     return
        // } else {
        props.setOffset(props.offset + 16)
        props.getPokemon(props.pokemonId + 1, props.offset + 16)
    }

    return (
        <div className="buttonContainer">
            <div
                className="button previous"
                onClick={() =>
                    props.offset === 0
                        ? null
                        : props.setOffset(props.offset - 16)
                }
            >
                <p>PREVIOUS</p>
            </div>
            <div className="button next" onClick={nextPage}>
                <p>NEXT</p>
            </div>
        </div>
    )
}

export default Footer
