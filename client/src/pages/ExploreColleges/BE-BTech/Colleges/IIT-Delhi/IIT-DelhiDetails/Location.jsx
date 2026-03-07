import React from 'react';
import { MapPin, Navigation, Building2, Star } from 'lucide-react';
import HowToReach from '../../../Generic/HowToReach.jsx';

const Location = ({ collegeData }) => {
    const name = collegeData?.name || 'College';
    let locationStr = collegeData?.location || '';
    let addressStr = collegeData?.address || '';
    
    locationStr = locationStr.replace(/["']/g, '').trim();
    addressStr = addressStr.replace(/["']/g, '').trim();

    const cleanLocation = locationStr.split('|')[0].trim();
    
    const addressParts = [];
    if (addressStr) addressParts.push(addressStr);
    if (cleanLocation && !addressParts.includes(cleanLocation)) addressParts.push(cleanLocation);
    
    const fullAddress = addressParts.join(', ') || 'Address not available';
    
    // Construct search query for Google Maps
    const searchQuery = `${name} ${fullAddress}`.trim();
    
    // Mock or extract Google rating details
    const rating = collegeData?.rating || '4.1';
    const reviews = collegeData?.reviews || '738';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MapPin color="#0ea5e9" size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#1e293b', margin: 0 }}>Campus Location</h2>
                        <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Find your way to the institution</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    
                    {/* Institution Details Section */}
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Building2 size={20} color="#5b51d8" />
                            Institution Details
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>Institution Name</div>
                                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#334155' }}>{name}</div>
                                </div>
                                <div style={{ background: '#fff', padding: '10px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '140px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Google Reviews</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b' }}>{rating}</span>
                                        <Star size={16} fill="#f59e0b" color="#f59e0b" style={{ marginTop: '-2px' }} />
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}>({reviews} Reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Embedded iframe */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', margin: 0 }}>Find Our Office / Campus</h3>
                            <button 
                                style={{ 
                                    padding: '10px 20px', 
                                    background: '#eff6ff', 
                                    color: '#3b82f6', 
                                    borderRadius: '10px', 
                                    border: '1px solid #bfdbfe', 
                                    fontSize: '13px', 
                                    fontWeight: 800, 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(searchQuery)}`, '_blank')}
                                onMouseEnter={e => { e.currentTarget.style.background = '#dbeafe'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#eff6ff'; }}
                            >
                                <Navigation size={16} />
                                Get Directions
                            </button>
                        </div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', height: '450px', background: '#f8fafc', position: 'relative' }}>
                            <iframe 
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight="0" 
                                marginWidth="0" 
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                title="Google Maps Location"
                            />
                            
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
                    </div>

                    {/* How to Reach Details */}
                    <HowToReach
                        collegeData={collegeData}
                        fallbackHubs={[
                            {
                                type: 'airport',
                                hubName: 'Indira Gandhi International Airport',
                                travelTime: '10 km',
                            },
                            {
                                type: 'railway',
                                hubName: 'New Delhi Railway Station',
                                travelTime: '15 km',
                            },
                            {
                                type: 'bus',
                                hubName: 'IIT Gate Bus Stop',
                                travelTime: 'walkable',
                            },
                        ]}
                    />

                </div>
            </div>
        </div>
    );
};

export default Location;
