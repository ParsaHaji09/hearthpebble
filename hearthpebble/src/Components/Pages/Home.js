import React, { useState } from 'react';
import { CHARACTERS } from '../options/characters';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Grid from './HomeGrid';
import background from "./HomeAssets/forested_mountainbackground.png";

const imagesCharacters = require.context('./HomeAssets/CharacterPics', true)
const imageCharacterList = imagesCharacters.keys().map(image => imagesCharacters(image))

const Button = ({ imageSrc, onClick, isActive }) => {
  return (
      <button onClick={onClick} style={{ border: 'none', background: 'transparent', padding: 0 }}>
      <img src={imageSrc} alt="Button Image"
           style={{width: '100px', height: '100px', opacity: isActive ? '50%' : '100%', border: isActive ? '2px solid blue' : '2px solid gray', cursor: 'pointer', borderRadius: '50%',
            }}
      />
    </button>
  );
};

const HorizontalButtonList = ({ onButtonClick, activeButtonIndex }) => {
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
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
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
  
const Home = () => {
    const [loading, setLoading] = useState(true); 
    const [userData, setUserData] = useState({});
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const prevData = localStorage.getItem("saveData");
      if (!prevData) {
       // navigate('/login');
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
      let characterIndex = "a" + index;
      let characterName = CHARACTERS[characterIndex];
      let temp_deck = []
      if (characterName === "Isolde Frostbloom"){
          temp_deck = userData.frostbloom_deck;
      }
      else if (characterName === "Sir Gideon Stormblade"){
          temp_deck = userData.gideon_deck;
      }
      else{
          temp_deck = userData.gideon_deck;
      }
      try {

          const response = await axios.put(`http://localhost:5000/api/users/${userData._id}`,{
          "id": userData._id,
          "username": userData.username,
          "character": characterName,
          "curr_deck": temp_deck,
          "gideon_deck": userData.gideon_deck,
          "frostbloom_deck": userData.frostbloom_deck,
        })
        setUserData(response.data);
        
        localStorage.setItem('saveData', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    const handleClick = () => {
      navigate('/cardtable')
    }

    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
          {loading ? (
              // Display a loading indicator or message while data is being fetched
              <p>Loading...</p>
            ): (
              <div className='home-body' style={{paddingTop: '70px', display: 'flex', flexDirection: 'row', paddingBottom: '20px'}}>

                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <p style={{paddingRight: '120px', paddingBottom: '20px'}}>
                          <span style={{backgroundColor: '#e1b86b', opacity: '90%'}}>
                            {userData.character}
                          </span>
                      </p>

                      <img className='character-pic' src={imageCharacterList[activeButtonIndex]}/>

                      <HorizontalButtonList onButtonClick={handleButtonClick} activeButtonIndex={activeButtonIndex}/>
                  </div>
                  <div style={{paddingTop: '70px', paddingLeft:'100px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <Grid curr_deck={userData.curr_deck} character={userData.character} />
                      <button onClick={handleClick} style={{backgroundColor: '#e1b86b', // Base color, adjust as needed
                          color: 'white', // Text color
                          fontSize: '20px', // Font size
                          fontWeight: 'bold', // Font weight
                          padding: '25px 30px', // Padding for the button
                          borderRadius: '10px', // Rounded corners
                          border: 'none', // Remove default border
                          height: '75px',
                          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', // Shadow for depth
                          cursor: 'pointer', // Pointer cursor on hover
                          textTransform: 'uppercase', // Uppercase text
                          letterSpacing: '1px', // Slight letter spacing
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',}}>Play Battle</button>
                  </div>
              </div>
          )}
        </div>
    );
};
export default Home;