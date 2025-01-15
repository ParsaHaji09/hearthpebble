import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/reduxActions';
import './Register.css'

const Register = ({ show, onClose }) => {
  

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordC, setPasswordC] = useState('')
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    if (password !== passwordC) {
      console.log("mismatch")
    }
    else {
      dispatch(register(username, password));
    }
  }
  
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Left Side */}
        <div className="modal-left">
          <h1>Welcome to HearthPebble</h1>
          <p>Your journey starts here. Create your account to get started!</p>
        </div>

        {/* Right Side */}
        <div className="modal-right">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              onChange={(e) => setPasswordC(e.target.value)}
              placeholder="Confirm your password"
            />

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
