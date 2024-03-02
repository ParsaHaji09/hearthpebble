import {io} from 'socket.io-client'
import './Home.css'
import { useState, useEffect } from 'react'

const socket = io('http://localhost:4000')

socket.on("receive-card", card => {
    
})

const Battlefield = () => {
    const [cardName, setCardName] = useState("")

    const handlePlayCard = (updatedCard) => {
        console.log("pressed");
        socket.emit("play-card", updatedCard);
    };

    return (
        <div className='battlefield-body'>
            <h1>here at battle field</h1>
            <button onClick= {() => handlePlayCard("sword")}>Sword</button>
            <button onClick= {() => handlePlayCard("dagger")}>Dagger</button>
            <h1>{cardName}</h1>
        </div>
    )
}

export default Battlefield
