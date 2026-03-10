import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Sparkles, ArrowRight, CheckCircle2, Wallet, X, Eye, EyeOff } from 'lucide-react';
import logoImg from '../assets/logo6.png';
import Swal from 'sweetalert2';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);

    React.useEffect(() => {
        setMode(initialMode);
    }, [initialMode, isOpen]);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        fullName: '', email: '', password: '', phoneNumber: '', age: 18,
        stream: '', currentClass: '', annualBudget: '', loanComfort: '',
        canAffordCoaching: false, openToAbroad: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const colors = {
        primary: '#3b51d8', gradientStart: '#4457e5', gradientEnd: '#4ec7ed',
        card: '#ffffff', inputBg: '#f8fafc', text: '#1e293b', muted: '#64748b', label: '#0f172a'
    };

    const categories = {
        stream: ['Science', 'Arts', 'Commerce', 'Other'],
        loanComfort: ['Yes', 'Maybe', 'No'],
        currentClass: ['10th', '11th', '12th', 'Graduate', 'Post-Grad']
    };

    const handleSelect = (name, value) => {
        setSignupData(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const handleSignupChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.dispatchEvent(new Event('userLogin'));
                setIsSuccess(true);
                
                // Show Welcome Toast
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `Welcome, ${data.user.fullName}`,
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    background: '#fff',
                    color: '#1e293b',
                    customClass: {
                        popup: 'rounded-xl shadow-lg border-2 border-[#10b981]'
                    }
                });

                setTimeout(() => {
                    onClose();
                    setIsSuccess(false);
                }, 1000);
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) { alert('Something went wrong. Please try again.'); }
        finally { setIsLoading(false); }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...signupData, educationalLoanComfort: signupData.loanComfort })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.dispatchEvent(new Event('userLogin'));
                setIsSuccess(true);

                // Show Welcome Toast
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `Welcome, ${data.user.fullName}`,
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    background: '#fff',
                    color: '#1e293b',
                    customClass: {
                        popup: 'rounded-xl shadow-lg border-2 border-[#10b981]'
                    }
                });

                setTimeout(() => {
                    onClose();
                    setIsSuccess(false);
                }, 1000);
            } else { alert(data.message || 'Signup failed'); }
        } catch (err) { alert('Something went wrong. Please try again.'); }
        finally { setIsLoading(false); }
    };

    const inputStyle = {
        width: '100%', background: colors.inputBg, border: '1px solid #e5e7eb',
        borderRadius: '12px', padding: '10px 14px 10px 40px', color: '#1e293b',
        fontSize: '14px', fontWeight: '500', outline: 'none', transition: 'all 0.2s ease'
    };

    const labelStyle = { fontSize: '13px', fontWeight: '800', color: colors.label, marginBottom: '6px', display: 'block' };

    const pillStyle = (name, val) => ({
        padding: '8px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.2s',
        background: signupData[name] === val ? 'rgba(59, 81, 216, 0.1)' : colors.inputBg,
        color: signupData[name] === val ? colors.primary : colors.muted,
        border: `1.5px solid ${signupData[name] === val ? colors.primary : '#e5e7eb'}`,
        display: 'flex', alignItems: 'center', gap: '6px'
    });

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '20px'
            }}>
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    style={{
                        width: '95%', 
                        maxWidth: mode === 'login' ? '460px' : '900px',
                        maxHeight: '98vh',
                        background: colors.card, 
                        borderRadius: '24px', 
                        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)',
                        overflow: 'hidden', 
                        position: 'relative', 
                        display: 'flex', 
                        flexDirection: 'column'
                    }}
                >
                    <div style={{
                        background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                        padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img src={logoImg} alt="Logo" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', margin: 0 }}>
                                {mode === 'login' ? 'Sign In' : 'Join Community'}
                            </h2>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', color: '#fff' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div 
                        className="no-scrollbar"
                        style={{ 
                            padding: mode === 'login' ? '32px' : '24px 32px', 
                            overflowY: 'auto', 
                            flex: 1,
                            position: 'relative'
                        }}
                    >
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    style={{
                                        position: 'absolute', inset: 0, zIndex: 100,
                                        background: 'rgba(255,255,255,0.9)',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <motion.div
                                        initial={{ rotate: -90, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ type: 'spring', damping: 12 }}
                                        style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: '#fff' }}
                                    >
                                        <CheckCircle2 size={48} />
                                    </motion.div>
                                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', margin: '0 0 10px 0' }}>Success!</h3>
                                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#64748b', margin: 0 }}>
                                        {mode === 'login' ? 'Welcome back to CollegeReviewZ' : 'Your account has been created'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {mode === 'login' ? (
                                    <>
                                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                            <div>
                                                <label style={labelStyle}>Email ID Or Phone Number</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                                    <input type="text" name="email" placeholder="Enter details" style={inputStyle} value={loginData.email} onChange={handleLoginChange} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Password</label>
                                                <div style={{ position: 'relative' }}>
                                                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter password" style={{ ...inputStyle, paddingRight: '52px' }} value={loginData.password} onChange={handleLoginChange} required />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </div>
                                                    <button 
                                                        disabled={isLoading}
                                                        type="submit" 
                                                        style={{ 
                                                            width: '100%', padding: '16px', borderRadius: '16px', 
                                                            background: `linear-gradient(90deg, #4457e5, #4ec7ed)`, 
                                                            color: '#fff', border: 'none', fontSize: '17px', fontWeight: 800, 
                                                            cursor: isLoading ? 'not-allowed' : 'pointer', 
                                                            boxShadow: '0 10px 20px rgba(68, 87, 229, 0.2)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                                                        }}
                                                    >
                                                        {isLoading ? (
                                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'flex' }}><Sparkles size={20} /></motion.div>
                                                        ) : (
                                                            <>Sign In <ArrowRight size={20} /></>
                                                        )}
                                                    </button>
                                        </form>
                                        <div style={{ textAlign: 'center', marginTop: '32px' }}>
                                            <p style={{ color: colors.muted, fontSize: '14px', fontWeight: 700 }}>Already have an account? <span onClick={() => setMode('signup')} style={{ color: colors.primary, cursor: 'pointer' }}>Create Account</span></p>
                                        </div>
                                    </>
                                ) : (
                                    <form 
                                        onSubmit={handleSignup} 
                                        className="signup-form-grid"
                                        style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                                            gap: '24px' 
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: 900, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Profile Basics</div>
                                            <div>
                                                <label style={labelStyle}>Full Name</label>
                                                <div style={{ position: 'relative' }}>
                                                    <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                                    <input type="text" name="fullName" placeholder="Full Name" style={inputStyle} value={signupData.fullName} onChange={handleSignupChange} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Email Address</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                                    <input type="email" name="email" placeholder="Email" style={inputStyle} value={signupData.email} onChange={handleSignupChange} required />
                                                </div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                <div>
                                                    <label style={labelStyle}>Age</label>
                                                    <input type="number" name="age" style={{ ...inputStyle, paddingLeft: '16px' }} value={signupData.age} onChange={handleSignupChange} />
                                                </div>
                                                <div>
                                                    <label style={labelStyle}>Phone</label>
                                                    <input type="tel" name="phoneNumber" placeholder="Phone" style={{ ...inputStyle, paddingLeft: '16px' }} value={signupData.phoneNumber} onChange={handleSignupChange} required />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Password</label>
                                                <div style={{ position: 'relative' }}>
                                                    <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: colors.muted }} size={18} />
                                                    <input type="password" name="password" placeholder="••••••••" style={inputStyle} value={signupData.password} onChange={handleSignupChange} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: 900, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Budget & Academic</div>
                                            <div>
                                                <label style={labelStyle}>Stream</label>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{categories.stream.map(s => <button key={s} type="button" onClick={() => handleSelect('stream', s)} style={pillStyle('stream', s)}>{s}</button>)}</div>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Study Level</label>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{categories.currentClass.map(c => <button key={c} type="button" onClick={() => handleSelect('currentClass', c)} style={pillStyle('currentClass', c)}>{c}</button>)}</div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
                                                <div><label style={labelStyle}>Budget (INR)</label><input type="text" name="annualBudget" placeholder="e.g. 5L" style={{ ...inputStyle, paddingLeft: '16px' }} value={signupData.annualBudget} onChange={handleSignupChange} /></div>
                                                <div><label style={labelStyle}>Loan Comfort</label><div style={{ display: 'flex', gap: '4px' }}>{categories.loanComfort.map(l => <button key={l} type="button" onClick={() => handleSelect('loanComfort', l)} style={{ ...pillStyle('loanComfort', l), padding: '8px' }}>{l}</button>)}</div></div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1, background: colors.inputBg, padding: '10px', borderRadius: '14px', border: `1px solid ${signupData.canAffordCoaching ? colors.primary : '#e5e7eb'}` }}>
                                                    <input type="checkbox" name="canAffordCoaching" checked={signupData.canAffordCoaching} onChange={handleSignupChange} style={{ accentColor: colors.primary }} />
                                                    <span style={{ fontSize: '12px', fontWeight: 800 }}>Coaching?</span>
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1, background: colors.inputBg, padding: '10px', borderRadius: '14px', border: `1px solid ${signupData.openToAbroad ? colors.primary : '#e5e7eb'}` }}>
                                                    <input type="checkbox" name="openToAbroad" checked={signupData.openToAbroad} onChange={handleSignupChange} style={{ accentColor: colors.primary }} />
                                                    <span style={{ fontSize: '12px', fontWeight: 800 }}>Abroad?</span>
                                                </label>
                                            </div>
                                        </div>
                                        <motion.div style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
                                            <motion.button 
                                                disabled={isLoading}
                                                whileHover={!isLoading ? { scale: 1.01, translateY: -2 } : {}}
                                                whileTap={!isLoading ? { scale: 0.98 } : {}}
                                                type="submit" 
                                                style={{ 
                                                    width: '100%', padding: '14px', borderRadius: '14px', 
                                                    background: `linear-gradient(90deg, #4457e5, #4ec7ed)`, 
                                                    color: '#fff', border: 'none', fontSize: '16px', fontWeight: 800, 
                                                    cursor: isLoading ? 'not-allowed' : 'pointer', 
                                                    boxShadow: '0 10px 20px rgba(68, 87, 229, 0.2)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                                                }}
                                            >
                                                {isLoading ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'flex' }}><Sparkles size={18} /></motion.div>
                                                ) : (
                                                    <>Create Account <ArrowRight size={18} /></>
                                                )}
                                            </motion.button>
                                            <p style={{ textAlign: 'center', marginTop: '12px', color: colors.muted, fontSize: '13px', fontWeight: 700 }}>Already have an account? <span onClick={() => setMode('login')} style={{ color: colors.primary, cursor: 'pointer' }}>Log In</span></p>
                                        </motion.div>
                                    </form>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
                    input::placeholder { color: #94a3b8; font-weight: 500; }
                    input:focus { border-color: ${colors.primary} !important; background: #fff !important; }
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    
                    @media (max-width: 768px) {
                        .signup-form-grid {
                            grid-template-columns: 1fr !important;
                            gap: 20px !important;
                        }
                    }
                `}</style>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
