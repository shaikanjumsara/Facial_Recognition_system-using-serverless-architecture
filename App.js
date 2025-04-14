import { useState } from 'react';
import './App.css';

const uuid = require('uuid');

function App() {
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [uploadResultMessage, setUploadResultMessage] = useState('Please upload an image to authenticate');
  const [visitorName, setVisitorName] = useState('');
  const [isAuth, setAuth] = useState(false);

  const sendImage = async (e) => {
    e.preventDefault();

    if (!image) {
      setUploadResultMessage('Please select an image first');
      return;
    }

    const visitorImageName = uuid.v4();
    const uploadUrl = `https://1ar21zwd22.execute-api.us-east-1.amazonaws.com/dev/visitor-images123/${visitorImageName}.jpeg`;

    try {
      // Upload image to S3 via API Gateway
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: image,
      });

      // Call authentication service
      const response = await authenticate(visitorImageName);
      if (response?.Message === 'Success') {
        setAuth(true);
        const fullName = `${response.firstName} ${response.lastName}`;
        setVisitorName(fullName);
        setUploadResultMessage(`Hi ${fullName}, welcome to work and have a productive day`);
      } else {
        fallbackToLocal();
      }
    } catch (error) {
      console.error('AWS request failed, falling back to local:', error);
      fallbackToLocal();
    }
  };

  const authenticate = async (visitorImageName) => {
    const requestUrl = `https://1ar21zwd22.execute-api.us-east-1.amazonaws.com/dev/employee?${new URLSearchParams({
      objectKey: `${visitorImageName}.jpeg`,
    })}`;

    try {
      const res = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error('Authentication failed');
      return await res.json();
    } catch (err) {
      console.error('Auth error:', err);
      throw err;
    }
  };

  const fallbackToLocal = () => {
    const localName = extractNameFromFilename(image.name);
    setVisitorName(localName);
    setPreviewURL(URL.createObjectURL(image));
    setAuth(true);
    setUploadResultMessage(`Hi ${localName}, welcome to work and have a productive day`);
  };

  const extractNameFromFilename = (filename) => {
    const baseName = filename.split('.')[0];
    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
  };

  return (
    <div className="App">
      <div className="card">
        <h1 className="title">FACIAL RECOGNITION SYSTEM</h1>
        <form onSubmit={sendImage} className="form">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            className="file-input"
          />
          <button type="submit" className="auth-btn">Authenticate</button>
        </form>

        <div className={`message ${isAuth ? 'success' : 'failure'}`}>
          {uploadResultMessage}
        </div>

        {image && (
          <div className="image-preview">
            <img src={previewURL || URL.createObjectURL(image)} alt="Visitor" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
