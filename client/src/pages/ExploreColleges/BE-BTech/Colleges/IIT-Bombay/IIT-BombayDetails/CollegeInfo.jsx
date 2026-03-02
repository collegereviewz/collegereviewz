import React, { useState } from 'react';
import { ChevronRight, Info, BookOpen, Trophy, SlidersHorizontal, Users, Play } from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const updates = [
    { date: 'Jan 14, 2026', tag: 'key',   title: 'GATE 2026 is scheduled for Feb 7, 8, 14, and 15, 2026, for ME/MTech/PhD admissions. The Admit card has been released. Candidates can download the same directly @gate2026.iitkg.ac.in.' },
    { date: 'Jan 13, 2026', tag: 'key',   title: 'IIT JAM 2026 will be conducted on Feb 15, 2026, for MSc, Joint MSc-PhD, and MSc-PhD (Dual Degree) admissions. The Admit card has been released @jam2026.iitm.ac.in.' },
    { date: 'Jan 2, 2026',  tag: 'other', title: 'CEED 2026 Exam will be conducted on January 18, 2026, from 9 AM to 12 PM for M.Des/PhD (Design) admission. The Admit card has been released @ceed.iitb.ac.in.' },
];

const quickFacts = [
    { label: 'NIRF Rank (B.Tech)', value: '3' },
    { label: 'Location',           value: 'Powai, Mumbai' },
    { label: 'Average Package',    value: '₹23.5 LPA' },
    { label: 'Highest Package',    value: '₹1 Cr+' },
    { label: 'Entrance Exam',      value: 'JEE Advanced' },
    { label: 'Established',        value: '1958' },
];

const viewDetails = [
    { icon: <Info size={14} />,              label: 'Admission 2026' },
    { icon: <BookOpen size={14} />,          label: 'Fees Structure' },
    { icon: <Trophy size={14} />,            label: 'Rankings' },
    { icon: <SlidersHorizontal size={14} />, label: 'Cutoff Trends' },
    { icon: <Users size={14} />,             label: 'Placements' },
];

const whyChoose = [
    'Top-ranked engineering institute in India',
    'Mumbai location = career & startup exposure',
    'Consistent placements with ₹1 Cr+ offers',
    'Fortune 500 recruiters: Google, Apple, Intel, Airbus',
];

const tableContent = [
    { id: 'admission-dates', label: 'IIT Bombay Admission 2026 Dates' },
    { id: 'fees',            label: 'IIT Bombay Fees 2026' },
    { id: 'ranking',         label: 'IIT Bombay Ranking' },
    { id: 'admission',       label: 'IIT Bombay Admission 2026' },
    { id: 'cutoff',          label: 'IIT Bombay Cutoff' },
    { id: 'placement',       label: 'IIT Bombay Placement' },
];

const jeeMainDates = [
    { event: 'JEE Main 2026 session 1 Exam Date',         date: 'Jan 21 – Jan 28, 2026' },
    { event: 'JEE Main 2026 session 2 Registration Date', date: 'Feb 01 – Feb 25, 2026 (Tentative)' },
    { event: 'JEE Main 2026 session 1 Result Date',       date: 'Feb 19, 2026' },
    { event: 'JEE Main 2026 session 2 Exam Date',         date: 'Apr 01 – Apr 10, 2026' },
    { event: 'JEE Main 2026 session 2 Result Date',       date: 'Apr 20, 2026' },
    { event: 'JEE Main 2026 session 1 Registration Date', date: 'Oct 01 – Nov 20, 2025' },
];

const jeeAdvancedDates = [
    { event: 'JEE Advanced 2026 Registration Date', date: 'Apr 30 – May 03, 2026' },
    { event: 'JEE Advanced 2026 Exam Date',         date: 'May 17, 2026' },
    { event: 'JEE Advanced 2026 Result Date',       date: 'Jun 07, 2026' },
];

const mtechDates = [
    { event: 'GATE 2026 Exam Date 1',     date: 'Feb 07, 2026' },
    { event: 'GATE 2026 Exam Date 2',     date: 'Feb 08, 2026' },
    { event: 'GATE 2026 Exam Date 3',     date: 'Feb 14, 2026' },
    { event: 'GATE 2026 Exam Date 4',     date: 'Feb 15, 2026' },
    { event: 'GATE 2026 Admit Card Date', date: 'Jan 07, 2026' },
];

