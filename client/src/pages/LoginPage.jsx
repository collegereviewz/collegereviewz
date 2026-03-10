import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, LogIn, X, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/logo6.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const colors = {
        primary: '#3b51d8', // Deep Indigo/Blue
        secondary: '#0ea5e9', // Cyan
        gradientStart: '#4457e5',
        gradientEnd: '#4ec7ed',
        bg: '#e2e8f0', // Light grey background for the page
        card: '#ffffff',
        inputBg: '#f8fafc',
        border: '#e2e8f0',
        text: '#1e293b', // Dark slate
        muted: '#64748b',
        label: '#0f172a'
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
                window.dispatchEvent(new Event('userLogin'));
                navigate('/');
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
        background: colors.inputBg,
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '16px 20px',
        color: '#1e293b',
        fontSize: '15px',
        fontWeight: '500',
        outline: 'none',
        transition: 'all 0.2s ease'
    };

    const labelStyle = {
        fontSize: '15px',
        fontWeight: '800',
        color: colors.label,
        marginBottom: '10px',
        display: 'block'
    };

    return (
        <div style={{ 
            background: colors.bg, 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '40px 24px',
            fontFamily: "'Outfit', 'Inter', sans-serif"
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                    width: '100%',
                    maxWidth: '520px',
                    background: colors.card,
                    borderRadius: '32px',
                    boxShadow: '0 40px 100px -20px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                {/* Header Gradient */}
                <div style={{ 
                    background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                    padding: '24px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img src={logoImg} alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>Sign In to College Review</h2>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: '#fff' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ padding: '40px 48px' }}>
                    <motion.form 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        onSubmit={handleSubmit} 
                        style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                    >
                        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                            <label style={labelStyle}>Email ID Or Phone Number</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter email id or phone number"
                                style={inputStyle}
                                onFocus={(e) => { e.target.style.borderColor = '#3b51d8'; e.target.style.background = '#fff'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = colors.inputBg; }}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                            <label style={labelStyle}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    style={{ ...inputStyle, paddingRight: '52px' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#3b51d8'; e.target.style.background = '#fff'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = colors.inputBg; }}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} style={{ marginTop: '-8px' }}>
                            <Link to="/forgot-password" style={{ fontSize: '15px', color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>
                                Forgot Password?
                            </Link>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    borderRadius: '16px',
                                    background: `linear-gradient(90deg, #4457e5, #4ec7ed)`,
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '17px',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    marginTop: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                Sign In
                            </button>
                        </motion.div>
                    </motion.form>

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <p style={{ color: colors.muted, fontSize: '15px', fontWeight: 600 }}>
                            Don't have an account? <Link to="/signup" style={{ 
                                color: '#4457e5', 
                                fontWeight: '800', 
                                textDecoration: 'none',
                                marginLeft: '6px'
                            }}>Create Account</Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
                input::placeholder { color: #94a3b8; font-weight: 500; }
            `}</style>
        </div>
    );
};

export default LoginPage;
