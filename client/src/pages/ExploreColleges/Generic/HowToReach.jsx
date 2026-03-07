import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation, Plane, Train, Bus } from 'lucide-react';

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

    const name = collegeData?.name || 'College';

    useEffect(() => {
        const fetchCommute = async () => {
            try {
                if (!collegeData?._id || commuteData.length > 0) return;
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
    }, [collegeData?._id, commuteData.length]);

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
        <div style={{ padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
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

