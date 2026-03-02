import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Globe, BookOpen, Wallet, CreditCard, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import whiteLogo from '../assets/vite.svg';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        age: 18,
        stream: '',
        currentClass: '',
        annualBudget: '',
        loanComfort: '',
        canAffordCoaching: false,
        openToAbroad: false
    });

    const categories = {
        stream: ['Science', 'Arts', 'Commerce', 'Other'],
        loanComfort: ['Yes', 'Maybe', 'No'],
        currentClass: ['10th', '11th', '12th', 'Graduate', 'Post-Graduate']
    };

    const colors = {
        primary: '#0096FF',
        secondary: '#002D62',
        accent: '#5CE1FF',
        dark: '#0f172a',
        card: '#1e293b',
        border: 'rgba(255,255,255,0.1)'
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelect = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    educationalLoanComfort: formData.loanComfort
                })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/review');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error('Signup error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${colors.border}`,
        borderRadius: '10px',
        padding: '10px 14px 10px 40px',
        color: '#fff',
        fontSize: '13px',
        outline: 'none',
        transition: 'all 0.2s'
    };

    const labelStyle = {
        fontSize: '12px',
        fontWeight: 600,
        color: '#94a3b8',
        marginBottom: '6px',
        display: 'block'
    };

    const pillStyle = (name, val) => ({
        padding: '6px 12px',
        borderRadius: '16px',
        fontSize: '11px',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: formData[name] === val ? colors.primary : 'rgba(255,255,255,0.05)',
        color: formData[name] === val ? '#fff' : '#94a3b8',
        border: `1px solid ${formData[name] === val ? colors.primary : colors.border}`
    });

    return (
        <div style={{ background: colors.dark, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 40px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    background: colors.card,
                    borderRadius: '20px',
                    padding: '30px',
                    border: `1px solid ${colors.border}`,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        style={{ display: 'inline-block', marginBottom: '8px' }}
                    >
                        <img src={whiteLogo} alt="Logo" style={{ width: '40px', height: '40px' }} />
                    </motion.div>
                    <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>Join the Community</h1>
                    <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Let's personalize your college discovery journey.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {/* Left Column: Basic Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.accent, marginBottom: '12px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '6px' }}>Profile Basics</h3>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Full Name</label>
                            <User style={{ position: 'absolute', left: '12px', top: '34px', color: '#64748b' }} size={16} />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                style={inputStyle}
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={labelStyle}>Email Address</label>
                            <Mail style={{ position: 'absolute', left: '12px', top: '34px', color: '#64748b' }} size={16} />
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                style={inputStyle}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Password</label>
                                <Lock style={{ position: 'absolute', left: '12px', top: '34px', color: '#64748b' }} size={16} />
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

                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Age</label>
                                <CheckCircle2 style={{ position: 'absolute', left: '12px', top: '34px', color: '#64748b' }} size={16} />
                                <input
                                    type="number"
                                    name="age"
                                    style={inputStyle}
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Academic & Future */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.accent, marginBottom: '12px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '6px' }}>Preferences & Future</h3>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Current Stream</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {categories.stream.map(s => (
                                        <button key={s} type="button" onClick={() => handleSelect('stream', s)} style={pillStyle('stream', s)}>{s}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Current Class / Level</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {categories.currentClass.map(c => (
                                        <button key={c} type="button" onClick={() => handleSelect('currentClass', c)} style={pillStyle('currentClass', c)}>{c}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <label style={labelStyle}>Family Budget (INR)</label>
                                <Wallet style={{ position: 'absolute', left: '12px', top: '34px', color: '#64748b' }} size={16} />
                                <input
                                    type="text"
                                    name="annualBudget"
                                    placeholder="e.g. 5,00,000"
                                    style={inputStyle}
                                    value={formData.annualBudget}
                                    onChange={handleChange}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <label style={labelStyle}>Loan Comfort</label>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {categories.loanComfort.map(l => (
                                        <button key={l} type="button" onClick={() => handleSelect('loanComfort', l)} style={pillStyle('loanComfort', l)}>{l}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Toggles */}
                        <div style={{ display: 'flex', gap: '24px', marginTop: '4px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <div style={{
                                    width: '36px',
                                    height: '20px',
                                    background: formData.canAffordCoaching ? colors.primary : '#334155',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    transition: 'all 0.3s'
                                }}>
                                    <input type="checkbox" name="canAffordCoaching" checked={formData.canAffordCoaching} onChange={handleChange} style={{ display: 'none' }} />
                                    <div style={{
                                        width: '14px',
                                        height: '14px',
                                        background: '#fff',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '3px',
                                        left: formData.canAffordCoaching ? '19px' : '3px',
                                        transition: 'all 0.3s'
                                    }} />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Coaching?</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <div style={{
                                    width: '36px',
                                    height: '20px',
                                    background: formData.openToAbroad ? colors.primary : '#334155',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    transition: 'all 0.3s'
                                }}>
                                    <input type="checkbox" name="openToAbroad" checked={formData.openToAbroad} onChange={handleChange} style={{ display: 'none' }} />
                                    <div style={{
                                        width: '14px',
                                        height: '14px',
                                        background: '#fff',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '3px',
                                        left: formData.openToAbroad ? '19px' : '3px',
                                        transition: 'all 0.3s'
                                    }} />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Study Abroad?</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ gridColumn: 'span 2', marginTop: '8px' }}>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '14px',
                                background: colors.primary,
                                color: '#fff',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(0, 150, 255, 0.3)'
                            }}
                        >
                            Create Student Account <ArrowRight size={18} />
                        </button>
                    </div>
                </form>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                        Already have an account? <Link to="/login" style={{ color: colors.primary, fontWeight: 700, textDecoration: 'none' }}>Log In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
