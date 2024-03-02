import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { CHARACTERS } from '../options/characters';
import { CARDS2 } from '../options/cards';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const imagesCharacter = require.context('./HomeAssets/CharacterPics', true)
const imageCharacterList = imagesCharacter.keys().map(image => imagesCharacter(image))

const imagesCards = require.context('./HomeAssets/CardPics', true)
const imageCardlist = imagesCards.keys().map(image => imagesCards(image))


const Button = ({ imageSrc, onClick, isActive }) => {
  return (
      <button onClick={onClick} style={{ border: 'none', background: 'transparent', padding: 0 }}>
      <img src={imageSrc} alt="Button Image" style={{ width: '100px', height: '100px', opacity: isActive ? '50%' : '100%' }}
      />
    </button>
  );
};

const editDeck = () => {
  return (
    <Link to="/profile"> Edit Deck </Link>
  );
};


const VerticalButtonList = ({ onButtonClick, activeButtonIndex }) => {
  const buttons = [
      { label: 'Button 1', imageSrc: imageCharacterList[0] },
      { label: 'Button 2', imageSrc: imageCharacterList[1] },
      { label: 'Button 3', imageSrc: imageCharacterList[2] },
      { label: 'Button 4', imageSrc: imageCharacterList[3] },
      { label: 'Button 5', imageSrc: imageCharacterList[4] },
      { label: 'Button 6', imageSrc: imageCharacterList[5] },
      ];

  return (
    <div style={{display: 'flex'}}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {buttons.map((button, index) => (
        <Button
          key = {index}
          imageSrc={button.imageSrc}
          onClick = {() => onButtonClick(index)}
            isActive = {activeButtonIndex === index}
        />
      ))}
    </div>
    </div>
  );
};
  
const Grid = (obj) => {
  
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
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
    const correspondingIndexes = findIndicesByValues(obj.deck)
    console.log(correspondingIndexes)
    const correspondingCards = correspondingIndexes.map(index => imageCardlist[index])
    
    setUserCards(correspondingCards)
  }, [obj.deck])

    return (
      <div>
        <div className='right-side'>
          <Link to="/editdeck">
            <button className="Edit Deck" onClick={editDeck} style={{ padding: '20px', placeContent: 'center', width: '320px' }}>Edit Deck</button>
          </Link>
          <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(5, 100px)', gap: '10px' }}>
                {userCards.map((source, index) => (
                  <img key={index} src={source} alt={`Image ${index + 1}`}style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ))}
          </div>
        </div>
      </div>
    );
  };


  
const Home = () => {
    const [loading, setLoading] = useState(true); 
    const [userData, setUserData] = useState({});
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const prevData = localStorage.getItem("saveData");
      if (!prevData) {
        navigate('/login');
      } else {
        const parsedData = JSON.parse(prevData);
        getUser(parsedData._id);
        
      }
    }, [navigate]);
  
    const getUser = async (uid) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${uid}`);
        // console.log(response.data); // Handle the response from the server
        setUserData(response.data);
      } catch (error) {
        console.error('Error getting user data:', error);
      }
      finally {
        setLoading(false); // Set loading to false once data is fetched or if an error occurs
      }
    };

    const handleButtonClick = async(index) => { 
      setActiveButtonIndex(index); 
      let characterIndex = "a" + index
      try {
        const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`,{
          "id": userData._id,
          "username": userData.username,
          "character": CHARACTERS[characterIndex],
          "deck": userData.deck
        })
        setUserData(response.data);
        
        localStorage.setItem('saveData', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    const handleClick = () => {
      navigate('/battlefield')
    }
    return (
        <div>
          {loading ? (
              // Display a loading indicator or message while data is being fetched
              <p>Loading...</p>
            ): (
              <div className= 'home-body' style={{ display: 'flex' }}>
                <VerticalButtonList onButtonClick={handleButtonClick} activeButtonIndex={activeButtonIndex}/>
                <img src={imageCharacterList[activeButtonIndex]} style={{ marginLeft: '0px', paddingLeft: '50px', paddingRight: '50px', width: '60vw', placeContent: 'left', height: '800px' }}/>
                <div>
                  <p>{userData.character}</p>
                  <Grid deck = {userData.deck}/>
                  <button onClick={handleClick}>Play Battle</button>
                </div>
              </div>
            )}
        </div>
    );
  };
export default Home;