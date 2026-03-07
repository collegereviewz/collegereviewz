import React from 'react';
import { Stethoscope, ClipboardList, Calendar, Users, Award } from 'lucide-react';

const Admission = ({ collegeData }) => {
    const name = collegeData?.name || 'Medical College';

    const cardStyle = {
        background: '#fff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
    };

    const headerStyle = {
        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
        borderRadius: '24px',
        padding: '40px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '32px'
    };

    const sectionTitleStyle = {
        fontSize: '18px',
        fontWeight: 900,
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
    };

    const admissionSteps = [
        { title: 'NEET Qualification', desc: 'Must qualify NEET (UG/PG) with the required percentile.', icon: <Award size={20} color="#10b981" /> },
        { title: 'Registration', desc: 'Register for state or national level counseling (MCC/State Authority).', icon: <ClipboardList size={20} color="#3b82f6" /> },
        { title: 'Seat Allotment', desc: 'Based on your NEET rank and preference, a seat will be allotted.', icon: <Users size={20} color="#a855f7" /> },
        { title: 'Joining', desc: 'Submit original documents and pay the admission fee at the college.', icon: <Calendar size={20} color="#f59e0b" /> }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Medical Admission Hero */}
            <div style={headerStyle}>
                <div style={{ position: 'absolute', top: -50, right: -50, width: '200px', height: '200px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Stethoscope color="#38bdf8" size={28} />
                            </div>
                            <h2 style={{ fontSize: '28px', fontWeight: 950, margin: 0 }}>MBBS Admission</h2>
                        </div>
                        <button 
                            style={{ 
                                padding: '12px 32px', 
                                background: '#0ea5e9', 
                                color: '#fff', 
                                borderRadius: '12px', 
                                border: 'none', 
                                fontSize: '14px', 
                                fontWeight: 900, 
                                cursor: 'pointer',
                                boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.3)',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Apply Now
                        </button>
                    </div>
                    <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.8, maxWidth: '700px' }}>
                        {name} follows a strict merit-based admission process based on NEET performance and counseling sessions conducted by authorized medical counseling committees.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {[
                    { label: 'Exam Required', value: 'NEET UG' },
                    { label: 'Seat Types', value: 'Govt / Mgmt' },
                    { label: 'Total Intake', value: '150 - 250' },
                    { label: 'Course Duration', value: '5.5 Years' }
                ].map((s, i) => (
                    <div key={i} style={{ ...cardStyle, padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                        <div style={{ fontSize: '16px', fontWeight: 950, color: '#5b51d8' }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Step by Step Process */}
            <div style={cardStyle}>
                <h3 style={sectionTitleStyle}>Step by Step Admission Flow</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {admissionSteps.map((step, i) => (
                        <div key={i} style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', gap: '20px' }}>
                            <div style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                                {step.icon}
                            </div>
                            <div>
                                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>{step.title}</h4>
                                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Documentation Required */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                <div style={cardStyle}>
                    <h3 style={sectionTitleStyle}>Documents Required</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {[
                            'NEET Admit Card', 'NEET Scorecard', 'Class 10 Certificate', 
                            'Class 12 Marks Sheet', 'Proof of ID (Aadhar)', 'Caste Certificate (if applicable)',
                            'Domicile Certificate', 'Passport Size Photos (8)'
                        ].map((doc, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                                <div style={{ width: '6px', height: '6px', background: '#5b51d8', borderRadius: '50%' }} />
                                {doc}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ ...cardStyle, background: '#f8fafc' }}>
                    <h3 style={sectionTitleStyle}>Counseling Authority</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#64748b', marginBottom: '4px' }}>ALL INDIA QUOTA (15%)</div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>MCC - Medical Counseling Committee</div>
                        </div>
                        <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#64748b', marginBottom: '4px' }}>STATE QUOTA (85%)</div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Respective State Medical Authority</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admission;
