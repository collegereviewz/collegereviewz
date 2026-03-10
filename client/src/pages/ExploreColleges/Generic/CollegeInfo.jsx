import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from '../Review';
import { ChevronRight, Info, BookOpen, Trophy, SlidersHorizontal, Users, Play, Bell, Newspaper, Calendar, Navigation } from 'lucide-react';
import HowToReach from './HowToReach.jsx';

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const CollegeInfo = ({ collegeData, onTabChange }) => {
    const collegeId = collegeData?._id || collegeData?.data?._id;
    // collegeData comes from ExploreColleges when "View Details" or Name is clicked.
    // We default to it, but fallback if not perfectly formed.
    // Map data from collegeData
    const name = collegeData?.name || 'College Name';
    const location = collegeData?.location || 'Location Not Available';
    const type = collegeData?.rankingInfo || 'Institution Type';
    
    // We get these from the grouped collegeData
    const established = collegeData?.establishedYear || '—';
    const averagePackage = collegeData?.placement || collegeData?.avgPackage || '—';
    const highestPackage = collegeData?.highestPackage || '—';
    const entranceExam = collegeData?.entranceExam || '—';
    const rankingStr = collegeData?.rankingInfo || '—';

    // ─── DYNAMIC UPDATES LOGIC ──────────────────────────────────────────────
    const [dynamicUpdates, setDynamicUpdates] = useState({ notifications: [], news: [], events: [] });
    const [loadingUpdates, setLoadingUpdates] = useState(true);
    const [updatesTab, setUpdatesTab] = useState('notifications');

    useEffect(() => {
        const fetchUpdates = async () => {
            if (!collegeId) return;
            try {
                setLoadingUpdates(true);
                const response = await axios.get(`http://localhost:5000/api/colleges/${collegeId}/updates`);
                setDynamicUpdates(response.data);
            } catch (error) {
                console.error('Error fetching dynamic updates:', error);
            } finally {
                setLoadingUpdates(false);
            }
        };
        fetchUpdates();
    }, [collegeId]);

    const activeList = dynamicUpdates[updatesTab] || [];

    const quickFacts = [
        { label: 'NIRF Rank',          value: rankingStr },
        { label: 'Location',           value: location },
        { label: 'Average Package',    value: averagePackage },
        { label: 'Highest Package',    value: highestPackage },
        { label: 'Entrance Exam',      value: entranceExam },
        { label: 'Established',        value: established },
    ].filter(f => f.value && f.value !== '—');

    const viewDetails = [
        { icon: <Info size={14} />,              label: 'Admission', id: 'Admission' },
        { icon: <BookOpen size={14} />,          label: 'Fees Structure', id: 'Course & Fees' },
        { icon: <Trophy size={14} />,            label: 'Rankings', id: 'Ranking and Placement' },
        { icon: <SlidersHorizontal size={14} />, label: 'Cutoff Trends', id: 'Cut Off' },
        { icon: <Users size={14} />,             label: 'Placements', id: 'Ranking and Placement' },
    ];

    const whyChoose = [
        `Learn more about ${name}`,
        averagePackage !== '—' ? `Excellent placements with an average package of ${averagePackage}` : 'Placements and ROI statistics coming soon',
        highestPackage !== '—' ? `Highest package reaches up to ${highestPackage}` : 'Top recruiter details to be updated',
    ];

    // Map fees from courses array
    const feesData = collegeData?.courses?.length > 0 
        ? collegeData.courses.map(c => ({ course: c.course, firstYear: c.fees || '—', total: c.fees || '—' }))
        : [];

    const hasFees = feesData.length > 0;
    const hasPlacement = averagePackage !== '—' || highestPackage !== '—';

    const tableContent = [
        { id: 'college-info',         label: 'College Info', show: true },
        { id: 'courses-fees',         label: 'Course & Fees', show: hasFees },
        { id: 'cut-off',              label: 'Cut Off', show: false }, // Hidden for now
        { id: 'admission',            label: 'Admission', show: true }, // Enabled now
        { id: 'reviews',              label: 'Reviews', show: true },
        { id: 'ranking-placement',    label: 'Ranking and Placement', show: hasPlacement },
        { id: 'result',               label: 'Result', show: false },
        { id: 'location',             label: 'Location', show: true },
        { id: 'photo-video',          label: 'Photo & Video', show: false },
        { id: 'scholarship',          label: 'Scholarship', show: false },
        { id: 'contact-details',      label: 'Contact Details', show: true }
    ].filter(item => item.show);

    // ─── HELPERS ──────────────────────────────────────────────────────────────
    const card = { background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' };
    const h2s  = { fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' };

    const StyledTable = ({ columns, rows }) => (
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', marginTop: '14px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff' }}>
                        {columns.map(c => <th key={c} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 800 }}>{c}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                            {row.map((cell, j) => (
                                <td key={j} style={{ padding: '12px 16px', color: j === 0 ? '#1e293b' : '#64748b', fontWeight: j === 0 ? 700 : 500 }}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* ══ ROW 1: Updates | Quick Facts | Video ══════════════════════ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px 200px', gap: '20px', alignItems: 'stretch' }}>

                {/* Updates & News */}
                <div style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h2 style={{ ...h2s, marginBottom: 0 }}>Latest Updates</h2>
                            {activeList.length > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px', border: '1px solid #10b981' }}>
                                <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                                <span style={{ fontSize: '9px', fontWeight: 800, color: '#047857' }}>LIVE</span>
                            </div>}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                            {[
                                { id: 'notifications', icon: <Bell size={12} />, label: 'Notices' },
                                { id: 'news', icon: <Newspaper size={12} />, label: 'News' },
                                { id: 'events', icon: <Calendar size={12} />, label: 'Events' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setUpdatesTab(tab.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontSize: '10px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        background: updatesTab === tab.id ? '#5b51d8' : 'transparent',
                                        color: updatesTab === tab.id ? '#fff' : '#64748b',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }} className="no-scrollbar">
                        {loadingUpdates ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} style={{ height: '50px', background: '#f1f5f9', borderRadius: '12px', animation: 'pulse 1.5s infinite alternate' }} />
                                ))}
                            </div>
                        ) : activeList.length > 0 ? (
                            activeList.map((upd, i) => (
                                <a 
                                    key={i} 
                                    href={upd.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        textDecoration: 'none',
                                        background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', 
                                        borderRadius: '12px', 
                                        padding: '12px', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        gap: '4px',
                                        border: '1px solid #e2e8f0',
                                        transition: 'transform 0.2s' 
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '10px', color: '#5b51d8', fontWeight: 800 }}>{upd.date}</span>
                                        <ChevronRight size={12} color="#94a3b8" />
                                    </div>
                                    <p style={{ fontSize: '11px', color: '#1e293b', fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{upd.title}</p>
                                </a>
                            ))
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                                Visit official website for latest updates.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Facts */}
                <div style={card}>
                    <h3 style={h2s}>Quick Facts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {quickFacts.map((f, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingBottom: '10px', borderBottom: i < quickFacts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>{f.label}</span>
                                <span style={{ color: '#1e293b', fontWeight: 800, textAlign: 'right' }}>{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View Details */}
                <div style={card}>
                    <h3 style={h2s}>View Details</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {viewDetails.filter(item => {
                            if (item.label === 'Fees Structure') return hasFees;
                            if (item.label === 'Placements') return hasPlacement;
                            if (item.label === 'Rankings') return rankingStr !== '—';
                            return false; // Hide others for now
                        }).map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setTimeout(() => onTabChange(item.id), 200);
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <span style={{ color: '#5b51d8' }}>{item.icon}</span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ ROW 2: Overview | Why Choose | Videos ═══════════════ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px 220px', gap: '20px', alignItems: 'stretch' }}>

                {/* Overview */}
                <div style={card}>
                    <h3 style={h2s}>Overview</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#475569', textAlign: 'left' }}>
                        {name} is located in <strong>{location}</strong>. It is recognized as {type}. Detailed overview and admission descriptions will be updated here based on the latest data.
                    </p>
                </div>

                {/* Why Choose */}
                <div style={card}>
                    <h3 style={h2s}>Why Choose {name}?</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {whyChoose.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                <div style={{ width: '18px', height: '18px', background: '#dcfce7', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                    <div style={{ width: '5px', height: '9px', borderRight: '2px solid #22c55e', borderBottom: '2px solid #22c55e', transform: 'rotate(45deg) translate(-1px,-1px)' }} />
                                </div>
                                <p style={{ fontSize: '12px', color: '#475569', fontWeight: 600, lineHeight: 1.5 }}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Videos */}
                <div style={card}>
                    <h3 style={h2s}>Videos</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>
                        Video tours coming soon
                    </div>
                </div>

            </div>

            {/* ══ FULL DETAILS: Left = sidebar, Right = content ═══ */}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'flex-start' }}>

                {/* LEFT: Sticky Sidebar (TOC + Banner) */}
                <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Table of Contents */}
                    <div style={{ ...card, padding: '16px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>Table Content</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {tableContent.map((item, i) => (
                                <div key={i}
                                    onClick={() => scrollTo(item.id)}
                                    style={{ fontSize: '11.5px', color: '#5b51d8', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '6px', lineHeight: 1.5, padding: '4px 6px', borderRadius: '6px', transition: 'background 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.textDecoration = 'underline'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.textDecoration = 'none'; }}>
                                    <span style={{ color: '#94a3b8', fontWeight: 800, minWidth: '14px' }}>{i + 1}.</span>
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Banner in Sidebar */}
                    <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', borderRadius: '20px', padding: '24px', color: '#fff', textAlign: 'center' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px' }}>Want to Compare?</h4>
                        <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '16px', lineHeight: 1.5 }}>Get a detailed comparison based on fees and placements.</p>
                        <button
                            style={{ width: '100%', padding: '8px', background: '#fff', color: '#5b51d8', borderRadius: '10px', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '12px', transition: 'transform 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                            Start Comparing
                        </button>
                    </div>
                </div>

                {/* RIGHT: Detailed Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* 1. College Info */}
                    <div id="college-info" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>{name} College Info</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#475569' }}>
                            Comprehensive college info spanning history, departments, and vision.
                        </p>
                    </div>

                    {/* 2. Course & Fees */}
                    {hasFees && (
                        <div id="courses-fees" style={{ ...card, padding: '28px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>{name} Course & Fees</h2>
                            <StyledTable columns={['Course', 'Intake', 'Fee']} rows={collegeData.courses.map(r => [r.course, r.intake || '—', r.fees || '—'])} />
                        </div>
                    )}

                    {/* 5. Reviews */}
                    <div id="reviews" style={{ ...card, padding: '28px' }}>
                        <Review collegeId={collegeId} collegeName={name} />
                    </div>

                    {/* 6. Ranking and Placement */}
                    {hasPlacement && (
                        <div id="ranking-placement" style={{ ...card, padding: '28px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>{name} Ranking & Placement</h2>
                            <StyledTable
                                columns={['Metric', 'Detail']}
                                rows={[
                                    ['Average Package', averagePackage],
                                    ['Highest Package', highestPackage],
                                ].filter(r => r[1] !== '—')}
                            />
                        </div>
                    )}

                    {/* 8. Location */}
                    <div id="location" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>{name} Location</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#475569' }}>
                            Located at <strong>{location}</strong>. Interactive maps and transport details coming soon.
                        </p>
                    </div>

                    {/* 15. Contact Details */}
                    <div id="contact-details" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>Contact Details</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#475569' }}>
                            Official website: <a href={collegeData.officialWebsite} target="_blank" rel="noopener noreferrer">{collegeData.officialWebsite || 'Check Website'}</a>
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default CollegeInfo;
