import Head from 'next/head';
import '@/styles/variables.css';
import '@/styles/animations.css';

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Antigravity | Vision Engine</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="theme-color" content="#0a0b10" />
            </Head>
            <div className="container" style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                minHeight: '100vh',
                backgroundColor: 'var(--bg-dark)'
            }}>
                {children}
            </div>
        </>
    );
}
