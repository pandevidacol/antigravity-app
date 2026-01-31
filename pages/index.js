import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CameraCapture from '@/components/CameraCapture';
import AnalysisView from '@/components/AnalysisView';
import { analyzeImageMock } from '@/utils/mockAIService';

export default function Home() {
    const [analyzing, setAnalyzing] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    // Load history on mount
    useEffect(() => {
        const stored = localStorage.getItem('antigravity_history');
        if (stored) setHistory(JSON.parse(stored));
    }, []);

    const handleCapture = async (file, previewUrl) => {
        setAnalyzing(true);
        setResult(null); // Clear previous

        try {
            // Simulate AI process
            const csvLine = await analyzeImageMock(previewUrl, (msg) => {
                setStatusMsg(msg);
            });

            setResult(csvLine);
            setStatusMsg(''); // Clear status on success

            // Save to history
            const newEntry = {
                id: `ANT-${Date.now()}`,
                timestamp: new Date().toISOString(),
                raw: csvLine,
                // In a real app we'd save the image, here we skip it to save localstorage space
            };
            const updatedHistory = [newEntry, ...history];
            setHistory(updatedHistory);
            localStorage.setItem('antigravity_history', JSON.stringify(updatedHistory));

        } catch (error) {
            console.error(error);
            setStatusMsg('ERROR: FALLO_ANALISIS');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setStatusMsg('');
        setAnalyzing(false);
    };

    return (
        <Layout>
            <header style={{ padding: '2rem', textAlign: 'center' }}>
                <h1 style={{
                    margin: 0,
                    letterSpacing: '4px',
                    borderBottom: '2px solid var(--accent-primary)',
                    display: 'inline-block',
                    paddingBottom: '0.5rem'
                }}>
                    ANTIGRAVITY
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    VISION ENGINE PROTOCOL
                </p>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {!result && !analyzing && (
                    <CameraCapture onCapture={handleCapture} />
                )}

                {(result || analyzing) && (
                    <AnalysisView
                        data={result}
                        status={statusMsg}
                        onReset={handleReset}
                    />
                )}

                {/* Mini History view */}
                {!result && !analyzing && history.length > 0 && (
                    <div style={{ marginTop: '2rem', width: '100%', padding: '0 2rem' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>RECENT SCANS</h3>
                        {history.slice(0, 3).map(item => (
                            <div key={item.id} style={{
                                background: '#111',
                                padding: '0.8rem',
                                marginBottom: '0.5rem',
                                borderRadius: '8px',
                                fontSize: '0.7rem',
                                color: '#888',
                                borderLeft: '2px solid #333'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{item.id}</span>
                                    <span>{item.timestamp.split('T')[1].substr(0, 5)}</span>
                                </div>
                                <div style={{ color: '#fff', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {item.raw.split(',')[3]}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>

            <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.7rem', color: '#444' }}>
                SYSTEM_READY // WAITING_INPUT
            </footer>
        </Layout>
    );
}
