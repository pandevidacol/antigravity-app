import React from 'react';

const AnalysisView = ({ data, csv, onReset }) => {
  return (
    <div className="results-container">
      <div className="status-badge">LECTURA COMPLETADA</div>
      
      <div className="data-grid">
        <div className="data-item">
          <label>SERIAL MEDIDOR</label>
          <div className="value">{data.serial}</div>
        </div>
        <div className="data-item">
          <label>LECTURA ACTUAL</label>
          <div className="value neon-text">{data.lectura}</div>
        </div>
        <div className="data-item full">
          <label>CONCATENADO (DB_KEY)</label>
          <div className="value code">{data.concatenado}</div>
        </div>
        <div className="data-item">
          <label>ESTADO / ANOMALÍA</label>
          <div className={`value ${data.anomalia !== 'SIN_NOVEDAD' ? 'warning' : ''}`}>
            {data.anomalia}
          </div>
        </div>
      </div>

      <div className="csv-preview">
        <label>SALIDA CSV RAW</label>
        <code>{csv}</code>
      </div>

      <button className="btn-reset" onClick={onReset}>NUEVA LECTURA</button>

      <style jsx>{`
        .results-container { padding: 1.5rem; animation: fadeIn 0.5s ease-out; }
        .status-badge { 
          background: rgba(0, 243, 255, 0.1); color: #00f3ff; 
          font-size: 0.7rem; padding: 0.5rem; text-align: center;
          border: 1px solid #00f3ff; margin-bottom: 2rem;
        }
        .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .data-item.full { grid-column: span 2; }
        label { display: block; font-size: 0.6rem; color: #666; margin-bottom: 0.3rem; }
        .value { background: #1a1a1c; padding: 0.8rem; border-radius: 4px; font-weight: bold; }
        .neon-text { color: #00f3ff; font-size: 1.5rem; }
        .code { font-family: monospace; color: #aaa; font-size: 0.9rem; }
        .warning { color: #ff3e3e; }
        .csv-preview { margin-top: 2rem; background: #000; padding: 1rem; border: 1px dashed #333; }
        code { font-size: 0.7rem; color: #00f3ff; word-break: break-all; }
        .btn-reset { 
          width: 100%; margin-top: 2rem; padding: 1rem; background: transparent; 
          color: white; border: 1px solid #444; cursor: pointer;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AnalysisView;