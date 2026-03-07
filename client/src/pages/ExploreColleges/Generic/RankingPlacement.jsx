import React from 'react';
import { Award, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

const RankingPlacement = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const ranking = collegeData?.ranking || 'Latest ranking and awards information is being updated.';
    const avgPackage = collegeData?.avgPackage || 'N/A';
    const highestPackage = collegeData?.highestPackage || 'N/A';
    const recruiters = collegeData?.topRecruiters || [];

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const statsCardStyle = {
        background: '#f8fafc',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats Overview */}
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={statsCardStyle}>
                    <div style={{ color: '#5b51d8', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>Highest Package</div>
                    <div style={{ fontSize: '24px', fontWeight: 1000, color: '#1e293b' }}>{highestPackage}</div>
                </div>
                <div style={statsCardStyle}>
                    <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>Average Package</div>
                    <div style={{ fontSize: '24px', fontWeight: 1000, color: '#1e293b' }}>{avgPackage}</div>
                </div>
                <div style={statsCardStyle}>
                    <div style={{ color: '#10b981', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>Placement Rate</div>
                    <div style={{ fontSize: '24px', fontWeight: 1000, color: '#1e293b' }}>85% - 92%</div>
                </div>
            </div>

            {/* Ranking Section */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Award size={24} color="#5b51d8" />
                    Rankings & Recognitions
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>{ranking}</p>
            </div>

            {/* Top Recruiters */}
            <div style={cardStyle}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <TrendingUp size={24} color="#3b82f6" />
                    Our Top Recruiters
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {recruiters.length > 0 ? recruiters.map((r, i) => (
                        <div key={i} style={{ 
                            padding: '16px', 
                            background: '#f8fafc', 
                            borderRadius: '12px', 
                            textAlign: 'center',
                            fontSize: '13px',
                            fontWeight: 800,
                            color: '#1e293b',
                            border: '1px solid #f1f5f9'
                        }}>
                            {r}
                        </div>
                    )) : (
                        ['TCS', 'Cognizant', 'Wipro', 'Infosys', 'Capgemini', 'Accenture', 'Amazon', 'L&T Infotech'].map((r, i) => (
                            <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 800, color: '#1e293b', border: '1px solid #f1f5f9' }}>{r}</div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RankingPlacement;
