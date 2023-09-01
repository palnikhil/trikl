import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TextOverlay from './components/TextOverlay';

function App() {
  const [imageURL, setImageURL] = useState('');
  const [textOverlays, setTextOverlays] = useState([]);
  const [newText, setNewText] = useState('');
  
  const fetchImage = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
        },
      });
      setImageURL(response.data.urls.regular);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const addTextOverlay = () => {
    if (newText) {
      setTextOverlays([
        ...textOverlays,
        {
          text: newText,
          position: { x: 200, y: -100 },
          size: { width: 100, height: 50 },
        },
      ]);
      setNewText('');
    }
  };

  const handleDrag = (index, e, data) => {
    const updatedOverlays = [...textOverlays];
    updatedOverlays[index].position = { x: data.x, y: data.y };
    setTextOverlays(updatedOverlays);
  };
  
  return (
    <div className="App">
      <div className='App-header'>
          <button className='img-fetch-btn' onClick={fetchImage}>Fetch Image</button>
          <div className='main-object'>
             {imageURL ? <img className='img-fetched' src={imageURL} sizes="" alt="Fetched" /> : <p>No Image has been Fetched!</p>}
             {textOverlays.map((overlay, index) => (
                <TextOverlay
                  key={index}
                  text={overlay.text}
                  position={overlay.position}
                  onDrag={(e, data) => handleDrag(index, e, data)}
                />
              ))}
          </div>
          <div className="add-text">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter text"
            />
            <button onClick={addTextOverlay}>Add Text</button>
          </div>    
      </div>
    </div>
  );
}

export default App;

