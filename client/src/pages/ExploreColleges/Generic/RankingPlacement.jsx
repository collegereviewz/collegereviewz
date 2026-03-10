import React from 'react';
import { Award, TrendingUp, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RankingPlacement = ({ collegeData }) => {
    const navigate = useNavigate();
    const name = collegeData?.name || 'College';
    const ranking = collegeData?.ranking || 'Latest ranking and awards information is being updated.';
    const avgPackage = collegeData?.avgPackage || 'N/A';
    const highestPackage = collegeData?.highestPackage || 'N/A';
    const recruiters = collegeData?.topRecruiters || [];
    const user = JSON.parse(localStorage.getItem('user') || 'null');

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
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats Overview */}
            <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                <div style={statsCardStyle}>
                    <div style={{ color: '#5b51d8', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>Highest Package</div>
                    <div style={{ fontSize: '24px', fontWeight: 1000, color: '#1e293b', filter: !user ? 'blur(8px)' : 'none' }}>{user ? highestPackage : '₹ XX.X LPA'}</div>
                </div>
                <div style={statsCardStyle}>
                    <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>Average Package</div>
                    <div style={{ fontSize: '24px', fontWeight: 1000, color: '#1e293b', filter: !user ? 'blur(8px)' : 'none' }}>{user ? avgPackage : '₹ XX.X LPA'}</div>
                </div>
                <div style={statsCardStyle}>
                    <div style={{ color: '#10b981', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase' }}>Placement Rate</div>
                    <div style={{ fontSize: '24px', fontWeight: 1000, color: '#1e293b', filter: !user ? 'blur(8px)' : 'none' }}>{user ? '85% - 92%' : 'XX%'}</div>
                </div>

                {!user && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(1px)',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '16px'
                    }}>
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }))}
                            style={{
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)'
                            }}
                        >
                            <Lock size={16} /> Login to View Packages
                        </button>
                    </div>
                )}
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
            <div style={{ ...cardStyle, position: 'relative' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <TrendingUp size={24} color="#3b82f6" />
                    Our Top Recruiters
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', filter: !user ? 'blur(6px)' : 'none', pointerEvents: !user ? 'none' : 'auto' }}>
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
                            <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 800, color: '#1e293b', border: '1px solid #f1f5f9' }}>{user ? r : 'XXXXXXX'}</div>
                        ))
                    )}
                </div>
                {!user && (
                    <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', color: '#5b51d8', fontSize: '13px', fontWeight: 800 }}>
                        Recruiter data available for logged in users
                    </div>
                )}
            </div>
        </div>
    );
};

export default RankingPlacement;

