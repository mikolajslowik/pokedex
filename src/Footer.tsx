interface FooterProps {
    offset: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

function Footer(props: FooterProps) {
    // const nextPage = () => {
    //     console.log('firstNext', props.pokemonId + 1, props.offset)
    //     props.setOffset(props.offset + 16)
    //     props.getPokemon(props.pokemonId + 1, props.offset + 16)
    // }
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
            <div
                className="button next"
                onClick={() => props.setOffset(props.offset + 16)}
            >
                <p>NEXT</p>
            </div>
        </div>
    )
}

export default Footer
