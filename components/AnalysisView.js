import styles from './AnalysisView.module.css';

export default function AnalysisView({ data, status, onReset }) {
    if (!data && !status) return null;

    // Formatting for display if data is available
    const parsed = data ? data.split(', ') : [];
    const [fecha, serie, lectura, concat, estado] = parsed;

    return (
        <div className={styles.container}>
            {/* Console Output Block */}
            <div className={styles.terminal}>
                <div className={styles.header}>
                    <span className={styles.dot}></span> ANTIGRAVITY v0.9
                </div>
                <div className={styles.log}>
                    {status && <p className={styles.statusLine}>> {status}</p>}
                    {data && <p className={styles.successLine}>> ANALYSIS_COMPLETE</p>}
                </div>
            </div>

            {data && (
                <div className={styles.results}>
                    <div className={styles.dataGrid}>
                        <div className={styles.label}>SERIAL</div>
                        <div className={styles.value}>{serie}</div>

                        <div className={styles.label}>READING</div>
                        <div className={`${styles.value} ${styles.highlight}`}>{lectura}</div>

                        <div className={styles.label}>STATUS</div>
                        <div className={`${styles.value} ${estado === 'SIN_NOVEDAD' ? styles.safe : styles.alert}`}>
                            {estado}
                        </div>
                    </div>

                    <div className={styles.rawOutput}>
                        <p>Raw CSV:</p>
                        <code>{data}</code>
                    </div>

                    <button onClick={onReset} className="btn-primary" style={{ marginTop: '2rem', width: '100%' }}>
                        NUEVA LECTURA
                    </button>
                </div>
            )}
        </div>
    );
}
