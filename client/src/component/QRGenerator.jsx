import { useState } from 'react';
import QRCode from 'qrcode.react';
import { FiDownload } from 'react-icons/fi';

const QRGenerator = ({ address }) => {
  const [qrSize, setQrSize] = useState(128);

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = `${address}-qr.png`;
    link.href = pngUrl;
    link.click();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4">Address QR Code</h2>
      <div className="flex flex-col items-center gap-4">
        <QRCode
          id="qr-code"
          value={address}
          size={qrSize}
          level="H"
          includeMargin
          className="border p-2 rounded"
        />
        <button
          onClick={downloadQR}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
        >
          <FiDownload /> Download QR
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;