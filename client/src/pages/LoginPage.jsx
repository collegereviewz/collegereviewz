import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const colors = {
        primary: '#0096FF',
        secondary: '#002D62',
        accent: '#5CE1FF',
        dark: '#0f172a',
        card: '#1e293b',
        border: 'rgba(255,255,255,0.1)'
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/review');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '14px 16px',
        paddingLeft: '44px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        transition: 'all 0.2s'
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: 600,
        color: '#94a3b8',
        marginBottom: '8px',
        display: 'block'
    };

    return (
        <div style={{ background: colors.dark, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    background: colors.card,
                    borderRadius: '24px',
                    padding: '40px',
                    border: `1px solid ${colors.border}`,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        style={{ display: 'inline-block', padding: '12px', background: 'rgba(92, 225, 255, 0.1)', borderRadius: '16px', marginBottom: '16px' }}
                    >
                        <LogIn size={32} color={colors.accent} />
                    </motion.div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: '#94a3b8', fontSize: '15px' }}>Continue your exploration of top colleges.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={labelStyle}>Email Address</label>
                        <Mail style={{ position: 'absolute', left: '16px', top: '42px', color: '#64748b' }} size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            style={inputStyle}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                            <span style={{ fontSize: '12px', color: colors.primary, cursor: 'pointer', fontWeight: 600 }}>Forgot?</span>
                        </div>
                        <Lock style={{ position: 'absolute', left: '16px', top: '42px', color: '#64748b' }} size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            style={inputStyle}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '14px',
                            background: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`,
                            color: '#fff',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '10px',
                            boxShadow: '0 4px 15px rgba(0, 150, 255, 0.3)'
                        }}
                    >
                        Sign In Now <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <p style={{ color: '#64748b', fontSize: '14px' }}>
                        New to CollegeReviewz? <Link to="/signup" style={{ color: colors.accent, fontWeight: 700, textDecoration: 'none' }}>Create Account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
