import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div
            style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 20px',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '80vh',
                width: '100%',
                backgroundColor: '#f8fafc'
            }}
        >
            {/* Abstract Background Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.1 }}>
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: '#3b4eba', filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: '#51c1ef', filter: 'blur(120px)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ maxWidth: '640px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '96px',
                        height: '96px',
                        borderRadius: '24px',
                        backgroundColor: '#eff6ff',
                        fontSize: '48px',
                        marginBottom: '32px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #dbeafe'
                    }}
                >
                    😟
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontSize: ' clamp(80px, 15vw, 120px)',
                        lineHeight: 1,
                        fontWeight: 800,
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #3b4eba 0%, #51c1ef 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Outfit', sans-serif"
                    }}
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', fontFamily: "'Outfit', sans-serif" }}
                >
                    Oops! Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px', maxWidth: '500px', lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}
                >
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(to right, #3b4eba, #51c1ef)',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            boxShadow: '0 10px 15px -3px rgba(59, 78, 186, 0.2)',
                            transition: 'transform 0.2s',
                            textDecoration: 'none'
                        }}
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'white',
                            border: '2px solid #f1f5f9',
                            color: '#334155',
                            padding: '16px 32px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
