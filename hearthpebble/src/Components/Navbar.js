import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from './actions/reduxActions';
import { useEffect } from 'react';
import React, { useState } from 'react';

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profileName, setProfileName] = useState("") 
    const handleClick = () => {
        dispatch(logout());
        navigate('/landing')

    }

    useEffect(() => {
        const prevData = localStorage.getItem("saveData");
        if (!prevData) {
            navigate('/login');
        } else {
            const parsedData = JSON.parse(prevData);
            setProfileName(parsedData.username);
        }
        }, [navigate]);
        
    return (
        <nav className="nav">
            <a href="/home" className="sitename">
                <span>Hearthpebble</span>
            </a>
            <div className="links">
                <a href="/home" className="home">Home</a>
                <a href="/battlelog" className="battlelog">Battle Log</a>
                <a href="/editdeck" className="editdeck">Edit Deck</a>
                <a href="/profile" className="profile">{profileName}</a>
                <button onClick={handleClick}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;