import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from './actions/reduxActions';

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(logout());
        navigate('/landing')
    }
    return (
        <nav className="nav">
            <a href="/home" className="sitename">
                <span>Hearthpebble</span>
            </a>
            <div className="links">
                <a href="/home" className="home">Home</a>
                <a href="/battlelog" className="battlelog">Battle Log</a>
                <a href="/editdeck" className="editdeck">Edit Deck</a>
                <button onClick={handleClick}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;