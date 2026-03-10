import React from 'react';
import { MapPin, Navigation, Phone, Mail, Lock, LogIn } from 'lucide-react';
import HowToReach from './HowToReach.jsx';
import { useNavigate } from 'react-router-dom';

const Location = ({ collegeData }) => {
    const navigate = useNavigate();
    const name = collegeData?.name || 'College';
    const address = collegeData?.address && !collegeData.address.includes('updated') ? collegeData.address : '';
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
                        <div style={{ width: '100%', height: '100%', filter: !user ? 'blur(8px)' : 'none', pointerEvents: !user ? 'none' : 'auto' }}>
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

                        {!user && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255, 255, 255, 0.2)',
                                textAlign: 'center',
                                padding: '24px'
                            }}>
                                <div style={{ 
                                    background: '#fff', 
                                    padding: '24px', 
                                    borderRadius: '20px', 
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                    maxWidth: '280px',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <div style={{ width: '48px', height: '48px', background: '#f5f3ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <Lock size={24} color="#6366f1" />
                                    </div>
                                    <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Map is Locked</h4>
                                    <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>Please login to view the interactive campus map and directions.</p>
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }))}
                                        style={{ width: '100%', padding: '12px', background: '#5b51d8', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <LogIn size={16} /> Login to Unlock
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {user && (
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
                        
                        {user && (
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
                                <span style={{ fontSize: '15px', fontWeight: 700, color: '#334155', filter: !user ? 'blur(4px)' : 'none' }}>{user ? phone : '+91 XXXXX XXXXX'}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Mail size={20} color="#3b82f6" />
                                <span style={{ fontSize: '15px', fontWeight: 700, color: '#334155', filter: !user ? 'blur(4px)' : 'none' }}>{user ? email : 'login to view@college.com'}</span>
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
                        <div style={{ filter: !user ? 'blur(5px)' : 'none', pointerEvents: !user ? 'none' : 'auto' }}>
                            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: 0 }}>
                                {address || 'Official registered address is being updated for this college.'}
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
                        {!user && (
                            <div style={{ position: 'absolute', bottom: '24px', left: '28px', color: '#5b51d8', fontSize: '13px', fontWeight: 800 }}>
                                Address details available for logged in users
                            </div>
                        )}
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

