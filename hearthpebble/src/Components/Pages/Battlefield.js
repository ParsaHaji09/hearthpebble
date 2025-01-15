import {io} from 'socket.io-client'
import './Home.css'
import { useState, useEffect } from 'react'
import Card from './HomeAssets/Card'
import { Canvas } from '@react-three/fiber';
import {RoundedBox} from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

//const socket = io('http://localhost:4000')


const Battlefield = () => {
    return (<div></div>);
    // const [loading, setLoading] = useState(true)
    // const [cardName, setCardName] = useState("")
    // const [userCards, setUserCards] = useState([]);

    // const navigate = useNavigate();
    // const [currentHand, setCurrentHand] = useState([])
    
    // const generateCardsHand = (deck) => {
    //     try{
    //         setUserCards(deck)
    //         let generatedHand = [];
    //         while (generatedHand.length != 5) {
    //             const randomNumber = Math.floor(Math.random() * deck.length) + 1;
    //             if (!generatedHand.includes(deck[randomNumber])) {
    //                 generatedHand.push(deck[randomNumber]);
    //             }
    //         }
    //         setCurrentHand(generatedHand)
    //     }
    //     finally{
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     const prevData = localStorage.getItem("saveData");
    //     if (!prevData) {
    //       navigate('/login');
    //     } else {
    //       const parsedData = JSON.parse(prevData);
    //       generateCardsHand(parsedData.deck)
    //     }
    // }, [navigate]);

    // const handlePlayCard = (updatedCard) => {
    //     console.log("pressed");
    //     socket.emit("play-card", updatedCard)

    //     socket.on("receive-card", cardname => {
    //         console.log("client " + cardname)
    //         setCardName(cardname)
    //     })
    // };

    // return (
    //     <div>
    //       {loading ? (
    //           // Display a loading indicator or message while data is being fetched
    //           <p>Loading...</p>
    //         ): (
    //         <div className='battlefield-body'>
    //             <h1>here at battle field</h1>

    //             <Canvas colorManagement camera={{position: [0,0,20], fov: 70}}>
    //                 <RoundedBox
    //                     args={[100, 100, 100]} // Width, height, depth. Default is [1, 1, 1]
    //                     radius={0.05} // Radius of the rounded corners. Default is 0.05
    //                     smoothness={4} // The number of curve segments. Default is 4
    //                     bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
    //                     creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
    //                 >
    //                     <meshPhongMaterial color="#f3f3f3" />
    //                 </RoundedBox>
    //             </Canvas>

    //             {/*<div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 3fr)', gap: '10px', padding: '20px' }}>*/}
    //             {/*    {currentHand.map((source, index) => (*/}
    //             {/*        <img key={index} onClick={() => handlePlayCard(source)} src={source} alt={`Image ${index + 1}`}style={{ width: '100%', height: '100%', objectFit: 'cover' }} />*/}
    //             {/*    ))}*/}
    //             {/*    */}
    //             {/*</div>*/}
    //         </div>
    //         )}
    //     </div>
    // )
}

export default Battlefield
