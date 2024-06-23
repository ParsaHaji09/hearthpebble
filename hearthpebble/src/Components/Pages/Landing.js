import { Link } from 'react-router-dom'
import './Landing.css';
const images = require.context('./HomeAssets', true);
const imageList = images.keys().map(image => images(image));

function Landing() {
    return (
        <div className='landing-body'>
            <div className='text'>
                <h1>Welcome to Hearthpebble!</h1>
                <a href='/login'>Login and Register here</a>
            </div>
            <div className='picture'>
                <img src={imageList[0]} style={{ marginLeft: '0px', paddingLeft: '50px', paddingRight: '50px', width: '60vw', placeContent: 'left', height: '800px' }}/>
            </div>
        </div>
    );
}
export default Landing;