import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../actions/reduxActions';
import './Login.css'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  // check if user has logged in already based on local storage
  useEffect(() => {
    const prevData = localStorage.getItem("saveData");
    if (prevData) {
      navigate('/home');
    }
  }, [userLogin])

  useEffect(() => {
    if (error) console.log(error);
  }, [error])

  useEffect(() => {
    console.log(loading);
  }, [loading])
  

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Switched to register.");
    navigate ('/register');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    // whenever you use API calls that take JSON data, use HEADERS and dispatch
    dispatch(login(username, password));
  }
  return (
      <div className = 'login-body'>
          <h1>Login</h1>
         
          <form className='auth-login' onSubmit={handleSubmit}>
              <label htmlFor ="username">Username</label>
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                
                autoComplete='off'
                required
                placeholder="Enter here"
                className='username'
              />
              <label htmlFor="password">Password</label>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                
                autoComplete='off'
                required
                placeholder="********"
                className='password'
              />
              <button className="button" type="submit">Log In</button>
          </form>
          <button className="link-btn" onClick={handleClick}> Don't have an account? Register here.</button>
      </div>
    );
}

export default Login;