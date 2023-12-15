import React, { useState, useRef } from 'react';
import './App.css';
import ColorThief from 'colorthief';

function App() {
  const [image, setImage] = useState(null);
  const [dominantColor, setDominantColor] = useState('white');
  const imgRef = useRef(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const onLoad = () => {
    const colorThief = new ColorThief();
    if (imgRef.current.complete) {
      setDominantColor(`rgb(${colorThief.getColor(imgRef.current).join(',')})`);
    } else {
      imgRef.current.addEventListener('load', function() {
        setDominantColor(`rgb(${colorThief.getColor(imgRef.current).join(',')})`);
      });
    }
  };

  return (
      <div className="App" style={{ backgroundColor: dominantColor }}>
        <div className="App-header">
          <h1>File Upload Project</h1>
          <input type="file" onChange={onImageChange} accept="image/*" />
          {image && <img ref={imgRef} id="uploadedImage" src={image} onLoad={onLoad} alt="Uploaded" style={{ display: 'none' }}/>}
        </div>
      </div>
  );
}

export default App;
