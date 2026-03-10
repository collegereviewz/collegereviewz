import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2, Wallet, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from '../assets/logo6.png';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
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
        currentClass: ['10th', '11th', '12th', 'Graduate', 'Post-Grad']
    };

    const colors = {
        primary: '#3b51d8',
        secondary: '#0ea5e9',
        gradientStart: '#4457e5',
        gradientEnd: '#4ec7ed',
        bg: '#e2e8f0', // Matching light grey background
        card: '#ffffff',
        inputBg: '#f8fafc',
        border: '#e2e8f0',
        text: '#1e293b',
        muted: '#64748b',
        label: '#0f172a'
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
                window.dispatchEvent(new Event('userLogin'));
                navigate('/');
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
        background: colors.inputBg,
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        padding: '12px 16px 12px 42px',
        color: '#1e293b',
        fontSize: '14px',
        fontWeight: '500',
        outline: 'none',
        transition: 'all 0.2s ease'
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: '800',
        color: colors.label,
        marginBottom: '8px',
        display: 'block'
    };

    const pillStyle = (name, val) => ({
        padding: '8px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: formData[name] === val ? 'rgba(59, 81, 216, 0.1)' : colors.inputBg,
        color: formData[name] === val ? colors.primary : colors.muted,
        border: `1.5px solid ${formData[name] === val ? colors.primary : '#e5e7eb'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    });

    return (
        <div style={{ 
            background: colors.bg, 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '60px 24px',
            fontFamily: "'Outfit', 'Inter', sans-serif"
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                    width: '100%',
                    maxWidth: '850px',
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
                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', margin: 0 }}>Join College Review Community</h2>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: '#fff' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ padding: '40px' }}>
                    <motion.form 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05
                                }
                            }
                        }}
                        onSubmit={handleSubmit} 
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}
                    >
                        
                        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: colors.primary, textTransform: 'uppercase', letterSpacing: '1px' }}>Profile Basics</div>

                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                    <input type="text" name="fullName" placeholder="John Doe" style={inputStyle} value={formData.fullName} onChange={handleChange} required />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                    <input type="email" name="email" placeholder="john@example.com" style={inputStyle} value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={labelStyle}>Age</label>
                                    <div style={{ position: 'relative' }}>
                                        <CheckCircle2 style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                        <input type="number" name="age" style={inputStyle} value={formData.age} onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone</label>
                                    <div style={{ position: 'relative' }}>
                                        <Sparkles style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                        <input type="tel" name="phoneNumber" placeholder="Phone" style={inputStyle} value={formData.phoneNumber} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                    <input type="password" name="password" placeholder="••••••••" style={inputStyle} value={formData.password} onChange={handleChange} required />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: colors.primary, textTransform: 'uppercase', letterSpacing: '1px' }}>Academic & Budget</div>

                            <div>
                                <label style={labelStyle}>Current Stream</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {categories.stream.map(s => (
                                        <button key={s} type="button" onClick={() => handleSelect('stream', s)} style={pillStyle('stream', s)}>{s}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Level of Study</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {categories.currentClass.map(c => (
                                        <button key={c} type="button" onClick={() => handleSelect('currentClass', c)} style={pillStyle('currentClass', c)}>{c}</button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
                                <div>
                                    <label style={labelStyle}>Family Budget (INR)</label>
                                    <div style={{ position: 'relative' }}>
                                        <Wallet style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                        <input type="text" name="annualBudget" placeholder="e.g. 5,00,000" style={inputStyle} value={formData.annualBudget} onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Loan Comfort</label>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {categories.loanComfort.map(l => (
                                            <button key={l} type="button" onClick={() => handleSelect('loanComfort', l)} style={{ ...pillStyle('loanComfort', l), padding: '8px 10px' }}>{l}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, background: colors.inputBg, padding: '12px', borderRadius: '16px', border: `1.5px solid ${formData.canAffordCoaching ? colors.primary : '#e5e7eb'}` }}>
                                    <input type="checkbox" name="canAffordCoaching" checked={formData.canAffordCoaching} onChange={handleChange} style={{ accentColor: colors.primary, width: '18px', height: '18px' }} />
                                    <span style={{ fontSize: '13px', fontWeight: 800 }}>Coaching?</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1, background: colors.inputBg, padding: '12px', borderRadius: '16px', border: `1.5px solid ${formData.openToAbroad ? colors.primary : '#e5e7eb'}` }}>
                                    <input type="checkbox" name="openToAbroad" checked={formData.openToAbroad} onChange={handleChange} style={{ accentColor: colors.primary, width: '18px', height: '18px' }} />
                                    <span style={{ fontSize: '13px', fontWeight: 800 }}>Study Abroad?</span>
                                </label>
                            </div>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    borderRadius: '18px',
                                    background: `linear-gradient(90deg, #4457e5, #4ec7ed)`,
                                    color: '#fff',
                                    border: 'none',
                                    fontSize: '18px',
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                    boxShadow: '0 20px 40px -10px rgba(68, 87, 229, 0.3)'
                                }}
                            >
                                Create Student Account <ArrowRight size={22} strokeWidth={3} style={{ marginLeft: '10px' }} />
                            </button>
                        </motion.div>
                    </motion.form>

                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                        <p style={{ color: colors.muted, fontSize: '15px', fontWeight: 700 }}>
                            Already have an account? <Link to="/login" style={{ color: colors.primary, fontWeight: '800', textDecoration: 'none', marginLeft: '6px' }}>Log In</Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
                input::placeholder { color: #94a3b8; font-weight: 500; }
                input:focus { border-color: ${colors.primary} !important; background: #fff !important; }
            `}</style>
        </div>
    );
};

export default SignupPage;