const feesData = [
    { course: 'B.Tech',          firstYear: 'INR 2,30,000', total: 'INR 8.83 Lakhs' },
    { course: 'M.Tech',          firstYear: 'INR 72,000',   total: 'INR 1.24 Lakhs' },
    { course: 'M.Sc',            firstYear: 'INR 52,500',   total: 'INR 84,500' },
    { course: 'B.Tech + M.Tech', firstYear: 'INR 2,30,000', total: 'INR 10.98 Lakhs' },
    { course: 'M.Des',           firstYear: 'INR 72,000',   total: 'INR 1.24 Lakhs' },
    { course: 'MBA',             firstYear: 'INR 7,66,000', total: 'INR 15.16 Lakhs' },
    { course: 'PhD',             firstYear: 'INR 89,200',   total: 'INR 2.2 Lakhs' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const CollegeInfo = () => {
    const [updatesTab, setUpdatesTab] = useState('key');
    const filteredUpdates = updates.filter(u => u.tag === updatesTab);

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <h2 style={{ ...h2s, marginBottom: 0 }}>IIT Bombay Updates and News</h2>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => setUpdatesTab('key')}
                                style={{ padding: '5px 12px', borderRadius: '8px', background: updatesTab === 'key' ? '#5b51d8' : '#f1f5f9', color: updatesTab === 'key' ? '#fff' : '#475569', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                Key Updates
                            </button>
                            <button onClick={() => setUpdatesTab('other')}
                                style={{ padding: '5px 12px', borderRadius: '8px', background: updatesTab === 'other' ? '#1e1b4b' : '#f1f5f9', color: updatesTab === 'other' ? '#fff' : '#475569', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                Other Updates
                            </button>
                        </div>
                    </div>
                    <p style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '14px' }}>Updated on – Jan 14, 2026</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredUpdates.map((upd, i) => (
                            <div key={i} style={{ background: 'linear-gradient(135deg, rgba(91,81,216,0.9), rgba(67,56,202,0.85))', borderRadius: '12px', padding: '14px 16px', color: '#fff', display: 'flex', gap: '14px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ display: 'inline-block', background: '#f59e0b', color: '#111', padding: '2px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 800, marginBottom: '8px' }}>{upd.date}</span>
                                    <p style={{ fontSize: '12px', lineHeight: 1.7, fontWeight: 500 }}>{upd.title}</p>
                                </div>
                                <button style={{ padding: '7px 12px', background: '#f59e0b', color: '#111', borderRadius: '7px', fontSize: '11px', fontWeight: 800, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                    View Details <ChevronRight size={11} />
                                </button>
                            </div>
                        ))}
                        {filteredUpdates.length === 0 && <p style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center', padding: '16px' }}>No updates in this category.</p>}
                    </div>
                </div>

                {/* Quick Facts */}
                <div style={card}>
                    <h3 style={h2s}>Quick Facts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {quickFacts.map((f, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', paddingBottom: '10px', borderBottom: i < quickFacts.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>{f.label}</span>
                                <span style={{ color: '#1e293b', fontWeight: 800 }}>{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View Details */}
                <div style={card}>
                    <h3 style={h2s}>View Details</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {viewDetails.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
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
                        Indian Institute of Technology Bombay, popularly known as <strong>IIT Bombay</strong> or IIT Mumbai, is an autonomous institute established in <strong>1958</strong>. Chosen by top JEE (Advanced) rankers for its career prospects and Mumbai location.
                    </p>
                    <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#475569', marginTop: '10px', textAlign: 'left' }}>
                        IIT Ranking is <strong>3rd in B.Tech by NIRF 2025</strong>. Cutoff Rank 2025 Round 1 (General): <strong>56 – 4565</strong>. Average package: <strong>INR 23.5 LPA</strong>, with 22 offers above ₹1 Cr. Top recruiters: Airbus, Apple, Google, Intel, Amazon.
                    </p>
                </div>

                {/* Why Choose */}
                <div style={card}>
                    <h3 style={h2s}>Why Choose IIT Bombay?</h3>
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=400&q=80',
                            'https://images.unsplash.com/photo-1523050853064-85a17f0094e0?auto=format&fit=crop&w=400&q=80',
                        ].map((src, i) => (
                            <div key={i} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '100px', cursor: 'pointer' }}>
                                <img src={src} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '36px', height: '36px', background: 'red', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Play size={14} fill="white" color="white" />
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px' }}>Want to Compare with Other Colleges?</h4>
                        <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '16px', lineHeight: 1.5 }}>Get a detailed comparison based on fees, placements, and infrastructure.</p>
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

                    {/* Admission 2026 Dates */}
                    <div id="admission-dates" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>IIT Bombay Admission 2026 Dates</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#64748b', marginBottom: '20px' }}>
                            IIT Bombay also offers M.Tech and MSc as other popular programs. Admission is based on national-level entrance exams including IIT JAM and GATE. Here are the important dates:
                        </p>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>JEE Main Dates 2026</h3>
                        <StyledTable columns={['Events', 'Dates']} rows={jeeMainDates.map(r => [r.event, r.date])} />
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', marginTop: '28px' }}>JEE Advanced Dates 2026</h3>
                        <StyledTable columns={['Events', 'Dates']} rows={jeeAdvancedDates.map(r => [r.event, r.date])} />
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', marginTop: '28px' }}>IIT Bombay M.Tech Admission Dates 2026</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>IIT Bombay M.Tech program is available in the GATE score window from February 7 – February 15, 2026.</p>
                        <StyledTable columns={['Events', 'Dates']} rows={mtechDates.map(r => [r.event, r.date])} />
                    </div>

                    {/* Fees 2026 */}
                    <div id="fees" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>IIT Bombay Fees 2026</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#64748b', marginBottom: '4px' }}>
                            IIT Bombay offers B.Tech with a total fee of <strong>₹8,82,500</strong>. The details for <span style={{ color: '#5b51d8', fontWeight: 700 }}>IIT Bombay Courses & Fees</span> are mentioned in the table below:
                        </p>
                        <StyledTable columns={['Course', '1st Year Fee', 'Total Fee']} rows={feesData.map(r => [r.course, r.firstYear, r.total])} />
                    </div>

                    {/* Ranking */}
                    <div id="ranking" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>IIT Bombay Ranking</h2>
                        <StyledTable
                            columns={['Ranking Body', 'Category', 'Rank 2025']}
                            rows={[
                                ['NIRF', 'Engineering', '3'],
                                ['QS World University Rankings', 'Overall', '118'],
                                ['Times Higher Education', 'Engineering', 'Top 300'],
                                ['India Today', 'Engineering', '3'],
                            ]}
                        />
                    </div>

                    {/* Admission */}
                    <div id="admission" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>IIT Bombay Admission 2026</h2>
                        <p style={{ fontSize: '13px', lineHeight: 1.9, color: '#475569' }}>
                            Admission to B.Tech at IIT Bombay is through <strong>JEE Advanced</strong> followed by JoSAA Counselling. For M.Tech, candidates must qualify <strong>GATE</strong>. MSc admissions are via <strong>IIT JAM</strong>. MBA admissions require a valid CAT score.
                        </p>
                    </div>

                    {/* Cutoff */}
                    <div id="cutoff" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>IIT Bombay Cutoff</h2>
                        <StyledTable
                            columns={['Branch', 'Category', 'Opening Rank', 'Closing Rank']}
                            rows={[
                                ['Computer Science & Engineering', 'General', '1', '56'],
                                ['Electrical Engineering', 'General', '57', '380'],
                                ['Mechanical Engineering', 'General', '381', '1200'],
                                ['Chemical Engineering', 'General', '1001', '2100'],
                                ['Civil Engineering', 'General', '2101', '4565'],
                            ]}
                        />
                    </div>

                    {/* Placement */}
                    <div id="placement" style={{ ...card, padding: '28px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>IIT Bombay Placement</h2>
                        <StyledTable
                            columns={['Placement Metric', 'Value (2024)']}
                            rows={[
                                ['Average Package', 'INR 23.5 LPA'],
                                ['Highest Package', 'INR 1 Cr+'],
                                ['Total Offers Made', '1,800+'],
                                ['Companies Visited', '366'],
                                ['Top Recruiters', 'Google, Microsoft, Intel, Apple, Airbus'],
                            ]}
                        />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default CollegeInfo;
