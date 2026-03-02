import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, GraduationCap, Clock, Wallet, CheckCircle2, User, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        stream: 'Science',
        currentClass: '12th',
        budget: '',
        educationalLoanComfort: 'Medium',
        canAffordCoaching: false,
        openToAbroad: false,
    });

    const [message, setMessage] = useState({ type: '', text: '' }); // { type: 'success' | 'error', text: '' }

    const API_BASE = 'http://localhost:5000/api/user/profile';

    useEffect(() => {
        // Check local storage for user object
        const storedUser = localStorage.getItem('user');
        window.scrollTo(0, 0);

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setFormData({
                    fullName: parsedUser.fullName || '',
                    age: parsedUser.age || '',
                    stream: parsedUser.stream || 'Science',
                    currentClass: parsedUser.currentClass || '12th',
                    budget: parsedUser.annualBudget || '',
                    educationalLoanComfort: parsedUser.educationalLoanComfort || 'Medium',
                    canAffordCoaching: parsedUser.canAffordCoaching || false,
                    openToAbroad: parsedUser.openToAbroad || false,
                });
                setLoading(false);
            } catch (err) {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`${API_BASE}/${user?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                // Update local storage
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                const errData = await response.json();
                setMessage({ type: 'error', text: errData.message || 'Failed to update profile' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Server error. Please try again later.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
                <p style={{ color: '#fff' }}>Loading profile...</p>
            </div>
        );
    }

    const inputStyle = {
        width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.3s ease',
        boxSizing: 'border-box'
    };

    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: '#94a3b8' };

    const pillStyle = (name, val) => ({
        padding: '8px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
        background: formData[name] === val ? 'linear-gradient(135deg, #5b51d8, #38bdf8)' : 'rgba(255,255,255,0.05)',
        color: formData[name] === val ? '#fff' : '#cbd5e1', border: `1px solid ${formData[name] === val ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px'
    });

    return (
        <div style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 40px' }}>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '900px',
                    padding: '40px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
                            Student Profile
                        </h1>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px' }}>Manage your details to get personalized college recommendations.</p>
                    </div>

                    <div
                        onClick={() => navigate('/review')}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 24px rgba(91,81,216,0.3)',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Write a Review <ArrowRight size={16} />
                    </div>
                </div>

                {message.text && (
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        marginBottom: '24px',
                        background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                        color: message.type === 'success' ? '#4ade80' : '#f87171',
                        fontSize: '14px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {message.type === 'success' && <CheckCircle2 size={18} />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '32px' }}>

                    {/* Left Column: Basic Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#e2e8f0', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Personal Info</h3>

                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ ...inputStyle, paddingLeft: '44px' }} placeholder="Your Name" />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Email (Read Only)</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                <input type="email" value={user?.email || ''} disabled style={{ ...inputStyle, paddingLeft: '44px', opacity: 0.6, cursor: 'not-allowed' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Age</label>
                                <div style={{ position: 'relative' }}>
                                    <Clock size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} min="14" max="50" required style={{ ...inputStyle, paddingLeft: '44px' }} placeholder="18" />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Current Class</label>
                                <div style={{ position: 'relative' }}>
                                    <GraduationCap size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                    <select name="currentClass" value={formData.currentClass} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '44px', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}>
                                        <option value="11th" style={{ color: '#000' }}>11th</option>
                                        <option value="12th" style={{ color: '#000' }}>12th</option>
                                        <option value="Dropper" style={{ color: '#000' }}>Dropper</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Stream</label>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {['Science', 'Commerce', 'Arts'].map(str => (
                                    <div key={str} onClick={() => setFormData({ ...formData, stream: str })} style={pillStyle('stream', str)}>
                                        {str}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preferences */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#e2e8f0', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Preferences & Details</h3>

                        <div>
                            <label style={labelStyle}>Annual College Budget (in ₹ Lakhs)</label>
                            <div style={{ position: 'relative' }}>
                                <Wallet size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                <input type="number" name="budget" value={formData.budget} onChange={handleChange} required style={{ ...inputStyle, paddingLeft: '44px' }} placeholder="e.g., 5" />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Educational Loan Comfort</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['Low', 'Medium', 'High'].map(level => (
                                    <div key={level} onClick={() => setFormData({ ...formData, educationalLoanComfort: level })} style={pillStyle('educationalLoanComfort', level)}>
                                        {level}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginTop: '4px' }}>
                            <input type="checkbox" name="canAffordCoaching" checked={formData.canAffordCoaching} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#5b51d8', cursor: 'pointer' }} />
                            <span>Need / Can Afford Coaching</span>
                        </label>

                        <label style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                            <input type="checkbox" name="openToAbroad" checked={formData.openToAbroad} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#5b51d8', cursor: 'pointer' }} />
                            <Globe size={18} color="#94a3b8" />
                            <span>Open to Studying Abroad</span>
                        </label>

                        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                            <button
                                type="submit"
                                disabled={saving}
                                style={{
                                    width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
                                    color: '#fff', fontSize: '15px', fontWeight: 800, border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 8px 20px rgba(91,81,216,0.25)', transition: 'all 0.2s ease', opacity: saving ? 0.7 : 1
                                }}
                                onMouseEnter={e => !saving && (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseLeave={e => !saving && (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                {saving ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                </form>

            </motion.div>
        </div>
    );
};

export default ProfilePage;
