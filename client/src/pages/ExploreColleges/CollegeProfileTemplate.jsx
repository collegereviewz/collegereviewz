import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback, useRef } from 'react';
import { MapPin, Star } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import CollegeLogo from '../../components/CollegeLogo.jsx';
import Review from './Review';

import sectionsConfig from '../../constants/collegeSections.json';

const CollegeProfileTemplate = ({ collegeInfo }) => {
    const location = useLocation();
    const [activeTab, setActiveTab ] = useState(location.state?.activeTab || 'College Info');
    const contentRef = useRef(null);
    const [collegeData, setCollegeData] = useState(collegeInfo.data);
    const [stats, setStats] = useState({ 
        rating: collegeInfo.data?.rating || 0, 
        reviewsCount: collegeInfo.data?.reviewsCount || 0 
    });

    // Fetch full college data to get latest photos/videos/stats

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/colleges/${encodeURIComponent(collegeInfo.fullName)}`);
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

    // useMemo ensures a stable lazy reference per college+tab combination
    const ActiveComponent = useMemo(() => {
        if (activeTab === 'Reviews') {
            return Review;
        }

        const section = sectionsConfig.find(s => s.title === activeTab);
        const componentName = section ? section.component : 'CollegeInfo';
        
        if (collegeInfo.isGeneric) {
            // Check if we have a generic/MBBS version, else show a placeholder
            return lazy(() => 
                import(`./${collegeInfo.folderName}/${componentName}`).catch(() => ({
                    default: () => <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ color: '#64748b' }}>{activeTab} for {collegeInfo.fullName} is coming soon!</h3>
                    </div>
                }))
            );
        }

        return lazy(() =>
            import(`./BE-BTech/Colleges/${collegeInfo.folderName}/${collegeInfo.detailsFolder}/${componentName}`)
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collegeInfo.folderName, activeTab, collegeInfo.isGeneric]);


    const containerStyle = {
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 40px',
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>
            {/* Hero Section */}
            <div style={{ 
                position: 'relative', 
                height: '400px', 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("${(collegeInfo.isGeneric && collegeData?.photos?.length > 0) ? collegeData.photos[0] : collegeInfo.heroImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'flex-end',
                color: '#fff'
            }}>
                <div style={{ ...containerStyle, width: '100%', paddingBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
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
                </div>
            </div>

            {/* Sticky Tabs Navigation */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '0', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ ...containerStyle, display: 'flex', overflowX: 'auto', gap: '32px', padding: '0 40px' }} className="no-scrollbar">
                    {sectionsConfig.map(s => (
                        <button 
                            key={s.id}
                            onClick={() => {
                                setActiveTab(s.title);

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
                                fontWeight: activeTab === s.title ? 800 : 600,
                                color: activeTab === s.title ? '#5b51d8' : '#64748b',
                                border: 'none',
                                background: 'none',
                                borderBottom: activeTab === s.title ? '3px solid #5b51d8' : '3px solid transparent',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {s.title}
                        </button>

                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div ref={contentRef} style={{ ...containerStyle, marginTop: '32px' }}>
                <Suspense
                    key={`${collegeInfo.fullName}-${activeTab}`}
                    fallback={<div style={{ padding: '40px', textAlign: 'center', fontWeight: 700, color: '#64748b' }}>Loading content...</div>}
                >
                    {(() => {
                        const section = sectionsConfig.find(s => s.title === activeTab);
                        const requiredField = section?.requiredField;
                        const dataValue = requiredField ? collegeData?.[requiredField] : true;
                        
                        // Check if data is empty (null, undefined, empty array, or empty string)
                        const isEmpty = !dataValue || (Array.isArray(dataValue) && dataValue.length === 0);

                        if (isEmpty && activeTab !== 'Reviews' && activeTab !== 'College Info') {
                            return (
                                <div style={{ 
                                    background: '#fff', 
                                    borderRadius: '20px', 
                                    padding: '60px 40px', 
                                    border: '1px solid #e2e8f0',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <div style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        background: '#f1f5f9', 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: '#64748b'
                                    }}>
                                        <Star size={40} opacity={0.2} />
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                                        {activeTab} Coming Soon!
                                    </h3>
                                    <p style={{ maxWidth: '500px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                                        {section.emptyMessage || `We're currently gathering the most accurate ${activeTab} data for ${collegeInfo.fullName}. Check back soon for updates!`}
                                    </p>
                                    <button 
                                        onClick={() => setActiveTab('College Info')}
                                        style={{ 
                                            marginTop: '10px',
                                            padding: '10px 24px', 
                                            background: '#5b51d8', 
                                            color: '#fff', 
                                            border: 'none', 
                                            borderRadius: '12px', 
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Back to Overview
                                    </button>
                                </div>
                            );
                        }

                        if (activeTab === 'Reviews') {
                            return (
                                <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1px solid #e2e8f0' }}>
                                    <ActiveComponent 
                                        collegeId={collegeData?._id || collegeInfo.data?._id || collegeInfo.data?.data?._id} 
                                        collegeName={collegeInfo.fullName || collegeData?.name} 
                                        isEmbedded={true}
                                        onStatsUpdate={handleStatsUpdate}
                                    />
                                </div>
                            );
                        }

                        return <ActiveComponent collegeData={collegeData} onTabChange={setActiveTab} />;
                    })()}
                </Suspense>
            </div>


            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

export default CollegeProfileTemplate;
