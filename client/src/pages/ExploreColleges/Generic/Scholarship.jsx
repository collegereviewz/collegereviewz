import React from 'react';
import { Gift, CheckCircle2, Info, GraduationCap } from 'lucide-react';

const Scholarship = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const scholarships = collegeData?.scholarships || 'Information about various government and institutional scholarship schemes is being updated. Historically, students have access to state-level merit-cum-means financial aid.';

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Main Info */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Gift size={24} color="#5b51d8" />
                    Scholarships & Financial Aid
                </h3>
                <div style={{ 
                    background: '#f8fafc', 
                    padding: '24px', 
                    borderRadius: '16px', 
                    border: '1px solid #f1f5f9',
                    lineHeight: '1.8',
                    color: '#475569',
                    fontSize: '14px',
                    whiteSpace: 'pre-wrap'
                }}>
                    {scholarships}
                </div>
            </div>

            {/* Common Schemes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div style={{ ...cardStyle, background: '#f0fdf4', borderColor: '#dcfce7' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ padding: '12px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <CheckCircle2 color="#10b981" />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>SVMCM Scholarship</h4>
                            <p style={{ fontSize: '12px', color: '#15803d', lineHeight: 1.5 }}>Available for meritorious students from economically weaker sections with annual family income less than ₹2.5 Lakhs.</p>
                        </div>
                    </div>
                </div>
                <div style={{ ...cardStyle, background: '#eff6ff', borderColor: '#dbeafe' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ padding: '12px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                            <GraduationCap color="#3b82f6" />
                        </div>
                        <div>
                            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e40af', marginBottom: '4px' }}>Kanyashree (K3)</h4>
                            <p style={{ fontSize: '12px', color: '#1e3a8a', lineHeight: 1.5 }}>Specifically for female students pursuing post-graduate studies (M.Tech/MCA) under various govt schemes.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Note */}
            <div style={{ 
                display: 'flex', 
                gap: '12px', 
                padding: '16px', 
                background: '#fef2f2', 
                borderRadius: '12px',
                border: '1px solid #fee2e2'
            }}>
                <Info size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '13px', color: '#b91c1c', lineHeight: '1.5', margin: 0 }}>
                    Students are strongly advised to check the official state portal and consult the college administration office for current deadlines and specific eligibility criteria for each session.
                </p>
            </div>
        </div>
    );
};

export default Scholarship;
