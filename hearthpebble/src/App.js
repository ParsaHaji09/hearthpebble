import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./index.css";
import "./App.css";


import Login from './Components/Pages/Login'
import RegisterForm from './Components/Pages/RegisterForm'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import Battlelog from "./Components/Pages/Battlelog"
import Navbar from "./Components/Navbar";
import Landing from "./Components/Pages/Landing";
import EditDeck from "./Components/Pages/EditDeck";
import UsersList from "./Components/users/UsersList";
import EditUser from "./Components/users/EditUser";

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
              <Route path="/editdeck" element={<EditDeck />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/battlelog" element={<Battlelog />} />
              <Route path="/userlist" element = {<UsersList/>} />
              <Route path="/temp" element = {<EditUser/>} />
              <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        
      </div>
    </>
    
  );
}

export default App;