import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Info, Clock, ExternalLink, Calendar, MapPin, 
  FileText, Download, Bell, Share2, Filter, ChevronDown, 
  ChevronRight, Sparkles, TrendingUp, AlertTriangle, ArrowRight,
  BookOpen, Target, Award, Users, Search, GraduationCap, ShieldCheck,
  Stethoscope, MessageSquare, Globe, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExamHub = ({ examData }) => {
    const [activeSection, setActiveSection] = useState('Overview');
    const [isSticky, setIsSticky] = useState(false);
    const [expandedSyllabus, setExpandedSyllabus] = useState({});
    const [activeUpdateTab, setActiveUpdateTab] = useState('All');

    const data = examData || {
        name: 'NEET UG 2026',
        fullName: 'National Eligibility cum Entrance Test',
        conductingBody: 'National Testing Agency (NTA)',
        summary: 'National Eligibility cum Entrance Test (Medical) is the main entrance for MBBS/BDS in India.',
        lastUpdated: '11 Mar 2026',
        officialWebsite: 'neet.nta.nic.in',
        status: 'Registration Open',
        daysLeft: '4 Days Left',
        highlights: {
            mode: 'Pen & Paper (OMR)',
            totalMarks: '720 Marks',
            negative: '-1 for wrong answer',
            duration: '3 hours 20 minutes',
            frequency: 'Once a year',
            languages: '13 Languages'
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
        ]
    };

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
                                    background: data.color ? `linear-gradient(135deg, ${data.color}, #64748b)` : 'linear-gradient(135deg, #0ea5e9, #0284c7)', 
                                    borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                    color: '#fff', overflow: 'hidden'
                                }}>
                                    {data.logo && data.logo !== 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/placeholder-exam.png' ? (
                                        <img src={data.logo} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: i => i === 'NEET' ? '0' : '10px' }} />
                                    ) : (
                                        data.fallbackIcon || <GraduationCap size={32} />
                                    )}
                                </div>
                                <div>
                                    <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', marginBottom: '4px' }}>{data.name}</h1>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#64748b', fontWeight: 700 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Award size={16} color="#0284c7" /> {data.conductingBody || 'NTA / Official'}
                                            <ExternalLink size={12} color="#0ea5e9" style={{ cursor: 'pointer', marginLeft: '2px' }} />
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <ShieldCheck size={16} color="#059669" /> Mode: {data.highlights?.mode || 'Offline (OMR)'}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Users size={16} color="#f59e0b" /> 
                                            Students Appeared (Last Year): <span style={{ color: '#1e293b', fontWeight: 900 }}>~21 lakh</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '24px', maxWidth: '700px' }}>
                                {data.summary}
                            </p>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                {[
                                    { t: 'Dates', c: '#f0fdf4', ic: '#059669', icon: <Calendar size={16} /> },
                                    { t: 'Apply', c: '#eff6ff', ic: '#3b82f6', icon: <FileText size={16} /> },
                                    { t: 'Cutoff', c: '#f0fdf4', ic: '#059669', icon: <TrendingUp size={16} /> },
                                    { t: 'Predictor', c: '#eff6ff', ic: '#3b82f6', icon: <Sparkles size={16} /> }
                                ].map(tab => (
                                    <button key={tab.t} style={{ 
                                        padding: '12px 28px', borderRadius: '50px', border: '1.5px solid #f1f5f9',
                                        background: '#fff', color: '#1e293b', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                                    }}>
                                        <div style={{ color: tab.ic }}>{tab.icon}</div>
                                        {tab.t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status Card Stack */}
                        <div style={{ width: '320px' }}>
                            <div style={{ 
                                background: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', 
                                borderRadius: '24px', padding: '20px', color: '#fff', marginBottom: '16px',
                                boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.2)', position: 'relative', overflow: 'hidden'
                            }}>
                                {/* Decorative elements */}
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
                                        <CheckCircle2 size={16} /> Apply Now <span style={{ fontSize: '11px', opacity: 0.6, fontWeight: 700 }}>Official Link</span>
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
                                        width: '100%', padding: '12px', borderRadius: '12px', background: '#0096FF', 
                                        color: '#fff', border: 'none', fontWeight: 950, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        fontSize: '14px'
                                    }}>
                                        <Download size={16} /> Download Notification PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Navigation Strip */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', sticky: 'top', top: 0, zIndex: 100 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', gap: '32px', position: 'relative' }}>
                    {['Apply', 'Dates', 'Eligibility', 'Form', 'Summary', 'Counselling'].map(item => (
                        <button 
                            key={item}
                            onClick={() => setActiveSection(item)}
                            style={{ 
                                padding: '16px 4px', background: 'none', border: 'none', 
                                borderBottom: activeSection === item ? '3.5px solid #0096FF' : '3.5px solid transparent',
                                color: activeSection === item ? '#0096FF' : '#64748b', fontSize: '14px', fontWeight: 900,
                                cursor: 'pointer', transition: 'all 0.2s ease', textTransform: 'capitalize',
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                        >
                            {item === 'Apply' && <FileText size={16} />}
                            {item === 'Dates' && <Calendar size={16} />}
                            {item === 'Eligibility' && <ShieldCheck size={16} />}
                            {item === 'Form' && <Settings size={16} />}
                            {item === 'Summary' && <TrendingUp size={16} />}
                            {item === 'Counselling' && <GraduationCap size={16} />}
                            {item}
                        </button>
                    ))}
                    <div style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)' }}>
                       <ChevronRight size={20} color="#cbd5e1" />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '24px auto 0', padding: '0 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Key Highlights Section */}
                        <div style={cardStyle}>
                            <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b', marginBottom: '24px' }}>Key Highlights</h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
                                {/* Exam Mode Card */}
                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9', position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: '#ffedd5', padding: '8px', borderRadius: '10px' }}><div style={{ width: '16px', height: '16px', background: '#f97316', borderRadius: '4px' }}></div></div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Exam Mode</span>
                                    </div>
                                    <p style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>{data.highlights?.mode || 'Offline (OMR)'}</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>(Pen & Paper)</p>
                                </div>

                                {/* Total Marks Card */}
                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '10px' }}><div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '4px' }}></div></div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Total Marks</span>
                                    </div>
                                    <p style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>{data.highlights?.totalMarks || '720 Marks'}</p>
                                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, lineHeight: 1.2 }}>
                                        {data.category === 'MBBS' ? '(Physics, Chemistry, Biology)' : 'Core Subjects Included'}
                                    </p>
                                </div>

                                {/* Negative Marking Card */}
                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: '#fee2e2', padding: '8px', borderRadius: '10px' }}><div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '4px' }}></div></div>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Negative</span>
                                    </div>
                                    <p style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>{data.highlights?.negative || '-1 for wrong'}</p>
                                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>As per official pattern</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Clock size={18} color="#0ea5e9" />
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Duration</p>
                                        <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{data.highlights?.duration || 'Varies'}</p>
                                    </div>
                                </div>
                                <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Globe size={18} color="#10b981" />
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Languages</p>
                                        <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{data.highlights?.languages || 'English & Regional'}</p>
                                    </div>
                                </div>
                                <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Calendar size={18} color="#f59e0b" />
                                    <div>
                                        <p style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Frequency</p>
                                        <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>{data.highlights?.frequency || 'Annual'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Dates Table Layout */}
                        <div id="Dates" style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b' }}>Important Dates</h3>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button style={{ background: '#f8fafc', border: '1.5px solid #f1f5f9', padding: '8px 16px', borderRadius: '10px', color: '#0ea5e9', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Download size={16} /> Download Dates PDF
                                    </button>
                                    <button style={{ background: '#f8fafc', border: '1.5px solid #f1f5f9', padding: '8px 16px', borderRadius: '10px', color: '#64748b', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Calendar size={16} /> Add to Google Calendar
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', padding: '12px 0', borderBottom: '2px solid #f1f5f9', fontSize: '13px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase' }}>
                                    <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Calendar size={14} /> Events & Milestones
                                    </div>
                                    <div style={{ flex: 1 }}>Dates / Timeline</div>
                                </div>
                                {data.dates.map((item, i) => (
                                    <div key={i} style={{ 
                                        display: 'flex', alignItems: 'center', padding: '24px 0', 
                                        borderBottom: '1.5px solid #f1f5f9'
                                    }}>
                                        <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.status === 'Confirmed' ? '#059669' : '#cbd5e1' }} />
                                            <span style={{ fontSize: '16px', fontWeight: 800, color: '#334155' }}>{item.label}</span>
                                        </div>
                                        <div style={{ flex: 1, fontSize: '16px', fontWeight: 950, color: '#1e293b' }}>{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Exam Pattern & Syllabus Section */}
                        <div style={cardStyle}>
                             <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#1e293b', marginBottom: '24px' }}>Exam Pattern & Structure</h3>
                             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                                 <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1.5px solid #f1f5f9' }}>
                                     <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#475569', marginBottom: '16px' }}>Question Pattern</h4>
                                     <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                             <span style={{ color: '#64748b', fontWeight: 700 }}>Total Questions</span>
                                             <span style={{ color: '#1e293b', fontWeight: 900 }}>{data.highlights?.questions || (data.category === 'MBBS' ? '200 MCQs' : 'Varies')}</span>
                                         </div>
                                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                             <span style={{ color: '#64748b', fontWeight: 700 }}>Marking System</span>
                                             <span style={{ color: '#059669', fontWeight: 900 }}>{data.highlights?.negative || '+4 / -1'}</span>
                                         </div>
                                     </div>
                                 </div>
                                 <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', border: '1.5px solid #f1f5f9' }}>
                                     <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#475569', marginBottom: '16px' }}>Core Subjects</h4>
                                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                         {['General Aptitude', 'Core Subject', 'Logical Reasoning'].map(s => <span key={s} style={{ background: '#fff', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 800, color: '#475569', border: '1px solid #e2e8f0' }}>{s}</span>)}
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Tabbed Updates */}
                        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b', marginBottom: '16px' }}>Recent Updates</h4>
                                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
                                    {['All', 'Today', 'Imp.', 'Official'].map(tab => (
                                        <button 
                                            key={tab}
                                            onClick={() => setActiveUpdateTab(tab)}
                                            style={{ 
                                                flex: 1, padding: '8px 0', borderRadius: '8px', 
                                                background: activeUpdateTab === tab ? '#fff' : 'transparent',
                                                border: 'none', color: activeUpdateTab === tab ? '#0ea5e9' : '#64748b',
                                                fontSize: '11px', fontWeight: 800, cursor: 'pointer'
                                            }}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '20px' }}>
                                {data.updates.map((upd, i) => (
                                    <div key={i} style={{ marginBottom: '20px', display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', background: upd.type === 'critical' ? '#ef4444' : '#3b82f6' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: 900, color: '#1e293b' }}>{upd.title}</span>
                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{upd.date}</span>
                                            </div>
                                            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>{upd.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Colleges Accepting / Ranks */}
                        <div style={cardStyle}>
                            <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b', marginBottom: '16px' }}>Colleges Accepting</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                                {['Maharashtra', 'Karnataka', 'Delhi'].map(tag => (
                                    <span key={tag} style={{ fontSize: '11px', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '6px 14px', borderRadius: '50px', border: '1px solid #e2e8f0' }}>{tag}</span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {(data.colleges || [
                                    { label: 'Top Tier Colleges', rank: '99%ile' },
                                    { label: 'Mid Tier Colleges', rank: '90%ile' },
                                    { label: 'Govt. Institutions', rank: '95%ile' }
                                ]).map((item, i) => (
                                    <div key={i} style={{ 
                                        padding: '12px 16px', borderRadius: '16px', border: '1.5px solid #f1f5f9',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>{item.label}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 900, color: '#0ea5e9', background: '#eff6ff', padding: '6px 12px', borderRadius: '8px' }}>{item.rank}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Prediction / Brochure */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button style={{ 
                                padding: '16px', borderRadius: '18px', background: '#fff', border: '2px solid #0096FF', 
                                color: '#0096FF', fontWeight: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}>
                                <Search size={18} /> Predict Admission Chance
                            </button>
                            <button style={{ 
                                padding: '16px', borderRadius: '18px', background: '#f8fafc', border: '1.5px solid #e2e8f0', 
                                color: '#64748b', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}>
                                <Download size={18} /> Detailed Brochure
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reality Check Footer */}
                <div style={{ marginTop: '40px' }}>
                    <div style={{ background: '#fef2f2', padding: '32px', borderRadius: '32px', border: '2px solid #fee2e2' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ width: '56px', height: '56px', background: '#fee2e2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
                                <AlertTriangle size={28} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#991b1b', marginBottom: '6px' }}>Reality Check & Risks</h4>
                                <p style={{ fontSize: '15.5px', color: '#b91c1c', lineHeight: 1.6, fontWeight: 600 }}>
                                    {data.category === 'MBBS' ? 
                                        `With over 21 lakh applicants, ${data.name} is one of the toughest exams globally. Competition for Government seats is intense (cutoffs 600+).` :
                                        `${data.name} is a highly competitive examination in the ${data.category || 'national'} sector. Success requires early planning and a rigorous strategy. `
                                    } 
                                    Always keep alternative pathways and back-up institutions ready in your admission cycle.
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
