import React from 'react';
import { Award, TrendingUp, TrendingDown, Lock, ShieldCheck, PieChart, Users, ChevronRight, BarChart3, LineChart as ChartIcon, ExternalLink, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const RankingPlacement = ({ collegeData }) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const name = collegeData?.name || 'College';
    const rankingText = collegeData?.ranking || 'Latest ranking and awards information is being updated.';
    const avgPackage = collegeData?.avgPackage || 'N/A';
    const highestPackage = collegeData?.highestPackage || 'N/A';
    const recruiters = collegeData?.topRecruiters || [];

    const stats = [
        { 
            title: 'Highest Package Card', 
            label: 'Highest Package',
            value: highestPackage, 
            trend: '+5%', 
            growth: 'year-on-year growth',
            subValue: `Historical peak: ${highestPackage}`,
            color: '#6366f1',
            icon: <TrendingUp size={20} />,
            bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
            chart: (
                <svg width="60" height="30" viewBox="0 0 60 30" style={{ marginLeft: 'auto' }}>
                    <path d="M0 25 L10 18 L20 22 L30 10 L40 15 L50 5 L60 8" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
            )
        },
        { 
            title: 'Average Package Card', 
            label: 'Average Package',
            value: avgPackage, 
            subValue: 'CS: 11 LPA • ECE: 9 LPA • ME: 7 LPA',
            color: '#3b82f6',
            icon: <PieChart size={20} />,
            bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            chart: (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', marginLeft: 'auto' }}>
                    {[10, 20, 15, 25, 18].map((h, i) => <div key={i} style={{ width: '4px', height: `${h}px`, background: '#3b82f6', borderRadius: '2px' }} />)}
                </div>
            )
        },
        { 
            title: 'Placement Rate Card', 
            label: 'Placement Rate',
            value: '91.2%', 
            trend: '10% increase from previous year',
            subValue: '',
            color: '#10b981',
            icon: <Users size={20} />,
            bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            chart: (
                <svg width="40" height="40" viewBox="0 0 40 40" style={{ marginLeft: 'auto' }}>
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="100" strokeDashoffset="15" strokeLinecap="round" transform="rotate(-90 20 20)" />
                    <text x="20" y="24" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#10b981">91%</text>
                </svg>
            )
        }
    ];

    const rankings = collegeData?.ranking ? [
        { name: 'Latest Ranking', rank: collegeData.ranking, desc: `Official ranking for ${name} as per latest records.` },
        { name: 'NIRF Ranking', rank: collegeData.ranking?.includes('NIRF') ? collegeData.ranking.split('NIRF')[1].trim() : 'Updated soon', desc: 'Ranking methodology brief by NIRF' }
    ] : [
        { name: 'NIRF', rank: 'Coming Soon', desc: 'Official NIRF ranking is being updated for this session.' },
        { name: 'QS World Rankings', rank: 'Coming Soon', desc: 'International ranking status is being verified.' },
        { name: 'NAAC Accreditation', rank: 'Coming Soon', desc: 'Latest NAAC accreditation status will be posted here.' }
    ];

    const topRecruiters = recruiters.length > 0 ? recruiters.map(r => ({ name: r, offers: 'Top Recruiter', sector: 'Recruiting for various positions' })) : [
        { name: 'Information Pending', offers: '—', sector: 'Detailed recruiter list coming soon' }
    ];

    return (
        <>
            <div style={{ display: 'flex', gap: '24px', position: 'relative' }}>
            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Placement Dashboard & Multi-Rank Analysis</h2>
                
                {/* Stats row */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={{ 
                                flex: 1, 
                                background: stat.bg, 
                                border: '1px solid rgba(0,0,0,0.05)', 
                                borderRadius: '16px', 
                                padding: '20px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '12px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                                <span style={{ padding: '6px', background: '#fff', borderRadius: '8px', color: stat.color, display: 'flex' }}>{stat.icon}</span>
                                {stat.label}
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b' }}>
                                        {stat.value}
                                    </div>
                                    {stat.trend && (
                                        <div style={{ fontSize: '12px', color: stat.color, fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <TrendingUp size={14} /> {stat.trend} <span style={{ color: '#64748b', fontWeight: 500 }}>{stat.growth || ''}</span>
                                        </div>
                                    )}
                                </div>
                                {stat.chart}
                            </div>
                            
                            <div style={{ fontSize: '11px', color: '#64748b', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '10px', marginTop: '4px' }}>
                                {stat.subValue}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Rankings Table Card */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ background: '#f0f9ff', borderRadius: '16px', border: '1px solid #bae6fd', padding: '24px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '10px', background: '#fff', borderRadius: '12px', color: '#0ea5e9', display: 'flex' }}><Award size={22} /></div>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0369a1' }}>Rankings & Recognitions</h3>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                        {rankings.map((r, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', gap: '20px', padding: '14px 20px', background: '#fff' }}>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{r.name}</div>
                                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0369a1' }}>{r.rank}</div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>{r.desc}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Sidebar */}
            <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp size={18} /> Advanced Tools
                    </h3>
                    
                    {/* Tool 1 */}
                    <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>Placement Trend Forecaster</div>
                        <div style={{ height: '80px', background: 'linear-gradient(to top, #f8fafc, #fff)', borderRadius: '12px', display: 'flex', alignItems: 'flex-end', padding: '10px', gap: '4px' }}>
                            {[20, 35, 25, 45, 60, 55, 75].map((h, i) => (
                                <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? '#0ea5e9' : '#e2e8f0', borderRadius: '4px' }} />
                            ))}
                        </div>
                        <button style={{ width: '100%', padding: '8px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>View Full Forecast</button>
                    </div>

                    {/* Tool 2 */}
                    <div style={{ background: '#fff', border: '1px solid #e0f2fe', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>Alumni Salary Explorer</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <select style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px' }}>
                                <option>Filters</option>
                            </select>
                            <select style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px' }}>
                                <option>Select All</option>
                            </select>
                        </div>
                    </div>

                    {/* Portal Button */}
                    <button style={{ 
                        padding: '14px', background: '#0369a1', color: '#fff', 
                        border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '12px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        boxShadow: '0 4px 12px rgba(3, 105, 161, 0.2)'
                    }}>
                        Recruiter Connection Portal <ChevronRight size={16} />
                    </button>
                </div>

                {/* Report Card */}
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>Download Comprehensive Academic Report</div>
                    <button style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '11px', fontWeight: 700, color: '#1e293b', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={14} /> PDF Report
                    </button>
                </div>
            </div>
        </div>

        {/* Full-width Recruiters Section */}
        <div style={{ marginTop: '24px', borderTop: '2px dashed #e2e8f0', paddingTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '10px', color: '#3b82f6', display: 'flex' }}><TrendingUp size={20} /></div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>Our Top Recruiters</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', position: 'relative' }}>
                {topRecruiters.map((r, i) => (
                    <div key={i} style={{ 
                        background: '#fff', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '14px', 
                        padding: '16px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '10px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#3b82f6', fontWeight: 900 }}>
                                {r.name[0]}
                            </div>
                            <div style={{ background: '#fef3c7', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', color: '#92400e', fontWeight: 800, textTransform: 'uppercase' }}>
                                Badge
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '15px', fontWeight: 900, color: '#1e293b' }}>{r.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Recruiter of the Year</div>
                        </div>
                        <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>{r.offers}</div>
                            <div style={{ fontSize: '10px', color: '#64748b' }}>{r.sector || 'Various Sectors'}</div>
                        </div>
                    </div>
                ))}
                
                {/* Removed Auth Overlay */}
            </div>
        </div>
        </>
    );
};

export default RankingPlacement;

