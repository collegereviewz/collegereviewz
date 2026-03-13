import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Info, Clock, ExternalLink, Calendar, MapPin, 
  FileText, Download, Bell, Share2, Filter, ChevronDown, 
  ChevronRight, Sparkles, TrendingUp, AlertTriangle, ArrowRight,
  BookOpen, Target, Award, Users, Search, GraduationCap, ShieldCheck,
  Stethoscope, MessageSquare, Globe, Settings, Star, AlertCircle, Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import examsData from './exams_data.json';
import examOfficialLogos from '../../../data/exam_official_logos.json';

// Import Exam Logos from Assets
import cuetLogo from '../../../assets/Exams/cuet.png';
import gateLogo from '../../../assets/Exams/gate.png';
import jeeLogo from '../../../assets/Exams/jee.png';
import jeeAdvLogo from '../../../assets/Exams/jeeadvanced.png';
import jeeMainLogo from '../../../assets/Exams/jeemain.png';
import tsEamcetLogo from '../../../assets/Exams/taseamcat.png';
import wbjeeLogo from '../../../assets/Exams/wbjee.png';
import neetLogo from '../../../assets/Exams/neet.png';
import ibpsLogo from '../../../assets/Exams/ibps.png';
import sbiLogo from '../../../assets/Exams/sbi.png';
import kiitteeLogo from '../../../assets/Exams/kiitee.png';
import clatLogo from '../../../assets/Exams/clat.png';

// Logo.dev API Configuration
const LOGO_DEV_PK = 'pk_BcA5p3g7Qs6Yzy2HVMeIhw';
const PLACEHOLDER_LOGO = 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/placeholder-exam.png';

