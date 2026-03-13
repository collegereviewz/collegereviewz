import React, { useState } from 'react';
import { Building2, Book, Monitor, Coffee, Home, Dumbbell, Wifi, Activity, ChevronLeft, ChevronRight, X, Microscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Facility = ({ collegeData }) => {
    const [selectedFacility, setSelectedFacility] = useState(null);

    const name = collegeData?.name || 'College';
    const dbFacilities = collegeData?.facilities || [];
    
    const standardFacilities = [
        { name: 'Library', icon: <Book />, color: '#8B5CF6', bg: '#f5f3ff' },
        { name: 'Hostel', icon: <Home />, color: '#10B981', bg: '#ecfdf5' },
        { name: 'Computer Labs', icon: <Monitor />, color: '#3B82F6', bg: '#eff6ff' },
        { name: 'Cafeteria', icon: <Coffee />, color: '#F59E0B', bg: '#fffbeb' },
        { name: 'Wi-Fi Campus', icon: <Wifi />, color: '#6366F1', bg: '#eef2ff' },
        { name: 'Sports Complex', icon: <Dumbbell />, color: '#EF4444', bg: '#fef2f2' },
        { name: 'Auditorium', icon: <Building2 />, color: '#7C3AED', bg: '#f5f3ff' },
        { name: 'Medical Facilities', icon: <Activity />, color: '#FB7185', bg: '#fff1f2' },
        { name: 'Gym', icon: <Dumbbell />, color: '#EF4444', bg: '#fef2f2' },
        { name: 'Laboratories', icon: <Monitor />, color: '#3B82F6', bg: '#eff6ff' }
    ];

    const facilityDescriptions = {
        'Library': 'Over 30,000 books, journals, and digital resources with peaceful reading halls.',
        'Hostel': 'Comfortable separate accommodation for boys and girls with high security and mess.',
        'Computer Labs': 'High-performance systems with latest software and high-speed LAN connectivity.',
        'Cafeteria': 'Hygienic and nutritious food, snacks, and beverages for students and staff.',
        'Wi-Fi Campus': '24/7 high-speed internet connectivity across all academic and residential blocks.',
        'Sports Complex': 'Indoor and outdoor facilities for cricket, football, basketball, and more.',
        'Auditorium': 'Modern air-conditioned auditorium for seminars, cultural events, and guest lectures.',
        'Medical Facilities': 'On-campus medical center with qualified doctors and emergency ambulance services.',
        'Gym': 'Fully equipped modern gymnasium for physical fitness and mental well-being.',
        'Laboratories': 'Subject-specific advanced labs for hands-on learning and research experiments.'
    };

    const getIcon = (facilityName, size = 32) => {
        const standard = standardFacilities.find(sf => sf.name === facilityName);
        if (standard) return React.cloneElement(standard.icon, { size, color: standard.color });
        return <Microscope size={size} color="#64748b" />;
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Building2 size={24} color="#5b51d8" />
                        Campus Facilities & Infrastructure
                    </h2>
                </div>

                <div style={{ 
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{ 
                        flex: 1,
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(5, 1fr)', 
                        gap: '20px',
                    }}>
                        {standardFacilities.map((f, i) => (
                            <motion.div 
                                key={i} 
                                onClick={() => setSelectedFacility(f.name)}
                                style={{ 
                                    padding: '24px 12px', 
                                    background: '#fff', 
                                    borderRadius: '20px', 
                                    border: '1.5px solid #f1f5f9', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    textAlign: 'center',
                                    gap: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    opacity: 1 // ALWAYS FULLY VISIBLE
                                }} 
                                whileHover={{ 
                                    y: -5,
                                    boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05)',
                                    borderColor: f.color + '44'
                                }}
                            >
                                <div style={{ 
                                    width: '56px',
                                    height: '56px',
                                    background: f.bg, 
                                    borderRadius: '16px', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: f.color
                                }}>
                                    {React.cloneElement(f.icon, { size: 28 })}
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>{f.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {dbFacilities.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {dbFacilities.slice(0, 2).map((f, i) => (
                        <div key={i} style={cardStyle}>
                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                                    {getIcon(f, 20)}
                                </div>
                                {f}
                            </h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>
                                {facilityDescriptions[f] || `Information about the ${f} at ${name} is currently being updated.`}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {selectedFacility && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFacility(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(15, 23, 42, 0.4)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: '#fff',
                                borderRadius: '32px',
                                padding: '40px',
                                maxWidth: '500px',
                                width: '100%',
                                position: 'relative',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: '24px'
                            }}
                        >
                            <button
                                onClick={() => setSelectedFacility(null)}
                                style={{
                                    position: 'absolute',
                                    top: '24px',
                                    right: '24px',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#64748b'
                                }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ 
                                padding: '24px', 
                                background: '#f8fafc', 
                                borderRadius: '24px', 
                                border: '1px solid #f1f5f9',
                                marginBottom: '8px'
                            }}>
                                {getIcon(selectedFacility, 48)}
                            </div>

                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>
                                    {selectedFacility}
                                </h3>
                                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8 }}>
                                    {facilityDescriptions[selectedFacility] || "Details about this facility are currently being updated."}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedFacility(null)}
                                style={{
                                    marginTop: '12px',
                                    padding: '14px 32px',
                                    background: '#5b51d8',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close Details
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Facility;
