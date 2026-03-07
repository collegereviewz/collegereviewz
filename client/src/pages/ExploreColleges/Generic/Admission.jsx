import React from 'react';
import { Calendar, CheckCircle2, FileText, HelpCircle } from 'lucide-react';

const Admission = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    
    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const sectionTitleStyle = {
        fontSize: '20px',
        fontWeight: 950,
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '4px'
    };

    const subTitleStyle = {
        fontSize: '16px',
        fontWeight: 800,
        color: '#5b51d8',
        marginBottom: '12px',
        marginTop: '8px'
    };

    const textStyle = {
        fontSize: '14px',
        lineHeight: 1.8,
        color: '#64748b'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Header Section */}
            <div style={{ ...cardStyle, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 style={sectionTitleStyle}>
                            <FileText size={24} color="#5b51d8" />
                            {name} Admission Guide
                        </h2>
                        <p style={textStyle}>
                            Get detailed information about the admission process, eligibility criteria, and important dates for the current academic session.
                        </p>
                    </div>
                    <button 
                        style={{ 
                            padding: '12px 32px', 
                            background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', 
                            color: '#fff', 
                            borderRadius: '12px', 
                            border: 'none', 
                            fontSize: '14px', 
                            fontWeight: 900, 
                            cursor: 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(91, 81, 216, 0.3)',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Apply Now
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                        <div style={{ color: '#10b981', fontWeight: 900, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Current Status</div>
                        <div style={{ fontSize: '18px', fontWeight: 950, color: '#1e293b' }}>Applications Open</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                        <div style={{ color: '#5b51d8', fontWeight: 900, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Mode</div>
                        <div style={{ fontSize: '18px', fontWeight: 950, color: '#1e293b' }}>Online / Offline</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                        <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase' }}>Level</div>
                        <div style={{ fontSize: '18px', fontWeight: 950, color: '#1e293b' }}>UG & PG</div>
                    </div>
                </div>

            </div>

            {/* Selection Process */}
            <div style={cardStyle}>
                <h3 style={subTitleStyle}>Selection Process</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { step: '1', title: 'Registration', desc: 'Candidates must register online on the official admission portal of the college.' },
                        { step: '2', title: 'Entrance Exam', desc: 'Appear for the required national or state-level entrance examination (JEE, NEET, etc.).' },
                        { step: '3', title: 'Counseling', desc: 'Shortlisted candidates will be called for the counseling process based on their merit.' },
                        { step: '4', title: 'Verification', desc: 'Final seat allotment after document verification and payment of admission fees.' }
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ width: '32px', height: '32px', background: '#5b51d8', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: '14px' }}>
                                {s.step}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', marginBottom: '4px' }}>{s.title}</h4>
                                <p style={textStyle}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Eligibility */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', borderColor: 'transparent', color: '#fff' }}>
                <h3 style={{ ...subTitleStyle, color: '#fff' }}>General Eligibility Criteria</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>Academic Qualification</div>
                            <div style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>10+2 from a recognized board with minimum 50% aggregate marks.</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>Mandatory Subjects</div>
                            <div style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>Physics, Chemistry, and Mathematics/Biology as core subjects.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Dates */}
            <div style={cardStyle}>
                <h3 style={subTitleStyle}>Admission Dates</h3>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 800, color: '#64748b' }}>Events</th>
                                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '13px', fontWeight: 800, color: '#64748b' }}>Tentative Dates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { event: 'Release of Application Form', date: 'March 2026' },
                                { event: 'Last Date to Apply', date: 'April 2026' },
                                { event: 'Entrance Examination', date: 'May 2026' },
                                { event: 'Declaration of Result', date: 'June 2026' }
                            ].map((r, i) => (
                                <tr key={i} style={{ borderBottom: i < 3 ? '1px solid #f8fafc' : 'none' }}>
                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{r.event}</td>
                                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 600, color: '#5b51d8' }}>{r.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ */}
            <div style={cardStyle}>
                <h3 style={subTitleStyle}>Common Admission FAQs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { q: 'Is there any direct admission?', a: 'Direct admission is available for certain management quota seats, subject to eligibility.' },
                        { q: 'What is the application fee?', a: 'The application fee typically ranges from ₹1000 to ₹1500 depending on the course.' }
                    ].map((f, i) => (
                        <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                            <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '6px', display: 'flex', gap: '8px' }}>
                                <HelpCircle size={16} color="#5b51d8" /> {f.q}
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{f.a}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admission;
