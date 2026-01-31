import React, { useState } from 'react';
import Head from 'next/head';
import { analyzeMeterImage } from '../utils/mockAIService';
import CameraCapture from '../components/CameraCapture';
import AnalysisView from '../components/AnalysisView';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCapture = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Paso 1: Simular carga
    setStatus('Procesando imagen con IA...');
    
    const response = await analyzeMeterImage(file);

    if (response.success) {
      setResult(response);
      setStatus('¡Escaneo exitoso!');
    } else {
      setError(response.error);
    }
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setStatus('');
  };

  return (
    <div className="container">
      <Head>
        <title>Antigravity | Vision Engine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <main>
        <header className="header">
          <h1>ANTIGRAVITY</h1>
          <p className="subtitle">METER READER AI V1.0</p>
        </header>

        {!result && !loading && !error && (
          <div className="capture-section">
            <CameraCapture onCapture={handleCapture} />
          </div>
        )}

        {loading && (
          <div className="loading-zone">
            <div className="scanner-animation"></div>
            <p className="loading-text">{status}</p>
          </div>
        )}

        {result && (
          <AnalysisView data={result.data} csv={result.csv} onReset={reset} />
        )}

        {error && (
          <div className="error-card">
            <p>{error}</p>
            <button onClick={reset}>Reintentar</button>
          </div>
        )}
      </main>

      <style jsx global>{`
        :root {
          --neon: #00f3ff;
          --bg: #0a0a0b;
        }
        body {
          background-color: var(--bg);
          color: white;
          font-family: 'Inter', sans-serif;
          margin: 0;
        }
        .header { text-align: center; padding: 2rem 0; border-bottom: 1px solid #333; }
        h1 { font-weight: 900; letter-spacing: 5px; color: var(--neon); margin: 0; }
        .subtitle { font-size: 0.7rem; opacity: 0.6; }
        .loading-zone { display: flex; flex-direction: column; align-items: center; padding: 4rem 2rem; }
        .scanner-animation { 
          width: 200px; height: 2px; background: var(--neon); 
          box-shadow: 0 0 15px var(--neon); animation: scan 2s infinite; 
        }
        @keyframes scan { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(100px); } }
      `}</style>
    </div>
  );
}