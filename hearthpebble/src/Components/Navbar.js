import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from './actions/reduxActions';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StyleIcon from '@mui/icons-material/Style';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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


    const buttonStyle = {
        all: 'unset',       // Resets all default styles
        display: 'inline-flex',  // Aligns items and centers them if needed
        // alignItems: 'center',
        // justifyContent: 'center',
        //padding: '8px',
    };

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


                <a href="/home" className="home"><HomeIcon/></a>
                <a href="/battlelog" className="battlelog"><ReceiptLongIcon/></a>
                <a href="/editdeck" className="editdeck"><StyleIcon/></a>
                <a href="/profile" className="profile"><AccountCircleIcon/></a>
                <button className="logout" onClick={handleClick} style={buttonStyle}><LogoutIcon/></button>

        </nav>
    );
}

export default Navbar;