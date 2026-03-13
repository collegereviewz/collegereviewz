import React from 'react';
import { Navigation, Plane, Train, Bus } from 'lucide-react';

const defaultFallbacksByCollege = {};

const HowToReach = ({ collegeData, fallbackHubs }) => {
    const name = collegeData?.name || 'College';
    const commuteIntelligence = collegeData?.commuteIntelligence || [];

    const resolvedFallbacks =
        fallbackHubs ||
        defaultFallbacksByCollege[name] ||
        [
            { type: 'airport', hubName: `Nearest Airport to ${collegeData?.district || 'Campus'}`, travelTime: 'Calculating...' },
            { type: 'railway', hubName: `Nearest Railway Station to ${collegeData?.district || 'Campus'}`, travelTime: 'Calculating...' },
            { type: 'bus', hubName: `Local Bus/Transport Hub near ${collegeData?.district || 'Campus'}`, travelTime: 'Calculating...' },
        ];

    const hubsToRender =
        commuteIntelligence && commuteIntelligence.length > 0
            ? commuteIntelligence
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
                    pointerEvents: 'auto',
                    opacity: 1
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {hubsToRender.map((item, idx) => renderCard(item, idx))}
            </div>
        </div>
    );
};

export default HowToReach;


