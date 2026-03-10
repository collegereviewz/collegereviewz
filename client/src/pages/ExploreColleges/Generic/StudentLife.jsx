import React from 'react';
import { Users, Music, Coffee, BookOpen, Star, Heart } from 'lucide-react';

const StudentLife = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const description = collegeData?.studentLife || 'Campus life at this institute offers a blend of academic rigor and vibrant extracurricular activities. Students participate in various clubs, annual fests, and technical workshops throughout the year.';
    
    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const EventItem = ({ title, icon, color, desc }) => (
        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', flex: 1 }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    {React.cloneElement(icon, { size: 24, color: color })}
                </div>
                <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{title}</h4>
                </div>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={cardStyle}>
                <h2 style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Users size={24} color="#5b51d8" />
                    Life at {name}
                </h2>
                
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
                    {description}
                </div>
            </div>

            {/* Highlights */}
            <div style={{ display: 'flex', gap: '20px' }}>
                <EventItem 
                    title="Annual Fests" 
                    icon={<Music />} 
                    color="#5b51d8" 
                    desc="Techtrix (Technical Fest) and Bihaan (Cultural Fest) are the major annual highlights, drawing participation from across the state." 
                />
                <EventItem 
                    title="Active Clubs" 
                    icon={<Star />} 
                    color="#f59e0b" 
                    desc="Numerous student clubs like the Robotics Club, Coding Club, and Photography Club provide platforms for skill development beyond academics." 
                />
                <EventItem 
                    title="Social Impact" 
                    icon={<Heart />} 
                    color="#ef4444" 
                    desc="Students actively engage in social service via the NSS unit, organizing blood donation camps, environmental drives, and community outreach." 
                />
            </div>

            {/* Daily Experience */}
            <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', color: '#fff' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px' }}>The Campus Experience</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ fontSize: '24px' }}><Coffee /></div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>Canteen & Hangouts</div>
                            <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>A popular spot for quick snacks and student discussions between classes. The campus green common area is also a favorite retreat.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ fontSize: '24px' }}><BookOpen /></div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>Learning Atmosphere</div>
                            <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.5 }}>A healthy mix of collaborative learning in labs and focused individual study in the library creates a positive academic vibe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLife;
