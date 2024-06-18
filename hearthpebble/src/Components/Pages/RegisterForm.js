import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { register } from '../actions/reduxActions';
import './Home.css'


const Register = (props) => {
  
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const dispatch = useDispatch();


  const navigate = useNavigate();
  const handleClick = () => {
    console.log("Switched to Login");
    navigate ('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(username, password);
    console.log('Register component submitted with username:', username);
    dispatch(register(username, password));
    navigate('/home')
  }

  return (
    <div className = "register-body">
    
    <form className="login-form" onSubmit={handleSubmit}>

    <label htmlFor="username">Username</label>
      <input value={username} onChange={(e) => setUserName(e.target.value)} username="username" id="name" placeholder="Enter here" required />

    <label htmlFor ="password">Password</label>
      <input value={password} onChange={(e) => setPassword (e.target.value)} type="password" placeholder="********" id="password" name="password"/>
      
    <button className="button" type="submit">Register</button>
    </form>
    <button className="link-btn" onClick={handleClick}> Already have an account? Log in here.</button>
    </div>
  );
}

export default Register;