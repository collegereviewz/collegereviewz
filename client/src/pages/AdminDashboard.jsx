import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Settings,
    LogOut,
    Search,
    ShieldCheck,
    User as UserIcon,
    Key,
    Save,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passError, setPassError] = useState('');
    const [passSuccess, setPassSuccess] = useState('');
    const [passLoading, setPassLoading] = useState(false);

    const navigate = useNavigate();
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

    useEffect(() => {
        if (!adminToken) {
            navigate('/admin/login');
        } else {
            fetchUsers();
        }
    }, [adminToken]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users. Session might have expired.');
            if (err.response?.status === 401 || err.response?.status === 403) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPassError('');
        setPassSuccess('');

        if (newPassword !== confirmPassword) {
            return setPassError('Passwords do not match');
        }
        if (newPassword.length < 6) {
            return setPassError('Password must be at least 6 characters');
        }

        setPassLoading(true);
        try {
            await axios.post('http://localhost:5000/api/admin/change-password',
                { newPassword },
                { headers: { Authorization: `Bearer ${adminToken}` } }
            );
            setPassSuccess('Password updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setPassError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setPassLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phoneNumber && user.phoneNumber.includes(searchQuery)) ||
        (user.stream && user.stream.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
            {/* Sidebar - Fixed to the side */}
            <div style={{
                width: '280px',
                background: '#1e293b',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 24px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: 0,
                height: '100vh',
                zIndex: 10
            }}>
                <div style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <ShieldCheck color="white" size={24} />
                    </div>
                    <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>AdminPanel</span>
                </div>

                <div style={{ flex: 1, padding: '0 16px' }}>
                    <div
                        onClick={() => setActiveTab('users')}
                        style={{
                            padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px',
                            background: activeTab === 'users' ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: activeTab === 'users' ? '#818cf8' : '#94a3b8',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === 'users' ? 600 : 500
                        }}
                    >
                        <Users size={20} /> Users Management
                    </div>
                    <div
                        onClick={() => setActiveTab('settings')}
                        style={{
                            padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '12px',
                            background: activeTab === 'settings' ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: activeTab === 'settings' ? '#818cf8' : '#94a3b8',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === 'settings' ? 600 : 500
                        }}
                    >
                        <Settings size={20} /> Settings
                    </div>
                </div>

                <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <UserIcon size={20} color="#94a3b8" />
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{adminUser.fullName || 'Admin'}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '10px',
                            background: 'rgba(239, 68, 68, 0.1)', color: '#f87171',
                            border: 'none', cursor: 'pointer', fontWeight: 600,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                        }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content - Flex-grow to push footer */}
            <div style={{ flex: 1, padding: '40px', minHeight: '100vh' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'users' ? (
                        <motion.div
                            key="users"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <div>
                                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Registered Students</h2>
                                    <p style={{ color: '#64748b', marginTop: '4px' }}>Manage and view all students in the database</p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            padding: '12px 16px 12px 48px', borderRadius: '14px', border: '1px solid #e2e8f0',
                                            width: '320px', fontSize: '15px', outline: 'none', background: 'white',
                                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                                        }}
                                    />
                                </div>
                            </div>

                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '100px' }}>
                                    <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                                    <p style={{ color: '#64748b', marginTop: '16px' }}>Loading students...</p>
                                </div>
                            ) : error ? (
                                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                                    <XCircle color="#ef4444" size={48} style={{ marginBottom: '16px' }} />
                                    <p style={{ color: '#b91c1c', fontWeight: 600 }}>{error}</p>
                                </div>
                            ) : (
                                <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>USER</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>CONTACT</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>ACADEMICS</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>PREFERENCES</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>STATS</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>JOINED</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.length > 0 ? filteredUsers.map((user, idx) => (
                                                <tr key={user._id} style={{ borderBottom: idx === filteredUsers.length - 1 ? 'none' : '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{ width: '36px', height: '36px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontWeight: 700 }}>
                                                                {user.fullName.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div style={{ fontWeight: 600, color: '#1e293b' }}>{user.fullName}</div>
                                                                {user.isAdmin && <span style={{ background: '#ecfdf5', color: '#10b981', fontSize: '10px', padding: '1px 6px', borderRadius: '100px', fontWeight: 700 }}>ADMIN</span>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>{user.email}</div>
                                                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{user.phoneNumber || 'No Phone'}</div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>{user.stream || 'N/A'}</div>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>{user.currentClass || 'N/A'}</div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                            <span style={{ padding: '2px 8px', borderRadius: '6px', background: user.openToAbroad ? '#f0f9ff' : '#f8fafc', color: user.openToAbroad ? '#0369a1' : '#94a3b8', fontSize: '10px', fontWeight: 700, border: `1px solid ${user.openToAbroad ? '#bae6fd' : '#e2e8f0'}` }}>
                                                                ABROAD: {user.openToAbroad ? 'YES' : 'NO'}
                                                            </span>
                                                            <span style={{ padding: '2px 8px', borderRadius: '6px', background: user.canAffordCoaching ? '#f0fdf4' : '#f8fafc', color: user.canAffordCoaching ? '#15803d' : '#94a3b8', fontSize: '10px', fontWeight: 700, border: `1px solid ${user.canAffordCoaching ? '#bbf7d0' : '#e2e8f0'}` }}>
                                                                COACHING: {user.canAffordCoaching ? 'YES' : 'NO'}
                                                            </span>
                                                            <span style={{ padding: '2px 8px', borderRadius: '6px', background: '#fffbeb', color: '#92400e', fontSize: '10px', fontWeight: 700, border: '1px solid #fde68a' }}>
                                                                LOAN: {user.educationalLoanComfort || 'N/A'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 600 }}>Budget: {user.annualBudget || 'N/A'}</div>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>Age: {user.age}</div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px', color: '#94a3b8', fontSize: '13px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Clock size={14} /> {new Date(user.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>No students found matching your search.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ maxWidth: '600px' }}
                        >
                            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Admin Settings</h2>
                            <p style={{ color: '#64748b', marginBottom: '32px' }}>Update your security credentials and portal preferences</p>

                            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                                    <div style={{ width: '48px', height: '48px', background: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                                        <Key size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Security Check</h3>
                                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Keep your admin credentials up to date</p>
                                    </div>
                                </div>

                                <form onSubmit={handlePasswordChange}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', color: '#64748b', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            style={{
                                                width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0',
                                                fontSize: '15px', outline: 'none', transition: 'all 0.2s'
                                            }}
                                            placeholder="Min 6 characters"
                                            required
                                        />
                                    </div>
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', color: '#64748b', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            style={{
                                                width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0',
                                                fontSize: '15px', outline: 'none'
                                            }}
                                            placeholder="Repeat new password"
                                            required
                                        />
                                    </div>

                                    {passError && (
                                        <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <XCircle size={16} /> {passError}
                                        </div>
                                    )}

                                    {passSuccess && (
                                        <div style={{ color: '#10b981', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <CheckCircle size={16} /> {passSuccess}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={passLoading}
                                        style={{
                                            padding: '12px 24px', borderRadius: '12px', background: '#1e293b', color: 'white',
                                            border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Save size={18} /> {passLoading ? 'Updating...' : 'Save New Password'}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
