import {io} from 'socket.io-client'
import './Home.css'
import { useState, useEffect } from 'react'
import { CARDS2 } from '../options/cards'

const socket = io('http://localhost:4000')


const Battlefield = () => {
    const [cardName, setCardName] = useState("")
    const [userCards, setUserCards] = useState([]);
    
    function findIndicesByValues(valueList) {
        const indices = []
        valueList.forEach(element => {
          const index = CARDS2.indexOf(element)
          if(index !== -1){
            indices.push(index)
          }
        });
        return indices;
    }
    
    const getUser = async (uid) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
            // console.log(response.data); // Handle the response from the server
            setUserData(response.data);
            findIndicesByValues(response.data.deck)
            const correspondingIndexes = findIndicesByValues(response.data.deck)
            const correspondingCards = correspondingIndexes.map(index => imagesCardsList[index])
            setUserCards(correspondingCards)
            setAllCards(allCards.filter(card => !correspondingCards.includes(card)))
        } catch (error) {
          console.error('Error getting user data:', error);
        }
        finally {
          setLoading(false); // Set loading to false once data is fetched or if an error occurs
        }
    };
    
    useEffect(() => {
        const prevData = localStorage.getItem("saveData");
        if (!prevData) {
          navigate('/login');
        } else {
          const parsedData = JSON.parse(prevData);
          getUser(parsedData._id);
        }
    }, [navigate]);

    const handlePlayCard = (updatedCard) => {
        console.log("pressed");
        socket.emit("play-card", updatedCard)

        socket.on("receive-card", cardname => {
            console.log("client " + cardname)
            setCardName(cardname)
        })
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
