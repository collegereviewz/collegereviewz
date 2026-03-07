import React from 'react';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import HowToReach from './HowToReach.jsx';

const Location = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    const address = collegeData?.address || 'Address information is being updated.';
    const district = collegeData?.district || 'Kolkata';
    const state = collegeData?.state || 'West Bengal';
    const mapLink = collegeData?.mapLink || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.094595874249!2d88.39655557530018!3d22.5755672794931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276634ad2cdad%3A0xc3928df776fa2e7!2sRCC%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin';
    const phone = collegeData?.contactDetails?.phone || 'N/A';
    const email = collegeData?.contactDetails?.email || 'N/A';

    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
    };

    // Create query string for free embed map
    const searchQuery = `${name}, ${address}`;
    const defaultMapLink = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    const finalMapLink = collegeData?.mapLink || defaultMapLink;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'stretch' }}>
                {/* Left: Map & Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
                    <div style={{ ...cardStyle, padding: '0', overflow: 'hidden', position: 'relative', flex: 1, minHeight: '350px' }}>
                        <iframe 
                            title="College Location"
                            src={finalMapLink}
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                        ></iframe>
                        
                        <button 
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`, '_blank')}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                left: '16px',
                                background: '#fff',
                                color: '#2563eb',
                                border: '1px solid #e5e7eb',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                transition: 'all 0.2s',
                                zIndex: 10
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                        >
                            Open in Maps
                            <Navigation size={14} />
                        </button>
                        
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: '#fff',
                            fontSize: '20px',
                            fontWeight: '700',
                            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                            pointerEvents: 'none',
                            textAlign: 'center',
                            width: '100%',
                            zIndex: 5
                        }}>
                            Use ctrl + scroll to zoom the map
                        </div>
                    </div>

                    <div style={{ ...cardStyle, background: '#f8fafc', padding: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Phone size={20} color="#5b51d8" />
                                <span style={{ fontSize: '15px', fontWeight: 700, color: '#334155' }}>{phone}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Mail size={20} color="#3b82f6" />
                                <span style={{ fontSize: '15px', fontWeight: 700, color: '#334155' }}>{email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Address & Transit Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
                    <div style={{ ...cardStyle, gap: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                            <MapPin size={24} color="#5b51d8" />
                            Registered Address
                        </h3>
                        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: 0 }}>
                            {address}
                            <br />
                            <span style={{ display: 'inline-block', marginTop: '8px' }}>
                                <strong style={{color: '#334155'}}>District:</strong> {district}
                            </span>
                            <br />
                            <strong style={{color: '#334155'}}>State:</strong> {state}
                        </p>
                    </div>

                    <div style={{ ...cardStyle, gap: '24px', flex: 1 }}>
                        <HowToReach collegeData={collegeData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
