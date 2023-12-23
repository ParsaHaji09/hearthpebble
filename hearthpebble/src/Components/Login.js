import React, { useEffect, useState } from 'react';

const Login = (props) => {
  const [username, setUserName] = useState('');
  const [pass, setPass] = useState('');
  
  function handleClick(){

  }

  function handleSubmit(){

  }

  return (
    <div>
        <h1>Login</h1>
        <form className='auth-login' onSubmit={handleSubmit}>
            <label htmlFor ="email">Email</label>
            <input value={username} onChange={(e) => setUserName(e.target.value)} type="email" placeholder="Enter here" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="******" id="password" name="password"/>
            <button className="button" type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={handleClick}> Don't have an account? Register here.</button>
    </div>
  );
}

export default Login;