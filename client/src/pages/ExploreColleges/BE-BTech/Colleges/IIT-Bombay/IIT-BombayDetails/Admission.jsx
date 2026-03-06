import React from 'react';
import { GraduationCap, Code2, Rocket, Globe, FileCheck, Target } from 'lucide-react';

const Admission = () => {
    const cardStyle = {
        background: '#fff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
    };

    const highlightStyle = {
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        borderRadius: '24px',
        padding: '32px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* IIT Bombay Admission Hero */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <GraduationCap size={28} color="#5b51d8" />
                            <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#1e293b', margin: 0 }}>IIT Bombay B.Tech Admission</h2>
                        </div>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.9 }}>
                            Admission to the Undergraduate programs (B.Tech, B.S., and B.Des) at IIT Bombay is highly competitive. 
                            The primary gateway is through the <strong>JEE Advanced</strong> examination after qualifying JEE Main.
                        </p>
                    </div>
                    <div style={{ width: '280px', background: '#f1f5f9', borderRadius: '20px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <button 
                            style={{ 
                                width: '100%', 
                                padding: '12px', 
                                background: '#1e1b4b', 
                                color: '#fff', 
                                borderRadius: '10px', 
                                border: 'none', 
                                fontSize: '13px', 
                                fontWeight: 900, 
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Apply Now
                        </button>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: '12px' }}>Top Ranking Branch</div>
                            <div style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b', marginBottom: '8px' }}>Computer Science</div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#5b51d8' }}>Closing Rank: 68 (2024)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Path to Admission */}
            <div style={highlightStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Target size={20} color="#38bdf8" />
                    The Elite Path to IIT Bombay
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {[
                        { title: 'Step 1: JEE Main', desc: 'Secure a rank in the top 2.5 lakh candidates globally.', icon: <Code2 size={24} color="#38bdf8" /> },
                        { title: 'Step 2: JEE Advanced', desc: 'Pass the benchmark cutoff for IIT eligibility.', icon: <Rocket size={24} color="#10b981" /> },
                        { title: 'Step 3: JoSAA', desc: 'Participate in seat allotment via JoSAA counseling.', icon: <Globe size={24} color="#f59e0b" /> }
                    ].map((step, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' }}>
                            <div style={{ marginBottom: '16px' }}>{step.icon}</div>
                            <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>{step.title}</h4>
                            <p style={{ fontSize: '13px', opacity: 0.7, lineHeight: 1.6 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Requirements */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FileCheck size={20} color="#5b51d8" />
                        Eligibility Overview
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            '75% Marks in 12th Board Exams (65% for SC/ST)',
                            'Top 20 percentile in respective board exams',
                            'Physics, Chemistry, and Mathematics mandatory',
                            'Maximum two attempts in consecutive years'
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                                <div style={{ width: '6px', height: '6px', background: '#5b51d8', borderRadius: '50%', marginTop: '7px' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div style={{ ...cardStyle, background: '#f8fafc' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '20px' }}>Admission Statistics</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>B.Tech Seats</span>
                            <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>1,356</span>
                        </div>
                        <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>M.Tech Seats</span>
                            <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>800+</span>
                        </div>
                        <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>Selection Ratio</span>
                            <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>~0.1%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Counseling Note */}
            <div style={{ padding: '24px', background: '#fff7ed', borderRadius: '20px', border: '1px solid #ffedd5' }}>
                <h4 style={{ color: '#9a3412', fontSize: '15px', fontWeight: 900, marginBottom: '8px' }}>JoSAA Counseling Note</h4>
                <p style={{ fontSize: '13px', color: '#c2410c', lineHeight: 1.7, margin: 0 }}>
                    JoSAA 2026 Counseling will conduct six rounds of seat allotment for IIT Bombay. 
                    Candidates must lock their choices carefully and keep certificates ready for online reporting.
                </p>
            </div>
        </div>
    );
};

export default Admission;
