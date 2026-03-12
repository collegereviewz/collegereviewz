import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback, useRef } from 'react';
import { MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import CollegeLogo from '../../components/CollegeLogo.jsx';
import Review from './Review';

const tabToComponentMap = {
    'College Info': 'CollegeInfo',
    'Course & Fees': 'CourseFees',
    'Cut Off': 'CutOff',
    'Admission': 'Admission',
    'Reviews': 'Reviews',
    'Ranking and Placement': 'RankingPlacement',
    'Location': 'Location',
    'Photo & Video': 'PhotoVideo',
    'Scholarship': 'Scholarship',
    'Notification & Upload': 'NotificationUpload',
    'Q & A': 'QA',
    'Facility': 'Facility',
    'Student Life': 'StudentLife',
    'Contact Details': 'ContactDetails'
};

const CollegeProfileTemplate = ({ collegeInfo }) => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'College Info');
    const contentRef = useRef(null);
    const [stats, setStats] = useState({
        rating: collegeInfo.data?.rating || 0,
        reviewsCount: collegeInfo.data?.reviewsCount || 0
    });
    const [collegeData, setCollegeData] = useState(collegeInfo.data);

    // Fetch full college data to get latest photos/videos/stats

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Use a cleaner name for API requests to avoid 404s from descriptive titles
                const searchName = collegeInfo.fullName.split(' - ')[0];
                const response = await axios.get(`http://localhost:5000/api/colleges/${encodeURIComponent(searchName)}/stats`);
                if (response.data.success) {
                    setCollegeData(response.data.data);
                    setStats({
                        rating: response.data.data.rating,
                        reviewsCount: response.data.data.reviewsCount
                    });
                }
            } catch (error) {
                console.error("Error fetching college details:", error);
            }
        };
        fetchDetails();
    }, [collegeInfo.fullName]);

    const handleStatsUpdate = useCallback((newStats) => {

        setStats(prev => {
            if (prev.rating === newStats.average && prev.reviewsCount === newStats.total) {
                return prev;
            }
            return { rating: newStats.average, reviewsCount: newStats.total };
        });
    }, []);

    // Update activeTab if location.state.activeTab changes
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state?.activeTab]);

    // Scroll to top whenever a college profile is opened/switched
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const tabs = [
        'College Info', 'Course & Fees', 'Cut Off', 'Admission',
        'Reviews', 'Ranking and Placement', 'Location',
        'Photo & Video', 'Scholarship', 'Notification & Upload', 'Q & A',
        'Facility', 'Student Life', 'Contact Details'
    ];

    // useMemo ensures a stable lazy reference per college+tab combination
    const ActiveComponent = useMemo(() => {
        if (activeTab === 'Reviews') {
            return Review;
        }

        const componentName = tabToComponentMap[activeTab];

        if (collegeInfo.isGeneric) {
            return lazy(() =>
                import(`./${collegeInfo.folderName}/${componentName}`)
                    .catch(() => import(`./Generic/${componentName}`))
                    .catch(() => ({
                        default: () => <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ color: '#64748b' }}>{activeTab} for {collegeInfo.fullName} is coming soon!</h3>
                        </div>
                    }))
            );
        }

        return lazy(() =>
            import(`./BE-BTech/Colleges/${collegeInfo.folderName}/${collegeInfo.detailsFolder}/${componentName}`)
                .catch(() => import(`./Generic/${componentName}`))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collegeInfo.folderName, activeTab, collegeInfo.isGeneric]);


    const containerStyle = {
        maxWidth: '1600px',
        width: '98%',
        margin: '0 auto',
        padding: '0 40px',
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    position: 'relative',
                    height: '400px',
                    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("${collegeInfo.heroImage}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'flex-end',
                    color: '#fff'
                }}
            >
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{ ...containerStyle, width: '100%', paddingBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
                    >
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                overflow: 'hidden'
                            }}>
                                {collegeInfo.isGeneric ? (
                                    <CollegeLogo collegeName={collegeInfo.fullName} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <img src={collegeInfo.logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                )}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>
                                    {collegeInfo.fullName}
                                </h1>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', fontWeight: 600, opacity: 0.9, alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {collegeInfo.location}</span>
                                    <span>| {collegeInfo.type}</span>
                                    <span>| Estd {collegeInfo.established}</span>
                                    {collegeInfo.website && (
                                        <a href={collegeInfo.website.startsWith('http') ? collegeInfo.website : `https://${collegeInfo.website}`} 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           style={{ color: '#fff', textDecoration: 'underline', opacity: 0.9 }}>
                                            | Visit Website
                                        </a>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>
                                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                        <span style={{ fontWeight: 800 }}>
                                            {Number(stats.rating).toFixed(1)}
                                            <span style={{ fontWeight: 500, fontSize: '12px', opacity: 0.8, marginLeft: '4px' }}>
                                                ({stats.reviewsCount} Reviews)
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            {/* Sticky Tabs Navigation */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '0', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ ...containerStyle, display: 'flex', overflowX: 'auto', gap: '32px', padding: '0 40px' }} 
                    className="no-scrollbar"
                >
                    {tabs.map((tab, idx) => (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + idx * 0.03 }}
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                // Scroll to the top of the content area after a brief tick
                                setTimeout(() => {
                                    if (contentRef.current) {
                                        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }, 50);
                            }}
                            style={{
                                padding: '20px 0',
                                fontSize: '14px',
                                fontWeight: activeTab === tab ? 800 : 600,
                                color: activeTab === tab ? '#5b51d8' : '#64748b',
                                border: 'none',
                                background: 'none',
                                borderBottom: activeTab === tab ? '3px solid #5b51d8' : '3px solid transparent',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div ref={contentRef} style={{ ...containerStyle, marginTop: '32px' }}>
                <Suspense
                    key={`${collegeInfo.fullName}-${activeTab}`}
                    fallback={<div style={{ padding: '40px', textAlign: 'center', fontWeight: 700, color: '#64748b' }}>Loading content...</div>}
                >
                    {activeTab === 'Reviews' ? (
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0' }}>
                            <ActiveComponent
                                collegeId={collegeInfo.data?._id || collegeInfo.data?.data?._id}
                                collegeName={collegeInfo.fullName || collegeInfo.data?.name}
                                collegeData={collegeInfo.data}
                                collegeStats={stats}
                                isEmbedded={true}
                                onStatsUpdate={handleStatsUpdate}
                            />
                        </div>
                    ) : (
                        <ActiveComponent collegeData={collegeInfo.data} onTabChange={setActiveTab} />
                    )}
                </Suspense>
            </div>


            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

export default CollegeProfileTemplate;
