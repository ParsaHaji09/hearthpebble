import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../auth/authSlice'
import { useLoginMutation } from '../auth/authAPISlice'

const Login = (props) => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    // useEffect(() => {
    //     userRef.current.focus()   //error
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            console.log("yay")
            navigate('/home')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            //errRef.current.focus();
        }
    }

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>


    return (
      <div>
          <h1>Login</h1>
          <p ref = {errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
          <form className='auth-login' onSubmit={handleSubmit}>
              <label htmlFor ="username">Username</label>
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                ref = {userRef}
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
                ref = {userRef}
                autoComplete='off'
                required
                placeholder="********"
                className='password'
              />
              <button className="button" type="submit">Log In</button>
          </form>
          <a href="/registerform" className="register">Don't have an account? Register here.</a>
      </div>
    );
}

export default Login;