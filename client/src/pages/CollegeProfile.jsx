import React, { useState, useEffect } from 'react';
import { 
  MapPin, GraduationCap, Download, Share2, Heart, Star, 
  ChevronRight, Calendar, Info, BookOpen, Trophy, 
  Map as MapIcon, Users, SlidersHorizontal, ArrowRight, Play, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const CollegeProfile = () => {
    const { collegeName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const collegeData = location.state?.collegeData || {};
    const [activeTab, setActiveTab] = useState('College Info');

    const tabs = [
        'College Info', 'Course & Fees', 'Cut Off', 'Admission', 
        'Reviews', 'Ranking and Placement', 'Result', 'Location'
    ];

    const updates = [
        { date: 'Jan 14, 2026', title: 'GATE 2026 is scheduled for Feb 7, 8, 14, and 15, 2026, for ME/ MTech/ PhD admissions. The Admit card has been released. Candidates can download the same directly @gate2026.iitkg.ac.in.' },
        { date: 'Jan 13, 2026', title: 'IIT JAM 2026 will be conducted on Feb 15, 2026, for MSc, Joint MSc-PhD, and MSc-PhD (Dual Degree) admissions. The Admit card has been released @jam2026.iitm.ac.in.' },
        { date: 'Jan 2, 2026', title: 'CEED 2026 Exam will be conducted on January 18, 2026, from 9 AM to 12 PM for M.Des/ PhD (Design) admission. The Admit card for the same has been released @ceed.iitb.ac.in.' }
    ];

    const feesData = [
        { course: 'B.Tech', firstYear: '₹ 2,30,000', total: '₹ 8,83 Lakhs' },
        { course: 'M.Tech', firstYear: '₹ 72,000', total: '₹ 1.24 Lakhs' },
        { course: 'BS', firstYear: '₹ 2,30,000', total: '₹ 8,83 Lakhs' },
        { course: 'M.Sc', firstYear: '₹ 52,500', total: '₹ 84,500' },
        { course: 'B.Tech + M.Tech', firstYear: '₹ 2,30,000', total: '₹ 10.98 Lakhs' },
        { course: 'M.Des', firstYear: '₹ 72,000', total: '₹ 1.24 Lakhs' },
        { course: 'MBA', firstYear: '₹ 7,66,000', total: '₹ 15.16 Lakhs' },
        { course: 'PhD', firstYear: '₹ 89,200', total: '₹ 2.2 Lakhs' },
    ];

    const containerStyle = {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 40px',
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
            {/* Hero Section */}
            <div style={{ 
                position: 'relative', 
                height: '400px', 
                background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                color: '#fff'
            }}>
                <div style={{ ...containerStyle, width: '100%', paddingBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{ 
                            width: '100px', 
                            height: '100px', 
                            background: '#fff', 
                            borderRadius: '16px', 
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                        }}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png" alt="IITB Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>
                                {collegeName || 'IIT Bombay'} - Indian Institute of Technology - Fees, Admission, Placements, Rankings, Cutoff
                            </h1>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> Powai, Mumbai</span>
                                <span>| Autonomous University</span>
                                <span>| Estd 1958</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ 
                            padding: '12px 28px', background: '#5b51d8', color: '#fff', 
                            borderRadius: '10px', fontSize: '15px', fontWeight: 800, 
                            display: 'flex', alignItems: 'center', gap: '8px', border: 'none',
                            cursor: 'pointer', boxShadow: '0 8px 16px rgba(91,81,216,0.3)'
                        }}>
                            <Play size={16} fill="white" /> Apply
                        </button>
                        <button style={{ 
                            padding: '12px 28px', background: 'rgba(255,255,255,0.2)', color: '#fff', 
                            borderRadius: '10px', fontSize: '15px', fontWeight: 800, 
                            border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)',
                            cursor: 'pointer'
                        }}>
                            Brochure
                        </button>
                    </div>
                </div>
            </div>

            {/* Sticky Tabs Navigation */}
            <div style={{ 
                background: '#fff', 
                borderBottom: '1px solid #e2e8f0', 
                position: 'sticky', 
                top: '0', 
                zIndex: 100,
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
                <div style={{ ...containerStyle, display: 'flex', overflowX: 'auto', gap: '32px', padding: '0 40px' }} className="no-scrollbar">
                    {tabs.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ 
                                padding: '20px 0',
                                fontSize: '14px',
                                fontWeight: activeTab === tab ? 800 : 600,
                                color: activeTab === tab ? '#5b51d8' : '#64748b',
                                border: 'none',
                                background: 'none',
                                borderBottom: activeTab === tab ? '3px solid #5b51d8' : '3px solid transparent',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ ...containerStyle, marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
                
                {/* Left Column Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    
                    {/* Updates Section */}
                    <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>IIT Bombay Updates and News</h2>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={{ padding: '8px 16px', borderRadius: '8px', background: '#5b51d8', color: '#fff', fontSize: '12px', fontWeight: 700, border: 'none' }}>Key Updates</button>
                                <button style={{ padding: '8px 16px', borderRadius: '8px', background: '#1e1b4b', color: '#fff', fontSize: '12px', fontWeight: 700, border: 'none' }}>Other Updates</button>
                            </div>
                        </div>
                        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Updated on - Jan 14, 2026</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {updates.map((update, i) => (
                                <div key={i} style={{ 
                                    background: 'rgba(91, 81, 216, 0.9)', 
                                    borderRadius: '12px', 
                                    padding: '20px',
                                    color: '#fff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ background: '#f59e0b', color: '#111', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, width: 'fit-content', marginBottom: '8px' }}>
                                            {update.date}
                                        </div>
                                        <p style={{ fontSize: '14px', lineHeight: 1.6, fontWeight: 500 }}>{update.title}</p>
                                    </div>
                                    <button style={{ 
                                        padding: '10px 16px', background: '#f59e0b', color: '#111', 
                                        borderRadius: '8px', fontSize: '12px', fontWeight: 800, 
                                        display: 'flex', alignItems: 'center', gap: '6px', border: 'none',
                                        cursor: 'pointer', flexShrink: 0
                                    }}>
                                        View Details <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overview Column Container */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {/* Overview */}
                            <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '20px' }}>Overview</h2>
                                <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#475569', textAlign: 'justify' }}>
                                    Indian Institute of Technology Bombay, popularly known as IIT Bombay or IIT Mumbai, is an autonomous institute established in 1958. As per the maximum number of top JEE (Advanced) rankers chose IIT Bombay because of its career opportunities and its location in the financial hub of India. IIT Ranking is 3rd in the B.Tech category by NIRF 2025. According to Collegedunia Rankings, the institute has been ranked 1st for B.Tech.
                                    <br /><br />
                                    IIT Bombay offers B.Tech as one of the most popular programs. Admission to B.Tech is based on JEE Advanced scores, followed by JoSAA Counselling. IIT Bombay JEE Advanced Cutoff Rank 2025 Round 1 for the General Category is 56 - 4565.
                                    <br /><br />
                                    As per IIT Bombay Placements, the average package was INR 23.5 LPA. 22 students accepted offers above INR 1 Cr PA. 366 companies participated, including Fortune 500 companies. The top recruiters at IIT Bombay Placement included Airbus, Apple, Google, Intel, Godrej, Shell, Halliburton, Accenture, Barclays, Michelin, Cipla, Abbott, Pfizer, Amazon, Honeywell, Hitachi, Boeing, and Reliance.
                                </p>
                            </div>

                            {/* Quick Facts */}
                            <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', background: '#fff', padding: '32px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>Quick Facts</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { label: 'Established', value: '1958' },
                                        { label: 'NIRF Rank (B.Tech)', value: '3' },
                                        { label: 'Location', value: collegeData.location || 'Powai, Mumbai' },
                                        { label: 'Average Package', value: collegeData.placement || '₹23.5LPA' },
                                        { label: 'Highest Package', value: collegeData.highestPackage || '₹1 Cr+' },
                                        { label: 'Entrance Exam', value: 'JEE Advanced' }
                                    ].map((fact, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#475569' }}>
                                            <div style={{ width: '4px', height: '4px', background: '#5b51d8', borderRadius: '50%' }} />
                                            <span style={{ fontWeight: 600, color: '#1e293b' }}>{fact.label}:</span> {fact.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Sidebar Inside Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {/* Videos Section */}
                            <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>Videos</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '140px' }}>
                                        <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'red', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Play size={20} fill="white" color="white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '140px' }}>
                                        <img src="https://images.unsplash.com/photo-1523050853064-85a17f0094e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'red', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Play size={20} fill="white" color="white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* View Details Select */}
                            <div style={{ border: '1px solid #e2e8f0', borderRadius: '20px', background: '#fff', padding: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '16px' }}>View Details</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {[
                                        { icon: <Info size={14} />, label: 'Admission' },
                                        { icon: <BookOpen size={14} />, label: 'Fees Structure' },
                                        { icon: <Trophy size={14} />, label: 'Rankings' },
                                        { icon: <SlidersHorizontal size={14} />, label: 'Cutoff Trends' },
                                        { icon: <Users size={14} />, label: 'Placements' }
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <span style={{ color: '#5b51d8' }}>{item.icon}</span>
                                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admission Dates and Table */}
                    <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>IIT Bombay Admission Dates</h2>
                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#64748b', marginBottom: '20px' }}>
                            IIT Bombay also offers M.Tech and MSc as other popular programs. Admission to these programs is based on national-level entrance exams, including IIT JAM and GATE. Here are the important dates of the admission process conducted by IIT Bombay:
                        </p>
                        
                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                <thead>
                                    <tr style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff' }}>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Events</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Dates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { event: 'JEE Main 2026 session 1 Exam Date', date: 'Jan 21 - Jan 28, 2026' },
                                        { event: 'JEE Main 2026 session 2 Registration Date', date: 'Feb 01 - Feb 25, 2026 (Tentative)' },
                                        { event: 'JEE Main 2026 session 1 Result Date', date: 'Feb 19, 2026' },
                                        { event: 'JEE Main 2026 session 2 Exam Date', date: 'Apr 01 - Apr 10, 2026' },
                                        { event: 'JEE Main 2026 session 2 Result Date', date: 'Apr 20, 2026' },
                                        { event: 'JEE Main 2026 session 1 Registration Date', date: 'Oct 01 - Nov 20, 2025' },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px', color: '#1e293b', fontWeight: 600 }}>{row.event}</td>
                                            <td style={{ padding: '16px', color: '#64748b', fontWeight: 500 }}>{row.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Fees Structure Table */}
                    <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>IIT Bombay Admission</h2>
                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#64748b', marginBottom: '20px' }}>
                            IIT Bombay offers B.Tech with a total fee of ₹ 8,82,500. The details for <span style={{ color: '#5b51d8', fontWeight: 700 }}>IIT Bombay Courses & Fees</span> are mentioned in the table below:
                        </p>
                        
                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                <thead>
                                    <tr style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff' }}>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Course</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>1st Year Fee</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: 800 }}>Total Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feesData.map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px', color: '#1e293b', fontWeight: 800 }}>{row.course}</td>
                                            <td style={{ padding: '16px', color: '#64748b', fontWeight: 600 }}>{row.firstYear}</td>
                                            <td style={{ padding: '16px', color: '#5b51d8', fontWeight: 800 }}>{row.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Right Column (Sidebar) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    
                    {/* Why Choose IIT Bombay */}
                    <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>Why Choose IIT Bombay?</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                'Top-ranked engineering institute in India',
                                'Mumbai location = career & startup exposure',
                                'Consistent placements with ₹1 Cr+ offers',
                                'Fortune 500 recruiters: Google, Apple, Intel, Airbus'
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#dcfce7', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <div style={{ width: '6px', height: '10px', borderRight: '2px solid #22c55e', borderBottom: '2px solid #22c55e', transform: 'rotate(45deg) translate(-1px, -1px)' }} />
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#475569', fontWeight: 600, lineHeight: 1.4 }}>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table of Content (Mini) */}
                    <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '16px' }}>Table Content</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                'IIT Bombay Admission Dates',
                                'IIT Bombay Fees',
                                'IIT Bombay Ranking',
                                'IIT Bombay Admission',
                                'IIT Bombay Cutoff',
                                'IIT Bombay Placement'
                            ].map((item, i) => (
                                <div key={i} style={{ fontSize: '13px', color: '#5b51d8', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '8px' }}>
                                    <span>{i + 1}.</span> {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Banner Card */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', 
                        borderRadius: '20px', 
                        padding: '32px', 
                        color: '#fff',
                        textAlign: 'center'
                    }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Want to Compare with Other Colleges?</h4>
                        <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '24px', lineHeight: 1.6 }}>Get a detailed comparison based on fees, placements, and infrastructure.</p>
                        <button style={{ 
                            width: '100%', padding: '12px', background: '#fff', color: '#5b51d8', 
                            borderRadius: '10px', border: 'none', fontWeight: 800, cursor: 'pointer',
                            fontSize: '14px', transition: 'transform 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                            Start Comparing
                        </button>
                    </div>

                </div>

            </div>

            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

export default CollegeProfile;
