import React, { useState } from 'react';
import './Home.css';
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
    );
  };
  
  const Home = () => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  
    const handleButtonClick = (index) => {
      setActiveButtonIndex(index);
    };
  
    return (
      <div>
        <h1>Home</h1>
        <VerticalButtonList onButtonClick={handleButtonClick} activeButtonIndex={activeButtonIndex} />
      </div>
    );
  };
export default Home;