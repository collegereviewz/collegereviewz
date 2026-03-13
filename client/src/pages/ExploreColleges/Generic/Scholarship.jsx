import React from 'react';
import { Gift, CheckCircle2, Info, GraduationCap, TrendingUp, Filter, ChevronDown, Sparkles, BookOpen, Clock, ExternalLink, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Scholarship = ({ collegeData }) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    const summaryStats = [
        { label: 'Scholarships Tracked', value: collegeData?.scholarships ? 'Active' : 'Pending' },
        { label: 'Aid Information', value: collegeData?.scholarships ? 'Available' : 'Coming Soon' },
        { label: 'Status', value: 'Updated for 2025' }
    ];

    const mainScholarships = [
        {
            name: 'SVMCM Scholarship',
            icon: <CheckCircle2 size={24} />,
            bg: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
            chart: (
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" transform="rotate(-90 20 20)" />
                    <path d="M14 20 L18 24 L26 16" fill="none" stroke="white" strokeWidth="2.5" />
                </svg>
            ),
            miniChart: (
                <svg width="40" height="20" viewBox="0 0 40 20" style={{ opacity: 0.4 }}>
                    <path d="M0 15 L8 10 L16 12 L24 5 L32 8 L40 2" fill="none" stroke="white" strokeWidth="2" />
                </svg>
            ),
            details: [
                { label: 'Eligibility', value: 'Meritorious Students (EWS, Income < ₹2.5 Lakhs)' },
                { label: 'Application Deadline', value: 'Dec 15th (LIVE)', highlight: true },
                { label: 'Next Step', value: 'Check Application Status (Action Button)', link: true },
                { label: 'View Full Eligibility', value: '(Link)', smallLink: true }
            ]
        },
        {
            name: 'Kanyashree (K3)',
            icon: <GraduationCap size={24} />,
            bg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
            chart: (
                <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src="https://img.icons8.com/color/48/graduation-cap.png" 
                      alt="cap" 
                      style={{ width: '32px', height: '32px' }} 
                    />
                </div>
            ),
            miniChart: (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', opacity: 0.4 }}>
                    {[8, 12, 6, 15, 10].map((h, i) => <div key={i} style={{ width: '3px', height: `${h}px`, background: 'white' }} />)}
                </div>
            ),
            details: [
                { label: 'Criteria', value: 'Post-graduate female students (M.Tech/MCA), Govt ...' },
                { label: 'Grant Amount', value: 'Max ₹2 Lakhs p.a. (Illustrative)' },
                { label: 'Required Docs', value: '(Expandable link)', link: true, expandable: true },
                { label: 'Apply Now via Official Portal', value: '(Action Button)', link: true }
            ]
        }
    ];

    const institutionalSchemes = [
        { name: 'Adesh University Institutional Scholarship (Merit-based)', tags: ['Merit', 'Merit'] },
        { name: 'DRDO Fellowship for Tech (New)', tags: ['Merit', 'Tech'], isNew: true }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Summary Bar */}
            <div style={{ 
                background: '#fff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '16px', 
                padding: '16px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
            }}>
                {summaryStats.map((stat, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>{stat.label}:</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{stat.value}</span>
                        {i < summaryStats.length - 1 && <div style={{ width: '1px', height: '20px', background: '#e2e8f0', marginLeft: '32px' }} />}
                    </div>
                ))}
            </div>

            {/* Main Section Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>Active Scholarship & Aid Finder</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ 
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', 
                        padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b'
                    }}>
                        Filter by <ChevronDown size={14} />
                    </div>
                    <div style={{ 
                        background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', 
                        padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontWeight: 600
                    }}>
                        All items <ChevronDown size={14} />
                    </div>
                </div>
            </div>

            {/* Cards and Sidebar Layout */}
            <div style={{ display: 'flex', gap: '24px' }}>
                {/* Left Column: Scholarship Cards */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>Scholarship & Financial Aid Overview</h3>
                        <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#445469' }}>
                            {collegeData?.scholarships || `${collegeData?.name || 'This college'} provides various merit-based and need-based scholarships to its students. Detailed information about the specific eligibility criteria and application process is being updated and will be available shortly.`}
                        </p>
                    </div>

                    {/* Lower List Section */}
                    <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: 0 }}>
                             Institutional merit scheme details are being verified. Visit the official campus portal for the latest circulars.
                        </p>
                    </div>
                </div>

                {/* Right Column: AI Advisor */}
                <div style={{ width: '280px' }}>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ background: '#eff6ff', borderRadius: '20px', border: '1px solid #dbeafe', overflow: 'hidden' }}
                    >
                        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ color: '#2563eb' }}><Sparkles size={18} /></div>
                                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e3a8a' }}>Your AI Advisor</span>
                            </div>
                            <ChevronDown size={14} color="#1e3a8a" />
                        </div>
                        
                        <div style={{ background: '#fff', margin: '0 8px 8px 8px', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ color: '#64748b' }}><TrendingUp size={16} /></div>
                                <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.4 }}>
                                    <strong style={{ fontWeight: 800 }}>Matches Found:</strong> Sign in to check your personalized criteria matches.
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ color: '#f59e0b' }}><AlertTriangle size={16} /></div>
                                <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.4 }}>
                                    <strong style={{ fontWeight: 800 }}>Tip:</strong> Ensure EWS certificate is valid.
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ color: '#3b82f6' }}><Info size={16} /></div>
                                <div style={{ fontSize: '12px', color: '#334155', lineHeight: 1.4 }}>
                                    <strong style={{ fontWeight: 800 }}>AI Advantage:</strong> Get insights onto which scholarship you have the best chance for.
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '16px', textAlign: 'center' }}>
                            <button style={{ 
                                width: '100%', padding: '10px', background: '#3b82f6', color: '#fff', 
                                border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}>
                                Ask AI <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Alert Section */}
            <div style={{ 
                background: '#fef2f2', 
                border: '1px solid #fee2e2', 
                borderRadius: '16px', 
                padding: '20px',
                display: 'flex',
                gap: '16px'
            }}>
                <div style={{ color: '#ef4444' }}><AlertTriangle size={24} /></div>
                <div>
                    <h5 style={{ fontSize: '14px', fontWeight: 900, color: '#991b1b', marginBottom: '4px' }}>Application Advisory</h5>
                    <p style={{ fontSize: '12px', color: '#b91c1c', lineHeight: 1.6 }}>
                        Students are strongly advised to check the official state portal and college administration officer for current specific eligibility criteria for each session.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Scholarship;
