import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
    Star, Mail, Phone, Edit, Eye, PenSquare, CheckCircle, Wallet, Hourglass, 
    LayoutDashboard, Bookmark, Target, Home, School, BookOpen, FileText, 
    Award, Plane, HelpCircle, ChevronDown, User, LogOut, Search, Settings, 
    ShieldCheck, Bell, ChevronRight, PieChart, BarChart2, Briefcase, GraduationCap,
    MessageSquare, Clock, Globe, ArrowRight, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo6.png';
import careerTestImg from '../assets/career_test.png';
import collegePredictorImg from '../assets/college_predictor.png';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('My Dashboard');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activity, setActivity] = useState({ reviews: [], scholarships: [] });
    const [loadingActivity, setLoadingActivity] = useState(false);
    const dropdownRef = useRef(null);

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
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                
                // Fetch latest profile data from server to get accurate stats
                const fetchProfile = async () => {
                    try {
                        const response = await fetch(`${PROFILE_API}/${parsedUser._id}`);
                        if (response.ok) {
                            const freshUser = await response.json();
                            setUser(freshUser);
                            localStorage.setItem('user', JSON.stringify(freshUser));
                            setFormData({
                                fullName: freshUser.fullName || '',
                                age: freshUser.age || '',
                                stream: freshUser.stream || 'Science',
                                currentClass: freshUser.currentClass || '12th',
                                budget: freshUser.annualBudget || '',
                                phoneNumber: freshUser.phoneNumber || '',
                                educationalLoanComfort: freshUser.educationalLoanComfort || 'Medium',
                                canAffordCoaching: freshUser.canAffordCoaching || false,
                                openToAbroad: freshUser.openToAbroad || false,
                            });
                        } else {
                            setUser(parsedUser); // Fallback
                        }
                    } catch (error) {
                        console.error("Error fetching fresh profile:", error);
                        setUser(parsedUser); // Fallback
                    } finally {
                        setLoading(false);
                    }
                };

                fetchProfile();
                fetchActivity(parsedUser._id);
            } catch (err) {
                window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }));
                navigate('/');
            }
        } else {
            window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }));
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setIsEditModalOpen(false);
                fetchActivity(user?._id);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    if (loading || !user) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#5b51d8', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
        );
    }

    const sidebarItems = [
        { name: 'My Dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Saved Colleges', icon: <Bookmark size={20} /> },
        { name: 'College Predictor', icon: <Target size={20} /> },
        { name: 'Home', icon: <Home size={20} />, path: '/' },
        { name: 'Colleges', icon: <School size={20} />, path: '/ExploreColleges/' },
        { name: 'Courses', icon: <BookOpen size={20} />, path: '/Courses/' },
        { name: 'Exam', icon: <FileText size={20} />, path: '/exams/' },
        { name: 'Scholarship', icon: <Award size={20} />, path: '/Scholarship/' },
        { name: 'Study Abroad', icon: <Plane size={20} />, path: '/StudyAbroad/' },
        { name: 'Contact Us', icon: <Phone size={20} />, path: '/Contact/' },
    ];

    const statsCards = [
        { label: 'Total Reviews', value: activity.reviews?.length || 0, sub: 'All', icon: <Star size={24} />, color: '#5b51d8', bg: '#eef2ff' },
        { label: 'Approval Rate', value: `${user?.approvalRate || 0}%`, sub: 'Rating Review', icon: <CheckCircle size={24} />, color: '#10b981', bg: '#f0fdf4' },
        { label: 'Total Earnings', value: `₹${(user?.totalEarnings || 0).toLocaleString('en-IN')}`, sub: 'Completed', icon: <Wallet size={24} />, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Pending', value: `₹${(user?.pendingEarnings || 0).toLocaleString('en-IN')}`, sub: 'Complete & earn', icon: <Hourglass size={24} />, color: '#f97316', bg: '#fff7ed' },
    ];

    const cleanEmail = (email) => email ? email.replace(/^mailto\s*:?\s*/i, '') : 'Not provided';

    return (
        <div style={{ minHeight: '100vh', background: '#fff', display: 'flex' }}>
            {/* Full Page Sidebar */}
            <aside id="sidebar-aside" style={{
                width: '280px',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 0,
                height: '100vh',
                borderRight: '1px solid #f1f5f9',
                zIndex: 100,
            }}>
                <div 
                    style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <img src={logoImg} alt="Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px' }}>CollegeReviewZ</span>
                </div>

                <nav style={{ padding: '0 16px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', padding: '0 16px', marginBottom: '8px', letterSpacing: '1px' }}>Dashboard Menu</p>
                    {sidebarItems.map((item) => (
                        <div 
                            key={item.name}
                            onClick={() => {
                                if (item.path) navigate(item.path);
                                else setActiveTab(item.name);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: activeTab === item.name ? 700 : 500,
                                color: activeTab === item.name ? '#5b51d8' : '#64748b',
                                background: activeTab === item.name ? '#f5f3ff' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                marginBottom: '2px'
                            }}
                        >
                            <span style={{ color: activeTab === item.name ? '#5b51d8' : '#cbd5e1' }}>{item.icon}</span>
                            {item.name}
                        </div>
                    ))}
                </nav>

            </aside>

            {/* Main Content Area */}
            <main id="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: 'calc(100% - 280px)' }}>
                {/* Header Top Bar - Non-sticky (Scrolls with page) */}
                <header id="header-topbar" style={{
                    padding: '12px 40px',
                    background: '#fff',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 90
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #f5f3ff, #eef2ff)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LayoutDashboard size={18} color="#5b51d8" />
                        </div>
                        <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Student Dashboard</h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ position: 'relative' }} ref={dropdownRef}>
                            <div 
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '6px 12px',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '50px',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                                    {user.fullName[0].toUpperCase()}
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{user.fullName}</span>
                                <ChevronDown size={16} />
                            </div>

                            <AnimatePresence>
                                {isProfileDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        style={{
                                            position: 'absolute',
                                            top: '120%',
                                            right: 0,
                                            minWidth: '220px',
                                            width: 'max-content',
                                            maxWidth: '350px',
                                            background: '#fff',
                                            borderRadius: '16px',
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                            border: '1px solid #e2e8f0',
                                            padding: '8px',
                                            zIndex: 1000
                                        }}
                                    >
                                        <div style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
                                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Logged in as</p>
                                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{user.email}</p>
                                        </div>
                                        <div 
                                            onClick={handleLogout}
                                            style={{ padding: '10px 12px', borderRadius: '8px', color: '#ef4444', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                                        >
                                            <LogOut size={16} /> Logout
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <div id="content-container" style={{ padding: '20px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1600px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
                    
                    <div id="profile-header-card" style={{
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '24px',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '24px',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '24px',
                                background: '#f1f5f9',
                                overflow: 'hidden',
                                border: '4px solid #fff',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={64} color="#5b51d8" />
                                </div>
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '4px',
                                right: '4px',
                                width: '18px',
                                height: '18px',
                                background: '#4ade80',
                                border: '3px solid #fff',
                                borderRadius: '50%'
                            }}></div>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div id="profile-header-title-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', margin: 0 }}>{user.fullName}</h2>
                                <span style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Active</span>
                            </div>
                            
                            <div id="profile-header-stats-badges" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                                    <ShieldCheck size={16} /> ID: {user.studentId || 'CR83748'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                                    <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div> {user.isVerified ? 'Verified Student' : 'Non-verified'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                                    <Award size={16} color="#5b51d8" /> {user.isTopReviewer ? 'Top Reviewer' : 'Expert Student'}
                                </div>
                            </div>

                            <div id="profile-header-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                <div style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={16} color="#5b51d8" />
                                    <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: 700 }}>{user.email}</span>
                                </div>
                                <div style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Phone size={16} color="#64748b" />
                                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>{user.phoneNumber || 'Not provided'}</span>
                                </div>
                                <div style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <GraduationCap size={16} color="#64748b" />
                                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>{user.currentClass || '12th'} • {user.stream || 'Science'}</span>
                                </div>
                                <div style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Wallet size={16} color="#64748b" />
                                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                                        ₹{user.annualBudget ? (parseInt(user.annualBudget) > 1000 ? parseInt(user.annualBudget).toLocaleString('en-IN') : user.annualBudget + 'L') : '0'} Budget
                                    </span>
                                </div>
                            </div>
                            
                            <div id="profile-header-action-btns-desktop" style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button 
                                    onClick={() => setIsEditModalOpen(true)}
                                    style={{ padding: '10px 24px', background: '#5b51d8', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(91, 81, 216, 0.2)' }}
                                >
                                    <Edit size={16} /> Edit Profile
                                </button>
                                <button style={{ padding: '10px 24px', background: '#f5f3ff', color: '#5b51d8', border: '1px solid #ddd6fe', borderRadius: '12px', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <Eye size={16} /> Activity History
                                </button>
                            </div>
                        </div>

                        <div id="profile-header-action-btns-absolute" style={{ position: 'absolute', top: '32px', right: '32px', display: 'flex', gap: '12px' }}>
                            <button onClick={() => navigate('/WriteReview/')} style={{ padding: '12px 24px', background: '#5b51d8', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '14px', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <PenSquare size={18} /> Write New Review
                            </button>
                            <button style={{ padding: '12px 24px', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '14px', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Eye size={18} /> Complete Pending Review
                            </button>
                        </div>
                    </div>

                    {/* Overview Stats Row */}
                    <div id="top-overview-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {statsCards.map((card, i) => (
                            <div key={i} style={{
                                background: '#fff',
                                borderRadius: '24px',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ 
                                    width: '56px', height: '56px', 
                                    background: card.bg, 
                                    borderRadius: '16px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: card.color 
                                }}>
                                    {card.icon}
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>{card.label}</p>
                                    <p style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#1e293b' }}>{card.value}</p>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '20px' }}>{card.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Career & Services Grid */}
                    <div id="career-services-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '24px', marginBottom: '20px' }}>
                        {/* Career Test Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
                            <div style={{ flex: 1, zIndex: 1 }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>Career Test</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#64748b', fontWeight: 700 }}>Career Prediction: <span style={{ color: '#1e293b' }}>Data Analyst</span></p>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#64748b', fontWeight: 700 }}>Salary Estimate: <span style={{ color: '#1e293b' }}>₹9 – 12 LPA</span></p>
                                </div>
                                <button style={{ 
                                    padding: '12px 28px', 
                                    background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '50px', 
                                    fontWeight: 800, 
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => window.open('https://collegereview.io/', '_blank')}
                                >Start Career Test</button>
                            </div>
                            <div style={{ width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={careerTestImg} alt="Career Test" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>

                        {/* Scholarships Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>Scholarships</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Target size={16} color="#5b51d8" />
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>4 Eligible Scholarships</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Award size={16} color="#5b51d8" />
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Earn Scholarship</span>
                                </div>
                            </div>
                            <button style={{ 
                                width: '100%',
                                padding: '12px', 
                                background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '50px', 
                                fontWeight: 800, 
                                fontSize: '14px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)'
                             }}
                             onClick={() => navigate('/Scholarship/')}
                             >Apply Now For Scholarship</button>
                        </div>

                        {/* College Predictor Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
                            <div style={{ flex: 1, zIndex: 1 }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>College Predictor</h3>
                                <div style={{ marginBottom: '32px' }}>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#64748b', fontWeight: 700 }}>JEE Rank: <span style={{ color: '#1e293b' }}>5,705</span></p>
                                </div>
                                <button style={{ 
                                    padding: '12px 28px', 
                                    background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '50px', 
                                    fontWeight: 800, 
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)'
                                }}>Check Colleges</button>
                            </div>
                            <div style={{ width: '220px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={collegePredictorImg} alt="College Predictor" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>

                        {/* Educational Loan Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>Educational Loan</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Target size={16} color="#5b51d8" />
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Loan Eligibility Check</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Briefcase size={16} color="#5b51d8" />
                                    </div>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Loan Eligibility Assistance</span>
                                </div>
                            </div>
                            <button style={{ 
                                width: '100%',
                                padding: '12px', 
                                background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '50px', 
                                fontWeight: 800, 
                                fontSize: '14px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)'
                            }}>Apply Now For Loan</button>
                        </div>
                    </div>
                    

                    {/* Earnings & Analytics Section */}
                    <div id="earnings-analytics-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.1fr) minmax(0, 1fr)', gap: '24px' }}>
                        
                        {/* Earnings & Payments Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', margin: 0 }}>Earnings & Payments</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#64748b', fontSize: '13px', fontWeight: 700 }}>
                                    View All <ChevronRight size={16} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1px', background: '#f1f5f9', borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9', marginBottom: '24px' }}>
                                <div style={{ background: '#fff', padding: '14px 20px', flex: 1, minWidth: 'max-content', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', whiteSpace: 'nowrap' }}>Total Earned</p>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>₹{(user?.totalEarnings || 0).toLocaleString('en-IN')}</p>
                                </div>
                                <div style={{ background: '#fff', padding: '14px 20px', flex: 1, minWidth: 'max-content', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', whiteSpace: 'nowrap' }}>Paid</p>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#10b981' }}>₹{(Math.max(0, (user?.totalEarnings || 0) - (user?.pendingEarnings || 0))).toLocaleString('en-IN')}</p>
                                </div>
                                <div style={{ background: '#fff', padding: '14px 20px', flex: 1, minWidth: 'max-content', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', whiteSpace: 'nowrap' }}>Pending</p>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#f97316' }}>₹{(user?.pendingEarnings || 0).toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>Recent Payments</h4>
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', textAlign: 'left', position: 'sticky', top: 0, zIndex: 1 }}>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Recent Payments</th>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Amount</th>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Status</th>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Expected Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activity.reviews?.length > 0 ? activity.reviews.map((review, i) => (
                                                <tr key={i} style={{ borderBottom: i === (activity.reviews.length - 1) ? 'none' : '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                                                        Review Reward: {review.collegeName}
                                                    </td>
                                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                                                        ₹{review.status === 'Approved' ? '100' : '50'}
                                                    </td>
                                                    <td style={{ padding: '16px 20px' }}>
                                                        <span style={{ 
                                                            padding: '4px 10px', 
                                                            background: review.status === 'Approved' ? '#f0fdf4' : (review.status === 'Rejected' ? '#fef2f2' : '#fff7ed'), 
                                                            color: review.status === 'Approved' ? '#10b981' : (review.status === 'Rejected' ? '#ef4444' : '#f97316'), 
                                                            borderRadius: '50px', 
                                                            fontSize: '11px', 
                                                            fontWeight: 800 
                                                        }}>
                                                            {review.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                                                        {new Date(review.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="4" style={{ padding: '24px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                                                        No reward history yet. Start reviewing colleges to earn!
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Payment Analytics Card */}
                        <div id="payment-analytics-card" style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', margin: 0 }}>Payment Analytics</h3>
                            </div>
                            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '32px' }}>Total vs Received vs Pending</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                                {/* Bar Chart - Stacked */}
                                <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '32px 24px 24px 24px', position: 'relative', height: '220px', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', border: '1px solid #f1f5f9' }}>
                                    {(() => {
                                        const total = user?.totalEarnings || 0;
                                        const pending = user?.pendingEarnings || 0;
                                        const received = Math.max(0, total - pending);
                                        const max = Math.max(total, pending, received, 1);
                                        return (
                                            <>
                                                <div style={{ width: '40px', height: `${(total / max) * 100}%`, background: '#3b82f6', borderRadius: '6px 6px 0 0', position: 'relative', transition: 'height 1s ease', zIndex: 1 }}>
                                                    <span style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 900, color: '#3b82f6' }}>{total.toLocaleString('en-IN')}</span>
                                                </div>
                                                <div style={{ width: '40px', height: `${(received / max) * 100}%`, background: '#10b981', borderRadius: '6px 6px 0 0', position: 'relative', transition: 'height 1s ease', zIndex: 1 }}>
                                                    <span style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 900, color: '#10b981' }}>{received.toLocaleString('en-IN')}</span>
                                                </div>
                                                <div style={{ width: '40px', height: `${(pending / max) * 100}%`, background: '#f59e0b', borderRadius: '6px 6px 0 0', position: 'relative', transition: 'height 1s ease', zIndex: 1 }}>
                                                    <span style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontWeight: 900, color: '#f59e0b' }}>{pending.toLocaleString('en-IN')}</span>
                                                </div>
                                            </>
                                        );
                                    })()}
                                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: '25%', borderBottom: '1px dashed #e2e8f0', zIndex: 0 }}></div>
                                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: '50%', borderBottom: '1px dashed #e2e8f0', zIndex: 0 }}></div>
                                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: '75%', borderBottom: '1px dashed #e2e8f0', zIndex: 0 }}></div>
                                </div>

                                {/* Donut Chart - Stacked */}
                                <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '220px' }}>
                                    {(() => {
                                        const received = user?.totalEarnings || 0;
                                        const pending = user?.pendingEarnings || 0;
                                        const sumTotal = received + pending;
                                        const recPerc = sumTotal === 0 ? 0 : (received / sumTotal) * 100;
                                        return (
                                            <div style={{ 
                                                width: '120px', 
                                                height: '120px', 
                                                borderRadius: '50%', 
                                                background: sumTotal === 0 ? '#f1f5f9' : `conic-gradient(#10b981 0% ${recPerc}%, #f59e0b ${recPerc}% 100%)`, 
                                                position: 'relative', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                marginBottom: '20px',
                                                transition: 'background 1s ease'
                                            }}>
                                                <div style={{ width: '70%', height: '70%', background: '#fff', borderRadius: '50%' }}></div>
                                            </div>
                                        );
                                    })()}
                                    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#10b981' }}></div>
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Received</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b' }}></div>
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Pending</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities Section */}
                    <div id="recent-activity-section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px', marginBottom: '40px' }}>
                        
                        {/* Review Overview Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', margin: 0 }}>Review</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#64748b', fontSize: '13px', fontWeight: 700 }}>
                                    View All <ChevronRight size={16} />
                                </div>
                            </div>

                            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
                                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>Recent Reviews</h4>
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', textAlign: 'left', position: 'sticky', top: 0, zIndex: 1 }}>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Review</th>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Status</th>
                                                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', borderBottom: '1px solid #f1f5f9' }}>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activity.reviews?.length > 0 ? activity.reviews.map((review, i) => (
                                                <tr key={i} style={{ borderBottom: i === (activity.reviews.length - 1) ? 'none' : '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                                                        {review.collegeName || 'Anonymous Review'}
                                                    </td>
                                                    <td style={{ padding: '16px 20px' }}>
                                                        <span style={{ 
                                                            padding: '4px 10px', 
                                                            background: review.status === 'Approved' ? '#f0fdf4' : (review.status === 'Rejected' ? '#fef2f2' : '#fff7ed'), 
                                                            color: review.status === 'Approved' ? '#10b981' : (review.status === 'Rejected' ? '#ef4444' : '#f97316'), 
                                                            borderRadius: '50px', 
                                                            fontSize: '11px', 
                                                            fontWeight: 800 
                                                        }}>
                                                            {review.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
                                                        {new Date(review.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3" style={{ padding: '32px 20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>
                                                        No reviews found. Post your first review to earn!
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Review Analytics Card */}
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', margin: 0 }}>Review Analytics</h3>
                            </div>
                            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '32px' }}>Total Reviews vs Unique College Coverage</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '24px', marginBottom: '32px' }}>
                                {/* Bar Chart */}
                                <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '32px 24px 24px 24px', position: 'relative', height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', border: '1px solid #f1f5f9' }}>
                                    {(() => {
                                        const total = activity.reviews?.length || 0;
                                        const uniqueCount = new Set(activity.reviews?.map(r => r.collegeName)).size;
                                        const max = Math.max(total, 1);
                                        return (
                                            <>
                                                <div style={{ width: '45px', height: `${(total / max) * 100}%`, background: '#3b82f6', borderRadius: '8px 8px 0 0', transition: 'height 1s ease', position: 'relative', zIndex: 1, boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)' }}>
                                                    <span style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', fontWeight: 900, color: '#3b82f6' }}>{total}</span>
                                                </div>
                                                <div style={{ width: '45px', height: `${(uniqueCount / max) * 100}%`, background: '#6366f1', borderRadius: '8px 8px 0 0', transition: 'height 1s ease', position: 'relative', zIndex: 1, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)' }}>
                                                    <span style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', fontWeight: 900, color: '#6366f1' }}>{uniqueCount}</span>
                                                </div>
                                            </>
                                        );
                                    })()}
                                    
                                    {/* Labels */}
                                    <div style={{ position: 'absolute', bottom: '-26px', left: 0, right: 0, display: 'flex', justifyContent: 'space-around' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</span>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unique</span>
                                    </div>

                                    {/* Guide Lines */}
                                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: '25%', borderBottom: '1px dashed #e2e8f0', zIndex: 0 }}></div>
                                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: '50%', borderBottom: '1px dashed #e2e8f0', zIndex: 0 }}></div>
                                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: '75%', borderBottom: '1px dashed #e2e8f0', zIndex: 0 }}></div>
                                </div>

                                {/* Donut Chart - Repurposed for Unique vs Total ratio */}
                                <div style={{ background: '#fff', borderRadius: '20px', padding: '16px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    {(() => {
                                        const total = activity.reviews?.length || 0;
                                        const uniqueCount = new Set(activity.reviews?.map(r => r.collegeName)).size;
                                        const uniquePerc = total === 0 ? 0 : (uniqueCount / total) * 100;
                                        return (
                                            <div style={{ 
                                                width: '120px', 
                                                height: '120px', 
                                                borderRadius: '50%', 
                                                background: total === 0 ? '#f1f5f9' : `conic-gradient(#6366f1 0% ${uniquePerc}%, #3b82f6 ${uniquePerc}% 100%)`, 
                                                position: 'relative', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                transition: 'background 1s ease'
                                            }}>
                                                <div style={{ width: '70%', height: '70%', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{Math.round(uniquePerc)}%</span>
                                                    <span style={{ fontSize: '8px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Coverage</span>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginTop: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3b82f6' }}></div>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Total Reviews</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#6366f1' }}></div>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Unique Colleges</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {(() => {
                                const total = activity.reviews?.length || 0;
                                const uniqueCount = new Set(activity.reviews?.map(r => r.collegeName)).size;
                                return (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Total Reviews</p>
                                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>{total}</p>
                                        </div>
                                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                            <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Unique Colleges</p>
                                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#3b82f6' }}>{uniqueCount}</p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isEditModalOpen && (
                        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', margin: 0 }}>Edit Profile</h2>
                                    <button onClick={() => setIsEditModalOpen(false)} style={{ border: 'none', background: '#f1f5f9', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} /></button>
                                </div>

                                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Login Email (Permanent)</label>
                                            <input type="email" value={user.email} disabled style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#94a3b8', outline: 'none', cursor: 'not-allowed' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Full Name</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} placeholder="Your Name" />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Phone Number</label>
                                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} placeholder="+91" />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Age</label>
                                            <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Current Class</label>
                                            <select name="currentClass" value={formData.currentClass} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}>
                                                <option value="11th">11th</option>
                                                <option value="12th">12th</option>
                                                <option value="Dropper">Dropper</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Annual Budget (Lakhs)</label>
                                        <input type="number" name="budget" value={formData.budget} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                            <input type="checkbox" name="canAffordCoaching" checked={formData.canAffordCoaching} onChange={handleChange} />
                                            <span style={{ fontSize: '14px', fontWeight: 600 }}>Need Coaching Assistance</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                            <input type="checkbox" name="openToAbroad" checked={formData.openToAbroad} onChange={handleChange} />
                                            <span style={{ fontSize: '14px', fontWeight: 600 }}>Open to Studying Abroad</span>
                                        </label>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        style={{ width: '100%', padding: '16px', background: '#5b51d8', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer' }}
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                /* Tablet / Mobile Layout Fixes */
                @media (max-width: 1024px) {
                    #sidebar-aside { width: 80px !important; }
                    #sidebar-aside span:last-child { display: none; }
                    #sidebar-aside p { display: none; }
                    #main-content { width: calc(100% - 80px) !important; }
                    #header-topbar, #content-container { padding: 20px !important; }
                    #top-overview-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    #career-services-grid { grid-template-columns: 1fr !important; }
                    #earnings-analytics-grid { grid-template-columns: 1fr !important; }
                    #recent-activity-section-grid { grid-template-columns: 1fr !important; }
                }

                @media (max-width: 768px) {
                    #sidebar-aside { display: none !important; }
                    #main-content { width: 100% !important; }
                    #header-topbar { padding: 12px 20px !important; }
                    #profile-header-card { 
                        flex-direction: column !important; 
                        padding: 24px !important; 
                        text-align: center !important; 
                        gap: 20px !important; 
                    }
                    #profile-header-card > div:first-child { margin: 0 auto; }
                    #profile-header-title-row, #profile-header-stats-badges { 
                        justify-content: center !important; 
                        flex-wrap: wrap !important; 
                    }
                    #profile-header-action-btns-desktop { justify-content: center !important; }
                    #profile-header-action-btns-absolute { 
                        position: static !important; 
                        margin-top: 20px !important; 
                        justify-content: center !important;
                        flex-direction: column !important;
                        width: 100% !important;
                    }
                    #profile-header-action-btns-absolute button { width: 100% !important; }
                    #top-overview-stats-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                    
                    /* Secondary cards fixes */
                    [style*="Career Test"], [style*="College Predictor"] {
                        flex-direction: column !important;
                        text-align: center !important;
                    }
                    [style*="Career Test"] img, [style*="College Predictor"] img {
                        margin: 20px auto 0 !important;
                        width: 150px !important;
                        height: 120px !important;
                    }
                    
                    /* Mobile Nav Bar */
                    #mobile-bottom-nav {
                        display: flex !important;
                    }
                    #main-content { padding-bottom: 80px !important; }
                }

                #mobile-bottom-nav {
                    display: none;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #fff;
                    border-top: 1px solid #e2e8f0;
                    height: 70px;
                    z-index: 1000;
                    padding: 0 10px;
                    justify-content: space-around;
                    align-items: center;
                    box-shadow: 0 -10px 20px rgba(0,0,0,0.05);
                }

                .mobile-nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    color: #94a3b8;
                    font-size: 10px;
                    font-weight: 700;
                    text-decoration: none;
                }

                .mobile-nav-item.active {
                    color: #5b51d8;
                }
            `}</style>

            {/* Mobile Bottom Navigation */}
            <div id="mobile-bottom-nav">
                <div onClick={() => setActiveTab('My Dashboard')} className={`mobile-nav-item ${activeTab === 'My Dashboard' ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </div>
                <div onClick={() => navigate('/ExploreColleges/')} className="mobile-nav-item">
                    <School size={20} />
                    <span>Colleges</span>
                </div>
                <div onClick={() => navigate('/WriteReview/')} className="mobile-nav-item" style={{ color: '#5b51d8', marginTop: '-30px', background: '#fff', padding: '10px', borderRadius: '50%', border: '1px solid #e2e8f0', boxShadow: '0 5px 15px rgba(91,81,216,0.3)' }}>
                    <PenSquare size={24} />
                    <span style={{ marginTop: '2px' }}>Review</span>
                </div>
                <div onClick={() => navigate('/Scholarship/')} className="mobile-nav-item">
                    <Award size={20} />
                    <span>Scholarship</span>
                </div>
                <div onClick={() => setIsProfileDropdownOpen(true)} className="mobile-nav-item">
                    <User size={20} />
                    <span>Profile</span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
