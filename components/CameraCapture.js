import React from 'react';

const CameraCapture = ({ onCapture }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onCapture(file);
  };

  return (
    <div className="camera-card">
      <div className="icon-container">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M19.4 7H16.8l-1.3-1.7c-.3-.4-.8-.6-1.3-.6H9.8c-.5 0-1 .2-1.3.6L7.2 7H4.6C3.7 7 3 7.7 3 8.6v9.8c0 .9.7 1.6 1.6 1.6h14.8c.9 0 1.6-.7 1.6-1.6V8.6c0-.9-.7-1.6-1.6-1.6z" />
        </svg>
      </div>
      
      <p>ESCÁNER DE TELEMETRÍA</p>
      
      <label className="btn-capture">
        INICIAR CAPTURA
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          onChange={handleChange} 
          style={{ display: 'none' }} 
        />
      </label>

      <style jsx>{`
        .camera-card {
          border: 1px solid #333;
          background: #111;
          padding: 3rem 2rem;
          text-align: center;
          border-radius: 8px;
          margin: 2rem;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        .icon-container svg { width: 60px; color: #555; margin-bottom: 1rem; }
        p { font-size: 0.8rem; letter-spacing: 2px; color: #888; margin-bottom: 2rem; }
        .btn-capture {
          background: #00f3ff;
          color: #000;
          padding: 1rem 2rem;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          transition: all 0.3s;
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
        }
        .btn-capture:active { transform: scale(0.95); background: #fff; }
      `}</style>
    </div>
  );
};

export default CameraCapture;