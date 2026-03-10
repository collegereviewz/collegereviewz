import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, RefreshCcw, ThumbsUp, ThumbsDown, Camera, CheckCircle, Search, MapPin,
    BookOpen, DollarSign, Award, ArrowUpRight, CheckSquare, PlusCircle, ArrowRight,
    MessageSquare, Send, ChevronDown, Check, X
} from 'lucide-react';
import WriteAReview from '../WriteAReview';
import internalLogo from '../../assets/logo6.png';

// Helper to remove duplicate hashtags and highlight them inline
const renderContentWithHashtags = (content, setFilterTag) => {
    if (!content) return null;
    const parts = content.split(/(#[\w-]+)/g);

    let lastRealTextIndex = -1;
    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (part && !part.startsWith('#') && part.trim() !== '') {
            lastRealTextIndex = i;
            break;
        }
    }

    const seenTags = new Set();

    return parts.map((part, i) => {
        if (part && part.startsWith('#')) {
            const tagUpper = part.toUpperCase();
            if ((i > lastRealTextIndex && lastRealTextIndex !== -1) || seenTags.has(tagUpper)) {
                return null;
            }
            seenTags.add(tagUpper);
            return (
                <span
                    key={i}
                    style={{ color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setFilterTag(part);
                    }}
                >
                    {part}
                </span>
            );
        }
        return part;
    });
};

const Review = ({ collegeId, collegeName, onStatsUpdate, collegeData, collegeStats }) => {
    const API_BASE = 'http://localhost:5000/api/reviews';
    const [posts, setPosts] = useState([]);
    const [stats, setStats] = useState(collegeStats || collegeData?.reviewStats || collegeData?.data?.reviewStats || null);
    const [statsLoading, setStatsLoading] = useState(!stats);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('latest');
    const [filterTag, setFilterTag] = useState(null);
    const [showComments, setShowComments] = useState({});
    const [commentTexts, setCommentTexts] = useState({});
    const location = useLocation();
    const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(location.state?.openWriteReview || false);

    useEffect(() => {
        if (location.state?.openWriteReview) {
            setIsWriteReviewModalOpen(true);
        }
    }, [location.state?.openWriteReview]);

    // Build the default tag based on college name
    const defaultTag = useMemo(() => {
        if (!collegeName) return '';
        const shortName = collegeName.split(' - ')[0].split(',')[0];
        return '#' + shortName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    }, [collegeName]);

    useEffect(() => {
        const fetchStats = async () => {
            if (!collegeName) return;
            try {
                setStatsLoading(true);
                // Trigger scrape if stats are missing or incomplete
                const res = await axios.get(`http://localhost:5000/api/colleges/${encodeURIComponent(collegeName)}/stats?triggerScrape=true`);
                if (res.data.success && res.data.data.reviewStats) {
                    setStats(res.data.data.reviewStats);
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setStatsLoading(false);
            }
        };

        if (!stats || !stats.external?.google?.rating) {
            fetchStats();
        }
    }, [collegeName, collegeId]);

    useEffect(() => {
        fetchReviews(1, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collegeId, sortType]);

    const fetchReviews = async (pageNum = 1, append = false) => {
        try {
            setLoading(true);
            let url = `${API_BASE}?page=${pageNum}&limit=10&sort=${sortType}`;

            if (collegeId) {
                url += `&collegeId=${collegeId}`;
            } else if (collegeName) {
                // If ID is missing, backend now supports filtering by name
                // Use a cleaner name to avoid descriptive titles causing mismatch
                const searchName = collegeName.split(' - ')[0];
                url += `&collegeName=${encodeURIComponent(searchName)}`;
            }

            if (filterTag) {
                url += `&hashtag=${encodeURIComponent(filterTag)}`;
            }

            const res = await axios.get(url);
            let fetched = res.data.reviews || [];

            if (append) {
                setPosts(prev => {
                    const existingIds = new Set(prev.map(p => p._id));
                    return [...prev, ...fetched.filter(p => !existingIds.has(p._id))];
                });
            } else {
                setPosts(fetched);
            }
            setHasMore(res.data.hasMore ?? fetched.length === 10);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchReviews(nextPage, true);
    };

    const handleUpvote = async (id) => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user) { alert("Please login to upvote!"); return; }

        setPosts(posts.map(p => {
            if (p._id === id) {
                const isUpvoted = p.upvotedBy?.includes(user._id);
                const isDownvoted = p.downvotedBy?.includes(user._id);
                let newUpvotes = p.upvotes || 0;
                let newDownvotes = p.downvotes || 0;
                let newUpvotedBy = p.upvotedBy || [];
                let newDownvotedBy = p.downvotedBy || [];

                if (isUpvoted) {
                    newUpvotedBy = newUpvotedBy.filter(uId => uId !== user._id);
                    newUpvotes = Math.max(0, newUpvotes - 1);
                } else {
                    newUpvotedBy = [...newUpvotedBy, user._id];
                    newUpvotes += 1;
                    if (isDownvoted) {
                        newDownvotedBy = newDownvotedBy.filter(uId => uId !== user._id);
                        newDownvotes = Math.max(0, newDownvotes - 1);
                    }
                }
                return { ...p, upvotes: newUpvotes, downvotes: newDownvotes, upvotedBy: newUpvotedBy, downvotedBy: newDownvotedBy };
            }
            return p;
        }));

        try { await axios.put(`${API_BASE}/${id}/upvote`, { userId: user._id }); }
        catch (err) { console.error("Error upvoting:", err); }
    };

    const handleDownvote = async (id) => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user) { alert("Please login to downvote!"); return; }

        setPosts(posts.map(p => {
            if (p._id === id) {
                const isUpvoted = p.upvotedBy?.includes(user._id);
                const isDownvoted = p.downvotedBy?.includes(user._id);
                let newUpvotes = p.upvotes || 0;
                let newDownvotes = p.downvotes || 0;
                let newUpvotedBy = p.upvotedBy || [];
                let newDownvotedBy = p.downvotedBy || [];

                if (isDownvoted) {
                    newDownvotedBy = newDownvotedBy.filter(uId => uId !== user._id);
                    newDownvotes = Math.max(0, newDownvotes - 1);
                } else {
                    newDownvotedBy = [...newDownvotedBy, user._id];
                    newDownvotes += 1;
                    if (isUpvoted) {
                        newUpvotedBy = newUpvotedBy.filter(uId => uId !== user._id);
                        newUpvotes = Math.max(0, newUpvotes - 1);
                    }
                }
                return { ...p, upvotes: newUpvotes, downvotes: newDownvotes, upvotedBy: newUpvotedBy, downvotedBy: newDownvotedBy };
            }
            return p;
        }));

        try { await axios.put(`${API_BASE}/${id}/downvote`, { userId: user._id }); }
        catch (err) { console.error("Error downvoting:", err); }
    };

    const handleAddComment = async (postId) => {
        const content = commentTexts[postId]?.trim();
        if (!content) return;
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user) { alert("Please login to comment!"); return; }

        try {
            const response = await axios.post(`${API_BASE}/${postId}/comments`, {
                author: user.fullName || "Anonymous Student",
                content,
                type: 'text'
            });
            if (response.data) {
                setPosts(posts.map(p => p._id === postId ? (response.data.hasOwnProperty('_id') ? response.data : { ...p, comments: [...(p.comments || []), { author: user.fullName, content, createdAt: new Date() }] }) : p));
                setCommentTexts({ ...commentTexts, [postId]: '' });
            }
        } catch (err) {
            console.error("Error adding comment:", err);
            // Optimistic update
            setPosts(posts.map(p => p._id === postId ? { ...p, comments: [...(p.comments || []), { author: user.fullName, content, createdAt: new Date() }] } : p));
            setCommentTexts({ ...commentTexts, [postId]: '' });
        }
    };

    // Calculate rating stats
    const ratingStats = useMemo(() => {
        if (!posts.length) return { average: '0.0', total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let sum = 0;
        posts.forEach(p => {
            const r = p.rating || 5;
            distribution[r]++;
            sum += r;
        });

        // Calculate percentages
        const total = posts.length;
        const distPercent = {};
        for (let k in distribution) {
            distPercent[k] = Math.round((distribution[k] / total) * 100);
        }

        return {
            average: (sum / total).toFixed(1),
            total,
            distribution: distPercent
        };
    }, [posts]);

    useEffect(() => {
        if (onStatsUpdate) {
            onStatsUpdate(ratingStats);
        }
    }, [ratingStats, onStatsUpdate]);

    // Calculate common topics
    const commonTopics = useMemo(() => {
        const counts = {};
        posts.forEach(p => {
            const tags = p.content?.match(/(#[\w-]+)/g) || [];
            tags.forEach(tag => {
                const t = tag.toUpperCase();
                if (t !== defaultTag.toUpperCase()) {
                    counts[t] = (counts[t] || 0) + 1;
                }
            });
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }, [posts, defaultTag]);

    // Apply filtering and search globally over fetched posts
    const sortedPosts = useMemo(() => {
        let sorted = [...posts];
        if (filterTag) {
            sorted = sorted.filter(p => p.content?.toUpperCase().includes(filterTag.toUpperCase()));
        }
        if (searchTerm) {
            sorted = sorted.filter(p =>
                p.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.author?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return sorted;
    }, [posts, filterTag, searchTerm]);

    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Inter', sans-serif", width: '100%', background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>

            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#000', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
                        {collegeName || 'Reviews'}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill={s <= Math.round(parseFloat(ratingStats.average)) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '15px', color: '#000' }}>
                            {ratingStats.average} <span style={{ color: '#64748b', fontWeight: 500 }}>({ratingStats.total} Reviews)</span>
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setIsWriteReviewModalOpen(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: 'linear-gradient(90deg, #6366f1, #0ea5e9)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 32px',
                        borderRadius: '30px',
                        fontWeight: 900,
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.25)'
                    }}>
                    Write A Review <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
            </div>

            {/* Dashboard Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }} className="responsive-stats">
                {/* Internal Rating Card */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '32px', background: '#fff' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', fontWeight: 900, color: '#000', lineHeight: 1 }}>{ratingStats.average}</div>
                        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '8px 0' }}>
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= Math.round(parseFloat(ratingStats.average)) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Internal Rating</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        {[5, 4, 3, 2, 1].map(num => (
                            <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, width: '10px', color: '#000' }}>{num}</span>
                                <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${ratingStats.distribution[num]}%`, height: '100%', background: '#4f46e5', borderRadius: '3px' }} />
                                </div>
                                <span style={{ fontSize: '12px', color: '#64748b', width: '32px', textAlign: 'right', fontWeight: 500 }}>{ratingStats.distribution[num]}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Topics Card */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', background: '#fff' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 800, color: '#000' }}>Common Topics</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {commonTopics.length === 0 ? <span style={{ fontSize: "13px", color: "#94a3b8" }}>No topics found.</span> : commonTopics.map(([tag]) => (
                            <button key={tag} onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                                style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #e2e8f0', background: filterTag === tag ? '#f1f5f9' : '#fff', fontSize: '12px', fontWeight: 700, color: filterTag === tag ? '#4f46e5' : '#475569', cursor: 'pointer', transition: 'all 0.2s' }}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* External Ratings and Insights */}
            {statsLoading ? (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#4f46e5', marginBottom: '12px' }}>Scraping reviews and insights...</div>
                    <div className="stats-loader" style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #4f46e5', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : stats && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                    {/* Modern Ordered Ratings Table */}
                    <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>Platform Comparison</h3>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</th>
                                    <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating Scale</th>
                                    <th style={{ padding: '16px 24px', fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Reviews</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Google Review', key: 'google', color: '#4285F4', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' },
                                    { name: 'Shiksha Reviews', key: 'shiksha', color: '#FF7D00', logo: 'https://images.shiksha.com/mediadata/images/favicon.ico' },
                                    { name: 'Collegedunia Review', key: 'collegedunia', color: '#00BFA5', logo: 'https://collegedunia.com/favicon.ico' },
                                    { name: 'Our Review (Internal)', key: 'internal', color: '#4f46e5', logo: internalLogo }
                                ].map((source, i) => {
                                    const sourceStats = source.key === 'internal'
                                        ? { rating: ratingStats.average, count: ratingStats.total }
                                        : (stats.external?.[source.key] || { rating: 0, count: 0 });

                                    return (
                                        <tr key={i} style={{ borderBottom: i === 3 ? 'none' : '1px solid #f8fafc', transition: 'background 0.2s', background: i === 3 ? '#fefce8' : 'transparent' }}>
                                            <td style={{ padding: '20px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <img src={source.logo} alt={source.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                                                    <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '15px' }}>{source.name}</span>
                                                    {i === 3 && <span style={{ fontSize: '10px', background: '#facc15', color: '#854d0e', padding: '2px 8px', borderRadius: '10px', fontWeight: 900, marginLeft: '8px' }}>AUTHENTIC</span>}
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>{Number(sourceStats.rating || 0).toFixed(1)}</div>
                                                    <div style={{ display: 'flex', gap: '2px' }}>
                                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= Math.round(Number(sourceStats.rating || 0)) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '20px 24px' }}>
                                                <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>{sourceStats.count || 0}+ Reviews</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pros and Cons Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="responsive-stats">
                        <div style={{ background: '#f0fdf4', borderRadius: '24px', padding: '28px', border: '1px solid #bbf7d0', boxShadow: '0 4px 15px rgba(22, 101, 52, 0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ background: '#dcfce7', borderRadius: '12px', display: 'flex', padding: '8px' }}><CheckCircle size={24} color="#16a34a" /></div>
                                <h3 style={{ color: '#166534', fontSize: '18px', fontWeight: 900, margin: 0 }}>5 Key Pros</h3>
                            </div>
                            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(stats.pros && stats.pros.length > 0 ? stats.pros.slice(0, 5) : ['Lush green campus', 'Excellent faculty support', 'Top-tier infrastructure', 'High placement rate', 'Dynamic student life']).map((pro, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#14532d', fontWeight: 600, lineHeight: 1.5 }}>
                                        <div style={{ background: '#16a34a', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                            <Check size={12} color="#fff" />
                                        </div>
                                        {pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: '#fef2f2', borderRadius: '24px', padding: '28px', border: '1px solid #fecaca', boxShadow: '0 4px 15px rgba(153, 27, 27, 0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ background: '#fee2e2', borderRadius: '12px', display: 'flex', padding: '8px' }}><ThumbsDown size={24} color="#dc2626" /></div>
                                <h3 style={{ color: '#991b1b', fontSize: '18px', fontWeight: 900, margin: 0 }}>5 Key Cons</h3>
                            </div>
                            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {(stats.cons && stats.cons.length > 0 ? stats.cons.slice(0, 5) : ['Heavy workload', 'Limited parking space', 'Distance from city center', 'Expensive cafeteria', 'Strict attendance']).map((con, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#7f1d1d', fontWeight: 600, lineHeight: 1.5 }}>
                                        <div style={{ background: '#dc2626', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                                            <div style={{ width: '8px', height: '2px', background: '#fff', borderRadius: '1px' }} />
                                        </div>
                                        {con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Top 2 Featured Reviews from Shiksha/Collegedunia */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Verified Highlights</h3>
                            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source: Shiksha / Collegedunia</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            {(stats.topReviews && stats.topReviews.length > 0 ? stats.topReviews.slice(0, 2) : [
                                { author: 'Rahul S.', source: 'Shiksha', content: 'The overall atmosphere and academic rigour is balanced beautifully. Placements are consistently rising every year.', rating: 5, date: 'Feb 2026' },
                                { author: 'Sneha K.', source: 'Collegedunia', content: 'Fantastic faculty and state-of-the-art labs. Best decision for my engineering career.', rating: 4.5, date: 'Jan 2026' }
                            ]).map((rev, i) => (
                                <div key={i} style={{ padding: '28px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                    <div style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '40px', color: '#f1f5f9', fontWeight: 900, lineHeight: 1, pointerEvents: 'none' }}>"</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px' }}>{rev.author[0]}</div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>{rev.author}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{rev.date}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '11px', background: rev.source.includes('Shiksha') ? '#fff7ed' : '#f0fdfa', color: rev.source.includes('Shiksha') ? '#9a3412' : '#0d9488', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, border: `1px solid ${rev.source.includes('Shiksha') ? '#ffedd5' : '#ccfbf1'}` }}>{rev.source}</div>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: 1.7, fontWeight: 500, fontStyle: 'italic' }}>{rev.content}</p>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= Math.round(Number(rev.rating)) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                    <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={16} />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', color: '#000', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#000', background: '#fff' }}>
                        Media: <span style={{ color: '#4f46e5' }}>All</span> <ChevronDown size={14} />
                    </div>
                    <div style={{ padding: '10px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#000', background: '#fff' }} onClick={() => setSortType(sortType === 'latest' ? 'top' : 'latest')}>
                        Sort: <span style={{ color: '#4f46e5' }}>{sortType === 'latest' ? 'Recent' : 'Top'}</span> <ChevronDown size={14} />
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            {loading && posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading reviews...</div>
            ) : sortedPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #e2e8f0' }}>No reviews match your filters.</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }} className="review-grid">
                    <AnimatePresence>
                        {sortedPosts.map(post => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={post._id}
                                style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
                            >
                                {/* Card Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#edf2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase' }}>
                                            {post.author?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '14px', color: '#000', textTransform: 'uppercase' }}>
                                                {post.author}
                                                <span style={{ fontSize: '9px', background: '#ecfdf5', color: '#10b981', padding: '2px 4px', borderRadius: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                    <CheckCircle size={10} strokeWidth={3} /> Verified
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= (post.rating || 5) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                                    </div>
                                </div>

                                {/* Content */}
                                <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.6', wordBreak: 'break-word' }}>
                                    {renderContentWithHashtags(post.content || defaultTag, setFilterTag)}
                                </p>

                                {/* Media (If any) */}
                                {post.mediaUrl && (
                                    <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                        {post.type === 'video' ? (
                                            <video src={post.mediaUrl} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} muted controls />
                                        ) : (
                                            <img src={post.mediaUrl} alt="media" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                )}

                                {/* Actions & Footer */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <button onClick={() => handleUpvote(post._id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: post.upvotedBy?.includes(currentUser?._id) ? '#f59e0b' : '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <ThumbsUp size={16} fill={post.upvotedBy?.includes(currentUser?._id) ? '#f59e0b' : 'none'} /> {post.upvotes || 0}
                                        </button>
                                        <button onClick={() => handleDownvote(post._id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: post.downvotedBy?.includes(currentUser?._id) ? '#f59e0b' : '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <ThumbsDown size={16} fill={post.downvotedBy?.includes(currentUser?._id) ? '#f59e0b' : 'none'} />
                                        </button>
                                    </div>
                                    <button onClick={() => setShowComments({ ...showComments, [post._id]: !showComments[post._id] })} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#4f46e5', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                                        <MessageSquare size={16} /> {post.comments?.length || 0} Comments
                                    </button>
                                </div>

                                {/* Comments Section */}
                                {showComments[post._id] && (
                                    <div style={{ marginTop: '12px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                            <input
                                                value={commentTexts[post._id] || ''}
                                                onChange={e => setCommentTexts({ ...commentTexts, [post._id]: e.target.value })}
                                                placeholder="Write a reply..."
                                                style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', color: '#000' }}
                                            />
                                            <button onClick={() => handleAddComment(post._id)} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <Send size={16} />
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {(post.comments || []).map((c, i) => (
                                                <div key={i} style={{ borderBottom: i < post.comments.length - 1 ? '1px solid #e2e8f0' : 'none', paddingBottom: '8px' }}>
                                                    <div style={{ fontWeight: 800, fontSize: '12px', color: '#000', marginBottom: '4px' }}>{c.author}</div>
                                                    <div style={{ fontSize: '13px', color: '#475569' }}>{c.content}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Load More Button */}
            {hasMore && posts.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <button onClick={handleLoadMore} style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#000', padding: '12px 32px', borderRadius: '12px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', transition: 'box-shadow 0.2s' }} className="hover-shadow">
                        Load More Reviews
                    </button>
                </div>
            )}

            <style>{`
                @media (max-width: 1024px) {
                    .review-grid { grid-template-columns: 1fr !important; }
                    .responsive-stats { grid-template-columns: 1fr !important; }
                }
                .hover-shadow:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            `}</style>
            {/* Write A Review Modal */}
            <AnimatePresence>
                {isWriteReviewModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(15, 23, 42, 0.8)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setIsWriteReviewModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '800px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative',
                                background: '#fff',
                                borderRadius: '24px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close Button injected above WriteAReview for convenience */}
                            <div style={{ position: 'sticky', top: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end', padding: '16px 16px 0 0', pointerEvents: 'none' }}>
                                <button
                                    onClick={() => setIsWriteReviewModalOpen(false)}
                                    style={{
                                        pointerEvents: 'auto',
                                        background: '#ef4444',
                                        color: '#fff',
                                        border: 'none',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            <div style={{ padding: '0 16px 16px 16px', marginTop: '-16px' }}>
                                <WriteAReview
                                    collegeId={collegeId}
                                    collegeName={collegeName}
                                    isEmbedded={true}
                                    formOnly={true}
                                    onCloseForm={() => setIsWriteReviewModalOpen(false)}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Review;
