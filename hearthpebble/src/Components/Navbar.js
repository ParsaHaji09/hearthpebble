import { useEffect } from "react";
import { useSendLogoutMutation } from "./auth/authAPISlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
    
    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if(isSuccess) {
            console.log("bye")
            navigate('/')
        }
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>
    if (isError) return <p>Error: {error.data?.message}</p>

    const logoutHandler = () => { 
        sendLogout() 
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
                <button className="logout" onClick={logoutHandler}>Log Out</button>
            </div>
        </nav>
    );
}

export default Navbar;