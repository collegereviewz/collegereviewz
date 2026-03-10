import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, GraduationCap, Clock, Wallet, CheckCircle2, User, Globe, ArrowRight, Sparkles, Award, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'activity'
    const [activity, setActivity] = useState({ reviews: [], scholarships: [] });
    const [loadingActivity, setLoadingActivity] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        stream: 'Science',
        currentClass: '12th',
        budget: '',
        phoneNumber: '',
        educationalLoanComfort: 'Medium',
        canAffordCoaching: false,
        openToAbroad: false,
    });

    const [message, setMessage] = useState({ type: '', text: '' }); // { type: 'success' | 'error', text: '' }

    const PROFILE_API = 'http://localhost:5000/api/user/profile';
    const ACTIVITY_API = 'http://localhost:5000/api/user/activity';

    const fetchActivity = async (userId) => {
        setLoadingActivity(true);
        try {
            const response = await fetch(`${ACTIVITY_API}/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setActivity(data);
            }
        } catch (err) {
            console.error("Error fetching activity:", err);
        } finally {
            setLoadingActivity(false);
        }
    };

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
                    phoneNumber: parsedUser.phoneNumber || '',
                    educationalLoanComfort: parsedUser.educationalLoanComfort || 'Medium',
                    canAffordCoaching: parsedUser.canAffordCoaching || false,
                    openToAbroad: parsedUser.openToAbroad || false,
                });
                fetchActivity(parsedUser._id);
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
            const response = await fetch(`${PROFILE_API}/${user?._id}`, {
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
                fetchActivity(user?._id);
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
        <div style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>

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
                    maxWidth: '800px',
                    padding: '24px 32px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                    <div>
                        <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
                            Student Profile
                        </h1>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Manage your details to get personalized college recommendations.</p>
                    </div>

                    <div
                        onClick={() => navigate('/WriteReview')}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '50px',
                            background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '13px',
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

                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                    <div
                        onClick={() => setActiveTab('profile')}
                        style={{
                            padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                            background: activeTab === 'profile' ? 'rgba(91,81,216,0.1)' : 'transparent',
                            color: activeTab === 'profile' ? '#5b51d8' : '#94a3b8',
                            transition: 'all 0.3s'
                        }}
                    >
                        My Profile
                    </div>
                    <div
                        onClick={() => setActiveTab('activity')}
                        style={{
                            padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                            background: activeTab === 'activity' ? 'rgba(56,189,248,0.1)' : 'transparent',
                            color: activeTab === 'activity' ? '#38bdf8' : '#94a3b8',
                            transition: 'all 0.3s'
                        }}
                    >
                        Activity Dashboard
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'profile' ? (
                        <motion.form
                            key="profile-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleUpdate}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
                        >
                            {/* Left Column: Basic Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#e2e8f0', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Personal Info</h3>

                                <div>
                                    <label style={labelStyle}>Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ ...inputStyle, paddingLeft: '44px' }} placeholder="John Doe" />
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
                                            <select name="currentClass" value={formData.currentClass} onChange={handleChange} style={{ ...inputStyle, paddingLeft: '44px', cursor: 'pointer', appearance: 'none' }}>
                                                <option value="11th">11th</option>
                                                <option value="12th">12th</option>
                                                <option value="Dropper">Dropper</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Phone Number</label>
                                    <div style={{ position: 'relative' }}>
                                        <Sparkles size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={{ ...inputStyle, paddingLeft: '44px' }} placeholder="+91 9876543210" />
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
                        </motion.form>
                    ) : (
                        <motion.div
                            key="activity-dashboard"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                        >
                            {/* Dashboard Highlights */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '12px', background: 'rgba(91,81,216,0.1)', borderRadius: '12px', color: '#5b51d8' }}>
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Scholarship Apps</p>
                                        <p style={{ margin: 0, color: '#fff', fontSize: '20px', fontWeight: 800 }}>{activity.scholarships.length}</p>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '12px', background: 'rgba(56,189,248,0.1)', borderRadius: '12px', color: '#38bdf8' }}>
                                        <MessageSquare size={24} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Reviews Published</p>
                                        <p style={{ margin: 0, color: '#fff', fontSize: '20px', fontWeight: 800 }}>{activity.reviews.length}</p>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '12px', background: activity.openToAbroad ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.1)', borderRadius: '12px', color: activity.openToAbroad ? '#22c55e' : '#94a3b8' }}>
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Study Abroad</p>
                                        <p style={{ margin: 0, color: activity.openToAbroad ? '#22c55e' : '#fff', fontSize: '18px', fontWeight: 800 }}>{activity.openToAbroad ? 'Opted In' : 'Not Opted'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Activity Lists */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                {/* Scholarships List */}
                                <div>
                                    <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Award size={18} color="#5b51d8" /> Applied Scholarships
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                                        {loadingActivity ? (
                                            <p style={{ color: '#64748b', fontSize: '14px' }}>Loading applications...</p>
                                        ) : activity.scholarships.length === 0 ? (
                                            <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>No scholarship applications yet.</p>
                                                <div onClick={() => navigate('/scholarship')} style={{ color: '#5b51d8', fontSize: '13px', marginTop: '8px', cursor: 'pointer', fontWeight: 700 }}>Apply Now</div>
                                            </div>
                                        ) : activity.scholarships.map((app, idx) => (
                                            <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>{app.course}</span>
                                                    <span style={{ fontSize: '10px', color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>NEW</span>
                                                </div>
                                                <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{app.specialization} • {app.location}</p>
                                                <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '11px' }}>Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div>
                                    <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MessageSquare size={18} color="#38bdf8" /> My Reviews
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                                        {loadingActivity ? (
                                            <p style={{ color: '#64748b', fontSize: '14px' }}>Loading reviews...</p>
                                        ) : activity.reviews.length === 0 ? (
                                            <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>You haven't written any reviews yet.</p>
                                                <div onClick={() => navigate('/WriteReview')} style={{ color: '#38bdf8', fontSize: '13px', marginTop: '8px', cursor: 'pointer', fontWeight: 700 }}>Write your first!</div>
                                            </div>
                                        ) : activity.reviews.map((post, idx) => (
                                            <div key={idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <p style={{ margin: '0 0 8px', color: '#e2e8f0', fontSize: '13px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                                                    {post.content}
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <span style={{ fontSize: '11px', color: '#64748b' }}>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        {post.hashtags?.slice(0, 2).map((h, i) => (
                                                            <span key={i} style={{ fontSize: '10px', color: '#38bdf8' }}>#{h}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default ProfilePage;
