import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
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

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  
  useEffect(() => {

  }, [currentForm])


  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/battlelog" element={<Battlelog />} />
              <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </Router>
      </div>
    </>
    
  );
}

export default App;