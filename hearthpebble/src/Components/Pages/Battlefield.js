import {io} from 'socket.io-client'
import './Home.css'
import { useState, useEffect } from 'react'

const socket = io('http://localhost:4000')


const Battlefield = () => {
    const [cardName, setCardName] = useState("")

    const handlePlayCard = (updatedCard) => {
        console.log("pressed");
        socket.emit("play-card", updatedCard)

        socket.on("receive-card", cardname => {
            console.log("client " + cardname)
            setCardName(cardname)
        })
    };

    const generateNumbers = () => {
        let generatedNumbers = [];
        while (generatedNumbers.length != 5) {
          const randomNumber = Math.floor(Math.random() * 15) + 1;
          if (!generatedNumbers.includes(randomNumber)) {
            generatedNumbers.push(randomNumber);
          }
        }
        setCardName(generatedNumbers);
    };

    return (
        <div className='battlefield-body'>
            <h1>here at battle field</h1>
            <button onClick= {() => handlePlayCard("sword")}>Sword</button>
            <button onClick= {() => handlePlayCard("dagger")}>Dagger</button>
            <button onClick= {() => generateNumbers()}>New Cards</button>
            <h1>{cardName}</h1>
        </div>
    )
}

export default Battlefield
