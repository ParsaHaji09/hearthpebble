import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./index.css";
import "./App.css";


import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import Profile from './Components/Profile'
import Battlelog from "./Components/Battlelog"
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  
  useEffect(() => {

  }, [currentForm])


  return (
    <>
      <div>
        
          <Navbar />
          <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/battlelog" element={<Battlelog />} />
              <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        
      </div>
    </>
    
  );
}

export default App;