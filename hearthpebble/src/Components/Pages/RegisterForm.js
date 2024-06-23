import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/reduxActions';
import './Register.css'


const Register = ({ show, onClose }) => {

  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(username, password);
    console.log('Register component submitted with username:', username);
    dispatch(register(username, password));
    onClose();
  }
  if (!show) {
    return null;
  }
  return (
      <div className="modal-overlay">
      <div className="register-body">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form className="register-form" onSubmit={handleSubmit}>

          <label htmlFor="username">Username</label>
          <input value={username} onChange={(e) => setUserName(e.target.value)} username="username" id="name"
                 placeholder="Enter here" required/>

          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********"
                 id="password" name="password"/>

          <button className="button" type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={onClose}> Already have an account? Log in here.</button>
      </div></div>
  );
}

export default Register;