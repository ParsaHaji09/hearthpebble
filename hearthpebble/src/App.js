import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./App.css";


import Login from './Components/Pages/Login'
import RegisterForm from './Components/Pages/RegisterForm'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import Battlelog from "./Components/Pages/Battlelog"
import Navbar from "./Components/Navbar";
import Landing from "./Components/Pages/Landing";
import EditDeck from "./Components/Pages/EditDeck";
import Battlefield from "./Components/Pages/Battlefield";

import background from "./Components/Pages/HomeAssets/forested_mountainbackground.png"

function App() {

  const [currentForm, setCurrentForm] = useState("login");
  
  useEffect(() => {

  }, [currentForm])


  return (
    <>
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
        
          <Navbar />
          <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/editdeck" element={<EditDeck />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/battlelog" element={<Battlelog />} />
              <Route path="/battlefield" element={<Battlefield />} />
              
              <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        
      </div>
    </>
    
  );
}

export default App;