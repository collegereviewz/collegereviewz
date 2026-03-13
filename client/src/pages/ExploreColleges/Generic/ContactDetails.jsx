import React from 'react';
import { Phone, Mail, Globe, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const ContactDetails = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const address = collegeData?.address || 'Address information is being updated.';
    const phone = collegeData?.contactDetails?.phone || 'N/A';
    const email = collegeData?.contactDetails?.email || 'N/A';
    const website = collegeData?.officialWebsite || collegeData?.website || 'N/A';

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const ContactItem = ({ icon, label, value, color }) => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '12px', color: color }}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{value}</div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Left Column: Contact Methods */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={cardStyle}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>Reach Out to Us</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <ContactItem icon={<Phone />} label="Phone" value={phone} color="#5b51d8" />
                            <ContactItem icon={<Mail />} label="Email" value={email} color="#3b82f6" />
                            <ContactItem icon={<Globe />} label="Website" value={website} color="#10b981" />
                            <ContactItem icon={<MapPin />} label="Address" value={address} color="#ef4444" />
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>Follow Us</h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                            Stay updated with the latest campus news and events through our official social media channels.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {[
                                { icon: <Facebook />, color: '#1877f2', name: 'Facebook' },
                                { icon: <Twitter />, color: '#1da1f2', name: 'Twitter' },
                                { icon: <Linkedin />, color: '#0a66c2', name: 'LinkedIn' },
                                { icon: <Instagram />, color: '#e4405f', name: 'Instagram' }
                            ].map((s, i) => (
                                <div key={i} title={s.name} style={{ 
                                    width: '48px', 
                                    height: '48px', 
                                    borderRadius: '12px', 
                                    background: '#f8fafc', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: s.color,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    border: '1px solid #f1f5f9'
                                }} onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = s.color; }}>
                                    {React.cloneElement(s.icon, { size: 20 })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Inquiry Form */}
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>Send an Inquiry</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>Have a specific question? Send us a message and our admission team will get back to you.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569' }}>Full Name</label>
                                <input type="text" placeholder="John Doe" style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569' }}>Email Address</label>
                                <input type="email" placeholder="john@example.com" style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569' }}>Message</label>
                            <textarea rows="4" placeholder="How can we help you?" style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '14px', resize: 'none' }}></textarea>
                        </div>
                        <button style={{ 
                            padding: '16px', 
                            background: 'linear-gradient(135deg, #5b51d8, #3b82f6)', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '12px', 
                            fontWeight: 900, 
                            fontSize: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 15px -3px rgba(91, 81, 216, 0.3)'
                        }}>
                            <Send size={18} /> Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
