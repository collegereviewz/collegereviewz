import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation, Plane, Train, Bus, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const defaultFallbacksByCollege = {
    'RCC Institute of Information Technology': [
        {
            type: 'airport',
            hubName: 'Netaji Subhas Chandra Bose International Airport',
            travelTime: '15–18 km',
        },
        {
            type: 'railway',
            hubName: 'Sealdah Railway Station',
            travelTime: '5–6 km',
        },
        {
            type: 'bus',
            hubName: 'RCC Institute of Information Technology bus/auto stop',
            travelTime: 'walkable',
        },
    ],
};

const HowToReach = ({ collegeData, fallbackHubs }) => {
    const [commuteData, setCommuteData] = useState(collegeData?.commuteIntelligence || []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const name = collegeData?.name || 'College';
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        const fetchCommute = async () => {
            try {
                if (!collegeData?._id || commuteData.length > 0 || !user) return;
                setIsLoading(true);
                setError(null);
                const res = await axios.get(`http://localhost:5000/api/colleges/${collegeData._id}/commute`);
                if (res.data?.success && Array.isArray(res.data.data)) {
                    setCommuteData(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch commute info', err);
                setError('Unable to auto-detect nearby transport hubs right now.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCommute();
    }, [collegeData?._id, commuteData.length, user]);

    const resolvedFallbacks =
        fallbackHubs ||
        defaultFallbacksByCollege[name] ||
        [
            { type: 'airport', hubName: 'Nearest Airport', travelTime: 'Distance and time will be added here' },
            { type: 'railway', hubName: 'Nearest Railway Station', travelTime: 'Distance and time will be added here' },
            { type: 'bus', hubName: 'Nearest Bus Terminal', travelTime: 'Distance and time will be added here' },
        ];

    const hubsToRender =
        commuteData && commuteData.length > 0
            ? commuteData
            : resolvedFallbacks.map((hub) => ({
                  type: hub.type,
                  hubName: hub.hubName,
                  travelTime: hub.travelTime,
              }));

    const renderCard = (item, idx) => {
        let Icon = Bus;
        let iconColor = '#3b82f6';
        let title = 'Nearest Bus Terminal';

        if (item.type === 'plane' || item.type === 'airport') {
            Icon = Plane;
            iconColor = '#f59e0b';
            title = 'Nearest Airport';
        } else if (item.type === 'train' || item.type === 'railway') {
            Icon = Train;
            iconColor = '#8b5cf6';
            title = 'Nearest Railway Station';
        }

        const query = item.hubName || title;

        return (
            <div
                key={idx}
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    background: '#f8fafc',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    filter: !user ? 'blur(4px)' : 'none',
                    pointerEvents: !user ? 'none' : 'auto',
                    opacity: !user ? 0.6 : 1
                }}
                onClick={() =>
                    window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
                        '_blank',
                    )
                }
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                }}
            >
                <div
                    style={{
                        background: '#fff',
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        flexShrink: 0,
                    }}
                >
                    <Icon size={22} color={iconColor} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{title}</span>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                        {item.hubName}
                        {item.travelTime ? ` (approx. ${item.travelTime})` : ''}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
            <h3
                style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    color: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                }}
            >
                <Navigation size={24} color="#3b82f6" />
                How to Reach
            </h3>

            {!user && (
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(2px)',
                    textAlign: 'center',
                    padding: '0 32px'
                }}>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', 
                        padding: '32px', 
                        borderRadius: '24px',
                        color: '#fff',
                        boxShadow: '0 20px 40px rgba(91, 81, 216, 0.2)',
                        maxWidth: '320px'
                    }}>
                        <div style={{ 
                            width: '56px', 
                            height: '56px', 
                            background: 'rgba(255,255,255,0.1)', 
                            borderRadius: '16px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            margin: '0 auto 20px'
                        }}>
                            <Lock size={28} color="#fff" />
                        </div>
                        <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>Commute Insights Shared</h4>
                        <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '24px', lineHeight: 1.5 }}>
                            Login to access precise distance, travel time, and direct navigation routes.
                        </p>
                        <button 
                            onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }))}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: '#fff',
                                color: '#5b51d8',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <LogIn size={18} />
                            Login to Continue
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {isLoading && (
                    <div
                        style={{
                            fontSize: '13px',
                            color: '#64748b',
                            fontWeight: 600,
                            marginBottom: '4px',
                        }}
                    >
                        Fetching nearest airport, railway station and bus stop for you...
                    </div>
                )}
                {error && (
                    <div
                        style={{
                            fontSize: '12px',
                            color: '#dc2626',
                            fontWeight: 600,
                            marginBottom: '4px',
                        }}
                    >
                        {error}
                    </div>
                )}
                {hubsToRender.map((item, idx) => renderCard(item, idx))}
            </div>
        </div>
    );
};

export default HowToReach;


