import { useState, useEffect } from 'react'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'

function App() {
    const [offset, setOffset] = useState(0)

    return (
        <div className="wrapper">
            <Header></Header>
            <Container offset={offset} setOffset={setOffset}></Container>

            <Footer offset={offset} setOffset={setOffset}></Footer>
        </div>
    )
}

export default App
