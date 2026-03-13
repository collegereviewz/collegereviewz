import React from 'react';
import { MapPin, Navigation, Phone, Mail, Lock, LogIn } from 'lucide-react';
import HowToReach from './HowToReach.jsx';
import { useNavigate } from 'react-router-dom';

const Location = ({ collegeData }) => {
    const navigate = useNavigate();
    const name = collegeData?.name || 'College';
    const address = collegeData?.address || '';
    const district = collegeData?.district || '';
    const state = collegeData?.state || 'India';
    const phone = collegeData?.contactDetails?.phone || 'N/A';
    const email = collegeData?.contactDetails?.email || 'N/A';
    const user = JSON.parse(localStorage.getItem('user') || 'null');


    const cardStyle = {
        background: '#fff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
    };

    // Create query string for free embed map
    // If address is missing, use Name + District + State
    const searchQuery = address ? `${name}, ${address}` : `${name}, ${district}, ${state}`;
    const defaultMapLink = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    const finalMapLink = (collegeData?.mapLink && collegeData.mapLink.includes('embed')) ? collegeData.mapLink : defaultMapLink;


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'stretch' }}>
                {/* Left: Map & Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
                    <div style={{ ...cardStyle, padding: '0', overflow: 'hidden', position: 'relative', flex: 1, minHeight: '350px' }}>
                        <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
                            <iframe 
                                title="College Location"
                                src={finalMapLink}
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Removed Lock Overlay */}
                        
                        {true && (
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
                        )}
                        
                        {true && (
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
                        )}
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
                    <div style={{ ...cardStyle, gap: '16px', position: 'relative' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                            <MapPin size={24} color="#5b51d8" />
                            Registered Address
                        </h3>
                        <div>
                            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: 0 }}>
                                {address || `Official registered address for ${name} is located in ${district ? district + ', ' : ''}${state}.`}
                                {(district || state) && (
                                    <>
                                        <br />
                                        <span style={{ display: 'inline-block', marginTop: '8px' }}>
                                            {district && <><strong style={{color: '#334155'}}>District:</strong> {district}</>}
                                            {district && state && ' | '}
                                            {state && <><strong style={{color: '#334155'}}>State:</strong> {state}</>}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                        {/* Removed Lock Message */}
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

