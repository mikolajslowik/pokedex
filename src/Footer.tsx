interface FooterProps {
    offset: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

function Footer(props: FooterProps) {
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
