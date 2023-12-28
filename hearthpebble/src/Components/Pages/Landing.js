import { Link } from 'react-router-dom'

function Landing() {
    return (
        <div>
            <h1>We are here at landing page</h1>
            <a href="/userlist" className="userlist">View User List</a>
        </div>
    );
}
export default Landing;