import { useState, useRef } from 'react';
import styles from './CameraCapture.module.css';

export default function CameraCapture({ onCapture }) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onCapture(file, url);
        }
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={inputRef}
                className={styles.hiddenInput}
                onChange={handleFileChange}
            />

            <div
                className={`${styles.scanBox} pulse-ring`}
                onClick={() => inputRef.current.click()}
            >
                {preview ? (
                    <img src={preview} className={styles.previewImage} alt="Preview" />
                ) : (
                    <div className={styles.placeholder}>
                        <span className={styles.icon}>[ + ]</span>
                        <p>TAP TO SCAN METER</p>
                    </div>
                )}

                {/* Scanning Overlay Effects */}
                <div className={styles.cornerTL}></div>
                <div className={styles.cornerTR}></div>
                <div className={styles.cornerBL}></div>
                <div className={styles.cornerBR}></div>
                <div className="scan-line-anim" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    background: 'var(--accent-primary)',
                    boxShadow: '0 0 10px var(--accent-primary)',
                    top: 0,
                    left: 0
                }}></div>
            </div>
        </div>
    );
}
