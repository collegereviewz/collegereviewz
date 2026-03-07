import React from 'react';
import { Building2, Book, Monitor, Coffee, Home, Dumbbell, Wifi, Laptop, Microscope, Activity } from 'lucide-react';

const Facility = ({ collegeData }) => {
    const facilities = collegeData?.facilities || [
        'Library', 'Hostel', 'Computer Labs', 'Cafeteria', 'Wi-Fi Campus', 
        'Sports Complex', 'Auditorium', 'Medical Facilities', 'Gym', 'Laboratories'
    ];

    const getIcon = (name) => {
        const n = name.toLowerCase();
        if (n.includes('library') || n.includes('book')) return <Book size={32} color="#5b51d8" />;
        if (n.includes('lab') || n.includes('laptop') || n.includes('monitor')) return <Monitor size={32} color="#3b82f6" />;
        if (n.includes('cafeteria') || n.includes('food') || n.includes('canteen')) return <Coffee size={32} color="#f59e0b" />;
        if (n.includes('hostel')) return <Home size={32} color="#10b981" />;
        if (n.includes('sport') || n.includes('gym') || n.includes('playground')) return <Dumbbell size={32} color="#ef4444" />;
        if (n.includes('wi-fi') || n.includes('internet')) return <Wifi size={32} color="#6366f1" />;
        if (n.includes('medical') || n.includes('health')) return <Activity size={32} color="#ec4899" />;
        if (n.includes('auditorium')) return <Building2 size={32} color="#8b5cf6" />;
        return <Microscope size={32} color="#64748b" />;
    };

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
            <div style={cardStyle}>
                <h2 style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Building2 size={24} color="#5b51d8" />
                    Campus Facilities & Infrastructure
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                    {facilities.map((f, i) => (
                        <div key={i} style={{ 
                            padding: '24px', 
                            background: '#f8fafc', 
                            borderRadius: '20px', 
                            border: '1px solid #f1f5f9', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            textAlign: 'center',
                            gap: '16px',
                            transition: 'all 0.3s'
                        }} onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.05)';
                        }} onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                            <div style={{ padding: '16px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                {getIcon(f)}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{f}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Infrastructure Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>Central Library</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>The central library boasts a collection of over 30,000 books, journals, and digital resources. It provides a peaceful environment for research and study, with dedicated sections for various engineering disciplines.</p>
                </div>
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>IT Infrastructure</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>High-speed Wi-Fi connectivity throughout the campus and state-of-the-art computer labs with latest hardware and software for practical training.</p>
                </div>
            </div>
        </div>
    );
};

export default Facility;
