import './Home.css'
import axios from 'axios';

const images = require.context('./HomeAssets', true);
const imageList = images.keys().map(image => images(image));


function EditDeck() {

    const imageSources = [
        imageList[0], imageList[1], imageList[2],
        imageList[3], imageList[4], imageList[5],
        imageList[6], imageList[7], imageList[0],
        imageList[1], imageList[2], imageList[3],
        imageList[4], imageList[5], imageList[6],
    ];
    return (
        <div className="editdeck-body">
            
            <div className='right-side'>
            <div className='Grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(5, 100px)', gap: '10px' }}>
                    {imageSources.map((source, index) => (
                    <img key={index} src={source} alt={`Image ${index + 1}`}style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ))}
            </div>
            </div>
     
        </div>
      );
}
export default EditDeck;