const ExamHub = ({ examData }) => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('Overview');
    const [isSticky, setIsSticky] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role === 'admin' || localStorage.getItem('isAdmin') === 'true') {
            setIsAdmin(true);
        }
    }, []);
    const [expandedSyllabus, setExpandedSyllabus] = useState({});
    const [activeUpdateTab, setActiveUpdateTab] = useState('Standard (All)');
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [showDatesModal, setShowDatesModal] = useState(false);

    const data = examData || {
        name: 'NEET UG 2026',
        fullName: 'National Eligibility cum Entrance Test',
        conductingBody: 'NTA / Official Board',
        summary: '',
        lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        officialWebsite: '',
        status: 'View Details',
        daysLeft: '',
        highlights: {
            mode: 'CBT / Offline',
            totalMarks: 'TBA',
            negative: 'As per pattern',
            duration: 'Varies',
            frequency: 'Annual',
            languages: 'English & Others'
        },
        dates: [
            { label: 'Online Submission', date: '08 Feb - 08 Mar, 2026', status: 'Confirmed' },
            { label: 'Correction window', date: '10 to 12 March, 2026', status: 'Confirmed' },
            { label: 'Admit Cards', date: 'April 2026 (tentative)', status: 'Expected' },
            { label: 'Exam Date', date: 'May 04, 2026', status: 'Confirmed' },
            { label: 'Result Date', date: 'June 2026', status: 'Expected' }
        ],
        updates: [
            { title: 'Deadline Today', date: 'Apr 6, 10:30 AM', text: 'Today is the last day to register for NEET UG 2026.', type: 'critical' },
            { title: 'Upcoming', date: 'Mar 20, 12:30 PM', text: 'Correction Window opens March 10.', type: 'warning' },
            { title: 'Official', date: 'Feb 18, 10:43 AM', text: 'Test centers updated for 2026 cycle.', type: 'info' }
        ],
        competitionTrends: [
            { year: 2017, count: 11.3 },
            { year: 2018, count: 13.2 },
            { year: 2019, count: 15.1 },
            { year: 2020, count: 15.9 },
            { year: 2021, count: 16.1 },
            { year: 2022, count: 18.7 },
            { year: 2023, count: 20.8 },
            { year: 2024, count: 23.3 },
            { year: 2025, count: 25.1 }
        ]
    };

    // Find this specific exam in the global JSON data to ensure automatic updates when JSON is edited
    const matchedJsonData = examsData.find(e => 
        e.name?.toLowerCase().includes(data.name?.toLowerCase()) || 
        data.name?.toLowerCase().includes(e.name?.toLowerCase()) ||
        e.fullName?.toLowerCase().includes(data.name?.toLowerCase()) ||
        data.fullName?.toLowerCase().includes(e.fullName?.toLowerCase())
    );

    // Prioritize data from exams_data.json
    const trends = (matchedJsonData?.competitionTrends || data.competitionTrends || examsData[0]?.competitionTrends || []);
    const activeTrendsWindow = trends.slice(-10); // LIFO Stack: Take the latest 10 years
    const totalAppearedRaw = activeTrendsWindow.reduce((acc, curr) => acc + (typeof curr.count === 'string' ? parseFloat(curr.count) : curr.count), 0);
    const totalAppearedFormatted = (totalAppearedRaw >= 100 ? (totalAppearedRaw / 100).toFixed(1) + ' Cr' : totalAppearedRaw.toFixed(1) + ' Lakh');
    
    // Support both 'dates' and 'importantDates' naming conventions
    const displayDates = matchedJsonData?.importantDates || matchedJsonData?.dates || data.importantDates || data.dates || [];
    // Combine Admin updates (priority) with Default updates
    const adminUpdates = (matchedJsonData?.updates || []).map(u => ({ ...u, isAdminUpdate: true }));
    const defaultUpdates = data.updates || [];
    
    // Merge updates and prioritize admin ones
    const allUpdates = [
        ...(data.updates || []), // Default updates from prop/local data
        ...(matchedJsonData?.updates || []) // Updates from JSON data
    ].map(u => ({ ...u, isAdminUpdate: u.type === 'admin' }))
    .sort((a, b) => {
        // Sort by type: Imp/Critical/Admin first, then Today/Warning, then others
        const typePriority = { 'imp': 0, 'critical': 0, 'admin': 0, 'today': 1, 'warning': 1 };
        const aP = typePriority[a.type?.toLowerCase()] ?? 99;
        const bP = typePriority[b.type?.toLowerCase()] ?? 99;
        return aP - bP;
    });

    const filteredUpdates = allUpdates.filter((upd, index, self) => {
        // De-duplicate updates by title, preferring the first occurrence (which is prioritized by sort)
        const isDuplicate = self.findIndex(u => u.title === upd.title) !== index;
        if (isDuplicate) return false;

        const type = upd.type?.toLowerCase();
        
        // Time logic for "Today's Update" (24-hour rule)
        const isTimeMatch = () => {
            if (!upd.timestamp) {
                // Fallback: if no timestamp, try to parse date string
                const updateDate = new Date(upd.date);
                const now = new Date();
                // Check if the update date is within the last 24 hours
                return (now.getTime() - updateDate.getTime()) < (24 * 60 * 60 * 1000);
            }
            const postTime = new Date(upd.timestamp).getTime();
            const now = new Date().getTime();
            return (now - postTime) < (24 * 60 * 60 * 1000);
        };

        if (activeUpdateTab === 'Standard (All)') return true;
        
        if (activeUpdateTab === "Today's Update") {
            const isTodayType = ['today', 'warning'].includes(type) || upd.isAdminUpdate;
            return isTodayType && isTimeMatch();
        }
        
        if (activeUpdateTab === 'Important (Imp.)') {
            return ['imp', 'admin', 'critical'].includes(type);
        }
        
        return false;
    });

    // High Quality Logo Mapping Helper
    const getExamLogo = (eName, eFullName) => {
        let l = null;
        const sName = (eFullName || eName || "").toLowerCase();
        const offLogo = examOfficialLogos?.[(eFullName || '').toLowerCase().trim()] || examOfficialLogos?.[(eName || '').toLowerCase().trim()];
        
        if (offLogo) return offLogo;
        if (sName.includes('cuet')) return cuetLogo;
        if (sName.includes('jee main')) return jeeMainLogo;
        if (sName.includes('jee advanced')) return jeeAdvLogo;
        if (sName.includes('gate')) return gateLogo;
        if (sName.includes('wbjee')) return wbjeeLogo;
        if (sName.includes('ts eamcet') || sName.includes('ts eapcet')) return tsEamcetLogo;
        if (sName.includes('ibps')) return ibpsLogo;
        if (sName.includes('sbi')) return sbiLogo;
        if (sName.includes('kiit')) return kiitteeLogo;
        if (sName.includes('clat')) return clatLogo;
        if (sName.includes('nchm')) return jeeLogo;
        if (sName.includes('neet')) return neetLogo;
        if (sName.includes('cat')) return `https://img.logo.dev/iimcat.ac.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('bitsat')) return `https://img.logo.dev/bits-pilani.ac.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('mat')) return `https://img.logo.dev/aima.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('xat')) return `https://img.logo.dev/xatonline.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('nmat')) return `https://img.logo.dev/nmat.org?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('snap')) return `https://img.logo.dev/snaptest.org?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('iit') || sName.includes('uceed') || sName.includes('jam')) return `https://img.logo.dev/iitd.ac.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('aiims')) return `https://img.logo.dev/aiims.edu?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('nift')) return `https://img.logo.dev/nift.ac.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('lsat')) return `https://img.logo.dev/lsac.org?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('mhcet') || sName.includes('mah-')) return `https://img.logo.dev/mahacet.org?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('upsc')) return `https://img.logo.dev/upsc.gov.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('ssc')) return `https://img.logo.dev/ssc.nic.in?token=${LOGO_DEV_PK}&size=128`;
        if (sName.includes('vit')) return `https://img.logo.dev/vit.ac.in?token=${LOGO_DEV_PK}&size=128`;
        return PLACEHOLDER_LOGO;
    };

    // Unified Summary Logic (Source: JSON > Prop > Category Fallback)
    const baseSummary = matchedJsonData?.summary || data.summary;
    const finalSummary = baseSummary && baseSummary !== 'test3' ? baseSummary : 
        `The ${data.fullName || data.name} is a standardized national-level entrance examination conducted by ${data.conductingBody || 'the appropriate authority'} for admission into ${data.category || 'various'} programs across recognized universities and institutions in India. This examination serves as a critical gateway for aspirants seeking to advance their careers and secure seats in premier educational environments.`;

    const mergedData = {
        ...data,
        ...matchedJsonData,
        logo: getExamLogo(data.name, data.fullName),
        summary: finalSummary,
        highlights: {
            ...data.highlights,
            ...matchedJsonData?.highlights
        },
        displayDates: displayDates,
        allUpdates: allUpdates,
        filteredUpdates: filteredUpdates
    };

    const latestTrend = trends.length > 0 ? trends[trends.length - 1] : { year: 2024, count: 0 };
    const latestCount = typeof latestTrend.count === 'string' ? parseFloat(latestTrend.count) : latestTrend.count;
    const latestAppearedFormatted = latestCount >= 100 ? (latestCount / 100).toFixed(1) + ' Cr' : latestCount.toFixed(1) + ' Lakh';

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSyllabus = (id) => setExpandedSyllabus(p => ({ ...p, [id]: !p[id] }));

    const cardStyle = {
        background: '#fff',
        borderRadius: '24px',
        padding: '24px',
        border: '1.5px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        transition: 'all 0.3s ease'
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Dates Modal */}
            <AnimatePresence>
                {showDatesModal && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDatesModal(false)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }} 
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            style={{ 
                                position: 'relative', background: '#fff', width: '100%', maxWidth: '600px', 
                                borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{ padding: '32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#1e293b' }}>Important Dates</h3>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Official Schedule for {mergedData.name}</p>
                                </div>
                                <button 
                                    onClick={() => setShowDatesModal(false)}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ChevronDown size={24} color="#64748b" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#f8fafc', borderRadius: '24px', padding: '12px', border: '1.5px solid #f1f5f9', marginBottom: '24px' }}>
                                    {displayDates.map((item, i) => (
                                        <div key={i} style={{ 
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                                            padding: '16px 20px', background: '#fff', borderRadius: '16px',
                                            border: '1px solid #f1f5f9'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.status === 'Confirmed' ? '#059669' : '#cbd5e1' }} />
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#334155' }}>{item.label}</span>
                                                    {item.isAdminUpdate && <span style={{ fontSize: '9px', background: '#f3e8ff', color: '#a855f7', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>ADMIN UPDATE</span>}
                                                </div>
                                            </div>
                                            <span style={{ fontSize: '15px', fontWeight: 900, color: '#1e293b' }}>{item.date}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* External Actions - Outside the content box */}
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <button 
                                        onClick={() => setShowDatesModal(false)}
                                        style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#eff6ff', border: 'none', color: '#2563eb', fontSize: '14px', fontWeight: 950, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <CheckCircle2 size={18} /> Got it, Close
                                    </button>
                                    <button style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#475569', fontSize: '14px', fontWeight: 950, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Calendar size={18} /> Add to Calendar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header / Hero Section */}
            <div style={{ 
                background: '#fff', borderBottom: '1px solid #e2e8f0', 
                padding: '40px 0', position: 'relative', overflow: 'hidden' 
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
                    <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                        {/* Hero Info */}
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ 
                                    width: '64px', height: '64px', 
                                    background: mergedData.color ? `linear-gradient(135deg, ${mergedData.color}, #64748b)` : 'linear-gradient(135deg, #0ea5e9, #0284c7)', 
                                    borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                    color: '#fff', overflow: 'hidden'
                                }}>
                                    {mergedData.logo && mergedData.logo !== 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/placeholder-exam.png' ? (
                                        <img src={mergedData.logo} alt={mergedData.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
                                    ) : (
                                        mergedData.fallbackIcon || <GraduationCap size={32} />
                                    )}
                                </div>
                                <div>
                                    <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', marginBottom: '4px' }}>{mergedData.name}</h1>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#64748b', fontWeight: 700 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Award size={16} color="#0284c7" /> {mergedData.conductingBody || 'NTA / Official'}
                                            <ExternalLink size={12} color="#0ea5e9" style={{ cursor: 'pointer', marginLeft: '2px' }} />
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <ShieldCheck size={16} color="#059669" /> Mode: {mergedData.highlights?.mode || 'Offline (OMR)'}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Users size={16} color="#f59e0b" /> 
                                            Latest Appeared ({latestTrend.year}): 
                                            <span style={{ 
                                                color: '#2563eb', 
                                                fontWeight: 900, 
                                                background: '#eff6ff', 
                                                padding: '4px 12px', 
                                                borderRadius: '10px',
                                                fontSize: '15px'
                                            }}>
                                                ~{latestAppearedFormatted}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '24px', maxWidth: '700px' }}>
                                {mergedData.summary}
                            </p>
                        </div>

                        {/* Status Card Stack */}
                        <div style={{ width: '320px' }}>
                            <div style={{ 
                                background: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', 
                                borderRadius: '24px', padding: '20px', color: '#fff', marginBottom: '16px',
                                boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.2)', position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{ position: 'absolute', right: '-20px', top: '-10px', opacity: 0.1 }}>
                                    <GraduationCap size={100} />
                                </div>

                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '16px' }}>
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '18px', fontWeight: 950, marginBottom: '2px' }}>Registration Open</h4>
                                        <p style={{ fontSize: '13px', opacity: 0.9, fontWeight: 700 }}>{data.daysLeft || '4 Days Left'}</p>
                                    </div>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <button 
                                        onClick={() => window.open(data.applyLink || `https://www.google.com/search?q=${data.name}+official+website`, '_blank')}
                                        style={{ 
                                        width: '100%', padding: '12px', borderRadius: '12px', background: '#fff', 
                                        color: '#064e3b', border: 'none', fontWeight: 950, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        fontSize: '14px'
                                    }}>
                                        <CheckCircle2 size={16} /> Apply Now
                                    </button>
                                    
                                    <button style={{ 
                                        width: '100%', padding: '12px', borderRadius: '12px', background: '#25d366', 
                                        color: '#fff', border: 'none', fontWeight: 950, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        fontSize: '14px'
                                    }}>
                                        <MessageSquare size={16} /> Get WhatsApp Alerts (Free)
                                    </button>

                                    <button style={{ 
                                        width: '100%', padding: '12px', borderRadius: '12px', background: '#f8fafc', 
                                        color: '#64748b', border: '1.5px solid #e2e8f0', fontWeight: 950, cursor: 'default',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        fontSize: '14px'
                                    }}>
                                        <Sparkles size={16} /> Predict Admission Chance <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700, background: '#fee2e2', color: '#ef4444', padding: '2px 6px', borderRadius: '6px' }}>Coming Soon</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Navigation Strip */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ 
                    maxWidth: '1200px', margin: '0 auto', padding: '0 32px', 
                    display: 'flex', gap: '32px', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none', msOverflowStyle: 'none'
                }} className="no-scrollbar">
                    {[
                        { name: 'Overview', icon: <Info size={16} /> },
                        { name: 'Syllabus', icon: <BookOpen size={16} /> },
                        { name: 'Pattern', icon: <Settings size={16} /> },
                        { name: 'College Predictor', icon: <Sparkles size={16} />, newWindow: true },
                        { name: 'Books', icon: <BookOpen size={16} /> },
                        { name: 'Preparation', icon: <Target size={16} /> },
                        { name: 'Results', icon: <Award size={16} /> },
                        { name: 'Cut Off', icon: <TrendingUp size={16} /> },
                        { name: 'Answer Key', icon: <CheckCircle2 size={16} /> },
                        { name: 'Counselling', icon: <GraduationCap size={16} /> },
                        { name: 'Analysis', icon: <Search size={16} /> },
                        { name: 'Question Papers', icon: <FileText size={16} /> },
                        { name: 'Admit Card', icon: <CheckCircle2 size={16} /> },
                        { name: 'Dates', icon: <Calendar size={16} /> },
                        { name: 'Mock Test', icon: <FileText size={16} /> },
                        { name: 'Registration', icon: <FileText size={16} /> },
                        { name: 'Notification', icon: <Bell size={16} /> },
                        { name: 'Centre', icon: <MapPin size={16} /> },
                        { name: 'News', icon: <Globe size={16} /> },
                        { name: 'Rank Predictor', icon: <TrendingUp size={16} />, newWindow: true },
                        { name: 'Accepting Colleges', icon: <GraduationCap size={16} /> }
                    ].map(item => (
                        <button 
                            key={item.name}
                            onClick={() => {
                                if (item.newWindow) {
                                    window.open(`/Predictor/${data.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
                                } else {
                                    setActiveSection(item.name);
                                }
                            }}
                            style={{ 
                                padding: '16px 4px', background: 'none', border: 'none', 
                                borderBottom: activeSection === item.name ? '3.5px solid #0096FF' : '3.5px solid transparent',
                                color: activeSection === item.name ? '#0096FF' : '#64748b', fontSize: '14px', fontWeight: 900,
                                cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            {item.icon}
                            {item.name}
                            {item.newWindow && <ExternalLink size={12} style={{ opacity: 0.6 }} />}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '24px auto 0', padding: '0 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
                    {/* Main Content Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Overview Section */}
                        <div style={cardStyle}>
                            <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b', marginBottom: '20px' }}>{mergedData.name} Overview</h3>
                            
                            {/* Overview Table */}
                            <div style={{ marginBottom: '12px' }}>
                                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginBottom: '20px' }}>
                                    Official examination details and conducting authority information for the upcoming session.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', border: '1.5px solid #f1f5f9', borderRadius: '16px', overflow: 'hidden' }}>
                                {[
                                    { label: 'Exam Name', value: mergedData.fullName || mergedData.name },
                                    { label: 'Conducting Body', value: mergedData.conductingBody || 'Official Board' },
                                    { label: 'Official Website', value: mergedData.officialWebsite || 'Official Website', isLink: true },
                                    { label: 'Level', value: 'National / State Level' },
                                ].map((row, idx) => (
                                    <div key={idx} style={{ 
                                        display: 'flex', 
                                        borderBottom: idx >= 2 ? 'none' : '1.5px solid #f1f5f9',
                                        borderRight: idx % 2 === 0 ? '1.5px solid #f1f5f9' : 'none',
                                        background: '#fff'
                                    }}>
                                        <div style={{ width: '160px', padding: '14px 16px', background: '#f8fafc', color: '#64748b', fontSize: '12px', fontWeight: 800, borderRight: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center', textTransform: 'uppercase' }}>
                                            {row.label}
                                        </div>
                                        <div style={{ flex: 1, padding: '14px 16px', color: '#1e293b', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center' }}>
                                            {row.isLink && row.value && row.value !== 'Official Website' ? (
                                                <a href={row.value.startsWith('http') ? row.value : `https://${row.value}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0ea5e9', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    Click Here <ExternalLink size={12} />
                                                </a>
                                            ) : row.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Highlights Section */}
                        <div style={cardStyle}>
                            <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b', marginBottom: '24px' }}>Key Highlights</h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: '#ffedd5', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Monitor size={16} color="#f97316" />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Exam Mode</span>
                                    </div>
                                    <p style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>{mergedData.highlights?.mode || 'Offline (OMR)'}</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>({mergedData.highlights?.mode?.includes('CBT') ? 'Online' : 'Pen & Paper'})</p>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Target size={16} color="#3b82f6" />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Total Marks</span>
                                    </div>
                                    <p style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>{mergedData.highlights?.totalMarks || '720 Marks'}</p>
                                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, lineHeight: 1.2 }}>
                                        {mergedData.category === 'MBBS' ? '(Physics, Chemistry, Biology)' : 'Core Subjects Included'}
                                    </p>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: '#fee2e2', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <AlertCircle size={16} color="#ef4444" />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Negative</span>
                                    </div>
                                    <p style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>{mergedData.highlights?.negative || '-1 for wrong'}</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>As per official pattern</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Clock size={18} color="#0ea5e9" />
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Duration</p>
                                        <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{mergedData.highlights?.duration || 'Varies'}</p>
                                    </div>
                                </div>
                                <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Globe size={18} color="#10b981" />
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Languages</p>
                                        <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{mergedData.highlights?.languages || 'English & Regional'}</p>
                                    </div>
                                </div>
                                <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Calendar size={18} color="#f59e0b" />
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Frequency</p>
                                        <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{mergedData.highlights?.frequency || 'Annual'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Competition Trends Section */}
                        <div id="Trends" style={{ ...cardStyle, background: '#fff', padding: '40px 32px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#1e293b', textTransform: 'uppercase' }}>10 YEARS REVIEW</h3>
                                <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 700, marginTop: '8px' }}>Tracking Student Participation over time</p>
                            </div>

                            <div className="no-scrollbar" style={{ overflowX: 'auto', padding: '10px 0' }}>
                                <div style={{ minWidth: 'max-content', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {activeTrendsWindow.map((item, i) => {
                                            const stepColors = ['#0891b2', '#0284c7', '#2563eb', '#4f46e5', '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48', '#d97706'];
                                            const color = stepColors[i % stepColors.length];
                                            const formatVal = (v) => v >= 100 ? (v/100).toFixed(1) + ' Cr' : v.toFixed(1) + ' Lakh';
                                            return (
                                                <motion.div 
                                                    key={i}
                                                    whileHover={{ scale: 1.05 }}
                                                    style={{ 
                                                        width: '72px', height: '140px', background: color, 
                                                        display: 'flex', flexDirection: 'column', alignItems: 'center', 
                                                        justifyContent: 'center', color: '#fff', borderRadius: '12px',
                                                        boxShadow: `0 8px 16px ${color}20`
                                                    }}
                                                >
                                                     <div style={{ fontSize: '14px', fontWeight: 950 }}>{formatVal(item.count)}</div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
                                        {activeTrendsWindow.map((item, i) => (
                                            <div key={i} style={{ width: '72px', textAlign: 'center', fontSize: '13px', fontWeight: 900, color: '#475569' }}>
                                                {item.year}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Dates List */}
                        <div id="Dates" style={cardStyle}>
                             <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b', marginBottom: '24px' }}>Important Dates</h3>
                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {displayDates.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: i === displayDates.length - 1 ? 'none' : '1.5px solid #f1f5f9' }}>
                                        <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.status === 'Confirmed' ? '#059669' : '#cbd5e1' }} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '16px', fontWeight: 800, color: '#334155' }}>{item.label}</span>
                                                {item.isAdminUpdate && <span style={{ fontSize: '9px', background: '#f3e8ff', color: '#a855f7', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>ADMIN UPDATE</span>}
                                            </div>
                                        </div>
                                        <div style={{ flex: 1, fontSize: '16px', fontWeight: 950, color: '#1e293b', textAlign: 'right' }}>{item.date}</div>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* Top Exams to Explore - Now here on the Left */}
                        <div id="RelatedExams" style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b' }}>Top Exams to Explore</h3>
                                <button 
                                    onClick={() => {
                                        navigate('/exams/');
                                        window.scrollTo(0, 0);
                                    }}
                                    style={{ color: '#0ea5e9', fontSize: '14px', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    View All Exams <ChevronRight size={16} />
                                </button>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                {[
                                    { name: 'CUET 2026', body: 'NTA Official', color: '#3b82f6' },
                                    { name: 'JEE Main', body: 'NTA Official', color: '#10b981' },
                                    { name: 'NEET UG', body: 'NTA Official', color: '#ef4444' },
                                    { name: 'CAT Exam', body: 'IIM Official', color: '#7c3aed' },
                                    { name: 'GATE 2026', body: 'IIT Official', color: '#f59e0b' },
                                    { name: 'CLAT Exam', body: 'NLU Official', color: '#0891b2' }
                                ].map((exam, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ y: -5 }}
                                        onClick={() => {
                                            const eData = examsData.find(e => e.name?.toLowerCase().includes(exam.name.split(' ')[0].toLowerCase()));
                                            if (eData) {
                                                navigate(`/exams/${eData.name.toLowerCase().replace(/\s+/g, '-')}`, { state: { examData: eData } });
                                                window.scrollTo(0, 0);
                                            } else {
                                                navigate('/exams/');
                                                window.scrollTo(0, 0);
                                            }
                                        }}
                                        style={{ 
                                            padding: '24px', borderRadius: '24px', background: '#f8fafc', border: '1.5px solid #f1f5f9',
                                            transition: 'all 0.2s', cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ 
                                            width: '48px', height: '48px', background: '#fff', borderRadius: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                            marginBottom: '16px', border: '1px solid #f1f5f9', padding: '10px'
                                        }}>
                                            <img 
                                                src={getExamLogo(exam.name, exam.name)} 
                                                alt={exam.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                onError={(e) => { e.currentTarget.src = PLACEHOLDER_LOGO; }}
                                            />
                                        </div>
                                        <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b', marginBottom: '4px' }}>{exam.name}</h4>
                                        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>{exam.body}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Admin Quick Actions */}
                        {isAdmin && (
                            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #f3e8ff, #fff)', border: '1.5px solid #d8b4fe' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ background: '#a855f7', padding: '8px', borderRadius: '10px', color: '#fff' }}>
                                        <Settings size={20} />
                                    </div>
                                    <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b' }}>Admin Controls</h4>
                                </div>
                                <button 
                                    onClick={() => navigate('/admin')}
                                    style={{ 
                                        width: '100%', padding: '12px', borderRadius: '12px', background: '#a855f7', 
                                        color: '#fff', border: 'none', fontWeight: 950, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        fontSize: '14px', boxShadow: '0 4px 12px rgba(168, 85, 247, 0.2)'
                                    }}>
                                    <Plus size={16} /> Manage All Exams
                                </button>
                                <p style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 700, marginTop: '10px', textAlign: 'center' }}>
                                    Changes reflect instantly on this page.
                                </p>
                            </div>
                        )}

                        {/* Recent Updates Sidebar */}
                        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b' }}>Recent Updates</h4>
                                    {isAdmin && (
                                        <button 
                                            onClick={() => navigate('/admin')}
                                            style={{ 
                                                fontSize: '11px', fontWeight: 950, color: '#a855f7', background: '#f3e8ff', 
                                                border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '4px'
                                            }}>
                                            <Plus size={12} /> Add Update
                                        </button>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
                                    {['Standard (All)', "Today's Update", 'Important (Imp.)'].map(tab => (
                                        <button 
                                            key={tab}
                                            onClick={() => setActiveUpdateTab(tab)}
                                            style={{ 
                                                flex: 1, padding: '8px 4px', borderRadius: '8px', 
                                                background: activeUpdateTab === tab ? '#fff' : 'transparent',
                                                border: 'none', color: activeUpdateTab === tab ? '#0ea5e9' : '#64748b',
                                                fontSize: '10px', fontWeight: 950, cursor: 'pointer',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div 
                                className="no-scrollbar"
                                style={{ 
                                    maxHeight: '420px', 
                                    overflowY: 'auto', 
                                    padding: '20px',
                                    minHeight: '300px'
                                }}
                            >
                                {filteredUpdates.length > 0 ? filteredUpdates.map((upd, i) => (
                                    <div key={i} style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                                        <div style={{ 
                                            width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
                                            background: (upd.type === 'imp' || upd.type === 'critical') ? '#ef4444' : 
                                                        upd.type === 'admin' ? '#a855f7' : 
                                                        upd.type === 'today' ? '#0ea5e9' : '#3b82f6' 
                                        }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{upd.title}</span>
                                                    {(upd.type === 'admin' || upd.isAdminUpdate) && <span style={{ fontSize: '9px', background: '#f3e8ff', color: '#a855f7', padding: '1px 4px', borderRadius: '4px', fontWeight: 800 }}>ADMIN</span>}
                                                    {activeUpdateTab === 'Standard (All)' && (upd.type === 'imp' || upd.type === 'critical') && <span style={{ fontSize: '9px', background: '#fee2e2', color: '#ef4444', padding: '1px 4px', borderRadius: '4px', fontWeight: 800 }}>IMP.</span>}
                                                </div>
                                                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{upd.date}</span>
                                            </div>
                                            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, fontWeight: 600 }}>{upd.text}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>
                                        No {activeUpdateTab} updates at the moment.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Colleges Accepting Sidebar */}
                        <div style={cardStyle}>
                            <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b', marginBottom: '16px' }}>Colleges Accepting</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {(mergedData.colleges || [
                                    { label: 'Top Tier Colleges' },
                                    { label: 'Mid Tier Colleges' },
                                    { label: 'Govt. Institutions' }
                                ]).map((item, i) => (
                                    <div key={i} style={{ 
                                        padding: '12px 16px', borderRadius: '16px', border: '1.5px solid #f1f5f9',
                                        display: 'flex', gap: '12px', alignItems: 'center'
                                    }}>
                                        <div style={{ width: '32px', height: '32px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                            <GraduationCap size={16} />
                                        </div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>{item.label}</span>
                                    </div>
                                )).slice(0, 3)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risks & Reality Check Footer Section */}
                <div style={{ marginTop: '40px' }}>
                    <div style={{ background: '#fef2f2', padding: '32px', borderRadius: '32px', border: '2px solid #fee2e2' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ width: '56px', height: '56px', background: '#fee2e2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
                                <AlertTriangle size={28} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#991b1b', marginBottom: '6px' }}>Reality Check & Risks</h4>
                                <p style={{ fontSize: '15.5px', color: '#b91c1c', lineHeight: 1.6, fontWeight: 600 }}>
                                    {mergedData.name} is a highly competitive examination in the national sector. Success requires early planning and a rigorous strategy. Always keep alternative pathways and back-up institutions ready in your admission cycle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamHub;
