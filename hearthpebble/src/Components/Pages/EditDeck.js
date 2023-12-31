import './Home.css'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { CARDS } from '../options/cards';

const imagesCards = require.context('./HomeAssets/CardPics', true)
const imagesCardsList = imagesCards.keys().map(image => imagesCards(image))


function EditDeck() {
    
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [userCards, setUserCards] = useState([]);
    const [allCards, setAllCards] = useState(imagesCardsList);

    function findKeysByValues(valueList) {
        return Object.keys(CARDS).filter(key => valueList.includes(CARDS[key]));
    }
    function convertStringsToInts(stringList) {
        return stringList.map(str => parseInt(str.slice(1)));
    }

    const getUser = async (uid) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
            // console.log(response.data); // Handle the response from the server
            setUserData(response.data);
            const correspondingKeys = findKeysByValues(response.data.deck)
            const correspondingIndexes = convertStringsToInts(correspondingKeys)
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

    
    const handleSave = async () => {
            function mapCardsToIndices(correspondingCards) {
                return correspondingCards.map(card => imagesCardsList.indexOf(card)).filter(index => index !== -1);
            }
          // Function to find values by keys
            function findValuesByKeys(keyList) {
                return keyList.map(key => CARDS[key]).filter(Boolean); // Using filter(Boolean) to remove any undefined values
            }

            // Function to convert integers to strings with a prefix
            function convertIntsToStrings(intList) {
                return intList.map(int => "c" + int); // Adding "a" prefix to each integer
            }
          const indices = mapCardsToIndices(userCards)
          const getKeys = convertIntsToStrings(indices)
          const cardNames = findValuesByKeys(getKeys)

          try {
            const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`,{
              "id": userData._id,
              "username": userData.username,
              "character": userData.character,
              "deck": cardNames
            })
            setUserData(response.data);
            
            localStorage.setItem('saveData', JSON.stringify(response.data));
            navigate('/home')
          } catch (error) {
            console.error('Error updating user data:', error);
          }
    }
    
    const handleImageClick = (imageUrl) => {
        if (userCards.length < 15 && !userCards.includes(imageUrl)) { // Check if the list length is less than 15
            setUserCards(prevList => [...prevList, imageUrl]);
            setAllCards(allCards.filter(card => card != imageUrl))
        } else {
            alert('Error.');
        }
    };

    const handleTakeoutImageClick = (imageUrl) => {
        setUserCards(userCards.filter(card => card != imageUrl))
    };

    return (
        <div>
          {loading ? (
              // Display a loading indicator or message while data is being fetched
              <p>Loading...</p>
            ): (
            <div className="editdeck-body" style={{ display: 'flex',}}>
                
                <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 3fr)', gridTemplateRows: 'repeat(5, 200px)', gap: '10px', padding: '20px' }}>
                    {userCards.map((source, index) => (
                        <img key={index} onClick={() => handleTakeoutImageClick(source)} src={source} alt={`Image ${index + 1}`}style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ))}
                    <button onClick={handleSave}>Save Changes</button>
                </div>
                
                <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 3fr)', gridTemplateRows: 'repeat(10, 200px)', gap: '10px', padding: '20px' }}>
                    {allCards.map((source, index) => (
                        <img key={index} onClick={() => handleImageClick(source)} src={source} alt={`Image ${index + 1}`}style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ))}
                </div>
            </div>
            )}
        </div>
      );
}
export default EditDeck;