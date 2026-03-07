import React from 'react';
import { Bell, Newspaper, Calendar as CalendarIcon, Download, Link as LinkIcon, ExternalLink } from 'lucide-react';

const NotificationUpload = ({ collegeData }) => {
    const notifications = collegeData?.updates?.notifications || [
        { title: 'B.Tech Admission 2024-25: Counseling Round 1 Results Out', date: 'March 05, 2025', link: '#' },
        { title: 'Notice regarding Semester Examination Form Fill-up', date: 'March 02, 2025', link: '#' },
        { title: 'Upcoming Tech-Fest: Techtrix 2025 Registration Open', date: 'Feb 28, 2025', link: '#' }
    ];
    const news = collegeData?.updates?.news || [
        { title: 'RCCIIT Students Win Smart India Hackathon 2024', date: 'Jan 15, 2025', link: '#' },
        { title: 'New Centre of Excellence in AI/ML Inaugurated at Campus', date: 'Dec 20, 2024', link: '#' }
    ];
    const events = collegeData?.updates?.events || [
        { title: 'Annual Cultural Fest - Bihaan 2025', date: 'April 10-12, 2025', link: '#' },
        { title: 'Industry-Academia Resource Conclave', date: 'March 25, 2025', link: '#' }
    ];

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const sectionTitleStyle = {
        fontSize: '18px',
        fontWeight: 900,
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        paddingBottom: '16px',
        borderBottom: '1px solid #f1f5f9'
    };

    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #f1f5f9',
        transition: 'all 0.2s',
        cursor: 'pointer'
    };

    const ListSection = ({ title, icon, data, iconColor }) => (
        <div style={cardStyle}>
            <h3 style={sectionTitleStyle}>
                {React.cloneElement(icon, { size: 24, color: iconColor })}
                {title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.map((item, i) => (
                    <div key={i} style={itemStyle} onMouseEnter={e => e.currentTarget.style.borderColor = iconColor} onMouseLeave={e => e.currentTarget.style.borderColor = '#f1f5f9'}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#334155' }}>{item.title}</div>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>{item.date}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                             <button style={{ padding: '8px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                                <Download size={16} color="#64748b" />
                             </button>
                             <button style={{ padding: '8px', background: iconColor, border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                                <ExternalLink size={16} color="#fff" />
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <ListSection title="Latest Notifications" icon={<Bell />} data={notifications} iconColor="#5b51d8" />
                <ListSection title="News & Press Releases" icon={<Newspaper />} data={news} iconColor="#3b82f6" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <ListSection title="Upcoming Events" icon={<CalendarIcon />} data={events} iconColor="#10b981" />
                
                {/* Document Upload Subsection (Placeholder) */}
                <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #1e1b4b, #5b51d8)', borderColor: 'transparent', color: '#fff' }}>
                    <h3 style={{ ...sectionTitleStyle, color: '#fff', borderBottomColor: 'rgba(255,255,255,0.1)' }}>
                        <LinkIcon size={24} color="#fff" />
                        Quick Downloads
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            'Brochure 2024-25',
                            'Fee Structure 2024',
                            'Mandatory Disclosure 2024',
                            'Academic Calendar 2024-25'
                        ].map((doc, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', cursor: 'pointer' }}>
                                <span style={{ fontSize: '13px', fontWeight: 700 }}>{doc}</span>
                                <Download size={16} color="#fff" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationUpload;
