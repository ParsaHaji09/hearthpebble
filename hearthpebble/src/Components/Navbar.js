function Navbar() {
    
    const logoutHandler = () => {

    }
    
    return (
        <nav className="nav">
            <a href="/" className="sitename">
                <span>Hearthpebble</span>
            </a>
            <div className="links">
                <a href="/profile" className="profile">Profile</a>
                <a href="/" className="explore">Explore</a>
                <a href="/rating" className="rating">Rating</a>
                <button className="logout" onClick={logoutHandler}>Log Out</button>
            </div>
        </nav>
    );
}

export default Navbar;