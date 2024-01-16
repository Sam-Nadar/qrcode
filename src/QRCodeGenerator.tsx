// QRCodeGenerator.tsx (updated)
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [generatedQRCode, setGeneratedQRCode] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const generateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/generate-qr-code', { url });
      setGeneratedQRCode(response.data.qrCode);
    } catch (error) {
      console.error('Failed to generate QR code', error);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleInputChange} placeholder='Enter URL'/>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {generatedQRCode && (
        <div>
            <div style={{
                marginTop : 15
            }}>
          < QRCode value={url} />
          </div>
          <p>Scan the QR code or click the image to download it.</p>
          <a href={generatedQRCode} download="qrcode.png">
            Download QR Code
          </a>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
