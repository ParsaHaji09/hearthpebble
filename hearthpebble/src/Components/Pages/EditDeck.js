import './Home.css'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { GIDEONCARDS, FROSTBLOOMCARDS } from "../options/cards";

const imagesGideonCards = require.context('../../../public/Assets/GideonCards', true);
const imagesFrostbloomCards = require.context('../../../public/Assets/FrostbloomCards', true);

const gideonImageList = imagesGideonCards.keys().map(image => imagesGideonCards(image));
const frostbloomImageList = imagesFrostbloomCards.keys().map(image => imagesFrostbloomCards(image));

const EditDeck = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState([]);
  const [allCards, setAllCards] = useState([]);

  function findIndicesByValues(valueList, cardList) {
    const indices = [];
    valueList.forEach(element => {
      const index = cardList.indexOf(element);
      if (index !== -1) {
        indices.push(index);
      }
    });
    return indices;
  }

  const filterCardsByCharacter = (character) => {
    if (character === "Sir Gideon Stormblade") {
      return gideonImageList;
    } else if (character === "Isolde Frostbloom") {
      return frostbloomImageList;
    } else {
      return [];
    }
  };

  const getUser = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
      setUserData(response.data);
      const cardList = response.data.character === "Sir Gideon Stormblade" ? GIDEONCARDS : FROSTBLOOMCARDS;
      const correspondingIndexes = findIndicesByValues(response.data.curr_deck, cardList);
      const correspondingCards = correspondingIndexes.map(index => (response.data.character === "Sir Gideon Stormblade" ? gideonImageList : frostbloomImageList)[index]);
      setUserCards(correspondingCards);
      const filteredCards = filterCardsByCharacter(response.data.character).filter(card => !correspondingCards.includes(card));
      setAllCards(filteredCards);
    } catch (error) {
      console.error('Error getting user data:', error);
    } finally {
      setLoading(false);
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
      const cardList = userData.character === "Sir Gideon Stormblade" ? gideonImageList : frostbloomImageList;
      return correspondingCards.map(card => cardList.indexOf(card)).filter(index => index !== -1);
    }

    function findValuesByIndex(indexList) {
      const cardList = userData.character === "Sir Gideon Stormblade" ? GIDEONCARDS : FROSTBLOOMCARDS;
      return indexList.map(key => cardList[key]).filter(Boolean);
    }

    const indices = mapCardsToIndices(userCards);
    const cardNames = findValuesByIndex(indices);

    try {
      console.log('userData:', userData);
      console.log('cardNames:', cardNames);
    
      const updatedData = {
        id: userData._id,
        username: userData.username,
        character: userData.character,
        curr_deck: cardNames,
        gideon_deck: userData.character === "Isolde Frostbloom" ? userData.gideon_deck : cardNames,
        frostbloom_deck: userData.character === "Isolde Frostbloom" ? cardNames : userData.frostbloom_deck,
      };
    
      console.log('Updated Data:', updatedData);
    
      const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`, updatedData);
    
      setUserData(response.data);
      localStorage.setItem('saveData', JSON.stringify(response.data));
      navigate('/home');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleImageClick = (imageUrl) => {
    if (userCards.length < 15 && !userCards.includes(imageUrl)) {
      setUserCards(prevList => [...prevList, imageUrl]);
      setAllCards(allCards.filter(card => card !== imageUrl));
    } else {
      alert('Error.');
    }
  };

  const handleTakeoutImageClick = (imageUrl) => {
    setUserCards(userCards.filter(card => card !== imageUrl));
    setAllCards(prevList => {
      const newList = [...prevList, imageUrl];
      return newList.sort((a, b) => {
        const cardList = userData.character === "Sir Gideon Stormblade" ? gideonImageList : frostbloomImageList;
        return cardList.indexOf(a) - cardList.indexOf(b);
      });
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="editdeck-body" style={{ display: 'flex' }}>
          <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(5, 200px)', gap: '10px', padding: '20px', position: 'relative' }}>
            {userCards.map((source, index) => (
              <img key={index} onClick={() => handleTakeoutImageClick(source)} src={source} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ))}
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              <button onClick={handleSave} style={{
                backgroundColor: '#e1b86b',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '25px 30px',
                borderRadius: '10px',
                border: 'none',
                height: '75px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
              }}>Save Changes</button>
            </div>
          </div>
          <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(10, 200px)', gap: '10px', padding: '20px' }}>
            {allCards.map((source, index) => (
              <img key={index} onClick={() => handleImageClick(source)} src={source} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeck;