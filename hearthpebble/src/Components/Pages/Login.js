import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../actions/reduxActions';
import Register from './RegisterForm';
import './Login.css'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();

    const [showRegister, setShowRegister] = useState(false);

    const handleOpenRegister = () => {
        setShowRegister(true);
    };

    const handleCloseRegister = () => {
        setShowRegister(false);
    };


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    dispatch(login(username, password));
  }

  return (
      <div className = 'login-body'>
          <h1>Login</h1>
          <Register show={showRegister} onClose={handleCloseRegister} />
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
          <button className="link-btn" onClick={handleOpenRegister}> Don't have an account? Register here.</button>
      </div>
    );
}

export default Login;