import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const images = require.context('./HomeAssets', true);
const imageList = images.keys().map(image => images(image));

const Button = ({ imageSrc, onClick, isActive }) => {
    return (
        <button onClick={onClick} style={{ border: 'none', background: 'transparent', padding: 0 }}>
        <img
          src={imageSrc}
          alt="Button Image"
          style={{ width: '100px', height: '100px', opacity: isActive ? '50%' : '100%' }}
        />
      </button>
    );
  };

  const editDeck = () => {
    return (
      <Link to="/profile">
        <button>
          Edit Deck
        </button>
      </Link>
    );
  };

  const VerticalButtonList = ({ onButtonClick, activeButtonIndex }) => {
    const buttons = [
        { label: 'Button 1', imageSrc: imageList[0] },
        { label: 'Button 2', imageSrc: imageList[1] },
        { label: 'Button 3', imageSrc: imageList[2] },
        { label: 'Button 4', imageSrc: imageList[3] },
        { label: 'Button 5', imageSrc: imageList[4] },
        { label: 'Button 6', imageSrc: imageList[5] },
        { label: 'Button 7', imageSrc: imageList[6] },
        { label: 'Button 8', imageSrc: imageList[7] },];
  
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
  
  const Grid = () => {
    const imageSources = [
      imageList[0],
      imageList[1],
      imageList[2],
      imageList[3],
      imageList[4],
      imageList[5],
      imageList[6],
      imageList[7],
      imageList[0],
      imageList[1],
      imageList[2],
      imageList[3],
      imageList[4],
      imageList[5],
      imageList[6],
    ];

    return (
      <div>
        <Link to="/editdeck">
          <button className="Edit Deck" onClick={editDeck} style={{ marginLeft: '140px',
                                                                    padding: '20px',
                                                                    placeContent: 'center',
                                                                    width: '320px' }}>Edit Deck</button>
        </Link>
      <div className='Grid' style={{  display: 'flex',
                    justifyContent: 'flex-end',
                    marginLeft: '140px' }}>

            <div style={{ display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gridTemplateRows: 'repeat(5, 100px)',
                          gap: '10px' }}>

              {imageSources.map((source, index) => (
                <img key={index}
                src={source}
                alt={`Image ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ))}
            </div>
          </div>
      </div>
    );
  };

  const Home = () => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  
    const handleButtonClick = (index) => {
      setActiveButtonIndex(index);
    };
  
    return (
      <div>
        <h1>Home</h1>
        <div style={{ display: 'flex' }}>
          <VerticalButtonList onButtonClick={handleButtonClick} activeButtonIndex={activeButtonIndex}/>
          <img src={imageList[activeButtonIndex]} style={{ marginLeft: '150px', padding: '50px', width: '800px', placeContent: 'left', height: '800px' }}/>
          <div style={{ display: 'flex', placeContent: 'right' }}>
          <Grid/>
          </div>
        </div>
      </div>
    );
  };
export default Home;