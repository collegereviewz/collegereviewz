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
    PlusCircle,
    FilePlus,
    Trash2,
    Plus,
    Info,
    Calendar,
    TrendingUp,
    AlertCircle,
    Briefcase,
    CheckCircle,
    XCircle,
    Download,
    Clock,
    GraduationCap,
    Globe,
    Building2,
    Map
} from 'lucide-react';
// Removed static examsData import for dynamic fetching
// import examsData from './ExploreColleges/Exams/exams_data.json';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [applications, setApplications] = useState([]);
    const [appLoading, setAppLoading] = useState(false);
    const [appError, setAppError] = useState('');

    const [examsData, setExamsData] = useState([]);
    const [examsLoading, setExamsLoading] = useState(false);

    const [jobForm, setJobForm] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-Time',
        description: '',
        requirements: ''
    });
    const [jobFormLoading, setJobFormLoading] = useState(false);
    const [jobFormSuccess, setJobFormSuccess] = useState('');

    const [examForm, setExamForm] = useState({
        name: '',
        fullName: '',
        category: '',
        examDate: '',
        appDate: '',
        resultDate: '',
        conductingBody: '',
        officialWebsite: '',
        summary: '',
        highlights: {
            mode: 'Pen & Paper (OMR)',
            totalMarks: '',
            negative: '',
            duration: '',
            languages: '',
            frequency: 'Once a year'
        },
        competitionTrends: [
            { year: 2024, count: '' }
        ],
        importantDates: [
            { label: 'Exam Date', date: '', status: 'Confirmed' }
        ],
        updates: [
            { title: '', date: '', text: '', type: 'all' }
        ]
    });
    const [examFormLoading, setExamFormLoading] = useState(false);
    const [examFormSuccess, setExamFormSuccess] = useState('');

    const [allColleges, setAllColleges] = useState([]);
    const [collegeForm, setCollegeForm] = useState({
        name: '',
        state: '',
        district: '',
        popularName: '',
        address: '',
        institutionType: 'IIT',
        university: '',
        officialWebsite: '',
        fees: '',
        establishedYear: '',
        managementType: 'Government',
        avgPackage: '',
        highestPackage: ''
    });
    const [collegeLoading, setCollegeLoading] = useState(false);
    const [selectedCollegeId, setSelectedCollegeId] = useState('');

    const handleHighlightChange = (field, value) => {
        setExamForm(prev => ({
            ...prev,
            highlights: { ...prev.highlights, [field]: value }
        }));
    };

    const addArrayItem = (field, defaultValue) => {
        setExamForm(prev => ({
            ...prev,
            [field]: [...prev[field], defaultValue]
        }));
    };

    const updateArrayItem = (field, index, value) => {
        setExamForm(prev => {
            const newArray = [...prev[field]];
            newArray[index] = { ...newArray[index], ...value };
            return { ...prev, [field]: newArray };
        });
    };

    const removeArrayItem = (field, index) => {
        setExamForm(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

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
            fetchApplications();
            fetchCollegesAdmin();
            fetchExamsAdmin();
        }
    }, [adminToken]);

    const fetchExamsAdmin = async () => {
        setExamsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/admin/exams', {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setExamsData(response.data);
        } catch (err) {
            console.error("Error fetching exams:", err);
        } finally {
            setExamsLoading(false);
        }
    };

    const fetchCollegesAdmin = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/colleges?limit=1000');
            if (response.data.success) {
                setAllColleges(response.data.data);
            }
        } catch (err) {
            console.error("Error fetching colleges:", err);
        }
    };

    const fetchApplications = async () => {
        setAppLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/jobs/applications');
            setApplications(response.data);
        } catch (err) {
            setAppError('Failed to fetch job applications.');
        } finally {
            setAppLoading(false);
        }
    };

    const handleUpdateApplicationStatus = async (appId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/jobs/applications/${appId}/status`, { status: newStatus });
            setApplications(prev => prev.map(app => app._id === appId ? { ...app, status: newStatus } : app));
        } catch (err) {
            alert('Failed to update application status.');
        }
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setJobFormLoading(true);
        setJobFormSuccess('');
        try {
            const reqArray = jobForm.requirements.split(',').map(item => item.trim()).filter(Boolean);
            await axios.post('http://localhost:5000/api/jobs/create', { ...jobForm, requirements: reqArray });
            setJobFormSuccess('Job created successfully!');
            setJobForm({ title: '', department: '', location: '', type: 'Full-Time', description: '', requirements: '' });
        } catch (err) {
            alert('Failed to create job posting.');
        } finally {
            setJobFormLoading(false);
        }
    };

    const handleAddExam = async (e) => {
        e.preventDefault();
        setExamFormLoading(true);
        try {
            // Process updates to ensure timestamps for the 24-hour rule
            const processedUpdates = (examForm.updates || []).map(upd => ({
                ...upd,
                timestamp: upd.timestamp || new Date().toISOString()
            }));

            const response = await axios.post('http://localhost:5000/api/admin/exams', {
                ...examForm,
                updates: processedUpdates
            }, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Exam and all linked data updated/added successfully across the platform!',
                    confirmButtonColor: '#6366f1'
                });
                
                // Refresh exams list from server
                fetchExamsAdmin();
                
                // We'll reset the form.
                setExamForm({
                    name: '',
                    fullName: '',
                    category: '',
                    examDate: '',
                    appDate: '',
                    resultDate: '',
                    conductingBody: '',
                    officialWebsite: '',
                    summary: '',
                    highlights: {
                        mode: 'Pen & Paper (OMR)',
                        totalMarks: '',
                        negative: '',
                        duration: '',
                        languages: '',
                        frequency: 'Once a year'
                    },
                    competitionTrends: [{ year: 2024, count: '' }],
                    importantDates: [{ label: 'Exam Date', date: '', status: 'Confirmed' }],
                    updates: [{ title: '', date: '', text: '', type: 'all' }]
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || 'Failed to update exam data.'
            });
        } finally {
            setExamFormLoading(false);
        }
    };

    const handleAddCollege = async (e) => {
        e.preventDefault();
        setCollegeLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/admin/colleges', collegeForm, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'College Updated!',
                    text: 'College details have been saved to the database.',
                    timer: 2000,
                    showConfirmButton: false
                });
                fetchCollegesAdmin(); // Refresh the list
            }
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update college.' });
        } finally {
            setCollegeLoading(false);
        }
    };

    const handleSelectExistingCollege = (e) => {
        const id = e.target.value;
        setSelectedCollegeId(id);
        if (!id) {
            setCollegeForm({
                name: '', state: '', district: '', popularName: '', address: '',
                institutionType: 'IIT', university: '', officialWebsite: '',
                fees: '', establishedYear: '', managementType: 'Government',
                avgPackage: '', highestPackage: ''
            });
            return;
        }

        const selected = allColleges.find(col => col._id === id);
        if (selected) {
            setCollegeForm({
                _id: selected._id,
                name: selected.name || '',
                state: selected.state || '',
                district: selected.district || '',
                popularName: selected.popularName || '',
                address: selected.address || '',
                institutionType: selected.institutionType || '',
                university: selected.university || '',
                officialWebsite: selected.officialWebsite || '',
                fees: selected.fees || '',
                establishedYear: selected.establishedYear || '',
                managementType: selected.managementType || '',
                avgPackage: selected.avgPackage || '',
                highestPackage: selected.highestPackage || ''
            });
        }
    };

    const handleDeleteCollege = async () => {
        if (!selectedCollegeId) return;
        
        const result = await Swal.fire({
            title: 'Delete College?',
            text: "This will permanently remove this college from the database.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#1e293b',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/colleges/${selectedCollegeId}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                Swal.fire('Deleted!', 'College has been removed.', 'success');
                setSelectedCollegeId('');
                setCollegeForm({
                    name: '', state: '', district: '', popularName: '', address: '',
                    institutionType: 'IIT', university: '', officialWebsite: '',
                    fees: '', establishedYear: '', managementType: 'Government',
                    avgPackage: '', highestPackage: ''
                });
                fetchCollegesAdmin();
            } catch (err) {
                Swal.fire('Error', 'Failed to delete college.', 'error');
            }
        }
    };

    const handleSelectExistingExam = (e) => {
        const examName = e.target.value;
        if (!examName) {
            setExamForm({
                name: '',
                fullName: '',
                category: '',
                examDate: '',
                appDate: '',
                resultDate: '',
                conductingBody: '',
                officialWebsite: '',
                summary: '',
                highlights: {
                    mode: 'Pen & Paper (OMR)',
                    totalMarks: '',
                    negative: '',
                    duration: '',
                    languages: '',
                    frequency: 'Once a year'
                },
                competitionTrends: [{ year: 2024, count: '' }],
                importantDates: [{ label: 'Exam Date', date: '', status: 'Confirmed' }],
                updates: [{ title: '', date: '', text: '', type: 'all' }]
            });
            return;
        }

        const selected = examsData.find(ex => ex.name === examName);
        if (selected) {
            setExamForm({
                name: selected.name || '',
                fullName: selected.fullName || '',
                category: selected.category || '',
                examDate: selected.examDate || '',
                appDate: selected.appDate || '',
                resultDate: selected.resultDate || '',
                conductingBody: selected.conductingBody || '',
                officialWebsite: selected.officialWebsite || '',
                summary: selected.summary || '',
                highlights: {
                    mode: selected.highlights?.mode || 'Pen & Paper (OMR)',
                    totalMarks: selected.highlights?.totalMarks || '',
                    negative: selected.highlights?.negative || '',
                    duration: selected.highlights?.duration || '',
                    languages: selected.highlights?.languages || '',
                    frequency: selected.highlights?.frequency || 'Once a year'
                },
                competitionTrends: selected.competitionTrends && selected.competitionTrends.length > 0 
                    ? selected.competitionTrends 
                    : [{ year: 2024, count: '' }],
                importantDates: (selected.dates || selected.importantDates) && (selected.dates || selected.importantDates).length > 0 
                    ? (selected.dates || selected.importantDates)
                    : [{ label: 'Exam Date', date: '', status: 'Confirmed' }],
                updates: selected.updates && selected.updates.length > 0 
                    ? selected.updates 
                    : [{ title: '', date: '', text: '', type: 'all' }]
            });
        }
    };

    const handleDeleteExam = async () => {
        if (!examForm.name) return;

        const result = await Swal.fire({
            title: 'Delete Exam?',
            text: `Remove ${examForm.name} from the platform? This cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Delete'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/exams/${encodeURIComponent(examForm.name)}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                Swal.fire('Deleted!', 'Exam has been removed.', 'success');
                // Refresh list from server after delete
                fetchExamsAdmin();
                // Refresh local state if possible or just clear form
                setExamForm({
                    name: '', fullName: '', category: '', examDate: '', appDate: '', resultDate: '',
                    conductingBody: '', officialWebsite: '', summary: '',
                    highlights: { mode: 'Pen & Paper (OMR)', totalMarks: '', negative: '', duration: '', languages: '', frequency: 'Once a year' },
                    competitionTrends: [{ year: 2024, count: '' }],
                    importantDates: [{ label: 'Exam Date', date: '', status: 'Confirmed' }],
                    updates: [{ title: '', date: '', text: '', type: 'all' }]
                });
            } catch (err) {
                Swal.fire('Error', 'Failed to delete exam.', 'error');
            }
        }
    };

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
                        onClick={() => setActiveTab('jobApplications')}
                        style={{
                            padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px',
                            background: activeTab === 'jobApplications' ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: activeTab === 'jobApplications' ? '#818cf8' : '#94a3b8',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === 'jobApplications' ? 600 : 500
                        }}
                    >
                        <Briefcase size={20} /> Job Applications
                    </div>
                    <div
                        onClick={() => setActiveTab('postJob')}
                        style={{
                            padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px',
                            background: activeTab === 'postJob' ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: activeTab === 'postJob' ? '#818cf8' : '#94a3b8',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === 'postJob' ? 600 : 500
                        }}
                    >
                        <PlusCircle size={20} /> Post New Job
                    </div>
                    <div
                        onClick={() => setActiveTab('addExam')}
                        style={{
                            padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px',
                            background: activeTab === 'addExam' ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: activeTab === 'addExam' ? '#818cf8' : '#94a3b8',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === 'addExam' ? 600 : 500
                        }}
                    >
                        <FilePlus size={20} /> Exams Hub
                    </div>
                    <div
                        onClick={() => setActiveTab('manageColleges')}
                        style={{
                            padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px',
                            background: activeTab === 'manageColleges' ? 'rgba(99,102,241,0.1)' : 'transparent',
                            color: activeTab === 'manageColleges' ? '#818cf8' : '#94a3b8',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === 'manageColleges' ? 600 : 500
                        }}
                    >
                        <GraduationCap size={20} /> Colleges Database
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
                    ) : activeTab === 'jobApplications' ? (
                        <motion.div
                            key="jobApplications"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <div>
                                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Job Applications</h2>
                                    <p style={{ color: '#64748b', marginTop: '4px' }}>Review applicant resumes and update their ATS status</p>
                                </div>
                            </div>

                            {appLoading ? (
                                <div style={{ textAlign: 'center', padding: '100px' }}>
                                    <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                                    <p style={{ color: '#64748b', marginTop: '16px' }}>Loading applications...</p>
                                </div>
                            ) : appError ? (
                                <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                                    <XCircle color="#ef4444" size={48} style={{ marginBottom: '16px' }} />
                                    <p style={{ color: '#b91c1c', fontWeight: 600 }}>{appError}</p>
                                </div>
                            ) : (
                                <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>APPLICANT</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>ROLE</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>RESUME</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>APPLIED ON</th>
                                                <th style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: '#64748b' }}>STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.length > 0 ? applications.map((app, idx) => (
                                                <tr key={app._id} style={{ borderBottom: idx === applications.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{app.applicantName}</div>
                                                        <div style={{ fontSize: '13px', color: '#64748b' }}>{app.email}</div>
                                                        <div style={{ fontSize: '13px', color: '#64748b' }}>{app.phone}</div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <div style={{ fontWeight: 600, color: '#475569' }}>{app.jobId?.title || 'Unknown Role'}</div>
                                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{app.jobId?.department || ''}</div>
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <a href={`http://localhost:5000${app.resumeUrl}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>
                                                            <Download size={16} /> View Resume
                                                        </a>
                                                    </td>
                                                    <td style={{ padding: '16px 24px', color: '#94a3b8', fontSize: '13px' }}>
                                                        {new Date(app.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td style={{ padding: '16px 24px' }}>
                                                        <select
                                                            value={app.status}
                                                            onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                                                            style={{
                                                                padding: '8px 12px',
                                                                borderRadius: '8px',
                                                                border: '1px solid #e2e8f0',
                                                                outline: 'none',
                                                                fontSize: '13px',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                background: app.status === 'Pending' ? '#fffbeb' : app.status === 'Interview Scheduled' ? '#e0e7ff' : app.status === 'Hired' ? '#dcfce7' : app.status === 'Rejected' || app.status === 'Uninterested' ? '#fee2e2' : '#f1f5f9',
                                                                color: app.status === 'Pending' ? '#b45309' : app.status === 'Interview Scheduled' ? '#4338ca' : app.status === 'Hired' ? '#15803d' : app.status === 'Rejected' || app.status === 'Uninterested' ? '#b91c1c' : '#475569'
                                                            }}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Interested">Interested</option>
                                                            <option value="Uninterested">Uninterested</option>
                                                            <option value="Interview Scheduled">Interview Scheduled</option>
                                                            <option value="Hired">Hired</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>No applications received yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </motion.div>
                    ) : activeTab === 'addExam' ? (
                        <motion.div
                            key="addExam"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ maxWidth: '800px' }}
                        >
                            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Add New Exam</h2>
                            <p style={{ color: '#64748b', marginBottom: '32px' }}>Enter details to list a new competitive examination</p>

                            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '80px' }}>
                                {examFormSuccess && (
                                    <div style={{ 
                                        background: '#dcfce7', color: '#15803d', padding: '16px', borderRadius: '12px', 
                                        marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 
                                    }}>
                                        <CheckCircle size={20} /> {examFormSuccess}
                                    </div>
                                )}
                                
                                <div style={{ marginBottom: '32px', padding: '24px', background: '#f0f9ff', borderRadius: '16px', border: '1.5px solid #bae6fd' }}>
                                    <label style={{ ...labelStyle, color: '#0369a1' }}>Select Existing Exam to Edit (Optional)</label>
                                    <div style={{ position: 'relative' }}>
                                        <select 
                                            onChange={handleSelectExistingExam} 
                                            style={{ ...inputStyles, border: '1.5px solid #7dd3fc', background: '#fff' }}
                                        >
                                            <option value="">-- Create New Exam / Reset Form --</option>
                                            {examsData.map((ex, i) => (
                                                <option key={i} value={ex.name}>{ex.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#0ea5e9', fontWeight: 600 }}>
                                        Selecting an exam will automatically fill the fields below for quick editing.
                                    </p>
                                </div>

                                <form onSubmit={handleAddExam} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                    
                                    {/* Section: Basic Information */}
                                    <section>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                                            <Info size={20} color="#6366f1" />
                                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Basic Information</h3>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                            <div>
                                                <label style={labelStyle}>Exam Abbreviation *</label>
                                                <input required type="text" value={examForm.name} onChange={e => setExamForm({...examForm, name: e.target.value})} style={inputStyles} placeholder="e.g. NEET UG" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Full Name *</label>
                                                <input required type="text" value={examForm.fullName} onChange={e => setExamForm({...examForm, fullName: e.target.value})} style={inputStyles} placeholder="e.g. National Eligibility cum Entrance Test" />
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                            <div>
                                                <label style={labelStyle}>Category *</label>
                                                <select required value={examForm.category} onChange={e => setExamForm({...examForm, category: e.target.value})} style={inputStyles}>
                                                    <option value="">Select Category</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Engineering">Engineering</option>
                                                    <option value="Management">Management</option>
                                                    <option value="Law">Law</option>
                                                    <option value="Arts & Design">Arts & Design</option>
                                                    <option value="Science">Science</option>
                                                    <option value="Commerce">Commerce</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Conducting Body</label>
                                                <input type="text" value={examForm.conductingBody} onChange={e => setExamForm({...examForm, conductingBody: e.target.value})} style={inputStyles} placeholder="e.g. NTA" />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Official Website URL</label>
                                            <input type="text" value={examForm.officialWebsite} onChange={e => setExamForm({...examForm, officialWebsite: e.target.value})} style={inputStyles} placeholder="e.g. neet.nta.nic.in" />
                                        </div>

                                        <div>
                                            <label style={labelStyle}>Short Summary *</label>
                                            <textarea required rows={3} value={examForm.summary} onChange={e => setExamForm({...examForm, summary: e.target.value})} style={{...inputStyles, resize: 'vertical'}} placeholder="Enter a brief description of the exam..." />
                                        </div>
                                    </section>

                                    {/* Section: Exam Highlights */}
                                    <section>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                                            <TrendingUp size={20} color="#10b981" />
                                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Exam Highlights</h3>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                            <div>
                                                <label style={labelStyle}>Exam Mode</label>
                                                <input type="text" value={examForm.highlights.mode} onChange={e => handleHighlightChange('mode', e.target.value)} style={inputStyles} placeholder="e.g. Pen & Paper" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Total Marks</label>
                                                <input type="text" value={examForm.highlights.totalMarks} onChange={e => handleHighlightChange('totalMarks', e.target.value)} style={inputStyles} placeholder="e.g. 720 Marks" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Negative Marking</label>
                                                <input type="text" value={examForm.highlights.negative} onChange={e => handleHighlightChange('negative', e.target.value)} style={inputStyles} placeholder="e.g. -1 for wrong" />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                            <div>
                                                <label style={labelStyle}>Duration</label>
                                                <input type="text" value={examForm.highlights.duration} onChange={e => handleHighlightChange('duration', e.target.value)} style={inputStyles} placeholder="e.g. 3h 20m" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Languages</label>
                                                <input type="text" value={examForm.highlights.languages} onChange={e => handleHighlightChange('languages', e.target.value)} style={inputStyles} placeholder="e.g. 13 Languages" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Frequency</label>
                                                <input type="text" value={examForm.highlights.frequency} onChange={e => handleHighlightChange('frequency', e.target.value)} style={inputStyles} placeholder="e.g. Annual" />
                                            </div>
                                        </div>
                                    </section>

                                    {/* Section: 10 Years Review (Competition Trends) */}
                                    <section>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Users size={20} color="#f59e0b" />
                                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>10 Years Review (Trends)</h3>
                                            </div>
                                            <button type="button" onClick={() => addArrayItem('competitionTrends', { year: 2024, count: '' })} style={addItemButtonStyle}>
                                                <Plus size={16} /> Add Year
                                            </button>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                                            {examForm.competitionTrends.map((trend, idx) => (
                                                <div key={idx} style={arrayItemCardStyle}>
                                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                        <input type="number" value={trend.year} onChange={e => updateArrayItem('competitionTrends', idx, { year: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }} placeholder="Year" />
                                                        <button type="button" onClick={() => removeArrayItem('competitionTrends', idx)} style={removeButtonStyle}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <input type="text" value={trend.count} onChange={e => updateArrayItem('competitionTrends', idx, { count: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }} placeholder="Count (e.g. 23.3)" />
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Section: Important Dates */}
                                    <section>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Calendar size={20} color="#3b82f6" />
                                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Important Dates</h3>
                                            </div>
                                            <button type="button" onClick={() => addArrayItem('importantDates', { label: '', date: '', status: 'Expected' })} style={addItemButtonStyle}>
                                                <Plus size={16} /> Add Date
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {examForm.importantDates.map((dateObj, idx) => (
                                                <div key={idx} style={{ ...arrayItemCardStyle, display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr auto', gap: '12px', alignItems: 'center' }}>
                                                    <input type="text" value={dateObj.label} onChange={e => updateArrayItem('importantDates', idx, { label: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }} placeholder="Label (e.g. Results)" />
                                                    <input type="text" value={dateObj.date} onChange={e => updateArrayItem('importantDates', idx, { date: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }} placeholder="Date (e.g. June 2026)" />
                                                    <select value={dateObj.status} onChange={e => updateArrayItem('importantDates', idx, { status: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }}>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Expected">Expected</option>
                                                        <option value="Tentative">Tentative</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>
                                                    <button type="button" onClick={() => removeArrayItem('importantDates', idx)} style={removeButtonStyle}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Section: Recent Updates */}
                                    <section>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <AlertCircle size={20} color="#ef4444" />
                                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Recent Updates (Filtering Ready)</h3>
                                            </div>
                                            <button type="button" onClick={() => addArrayItem('updates', { title: '', date: '', text: '', type: 'all' })} style={addItemButtonStyle}>
                                                <Plus size={16} /> Add Update
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            {examForm.updates.map((update, idx) => (
                                                <div key={idx} style={{ ...arrayItemCardStyle, padding: '20px' }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '12px', marginBottom: '12px' }}>
                                                        <input type="text" value={update.title} onChange={e => updateArrayItem('updates', idx, { title: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }} placeholder="Update Title" />
                                                        <input type="text" value={update.date} onChange={e => updateArrayItem('updates', idx, { date: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }} placeholder="Time (e.g. 10:30 AM)" />
                                                        <select value={update.type} onChange={e => updateArrayItem('updates', idx, { type: e.target.value })} style={{ ...inputStyles, padding: '8px 12px' }}>
                                                            <option value="all">Standard (All)</option>
                                                            <option value="today">Today's Update</option>
                                                            <option value="imp">Important (Imp.)</option>
                                                        </select>
                                                        <button type="button" onClick={() => removeArrayItem('updates', idx)} style={removeButtonStyle}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <textarea rows={2} value={update.text} onChange={e => updateArrayItem('updates', idx, { text: e.target.value })} style={{ ...inputStyles, resize: 'vertical' }} placeholder="Detailed update description..." />
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '20px', paddingBefore: '40px', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
                                        {examForm.name && examsData.some(ex => ex.name === examForm.name) && (
                                            <button type="button" onClick={handleDeleteExam} style={{
                                                background: '#fef2f2', color: '#ef4444', padding: '14px 28px', borderRadius: '16px',
                                                fontWeight: 700, fontSize: '15px', border: '1.5px solid #fee2e2', cursor: 'pointer'
                                            }}>
                                                Delete Exam
                                            </button>
                                        )}
                                        <button disabled={examFormLoading} type="submit" style={{
                                            background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: 'white', padding: '16px 48px', borderRadius: '16px',
                                            fontWeight: 700, fontSize: '16px', border: 'none', cursor: examFormLoading ? 'not-allowed' : 'pointer',
                                            opacity: examFormLoading ? 0.7 : 1, transition: 'all 0.3s',
                                            boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.3)'
                                        }}>
                                            {examFormLoading ? 'Processing...' : 'Save Complete Exam Data'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    ) : activeTab === 'manageColleges' ? (
                        <motion.div
                            key="manageColleges"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{ marginBottom: '32px' }}>
                                <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Colleges Database</h2>
                                <p style={{ color: '#64748b', marginTop: '4px' }}>Update existing colleges or add new ones to the explorer</p>
                            </div>

                            {/* Select Existing College */}
                            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '24px', borderRadius: '20px', marginBottom: '32px' }}>
                                <label style={{ display: 'block', color: '#1e40af', fontWeight: 800, fontSize: '14px', marginBottom: '12px' }}>
                                    SEARCH & SELECT COLLEGE TO EDIT
                                </label>
                                <select 
                                    value={selectedCollegeId} 
                                    onChange={handleSelectExistingCollege} 
                                    style={{ ...inputStyles, border: '1.5px solid #60a5fa', background: 'white' }}
                                >
                                    <option value="">-- Start Typing to Select / Create New --</option>
                                    {allColleges.sort((a,b) => a.name.localeCompare(b.name)).map(col => (
                                        <option key={col._id} value={col._id}>{col.name} ({col.state})</option>
                                    ))}
                                </select>
                                <p style={{ fontSize: '12px', color: '#3b82f6', marginTop: '10px', fontWeight: 600 }}>
                                    <Info size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 
                                    Tip: Selecting a college will automatically fill the form below. If you want to add a new one, leave this empty.
                                </p>
                            </div>

                            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <form onSubmit={handleAddCollege} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    
                                    <section>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                            <Building2 size={24} color="#6366f1" />
                                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Basic Credentials</h3>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: '24px' }}>
                                            <div>
                                                <label style={labelStyle}>Full Institutional Name *</label>
                                                <input required type="text" value={collegeForm.name} onChange={e => setCollegeForm({...collegeForm, name: e.target.value})} style={inputStyles} placeholder="e.g. Indian Institute of Technology Bombay" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>State / UT *</label>
                                                <input required type="text" value={collegeForm.state} onChange={e => setCollegeForm({...collegeForm, state: e.target.value})} style={inputStyles} placeholder="e.g. Maharashtra" />
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginTop: '20px' }}>
                                            <div>
                                                <label style={labelStyle}>District</label>
                                                <input type="text" value={collegeForm.district} onChange={e => setCollegeForm({...collegeForm, district: e.target.value})} style={inputStyles} placeholder="e.g. Mumbai" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Popular Name / Abbreviation</label>
                                                <input type="text" value={collegeForm.popularName} onChange={e => setCollegeForm({...collegeForm, popularName: e.target.value})} style={inputStyles} placeholder="e.g. IITB" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Institution Type</label>
                                                <input type="text" value={collegeForm.institutionType} onChange={e => setCollegeForm({...collegeForm, institutionType: e.target.value})} style={inputStyles} placeholder="e.g. IIT, NIT, Private" />
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                            <Globe size={24} color="#10b981" />
                                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Online & Management</h3>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '24px' }}>
                                            <div>
                                                <label style={labelStyle}>Official Website URL</label>
                                                <input type="url" value={collegeForm.officialWebsite} onChange={e => setCollegeForm({...collegeForm, officialWebsite: e.target.value})} style={inputStyles} placeholder="https://..." />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Year of Establishment</label>
                                                <input type="text" value={collegeForm.establishedYear} onChange={e => setCollegeForm({...collegeForm, establishedYear: e.target.value})} style={inputStyles} placeholder="e.g. 1958" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Management</label>
                                                <select value={collegeForm.managementType} onChange={e => setCollegeForm({...collegeForm, managementType: e.target.value})} style={inputStyles}>
                                                    <option value="Government">Government</option>
                                                    <option value="Private">Private</option>
                                                    <option value="Deemed">Deemed</option>
                                                    <option value="Public">Public</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                            <TrendingUp size={24} color="#f59e0b" />
                                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0 }}>Fees & Placements</h3>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                                            <div>
                                                <label style={labelStyle}>Average Fees (per year)</label>
                                                <input type="text" value={collegeForm.fees} onChange={e => setCollegeForm({...collegeForm, fees: e.target.value})} style={inputStyles} placeholder="e.g. 2.5 Lakh" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Avg. Package</label>
                                                <input type="text" value={collegeForm.avgPackage} onChange={e => setCollegeForm({...collegeForm, avgPackage: e.target.value})} style={inputStyles} placeholder="e.g. 15 LPA" />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Highest Package</label>
                                                <input type="text" value={collegeForm.highestPackage} onChange={e => setCollegeForm({...collegeForm, highestPackage: e.target.value})} style={inputStyles} placeholder="e.g. 1.2 Crore" />
                                            </div>
                                        </div>
                                    </section>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
                                        {selectedCollegeId && (
                                            <button type="button" onClick={handleDeleteCollege} style={{
                                                background: '#fef2f2', color: '#ef4444', padding: '14px 28px', borderRadius: '16px',
                                                fontWeight: 700, fontSize: '15px', border: '1.5px solid #fee2e2', cursor: 'pointer'
                                            }}>
                                                Delete College
                                            </button>
                                        )}
                                        <button disabled={collegeLoading} type="submit" style={{
                                            background: 'linear-gradient(135deg, #6366f1, #38bdf8)', color: 'white', padding: '16px 48px', borderRadius: '16px',
                                            fontWeight: 700, fontSize: '16px', border: 'none', cursor: collegeLoading ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.3s', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)'
                                        }}>
                                            {collegeLoading ? 'Saving...' : 'Save College Data'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    ) : activeTab === 'postJob' ? (
                        <motion.div
                            key="postJob"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ maxWidth: '800px' }}
                        >
                            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Create Job Posting</h2>
                            <p style={{ color: '#64748b', marginBottom: '32px' }}>Add a new open role to the Careers page</p>

                            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                {jobFormSuccess && (
                                    <div style={{ 
                                        background: '#dcfce7', color: '#15803d', padding: '16px', borderRadius: '12px', 
                                        marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 
                                    }}>
                                        <CheckCircle size={20} /> {jobFormSuccess}
                                    </div>
                                )}
                                <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', color: '#334155', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Job Title *</label>
                                            <input required type="text" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} style={inputStyles} placeholder="e.g. Senior Product Manager" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: '#334155', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Department *</label>
                                            <input required type="text" value={jobForm.department} onChange={e => setJobForm({...jobForm, department: e.target.value})} style={inputStyles} placeholder="e.g. Product" />
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', color: '#334155', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Location *</label>
                                            <input required type="text" value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} style={inputStyles} placeholder="e.g. Remote, San Francisco" />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: '#334155', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Job Type *</label>
                                            <select required value={jobForm.type} onChange={e => setJobForm({...jobForm, type: e.target.value})} style={inputStyles}>
                                                <option value="Full-Time">Full-Time</option>
                                                <option value="Part-Time">Part-Time</option>
                                                <option value="Contract">Contract</option>
                                                <option value="Internship">Internship</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', color: '#334155', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Description *</label>
                                        <textarea required rows={4} value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} style={{...inputStyles, resize: 'vertical'}} placeholder="Describe the role and responsibilities..." />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', color: '#334155', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>Requirements (Comma Separated) *</label>
                                        <textarea required rows={3} value={jobForm.requirements} onChange={e => setJobForm({...jobForm, requirements: e.target.value})} style={{...inputStyles, resize: 'vertical'}} placeholder="e.g. 5+ years React experience, Strong UX portfolio, Excellent communication..." />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                                        <button disabled={jobFormLoading} type="submit" style={{
                                            background: '#3b82f6', color: 'white', padding: '12px 32px', borderRadius: '12px',
                                            fontWeight: 600, fontSize: '15px', border: 'none', cursor: jobFormLoading ? 'not-allowed' : 'pointer',
                                            opacity: jobFormLoading ? 0.7 : 1, transition: 'all 0.2s'
                                        }}>
                                            {jobFormLoading ? 'Creating...' : 'Publish Job Posting'}
                                        </button>
                                    </div>
                                </form>
                            </div>
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

const inputStyles = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s'
};

const labelStyle = {
    display: 'block',
    color: '#475569',
    fontWeight: 700,
    fontSize: '14px',
    marginBottom: '8px'
};

const addItemButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    color: '#1e293b',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer'
};

const arrayItemCardStyle = {
    padding: '16px',
    background: '#f8fafc',
    borderRadius: '16px',
    border: '1.5px solid #f1f5f9'
};

const removeButtonStyle = {
    padding: '8px',
    borderRadius: '8px',
    background: '#fff',
    border: '1.5px solid #fee2e2',
    color: '#ef4444',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export default AdminDashboard;
