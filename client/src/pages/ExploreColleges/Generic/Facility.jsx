import React, { useState } from 'react';
import { Building2, Book, Monitor, Coffee, Home, Dumbbell, Wifi, Laptop, Microscope, Activity, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Facility = ({ collegeData }) => {
    const [selectedFacility, setSelectedFacility] = useState(null);

    const facilities = collegeData?.facilities || [
        'Library', 'Hostel', 'Computer Labs', 'Cafeteria', 'Wi-Fi Campus', 
        'Sports Complex', 'Auditorium', 'Medical Facilities', 'Gym', 'Laboratories'
    ];

    const facilityDescriptions = {
        'Library': 'The central library boasts a collection of over 30,000 books, journals, and digital resources. It provides a peaceful environment for research and study, with dedicated sections for various engineering disciplines. It includes e-books, research papers, and a quiet reading hall.',
        'Hostel': 'Modern hostels provide comfortable accommodation with basic amenities like Wi-Fi, laundry, and common rooms. Separate facilities are available for boys and girls with 24/7 security and nutritious mess food.',
        'Computer Labs': 'State-of-the-art computer labs equipped with high-performance systems and the latest software for practical training, programming, and research projects. High-speed LAN connectivity is available for all systems.',
        'Cafeteria': 'The spacious cafeteria serves a variety of hygienic and nutritious meals, snacks, and beverages to students and staff at reasonable prices. It is a popular spot for social interaction.',
        'Wi-Fi Campus': 'High-speed internet connectivity is available across the entire campus, including academic blocks, libraries, and hostels, ensuring students have access to online resources 24/7.',
        'Sports Complex': 'A well-equipped sports complex featuring indoor and outdoor facilities for cricket, football, basketball, badminton, and more. Trained coaches are available for guidance.',
        'Auditorium': 'A grand, air-conditioned auditorium with modern audio-visual equipment, stage lighting, and a large seating capacity for seminars, cultural events, and guest lectures.',
        'Medical Facilities': 'On-campus medical center with qualified doctors and nursing staff to provide primary healthcare and emergency services. Ample first-aid kits and ambulance services are available.',
        'Gym': 'A fully equipped modern gymnasium with cardio and weight training equipment to help students maintain physical fitness and mental well-being.',
        'Laboratories': 'Subject-specific laboratories with advanced equipment and safety measures for hands-on learning, practical examinations, and conducting research experiments.'
    };

    const getIcon = (name, size = 32) => {
        const n = name.toLowerCase();
        if (n.includes('library') || n.includes('book')) return <Book size={size} color="#5b51d8" />;
        if (n.includes('lab') || n.includes('laptop') || n.includes('monitor')) return <Monitor size={size} color="#3b82f6" />;
        if (n.includes('cafeteria') || n.includes('food') || n.includes('canteen')) return <Coffee size={size} color="#f59e0b" />;
        if (n.includes('hostel')) return <Home size={size} color="#10b981" />;
        if (n.includes('sport') || n.includes('gym') || n.includes('playground')) return <Dumbbell size={size} color="#ef4444" />;
        if (n.includes('wi-fi') || n.includes('internet')) return <Wifi size={size} color="#6366f1" />;
        if (n.includes('medical') || n.includes('health')) return <Activity size={size} color="#ec4899" />;
        if (n.includes('auditorium')) return <Building2 size={size} color="#8b5cf6" />;
        return <Microscope size={size} color="#64748b" />;
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Building2 size={26} color="#5b51d8" />
                        Campus Facilities & Infrastructure
                    </h2>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '20px',
                    padding: '10px 0'
                }}>
                    {facilities.map((f, i) => (
                        <motion.div 
                            key={i} 
                            onClick={() => setSelectedFacility(f)}
                            style={{ 
                                padding: '24px', 
                                background: '#f8fafc', 
                                borderRadius: '24px', 
                                border: '1px solid #f1f5f9', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                textAlign: 'center',
                                gap: '16px',
                                cursor: 'pointer',
                                transition: 'background 0.3s'
                            }} 
                            whileHover={{ 
                                y: -8,
                                background: '#fff',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                                borderColor: '#5b51d833'
                            }}
                        >
                            <div style={{ 
                                padding: '20px', 
                                background: '#fff', 
                                borderRadius: '20px', 
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {getIcon(f)}
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{f}</div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* Infrastructure Details - Static for Library and Hostel by default */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Book size={20} color="#5b51d8" />
                        Central Library
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>The central library boasts a collection of over 30,000 books, journals, and digital resources. It provides a peaceful environment for research and study, with dedicated sections for various disciplines.</p>
                </div>
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Home size={20} color="#10b981" />
                        Hostel Accommodation
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.8 }}>Modern hostels provide comfortable accommodation with basic amenities like Wi-Fi, laundry, and common rooms. Separate facilities are available for boys and girls with 24/7 security.</p>
                </div>
            </div>

            {/* Modal Detail Pop-up */}
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
                                    color: '#64748b',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
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
                                    {facilityDescriptions[selectedFacility] || "Details about this facility are currently being updated. Please check back later."}
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
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 15px -3px rgba(91, 81, 216, 0.3)',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
