import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Video,
    Trash2, Edit3, Heart, MessageCircle, Paperclip, Mic, X, Play, Pause,
    Send, Hash, MoreVertical, Layout, TrendingUp, Users, ChevronRight, Loader2, User,
    Image as ImageIcon, AlertTriangle, CheckCircle
} from 'lucide-react';

const LoadingSpinner = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '20px' }}>
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
            <Loader2 size={48} color="#0096FF" />
        </motion.div>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 600, letterSpacing: '0.5px' }}
        >
            GATHERING LATEST REVIEWS...
        </motion.p>
    </div>
);

const MediaControls = ({ id, current, total, percentage, speed, onSeek, onSpeedChange, color, windowWidth }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '4px' }}>
        <div
            style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', cursor: 'pointer', overflow: 'visible' }}
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                onSeek(pos);
            }}
        >
            <motion.div
                style={{ height: '100%', background: color, borderRadius: '3px', width: `${percentage}%` }}
                layoutId={`progress-${id}`}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${percentage}%`,
                    width: '12px',
                    height: '12px',
                    background: '#fff',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    display: percentage > 0 ? 'block' : 'none'
                }}
            />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontVariantNumeric: 'tabular-nums' }}>
                {Math.floor(current / 60)}:{Math.floor(current % 60).toString().padStart(2, '0')} / {Math.floor(total / 60)}:{Math.floor(total % 60).toString().padStart(2, '0')}
            </span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0.5, 1, 1.5, 2, 4].filter(s => windowWidth < 500 ? [1, 1.5, 2].includes(s) : true).map(s => (
                    <button
                        key={s}
                        onClick={(e) => { e.stopPropagation(); onSpeedChange(s); }}
                        style={{
                            background: speed === s ? `${color}22` : 'transparent',
                            border: `1px solid ${speed === s ? color : 'transparent'}`,
                            color: speed === s ? color : '#64748b',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 4px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {s}x
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const CustomModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => (
    <AnimatePresence>
        {isOpen && (
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
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    style={{
                        background: '#0f172a',
                        border: `1px solid ${type === 'danger' ? '#ef4444' : '#0096FF'}33`,
                        borderRadius: '24px',
                        padding: '32px',
                        maxWidth: '400px',
                        width: '100%',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        position: 'relative',
                        textAlign: 'center'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        background: type === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 150, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        {type === 'danger' ? <AlertTriangle color="#ef4444" size={32} /> : <CheckCircle color="#0096FF" size={32} />}
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>{message}</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '14px',
                                background: 'transparent',
                                border: '1px solid #334155',
                                color: '#f8fafc',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            className="hover-bg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { onConfirm(); onClose(); }}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '14px',
                                background: type === 'danger' ? '#ef4444' : '#0096FF',
                                color: '#fff',
                                border: 'none',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: `0 4px 15px ${type === 'danger' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(0, 150, 255, 0.3)'}`
                            }}
                        >
                            {type === 'danger' ? 'Delete' : 'Confirm'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const ReviewPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPostContent, setNewPostContent] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [postType, setPostType] = useState('text'); // 'text', 'voice', 'video', 'gif'
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [commentTexts, setCommentTexts] = useState({});
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [playingAudioId, setPlayingAudioId] = useState(null);
    const [commentAudioBlobs, setCommentAudioBlobs] = useState({});
    const [isRecordingComment, setIsRecordingComment] = useState(null);
    const [sortType, setSortType] = useState('latest'); // 'latest' or 'top'
    const [filterTag, setFilterTag] = useState(null); // Selected hashtag or category
    const [mediaProgress, setMediaProgress] = useState({}); // {id: {current, total, percentage} }
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [followedTags, setFollowedTags] = useState(['IITs', 'NEET 2026']); // Default Interests
    const [filterAuthor, setFilterAuthor] = useState(null); // Selected author filter
    const [suggestedHashtags, setSuggestedHashtags] = useState([]); // [NEW] Suggested tags based on current input
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => { } });
    const [showVideoOptions, setShowVideoOptions] = useState(false);
    const [isVideoRecording, setIsVideoRecording] = useState(false);
    const [videoPreviewStream, setVideoPreviewStream] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [commentVideoBlobs, setCommentVideoBlobs] = useState({});
    const [isRecordingVideoComment, setIsRecordingVideoComment] = useState(null);
    const [commentVideoPreviewStream, setCommentVideoPreviewStream] = useState(null);

    // Editing Media States
    const [editAudioBlob, setEditAudioBlob] = useState(null);
    const [editVideoFile, setEditVideoFile] = useState(null);
    const [editSelectedGif, setEditSelectedGif] = useState(null);
    const [editPostType, setEditPostType] = useState(null); // 'text', 'voice', 'video', 'gif'
    const [showEditGifPicker, setShowEditGifPicker] = useState(false);
    const [showEditVideoOptions, setShowEditVideoOptions] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');
    const [showCommentVideoOptions, setShowCommentVideoOptions] = useState(null); // stores postId
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try { setUser(JSON.parse(storedUser)); } catch (e) { }
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mediaRecorderRef = useRef(null);
    const commentMediaRecorderRef = useRef(null);
    const videoRecorderRef = useRef(null);
    const videoPreviewRef = useRef(null);
    const videoInputRef = useRef(null);
    const editVideoInputRef = useRef(null);
    const commentVideoInputRef = useRef(null);
    const audioRef = useRef(new Audio());
    const recordingIntervalRef = useRef(null);
    const videoCommentRecorderRef = useRef(null);
    const commentVideoPreviewRef = useRef(null);

    const API_BASE = 'http://localhost:5000/api/reviews';

    const colors = {
        primary: '#0096FF',
        secondary: '#002D62',
        accent: '#5CE1FF',
        dark: '#0f172a',
        card: '#1e293b',
        border: 'rgba(255,255,255,0.1)'
    };

    const trendingGifs = [
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRAq0vXG01p5O1y/giphy.gif', // Study
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSj0Y7Sa88VSA8/giphy.gif', // Party
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlVJmU8E5v6uVva/giphy.gif', // Stress
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0IxYD16E6p8fN584/giphy.gif', // Graduation
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMGpxxPfGZW7Di/giphy.gif', // Brainstorm
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKVUn7iM8FMEU24/giphy.gif', // Coffee
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlHFRbmaZtBRhXG/giphy.gif', // Success
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKW5I35AayIpGCQ/giphy.gif', // Tired
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lOdmCbeW7j10qI/giphy.gif', // Library
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26uf7rfUAnHMMfS0w/giphy.gif', // Focus
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKDkDbIDJieKbVm/giphy.gif', // Exam
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlUxcRIYZSUsyre/giphy.gif', // Campus life
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Zt62IDXVqJJisyk/giphy.gif', // Excited
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vRhaxSFlfS9uU7e/giphy.gif', // Late night study
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHYyeTM0eWxhZzN6ZHF4ZHF4ZHF4ZHF4ZHF4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26vUxJ9ZmBYcmM1H2/giphy.gif'  // Victory
    ];

    const categories = ['Engineering', 'Medical', 'Management', 'Law', 'Design'];

    const getTrendingTags = (posts) => {
        const tagCounts = {};
        posts.forEach(post => {
            // Match #hashtags and @mentions
            const tags = post.content?.match(/#\w+|@\w+/g) || [];
            tags.forEach(tag => {
                const cleanTag = tag.trim();
                tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8) // Show more tags for accumulation
            .map(([tag, count]) => ({
                tag: tag.startsWith('#') ? tag.slice(1) : tag,
                count: `${count} ${count === 1 ? 'post' : 'posts'}`,
                postCount: count,
                trending: count > 2,
                isMention: tag.startsWith('@')
            }));
    };

    const getTopReviewers = (posts) => {
        const userStats = {};
        posts.forEach(post => {
            const author = post.author || "Anonymous student";
            if (!userStats[author]) {
                userStats[author] = { posts: 0, score: 0, avatar: author[0].toUpperCase() };
            }
            userStats[author].posts += 1;
            userStats[author].score += 100; // 100 points per post
            userStats[author].score += (post.upvotes || 0) * 10;
            userStats[author].score -= (post.downvotes || 0) * 5;
            userStats[author].score += (post.comments?.length || 0) * 20;
        });

        return Object.entries(userStats)
            .sort((a, b) => b[1].score - a[1].score)
            .slice(0, 3)
            .map(([name, stats]) => ({
                name,
                posts: stats.posts,
                avatar: stats.avatar
            }));
    };

    const getSuggestions = (text) => {
        if (!text || text.length < 3) return [];

        const contextMap = [
            {
                category: 'Startup & Business',
                keywords: ['startup', 'entrepreneur', 'business', 'founder', 'venture', 'funding', 'idea', 'pitch', 'company', 'unicorn'],
                tags: ['#startupIndia', '#entrepreneurship', '#ventureCapital', '#founderLife', '#businessGrowth', '#startup']
            },
            {
                category: 'IT & Tech',
                keywords: ['software', 'coding', 'programming', 'developer', 'web', 'app', 'code', 'javascript', 'python', 'java', 'tech', 'technology'],
                tags: ['#InformationTechnology', '#ITJobs', '#Coding', '#TechLife', '#SoftwareEngineer', '#Programming']
            },
            {
                category: 'Medical & Healthcare',
                keywords: ['aiims', 'radiology', 'mbbs', 'doctor', 'medical', 'neet', 'medicine', 'hospital', 'surgery', 'biology', 'patient', 'clinic'],
                tags: ['#MedicalStudent', '#MBBSLife', '#Doctor', '#Radiology', '#NEET2026', '#AIIMSDelhi', '#Healthcare']
            },
            {
                category: 'Engineering & Exams',
                keywords: ['iit', 'nit', 'jee', 'engineering', 'btech', 'physics', 'maths', 'gate', 'exam', 'admission', 'results'],
                tags: ['#Engineering', '#IITJEE', '#BTech', '#IITian', '#GATE2025', '#AdmissionSeason']
            },
            {
                category: 'Campus Life',
                keywords: ['college', 'university', 'campus', 'hostel', 'fests', 'friends', 'canteen', 'student', 'study', 'education', 'graduation'],
                tags: ['#CampusLife', '#StudentLife', '#CollegeReview', '#HostelVibes', '#UniversityLife']
            },
            {
                category: 'AI & Data',
                keywords: ['ai', 'ml', 'machine', 'learning', 'data', 'analytics', 'automation', 'intelligence', 'robotics'],
                tags: ['#ArtificialIntelligence', '#MachineLearning', '#DataScience', '#FutureTech', '#AIRevolution']
            }
        ];

        const lowercaseText = text.toLowerCase();
        // Extract words with at least 3 characters to avoid noisy matches like 'i' or 'am'
        const inputWords = lowercaseText.match(/[a-z]{3,}/g) || [];

        let scoreMap = {};

        contextMap.forEach(context => {
            let contextScore = 0;
            context.keywords.forEach(keyword => {
                // Primary check: Whole word match (highest relevance)
                if (inputWords.includes(keyword)) {
                    contextScore += 10;
                }
                // Secondary check: Prefix match (e.g., "radiolog" matching "radiology")
                else if (inputWords.some(w => w.startsWith(keyword) || keyword.startsWith(w))) {
                    contextScore += 5;
                }
            });

            if (contextScore > 0) {
                context.tags.forEach(tag => {
                    scoreMap[tag] = (scoreMap[tag] || 0) + contextScore;
                });
            }
        });

        // Sort by score and then alphabetically
        return Object.entries(scoreMap)
            .filter(([tag]) => !lowercaseText.includes(tag.toLowerCase().replace('#', '')))
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .slice(0, 6)
            .map(([tag]) => tag);
    };

    useEffect(() => {
        // Debounce slightly to avoid flickering as the user types
        const timer = setTimeout(() => {
            const suggestions = getSuggestions(newPostContent);
            setSuggestedHashtags(suggestions);
        }, 300);
        return () => clearTimeout(timer);
    }, [newPostContent]);

    const renderContentWithTags = (content) => {
        if (!content) return null;
        return content.split(/(\s+)/).map((part, i) => {
            if (part.startsWith('#') || part.startsWith('@')) {
                const isMention = part.startsWith('@');
                return (
                    <span
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation();
                            setFilterTag(part.slice(1));
                        }}
                        style={{
                            color: isMention ? colors.accent : colors.primary,
                            fontWeight: 700,
                            cursor: 'pointer',
                            textDecoration: 'none'
                        }}
                        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    const handleToggleCategory = (category, isEdit = false) => {
        const currentContent = isEdit ? editContent : newPostContent;
        const tag = `#${category}`;
        const hasTag = currentContent.toLowerCase().includes(tag.toLowerCase());

        if (hasTag) {
            const updated = currentContent.replace(new RegExp(`${tag}\\s?`, 'gi'), '').trim();
            isEdit ? setEditContent(updated) : setNewPostContent(updated);
        } else {
            const updated = `${currentContent} ${tag}`.trim();
            isEdit ? setEditContent(updated) : setNewPostContent(updated);
        }
    };

    useEffect(() => {
        fetchReviews();
        audioRef.current.onended = () => setPlayingAudioId(null);
    }, []);

    // Fix for video preview blackout
    useEffect(() => {
        if (videoPreviewStream && videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = videoPreviewStream;
            videoPreviewRef.current.play().catch(err => console.error("Preview play error:", err));
        }
    }, [videoPreviewStream]);

    useEffect(() => {
        if (commentVideoPreviewStream && commentVideoPreviewRef.current) {
            commentVideoPreviewRef.current.srcObject = commentVideoPreviewStream;
            commentVideoPreviewRef.current.play().catch(err => console.error("Comment preview play error:", err));
        }
    }, [commentVideoPreviewStream]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(API_BASE);
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setLoading(false);
        }
    };

    const handlePlayAudio = (id, url) => {
        if (!url) {
            alert("No audio source found for this review.");
            return;
        }

        if (playingAudioId === id) {
            audioRef.current.pause();
            setPlayingAudioId(null);
        } else {
            if (playingAudioId) audioRef.current.pause(); // Pause previous audio if any
            audioRef.current.src = url;
            audioRef.current.playbackRate = playbackSpeed; // Set speed
            audioRef.current.play().catch(err => {
                console.error("Playback error:", err);
                alert("Playback failed. The recorded format might be unsupported.");
            });
            setPlayingAudioId(id);

            audioRef.current.ontimeupdate = () => { // Add ontimeupdate
                setMediaProgress(prev => ({
                    ...prev,
                    [id]: {
                        current: audioRef.current.currentTime,
                        total: audioRef.current.duration || 0,
                        percentage: (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0
                    }
                }));
            };

            audioRef.current.onended = () => { // Add onended
                setPlayingAudioId(null);
                setMediaProgress(prev => ({ ...prev, [id]: { ...prev[id], percentage: 0, current: 0 } }));
            };
        }
    };

    const handleSeek = (id, pos, isVideo = false, element = null) => {
        if (isVideo && element) {
            element.currentTime = pos * element.duration;
        } else if (playingAudioId === id) {
            audioRef.current.currentTime = pos * audioRef.current.duration;
        }
    };

    const handleSpeedChange = (id, newSpeed, isVideo = false, element = null) => {
        setPlaybackSpeed(newSpeed);
        if (isVideo && element) {
            element.playbackRate = newSpeed;
        } else if (playingAudioId === id) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    const startRecording = async (isEdit = false) => {
        if (isRecording) return; // Prevent multiple simultaneous recordings
        // Fix: Ensure isEdit is explicitly a boolean (prevents React event objects from being truthy)
        const finalIsEdit = isEdit === true;
        if (finalIsEdit) setEditPostType('voice');
        else setPostType('voice');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Check for supported MIME types for better compatibility
            const mimeTypes = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
            const supportedType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';

            console.log("Using MIME type:", supportedType);
            mediaRecorderRef.current = new MediaRecorder(stream, supportedType ? { mimeType: supportedType } : {});

            const chunks = [];
            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: mediaRecorderRef.current.mimeType });
                if (finalIsEdit) setEditAudioBlob(blob);
                else setAudioBlob(blob);
                setIsRecording(false); // Moved here to prevent race condition

                // Stop all tracks in the stream to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start(100); // Collect data in 100ms chunks for better reliability
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Microphone access denied or not available. Please check your browser permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
    };

    const startVideoRecording = async (isEdit = false) => {
        if (isVideoRecording) return;
        // Fix: Ensure isEdit is explicitly a boolean
        const finalIsEdit = isEdit === true;
        if (finalIsEdit) setEditPostType('video');
        else setPostType('video');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setVideoPreviewStream(stream);
            // Replaced direct ref assignment with useEffect for reliability

            const mimeTypes = ['video/webm', 'video/mp4'];
            const supportedType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';

            videoRecorderRef.current = new MediaRecorder(stream, supportedType ? { mimeType: supportedType } : {});
            const chunks = [];

            videoRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            videoRecorderRef.current.onstop = () => {
                // Use the base MIME type without complex codecs for better compatibility
                const rawType = videoRecorderRef.current.mimeType.split(';')[0];
                const blob = new Blob(chunks, { type: rawType });
                if (finalIsEdit) setEditVideoFile(blob);
                else setVideoFile(blob);
                setIsVideoRecording(false); // Moved here to prevent race condition
                stream.getTracks().forEach(track => track.stop());
                setVideoPreviewStream(null);
            };

            videoRecorderRef.current.start(100);
            setIsVideoRecording(true);
            setRecordingTime(0);
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Error accessing camera/microphone for video recording:", err);
            alert("Camera/microphone access denied or not available. Please check your browser permissions.");
            setIsVideoRecording(false);
            setVideoPreviewStream(null);
        }
    };

    const stopVideoRecording = () => {
        if (videoRecorderRef.current && isVideoRecording) {
            videoRecorderRef.current.stop();
            clearInterval(recordingIntervalRef.current);
            recordingIntervalRef.current = null;
            if (videoPreviewStream) {
                videoPreviewStream.getTracks().forEach(track => track.stop());
                setVideoPreviewStream(null);
            }
        }
    };

    const startCommentVideoRecording = async (postId) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setCommentVideoPreviewStream(stream);
            setIsRecordingVideoComment(postId);

            const mimeTypes = ['video/webm', 'video/mp4'];
            const supportedType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';
            console.log("Comment video MIME type:", supportedType);

            const recorder = new MediaRecorder(stream, supportedType ? { mimeType: supportedType } : {});
            videoCommentRecorderRef.current = recorder;
            let chunks = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            recorder.onstop = () => {
                const rawType = recorder.mimeType.split(';')[0];
                const blob = new Blob(chunks, { type: rawType });
                setCommentVideoBlobs(prev => ({ ...prev, [postId]: blob }));
                setIsRecordingVideoComment(null);
                setCommentVideoPreviewStream(null);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start(100);
        } catch (err) {
            console.error("Error starting video comment recording:", err);
            alert("Could not access camera for video comment.");
        }
    };

    const stopCommentVideoRecording = () => {
        if (videoCommentRecorderRef.current && videoCommentRecorderRef.current.state === 'recording') {
            videoCommentRecorderRef.current.stop();
        }
    };

    const handleCommentVideoUpload = (postId, e) => {
        const file = e.target.files[0];
        if (file) {
            setCommentVideoBlobs(prev => ({ ...prev, [postId]: file }));
            setShowCommentVideoOptions(null);
        }
    };

    const handleStartCommentRecording = async (postId) => {
        setIsRecordingComment(postId);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeType = 'audio/webm';
            commentMediaRecorderRef.current = new MediaRecorder(stream, { mimeType });

            const chunks = [];
            commentMediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            commentMediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                setCommentAudioBlobs({ ...commentAudioBlobs, [postId]: blob });
                stream.getTracks().forEach(track => track.stop());
            };

            commentMediaRecorderRef.current.start();
        } catch (err) {
            console.error("Error recording comment:", err);
            alert("Microphone access denied for comment.");
            setIsRecordingComment(null);
        }
    };

    const handleStopCommentRecording = (postId) => {
        if (commentMediaRecorderRef.current && isRecordingComment === postId) {
            commentMediaRecorderRef.current.stop();
            setIsRecordingComment(null);
        }
    };

    const handleVideoUpload = (e, isEdit = false) => {
        const file = e.target.files[0];
        const finalIsEdit = isEdit === true;
        if (file) {
            if (finalIsEdit) {
                setEditVideoFile(file);
                setEditPostType('video');
            } else {
                setVideoFile(file);
                setPostType('video');
            }
        }
    };

    const handlePost = async () => {
        if (!newPostContent && !audioBlob && !selectedGif && !videoFile) return;

        let mediaUrl = selectedGif;
        if (audioBlob) {
            // In a real app we'd upload to S3. For now, we'll store as base64 or a blob-ready URL
            // Since we're using a real (but local) server, object URLs won't persist after refresh.
            // For demo, we'll use a data URL.
            mediaUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => resolve(reader.result);
            });
        }
        if (videoFile) {
            mediaUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                if (videoFile instanceof Blob) {
                    reader.readAsDataURL(videoFile);
                } else {
                    // It's already a base64 string or something else
                    resolve(videoFile);
                }
            });
        }

        // Detect hashtags in content automatically
        const hashtagList = newPostContent.match(/#[\w-]+/g)?.map(tag => tag.slice(1)) || [];

        // Ensure we send the correct type based on what is actually attached
        let finalType = postType;
        if (videoFile) finalType = 'video';
        else if (audioBlob) finalType = 'voice';
        else if (selectedGif) finalType = 'gif';

        const reviewData = {
            author: user?.fullName || "Anonymous Student",
            role: "Student",
            content: newPostContent,
            type: finalType,
            mediaUrl: mediaUrl,
            hashtags: hashtagList,
            userId: user?._id || null
        };

        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            if (response.ok) {
                const savedReview = await response.json();
                setPosts([savedReview, ...posts]);
                setNewPostContent('');
                setAudioBlob(null);
                setSelectedGif(null);
                setVideoFile(null);
                setPostType('text');
                setShowGifPicker(false);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Post failed with status:", response.status, errorData);
                if (response.status === 413) {
                    alert("The file you are trying to post is too large for the server. Try a shorter clip.");
                } else {
                    alert(`Failed to post review: ${errorData.message || 'Unknown error'}`);
                }
            }
        } catch (err) {
            console.error("Error posting review:", err);
            alert("Could not connect to the server. Please ensure the backend is running.");
        }
    };

    const handleDelete = (id) => {
        setModalConfig({
            isOpen: true,
            title: "Delete Review?",
            message: "This action cannot be undone. Are you sure you want to remove this review from the community?",
            type: 'danger',
            onConfirm: async () => {
                try {
                    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
                    if (response.ok) {
                        setPosts(posts.filter(p => p._id !== id));
                    }
                } catch (err) {
                    console.error("Error deleting post:", err);
                }
            }
        });
    };

    const handleUpdate = (id) => {
        setModalConfig({
            isOpen: true,
            title: "Save Changes?",
            message: "Your review will be updated with the new content. Would you like to proceed?",
            type: 'primary',
            onConfirm: async () => {
                try {
                    let mediaUrl = editSelectedGif;
                    if (editAudioBlob) {
                        mediaUrl = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(editAudioBlob);
                            reader.onloadend = () => resolve(reader.result);
                        });
                    }
                    if (editVideoFile) {
                        mediaUrl = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            if (editVideoFile instanceof Blob) {
                                reader.readAsDataURL(editVideoFile);
                            } else {
                                resolve(editVideoFile);
                            }
                        });
                    }

                    let finalType = editPostType;
                    if (editVideoFile) finalType = 'video';
                    else if (editAudioBlob) finalType = 'voice';
                    else if (editSelectedGif) finalType = 'gif';

                    const updateData = { content: editContent, type: finalType };
                    if (mediaUrl) {
                        updateData.mediaUrl = mediaUrl;
                    }

                    const response = await fetch(`${API_BASE}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateData)
                    });
                    if (response.ok) {
                        const updated = await response.json();
                        setPosts(posts.map(p => p._id === id ? updated : p));
                        setEditingPostId(null);
                        // Reset edit states
                        setEditAudioBlob(null);
                        setEditVideoFile(null);
                        setEditSelectedGif(null);
                        setEditPostType(null);
                    }
                } catch (err) {
                    console.error("Error updating post:", err);
                }
            }
        });
    };

    const handleUpvote = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/${id}/upvote`, { method: 'PATCH' });
            if (response.ok) {
                const updatedReview = await response.json();
                setPosts(posts.map(p => p._id === id ? updatedReview : p));
            }
        } catch (err) {
            console.error("Error upvoting:", err);
        }
    };

    const handleDownvote = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/${id}/downvote`, { method: 'PATCH' });
            if (response.ok) {
                const updatedReview = await response.json();
                setPosts(posts.map(p => p._id === id ? updatedReview : p));
            }
        } catch (err) {
            console.error("Error downvoting:", err);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        setModalConfig({
            isOpen: true,
            title: 'Delete Comment',
            message: 'Are you sure you want to remove this comment? This action cannot be undone.',
            type: 'danger',
            onConfirm: async () => {
                try {
                    const response = await fetch(`${API_BASE}/${postId}/comment/${commentId}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        const updatedReview = await response.json();
                        setPosts(posts.map(p => p._id === postId ? updatedReview : p));
                    }
                } catch (err) {
                    console.error("Error deleting comment:", err);
                }
                setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleUpdateComment = async (postId, commentId) => {
        try {
            const response = await fetch(`${API_BASE}/${postId}/comment/${commentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editCommentContent })
            });
            if (response.ok) {
                const updatedReview = await response.json();
                setPosts(posts.map(p => p._id === postId ? updatedReview : p));
                setEditingCommentId(null);
                setEditCommentContent('');
            }
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    };

    const handleAddComment = async (postId) => {
        const content = commentTexts[postId];
        const audioBlob = commentAudioBlobs[postId];
        const videoBlob = commentVideoBlobs[postId];
        if (!content && !audioBlob && !videoBlob) return;

        let mediaUrl = null;
        let type = 'text';

        if (audioBlob) {
            type = 'voice';
            mediaUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => resolve(reader.result);
            });
        } else if (videoBlob) {
            type = 'video';
            mediaUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(videoBlob);
                reader.onloadend = () => resolve(reader.result);
            });
        }

        // Detect final type robustly
        let finalType = type;
        if (videoBlob) finalType = 'video';
        else if (audioBlob) finalType = 'voice';

        try {
            const response = await fetch(`${API_BASE}/${postId}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: user?.fullName || "Anonymous Student",
                    content,
                    type: finalType,
                    mediaUrl
                })
            });
            if (response.ok) {
                const updatedReview = await response.json();
                setPosts(posts.map(p => p._id === postId ? updatedReview : p));
                setCommentTexts({ ...commentTexts, [postId]: '' });
                setCommentAudioBlobs({ ...commentAudioBlobs, [postId]: null });
                setCommentVideoBlobs({ ...commentVideoBlobs, [postId]: null });
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const getSortedPosts = () => {
        let sorted = [...posts];

        // Filter logic
        if (filterAuthor) {
            sorted = sorted.filter(post => post.author?.toLowerCase() === filterAuthor.toLowerCase());
        } else if (filterTag) {
            sorted = sorted.filter(post =>
                post.hashtags?.some(tag => tag.toLowerCase() === filterTag.toLowerCase()) ||
                post.content?.toLowerCase().includes(`#${filterTag.toLowerCase()}`) ||
                post.content?.toLowerCase().includes(`@${filterTag.toLowerCase()}`)
            );
        } else if (followedTags.length > 0) {
            // Prioritize followed tags/interests
            sorted = sorted.filter(post =>
                followedTags.some(tag => post.content?.toLowerCase().includes(`#${tag.toLowerCase()}`))
            );
            // If no posts match followed tags, show all
            if (sorted.length === 0) sorted = [...posts];
        }

        if (sortType === 'top') {
            return sorted.sort((a, b) => {
                const scoreA = (a.upvotes || 0) - (a.downvotes || 0) + (a.comments?.length || 0) * 2;
                const scoreB = (b.upvotes || 0) - (b.downvotes || 0) + (b.comments?.length || 0) * 2;
                return scoreB - scoreA;
            });
        }
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    const sortedPosts = getSortedPosts();

    return (
        <div style={{
            background: colors.dark,
            minHeight: '100vh',
            paddingTop: '160px',
            color: '#fff',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: windowWidth < 950 ? '1fr' : windowWidth < 1150 ? '240px 1fr' : '240px 1fr 300px',
                gap: '24px',
                padding: windowWidth < 600 ? '0 12px' : '0 20px'
            }} className="responsive-grid">

                {/* Left Sidebar */}
                {windowWidth >= 950 && (
                    <aside style={{ position: 'sticky', top: '160px', height: 'fit-content' }} className="hidden-mobile">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { name: 'Home Feed', icon: '🏠' },
                                { name: 'Engineering', icon: '⚙️' },
                                { name: 'Medical', icon: '🩺' },
                                { name: 'Management', icon: '📈' },
                                { name: 'Law', icon: '⚖️' },
                                { name: 'Design', icon: '🎨' }
                            ].map((item, i) => (
                                <div
                                    key={item.name}
                                    onClick={() => item.name === 'Home Feed' ? setFilterTag(null) : setFilterTag(item.name)}
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        backgroundColor: (item.name === 'Home Feed' && !filterTag) || filterTag === item.name ? 'rgba(0, 150, 255, 0.1)' : 'transparent',
                                        color: (item.name === 'Home Feed' && !filterTag) || filterTag === item.name ? colors.primary : '#94a3b8',
                                        fontWeight: 700,
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}
                                    className="hover-bg"
                                >
                                    <span style={{ fontSize: '18px' }}>{item.icon}</span>
                                    {item.name}
                                </div>
                            ))}
                        </div>

                        <div style={{ background: colors.card, borderRadius: '16px', padding: '20px', border: `1px solid ${colors.border}`, marginTop: '24px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: colors.accent }}>Improve Your Feed</h4>
                            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '16px' }}>Follow more colleges and topics to get personalized reviews.</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['IITs', 'NEET 2026', 'MBA', 'CUET', 'Coding', 'Scholarships'].map(tag => {
                                    const isFollowed = followedTags.includes(tag);
                                    return (
                                        <span
                                            key={tag}
                                            onClick={() => {
                                                if (isFollowed) setFollowedTags(followedTags.filter(t => t !== tag));
                                                else setFollowedTags([...followedTags, tag]);
                                            }}
                                            style={{
                                                padding: '6px 12px',
                                                background: isFollowed ? colors.primary : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${isFollowed ? colors.primary : colors.border}`,
                                                color: isFollowed ? '#fff' : '#94a3b8',
                                                borderRadius: '20px',
                                                fontSize: '11px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            className="hover-primary"
                                        >
                                            {isFollowed ? '✓' : '+'} {tag}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Feed */}
                <main>
                    {/* Feed Tabs */}
                    <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '12px' }}>
                        <button
                            onClick={() => setSortType('latest')}
                            style={{ background: 'none', border: 'none', color: sortType === 'latest' ? colors.primary : '#94a3b8', fontWeight: 700, fontSize: '15px', cursor: 'pointer', position: 'relative', padding: '0 4px' }}
                        >
                            Latest
                            {sortType === 'latest' && <motion.div layoutId="sortTab" style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: colors.primary }} />}
                        </button>
                        <button
                            onClick={() => setSortType('top')}
                            style={{ background: 'none', border: 'none', color: sortType === 'top' ? colors.primary : '#94a3b8', fontWeight: 700, fontSize: '15px', cursor: 'pointer', position: 'relative', padding: '0 4px' }}
                        >
                            Top Engaged
                            {sortType === 'top' && <motion.div layoutId="sortTab" style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: colors.primary }} />}
                        </button>
                    </div>

                    {(filterTag || filterAuthor) && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '20px',
                                background: 'rgba(0, 150, 255, 0.1)',
                                padding: '8px 16px',
                                borderRadius: '12px',
                                border: `1px solid ${colors.primary}44`
                            }}
                        >
                            <span style={{ fontSize: '14px', color: '#94a3b8' }}>Showing results for</span>
                            <span style={{ fontWeight: 800, color: colors.primary, fontSize: '15px' }}>
                                {filterAuthor ? `User: ${filterAuthor}` : `#${filterTag}`}
                            </span>
                            <button
                                onClick={() => { setFilterTag(null); setFilterAuthor(null); }}
                                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}
                                className="hover-primary"
                            >
                                <X size={14} /> Clear
                            </button>
                        </motion.div>
                    )}
                    {/* Post Creation */}
                    <div style={{
                        background: colors.card,
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px',
                        border: `1px solid ${colors.border}`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={24} color={colors.accent} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <textarea
                                    placeholder="Ask a question or write a review... (use #tags to categorize)"
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#fff',
                                        fontSize: '16px',
                                        outline: 'none',
                                        resize: 'none',
                                        minHeight: '60px'
                                    }}
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                />
                            </div>
                        </div>

                        {suggestedHashtags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    marginBottom: '16px',
                                    paddingLeft: '52px'
                                }}
                            >
                                <span style={{ fontSize: '11px', color: colors.accent, fontWeight: 800, alignSelf: 'center', marginRight: '4px' }}>SUGGESTED:</span>
                                {suggestedHashtags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setNewPostContent(prev => `${prev.trim()} ${tag} `)}
                                        style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            background: 'rgba(92, 225, 255, 0.1)',
                                            border: `1px solid ${colors.accent}33`,
                                            color: colors.accent,
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        className="hover-bg"
                                    >
                                        + {tag}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        <AnimatePresence>
                            {isRecording && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }}
                                    />
                                    <div style={{ flex: 1, display: 'flex', gap: '3px', alignItems: 'center', height: '24px' }}>
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [4, Math.random() * 20 + 4, 4] }}
                                                transition={{ repeat: Infinity, duration: 0.5 + Math.random() }}
                                                style={{ width: '3px', background: '#ef4444', borderRadius: '10px' }}
                                            />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: 600 }}>Recording...</span>
                                    <button onClick={stopRecording} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Stop</button>
                                </motion.div>
                            )}
                            {isVideoRecording && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }}
                                        />
                                        <span style={{ fontSize: '14px', color: '#ef4444', fontWeight: 600 }}>Recording Video...</span>
                                        <span style={{ fontSize: '14px', color: '#ef4444', marginLeft: 'auto' }}>
                                            {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                                        </span>
                                        <button onClick={stopVideoRecording} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>Stop</button>
                                    </div>
                                    {videoPreviewStream && (
                                        <video
                                            ref={videoPreviewRef}
                                            style={{ width: '100%', borderRadius: '8px', background: '#000' }}
                                            muted
                                            autoPlay
                                            playsInline
                                        />
                                    )}
                                </motion.div>
                            )}
                            {(audioBlob || selectedGif || videoFile) && !isRecording && !isVideoRecording && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{ background: 'rgba(0, 150, 255, 0.1)', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {audioBlob && <Mic size={18} color={colors.primary} />}
                                            {selectedGif && <ImageIcon size={18} color={colors.primary} />}
                                            {videoFile && <Video size={18} color={colors.primary} />}
                                            <span style={{ fontSize: '14px' }}>
                                                {audioBlob ? 'Voice Review Ready' : selectedGif ? 'GIF Selected' : 'Video Selected'}
                                            </span>
                                            <button
                                                onClick={() => { setAudioBlob(null); setSelectedGif(null); setVideoFile(null); setPostType('text'); }}
                                                style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        {audioBlob && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
                                                <button
                                                    onClick={() => handlePlayAudio('preview-new', URL.createObjectURL(audioBlob))}
                                                    style={{ background: colors.primary, border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                                                >
                                                    {playingAudioId === 'preview-new' ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                                </button>
                                                <div style={{ flex: 1 }}>
                                                    <MediaControls
                                                        id="preview-new"
                                                        current={mediaProgress['preview-new']?.current || 0}
                                                        total={mediaProgress['preview-new']?.total || 0}
                                                        percentage={mediaProgress['preview-new']?.percentage || 0}
                                                        speed={playbackSpeed}
                                                        onSeek={(pos) => handleSeek('preview-new', pos)}
                                                        onSpeedChange={(s) => handleSpeedChange('preview-new', s)}
                                                        color={colors.primary}
                                                        windowWidth={windowWidth}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {selectedGif && <img src={selectedGif} alt="selected" style={{ width: '100px', borderRadius: '8px', marginTop: '10px' }} />}
                                    {videoFile && (
                                        <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                                            <video
                                                src={videoFile instanceof Blob ? URL.createObjectURL(videoFile) : videoFile}
                                                style={{ width: '100%', maxHeight: '150px' }}
                                                controls
                                            />
                                        </div>
                                    )}

                                    {/* Smart Categorization Pills */}
                                    <div style={{ marginTop: '16px', borderTop: `1px solid ${colors.border}`, paddingTop: '12px' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: colors.accent, display: 'block', marginBottom: '8px' }}>CATEGORIZE YOUR NOTE</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => handleToggleCategory(cat)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '11px',
                                                        background: newPostContent.includes(`#${cat}`) ? colors.primary : 'rgba(255,255,255,0.05)',
                                                        color: newPostContent.includes(`#${cat}`) ? '#fff' : '#94a3b8',
                                                        border: `1px solid ${newPostContent.includes(`#${cat}`) ? colors.primary : colors.border}`,
                                                        cursor: 'pointer',
                                                        fontWeight: 700,
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {showGifPicker && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ background: '#0f172a', padding: '16px', borderRadius: '12px', marginBottom: '16px', border: `1px solid ${colors.border}` }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <h5 style={{ margin: 0, color: colors.accent }}>Select a GIF</h5>
                                        <button onClick={() => setShowGifPicker(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={16} /></button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxHeight: '200px', overflowY: 'auto', paddingRight: '5px' }}>
                                        {trendingGifs.map((url, i) => (
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                key={i}
                                                src={url}
                                                style={{ width: '100%', borderRadius: '8px', cursor: 'pointer', border: selectedGif === url ? `2px solid ${colors.primary}` : 'none' }}
                                                onClick={() => { setSelectedGif(url); setPostType('gif'); setShowGifPicker(false); }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button
                                    onClick={() => setPostType('text')}
                                    style={{ background: 'none', border: 'none', color: postType === 'text' ? colors.primary : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'color 0.2s' }}
                                    className="hover-primary"
                                >
                                    <MessageSquare size={18} /> <span className="hidden-mobile">Text</span>
                                </button>
                                <button
                                    onClick={startRecording}
                                    style={{ background: 'none', border: 'none', color: postType === 'voice' ? colors.primary : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'color 0.2s' }}
                                    className="hover-primary"
                                >
                                    <Mic size={18} /> <span className="hidden-mobile">Voice</span>
                                </button>
                                <button
                                    onClick={() => setShowVideoOptions(!showVideoOptions)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: postType === 'video' ? colors.primary : '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, padding: '8px 12px', borderRadius: '10px', transition: 'all 0.2s', position: 'relative' }}
                                    className="hover-bg"
                                >
                                    <Video size={18} /> Video
                                    <AnimatePresence>
                                        {showVideoOptions && (
                                            <>
                                                {/* Backdrop for click-outside dismissal */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    onClick={(e) => { e.stopPropagation(); setShowVideoOptions(false); }}
                                                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 90, background: 'transparent' }}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15, scale: 0.9, x: '-50%' }}
                                                    animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: 'calc(100% + 15px)',
                                                        left: '50%',
                                                        background: 'rgba(15, 23, 42, 0.9)',
                                                        backdropFilter: 'blur(20px)',
                                                        border: `1px solid rgba(255,255,255,0.1)`,
                                                        borderRadius: '18px',
                                                        padding: '12px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '4px',
                                                        zIndex: 100,
                                                        boxShadow: `0 15px 40px rgba(0,0,0,0.7), 0 0 20px ${colors.primary}11`,
                                                        minWidth: '200px'
                                                    }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    {/* Pointer / Triangle */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '-8px',
                                                        left: '50%',
                                                        transform: 'translateX(-50%)',
                                                        width: 0,
                                                        height: 0,
                                                        borderLeft: '8px solid transparent',
                                                        borderRight: '8px solid transparent',
                                                        borderTop: `8px solid rgba(15, 23, 42, 0.9)`,
                                                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'
                                                    }} />

                                                    <div style={{ fontSize: '10px', color: colors.accent, fontWeight: 900, letterSpacing: '1.5px', padding: '6px 12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)', opacity: 0.8 }}>
                                                        CHOOSE SOURCE
                                                    </div>
                                                    <motion.div
                                                        whileHover={{ x: 6, background: 'rgba(255,255,255,0.06)' }}
                                                        onClick={(e) => { e.stopPropagation(); videoInputRef.current?.click(); setShowVideoOptions(false); }}
                                                        style={{ padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                    >
                                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <Paperclip size={18} color="#94a3b8" />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Browse Files</span>
                                                            <span style={{ fontSize: '11px', color: '#64748b' }}>Pick from device</span>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div
                                                        whileHover={{ x: 6, background: `${colors.primary}15` }}
                                                        onClick={(e) => { e.stopPropagation(); startVideoRecording(); setShowVideoOptions(false); }}
                                                        style={{ padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                                    >
                                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${colors.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.primary}33` }}>
                                                            <Video size={18} color={colors.primary} />
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '14px', fontWeight: 700, color: colors.primary }}>Record Now</span>
                                                            <span style={{ fontSize: '11px', color: `${colors.primary}88` }}>Use your camera</span>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </button>
                                <input type="file" ref={videoInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleVideoUpload} />
                                <button
                                    onClick={() => setShowGifPicker(!showGifPicker)}
                                    style={{ background: 'none', border: 'none', color: postType === 'gif' ? colors.primary : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'color 0.2s' }}
                                    className="hover-primary"
                                >
                                    <ImageIcon size={18} /> <span className="hidden-mobile">GIF</span>
                                </button>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handlePost}
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: '50px',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: `0 4px 15px rgba(0, 150, 255, 0.3)`
                                }}
                            >
                                Post <Send size={16} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {loading ? (
                            <LoadingSpinner />
                        ) : sortedPosts.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: `1px dashed ${colors.border}` }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>No matches found</div>
                                <div style={{ fontSize: '14px' }}>Try exploring other categories or keywords.</div>
                                {filterTag && (
                                    <button
                                        onClick={() => setFilterTag(null)}
                                        style={{ marginTop: '20px', background: colors.primary, color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>
                        ) : sortedPosts.map(post => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                layout
                                key={post._id}
                                style={{
                                    background: colors.card,
                                    borderRadius: '16px',
                                    padding: '24px',
                                    border: `1px solid ${colors.border}`,
                                    position: 'relative',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: colors.accent }}>
                                            {post.author[0]}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{post.author}</h4>
                                            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => {
                                                setEditingPostId(post._id);
                                                setEditContent(post.content);
                                                setEditAudioBlob(null);
                                                setEditVideoFile(null);
                                                setEditSelectedGif(null);
                                                setEditPostType(null);
                                            }}
                                            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                                            className="hover-primary"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                            className="hover-downvote"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    {editingPostId === post._id ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.primary}44`, borderRadius: '10px', padding: '12px', color: '#fff', outline: 'none', resize: 'none', minHeight: '80px', fontSize: '15px' }}
                                            />

                                            {/* Previews for newly selected media during edit */}
                                            {(editAudioBlob || editVideoFile || editSelectedGif) && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    style={{ background: 'rgba(0, 150, 255, 0.1)', padding: '12px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}
                                                >
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <span style={{ fontSize: '12px', fontWeight: 700, color: colors.primary }}>NEW MEDIA READY</span>
                                                            <button
                                                                onClick={() => { setEditAudioBlob(null); setEditVideoFile(null); setEditSelectedGif(null); setEditPostType(null); }}
                                                                style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>

                                                        {editAudioBlob && (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
                                                                <button
                                                                    onClick={() => handlePlayAudio('preview-edit', URL.createObjectURL(editAudioBlob))}
                                                                    style={{ background: colors.primary, border: 'none', width: '28px', height: '28px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                                                                >
                                                                    {playingAudioId === 'preview-edit' ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                                                                </button>
                                                                <div style={{ flex: 1 }}>
                                                                    <MediaControls
                                                                        id="preview-edit"
                                                                        current={mediaProgress['preview-edit']?.current || 0}
                                                                        total={mediaProgress['preview-edit']?.total || 0}
                                                                        percentage={mediaProgress['preview-edit']?.percentage || 0}
                                                                        speed={playbackSpeed}
                                                                        onSeek={(pos) => handleSeek('preview-edit', pos)}
                                                                        onSpeedChange={(s) => handleSpeedChange('preview-edit', s)}
                                                                        color={colors.primary}
                                                                        windowWidth={windowWidth}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {editSelectedGif && <img src={editSelectedGif} alt="new-gif" style={{ width: '80px', borderRadius: '6px', marginBottom: '10px' }} />}
                                                    {editVideoFile && (
                                                        <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000', maxHeight: '100px', marginTop: '10px' }}>
                                                            <video src={editVideoFile instanceof Blob ? URL.createObjectURL(editVideoFile) : editVideoFile} controls style={{ width: '100%', maxHeight: '100px' }} />
                                                        </div>
                                                    )}

                                                    {/* Smart Categorization Pills in Edit Mode */}
                                                    <div style={{ marginTop: '16px', borderTop: `1px solid ${colors.border}`, paddingTop: '12px' }}>
                                                        <span style={{ fontSize: '11px', fontWeight: 800, color: colors.accent, display: 'block', marginBottom: '8px' }}>CATEGORIZE YOUR NOTE</span>
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                            {categories.map(cat => (
                                                                <button
                                                                    key={cat}
                                                                    onClick={() => handleToggleCategory(cat, true)}
                                                                    style={{
                                                                        padding: '6px 12px',
                                                                        borderRadius: '20px',
                                                                        fontSize: '10px',
                                                                        background: editContent.toLowerCase().includes(`#${cat.toLowerCase()}`) ? colors.primary : 'rgba(255,255,255,0.05)',
                                                                        color: editContent.toLowerCase().includes(`#${cat.toLowerCase()}`) ? '#fff' : '#94a3b8',
                                                                        border: `1px solid ${editContent.toLowerCase().includes(`#${cat.toLowerCase()}`) ? colors.primary : colors.border}`,
                                                                        cursor: 'pointer',
                                                                        fontWeight: 700,
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                >
                                                                    {cat}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {showEditGifPicker && (
                                                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '10px', border: `1px solid ${colors.border}` }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                        <span style={{ fontSize: '12px', fontWeight: 700 }}>Select New GIF</span>
                                                        <button onClick={() => setShowEditGifPicker(false)} style={{ background: 'none', border: 'none', color: '#64748b' }}><X size={14} /></button>
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                                                        {trendingGifs.map((url, i) => (
                                                            <img
                                                                key={i} src={url}
                                                                style={{ width: '100%', borderRadius: '6px', cursor: 'pointer', border: editSelectedGif === url ? `2px solid ${colors.primary}` : 'none' }}
                                                                onClick={() => { setEditSelectedGif(url); setEditPostType('gif'); setShowEditGifPicker(false); }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ display: 'flex', gap: '12px' }}>
                                                    <button onClick={() => startRecording(true)} style={{ background: 'none', border: 'none', color: editPostType === 'voice' ? colors.primary : '#64748b', cursor: 'pointer' }}><Mic size={18} /></button>
                                                    <div style={{ position: 'relative' }}>
                                                        <button onClick={() => setShowEditVideoOptions(!showEditVideoOptions)} style={{ background: 'none', border: 'none', color: editPostType === 'video' ? colors.primary : '#64748b', cursor: 'pointer' }}><Video size={18} /></button>
                                                        {showEditVideoOptions && (
                                                            <div style={{ position: 'absolute', bottom: '100%', left: 0, background: '#1e293b', border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '8px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '140px' }}>
                                                                <div onClick={() => { startVideoRecording(true); setShowEditVideoOptions(false); }} style={{ padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} className="hover-bg">Record New</div>
                                                                <div onClick={() => { editVideoInputRef.current?.click(); setShowEditVideoOptions(false); }} style={{ padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} className="hover-bg">Upload New</div>
                                                            </div>
                                                        )}
                                                        <input type="file" ref={editVideoInputRef} style={{ display: 'none' }} accept="video/*" onChange={(e) => handleVideoUpload(e, true)} />
                                                    </div>
                                                    <button onClick={() => setShowEditGifPicker(!showEditGifPicker)} style={{ background: 'none', border: 'none', color: editPostType === 'gif' ? colors.primary : '#64748b', cursor: 'pointer' }}><ImageIcon size={18} /></button>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button onClick={() => { setEditingPostId(null); setEditPostType(null); setEditAudioBlob(null); setEditVideoFile(null); setEditSelectedGif(null); }} style={{ background: 'transparent', border: `1px solid ${colors.border}`, color: '#94a3b8', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
                                                    <button onClick={() => handleUpdate(post._id)} style={{ background: colors.primary, border: 'none', color: '#fff', padding: '8px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, boxShadow: `0 4px 12px ${colors.primary}44` }}>Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {post.content && (
                                                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '12px' }}>
                                                    {renderContentWithTags(post.content)}
                                                </p>
                                            )}
                                        </>
                                    )}

                                    {post.type === 'gif' && post.mediaUrl && (
                                        <img src={post.mediaUrl} alt="gif" style={{ width: '100%', borderRadius: '12px', marginTop: '12px', maxHeight: '400px', objectFit: 'cover' }} />
                                    )}

                                    {post.type === 'voice' && post.mediaUrl && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(0,150,255,0.03)', padding: '24px', borderRadius: '16px', border: `1px solid ${colors.border}`, width: '100%' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handlePlayAudio(post._id, post.mediaUrl)}
                                                    style={{ background: colors.primary, color: '#fff', border: 'none', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,150,255,0.3)' }}
                                                >
                                                    {playingAudioId === post._id ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />}
                                                </motion.button>
                                                <div style={{ flex: 1 }}>
                                                    <MediaControls
                                                        id={post._id}
                                                        current={mediaProgress[post._id]?.current || 0}
                                                        total={mediaProgress[post._id]?.total || 0}
                                                        percentage={mediaProgress[post._id]?.percentage || 0}
                                                        speed={playbackSpeed}
                                                        onSeek={(pos) => handleSeek(post._id, pos)}
                                                        onSpeedChange={(s) => handleSpeedChange(post._id, s)}
                                                        color={colors.primary}
                                                    />
                                                </div>
                                            </div>
                                            {playingAudioId === post._id && (
                                                <div style={{ display: 'flex', gap: '3px', height: '30px', alignItems: 'center' }}>
                                                    {[...Array(30)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{ height: [10, Math.random() * 30 + 5, 10] }}
                                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                                            style={{ width: '3px', background: colors.primary, borderRadius: '1px' }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {post.type === 'video' && post.mediaUrl && (
                                        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${colors.border}`, background: '#000' }}>
                                            <video
                                                id={`video-${post._id}`}
                                                src={post.mediaUrl}
                                                controls={false}
                                                playsInline
                                                preload="metadata"
                                                style={{ width: '100%', display: 'block' }}
                                                onTimeUpdate={(e) => {
                                                    const el = e.currentTarget;
                                                    setMediaProgress(prev => ({
                                                        ...prev,
                                                        [post._id]: {
                                                            current: el.currentTime,
                                                            total: el.duration,
                                                            percentage: (el.currentTime / el.duration) * 100
                                                        }
                                                    }));
                                                }}
                                                onClick={(e) => {
                                                    const el = e.currentTarget;
                                                    if (el.paused) el.play(); else el.pause();
                                                }}
                                            />
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '16px' }}>
                                                <MediaControls
                                                    id={post._id}
                                                    current={mediaProgress[post._id]?.current || 0}
                                                    total={mediaProgress[post._id]?.total || 0}
                                                    percentage={mediaProgress[post._id]?.percentage || 0}
                                                    speed={playbackSpeed}
                                                    onSeek={(pos) => handleSeek(post._id, pos, true, document.getElementById(`video-${post._id}`))}
                                                    onSpeedChange={(s) => handleSpeedChange(post._id, s, true, document.getElementById(`video-${post._id}`))}
                                                    color={colors.accent}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Engagement */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: `1px solid ${colors.border}`, paddingTop: '16px' }}>
                                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', padding: '2px' }}>
                                        <button
                                            onClick={() => handleUpvote(post._id)}
                                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRight: `1px solid ${colors.border}` }}
                                            className="hover-primary"
                                        >
                                            <ThumbsUp size={18} /> {post.upvotes}
                                        </button>
                                        <button
                                            onClick={() => handleDownvote(post._id)}
                                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px 12px' }}
                                            className="hover-downvote"
                                        >
                                            <ThumbsDown size={18} /> {post.downvotes}
                                        </button>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} className="hover-primary">
                                        <MessageSquare size={18} /> {post.comments.length}
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert("Link copied to clipboard!");
                                        }}
                                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                        className="hover-primary"
                                    >
                                        <Share2 size={18} />
                                    </button>
                                </div>

                                {/* Comment Section */}
                                <div style={{ marginTop: '24px', borderTop: `1px solid ${colors.border}`, paddingTop: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {post.comments?.map((comment, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: colors.accent, flexShrink: 0 }}>
                                                    {comment.author?.[0] || 'S'}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>{comment.author}</span>
                                                        <span style={{ fontSize: '11px', color: '#64748b' }}>{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                                                        <div style={{ flex: 1 }}>
                                                            {editingCommentId === comment._id ? (
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                    <textarea
                                                                        value={editCommentContent}
                                                                        onChange={(e) => setEditCommentContent(e.target.value)}
                                                                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.primary}`, borderRadius: '8px', padding: '12px', color: '#fff', outline: 'none', resize: 'none', fontSize: '14px', minHeight: '60px' }}
                                                                    />
                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                        <button onClick={() => handleUpdateComment(post._id, comment._id)} style={{ padding: '4px 12px', background: colors.primary, color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                                                                        <button onClick={() => setEditingCommentId(null)} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.1)', color: '#94a3b8', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div style={{ width: '100%' }}>
                                                                    {comment.type === 'voice' ? (
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: `1px solid ${colors.border}`, width: '100%', maxWidth: '300px' }}>
                                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                                <button
                                                                                    onClick={() => handlePlayAudio(`${post._id}-comment-${idx}`, comment.mediaUrl)}
                                                                                    style={{ background: colors.primary, border: 'none', width: '32px', height: '32px', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                                                >
                                                                                    {playingAudioId === `${post._id}-comment-${idx}` ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                                                                </button>
                                                                                <div style={{ flex: 1 }}>
                                                                                    <MediaControls
                                                                                        id={`${post._id}-comment-${idx}`}
                                                                                        current={mediaProgress[`${post._id}-comment-${idx}`]?.current || 0}
                                                                                        total={mediaProgress[`${post._id}-comment-${idx}`]?.total || 0}
                                                                                        percentage={mediaProgress[`${post._id}-comment-${idx}`]?.percentage || 0}
                                                                                        speed={playbackSpeed}
                                                                                        onSeek={(pos) => handleSeek(`${post._id}-comment-${idx}`, pos)}
                                                                                        onSpeedChange={(s) => handleSpeedChange(`${post._id}-comment-${idx}`, s)}
                                                                                        color={colors.primary}
                                                                                        windowWidth={windowWidth}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ) : comment.type === 'video' ? (
                                                                        <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000', maxWidth: '400px', border: `1px solid ${colors.border}` }}>
                                                                            <video src={comment.mediaUrl} controls style={{ width: '100%', maxHeight: '300px' }} />
                                                                        </div>
                                                                    ) : (
                                                                        <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>{comment.content}</p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            <button
                                                                onClick={() => { setEditingCommentId(comment._id); setEditCommentContent(comment.content); }}
                                                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                                                                className="hover-primary"
                                                                title="Edit"
                                                            >
                                                                <Edit3 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteComment(post._id, comment._id)}
                                                                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                                                                className="hover-downvote"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                                                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0 }} className="hover-primary">Like</button>
                                                        <button style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0 }} className="hover-primary">Reply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Comment Form */}
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '12px', border: `1px solid ${colors.border}`, marginTop: '8px' }}>
                                            <div style={{ flex: 1 }}>
                                                <input
                                                    type="text"
                                                    placeholder={isRecordingComment === post._id || isRecordingVideoComment === post._id ? "Recording media..." : "Add a comment..."}
                                                    value={commentTexts[post._id] || ''}
                                                    onChange={(e) => setCommentTexts({ ...commentTexts, [post._id]: e.target.value })}
                                                    disabled={isRecordingComment === post._id || isRecordingVideoComment === post._id}
                                                    style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', outline: 'none' }}
                                                />
                                                {commentAudioBlobs[post._id] && (
                                                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: colors.primary, fontSize: '12px' }}>
                                                        <Mic size={14} /> Voice note attached
                                                        <button
                                                            onClick={() => setCommentAudioBlobs({ ...commentAudioBlobs, [post._id]: null })}
                                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                                        ><Trash2 size={12} /></button>
                                                    </div>
                                                )}
                                                {commentVideoBlobs[post._id] && (
                                                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.primary, fontSize: '12px' }}>
                                                            <Video size={14} /> {commentVideoBlobs[post._id] instanceof Blob && 'Media Attached'}
                                                            <button
                                                                onClick={() => setCommentVideoBlobs({ ...commentVideoBlobs, [post._id]: null })}
                                                                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                                            ><Trash2 size={12} /></button>
                                                        </div>
                                                        <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#000', maxHeight: '100px', maxWidth: '150px' }}>
                                                            <video
                                                                src={URL.createObjectURL(commentVideoBlobs[post._id])}
                                                                controls
                                                                style={{ width: '100%', maxHeight: '100px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {isRecordingVideoComment === post._id && (
                                                    <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                                                        <video ref={commentVideoPreviewRef} autoPlay muted playsInline style={{ width: '100%', maxHeight: '150px' }} />
                                                    </div>
                                                )}
                                                {(isRecordingComment === post._id || isRecordingVideoComment === post._id) && (
                                                    <div style={{ marginTop: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                        <motion.div
                                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                            transition={{ repeat: Infinity, duration: 1 }}
                                                            style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}
                                                        />
                                                        <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>Recording...</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                                                <input
                                                    type="file"
                                                    ref={commentVideoInputRef}
                                                    accept="video/*"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => handleCommentVideoUpload(post._id, e)}
                                                />
                                                {isRecordingComment === post._id ? (
                                                    <button onClick={() => handleStopCommentRecording(post._id)} style={{ background: '#ef4444', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <Pause size={16} />
                                                    </button>
                                                ) : isRecordingVideoComment === post._id ? (
                                                    <button onClick={stopCommentVideoRecording} style={{ background: '#ef4444', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <Pause size={16} />
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleStartCommentRecording(post._id)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} className="hover-primary">
                                                            <Mic size={16} />
                                                        </button>
                                                        <div style={{ position: 'relative' }}>
                                                            <button
                                                                onClick={() => setShowCommentVideoOptions(showCommentVideoOptions === post._id ? null : post._id)}
                                                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: showCommentVideoOptions === post._id ? colors.primary : '#94a3b8', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                                                className="hover-primary"
                                                            >
                                                                <Video size={16} />
                                                            </button>
                                                            <AnimatePresence>
                                                                {showCommentVideoOptions === post._id && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                        style={{ position: 'absolute', bottom: '40px', right: 0, background: '#1e293b', border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '6px', zIndex: 50, minWidth: '140px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}
                                                                    >
                                                                        <button
                                                                            onClick={() => { startCommentVideoRecording(post._id); setShowCommentVideoOptions(null); }}
                                                                            style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', color: '#fff', fontSize: '13px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                                                        >
                                                                            <Mic size={14} /> Record Video
                                                                        </button>
                                                                        <button
                                                                            onClick={() => commentVideoInputRef.current?.click()}
                                                                            style={{ width: '100%', padding: '8px 12px', background: 'none', border: 'none', color: '#fff', fontSize: '13px', textAlign: 'left', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                                                        >
                                                                            <ImageIcon size={14} /> Upload Video
                                                                        </button>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </>
                                                )}
                                                <button onClick={() => handleAddComment(post._id)} style={{ background: colors.primary, border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Send size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                {windowWidth >= 1150 && (
                    <aside style={{ position: 'sticky', top: '160px', height: 'fit-content' }} className="hidden-mobile">
                        <div style={{ background: colors.card, borderRadius: '16px', padding: '20px', border: `1px solid ${colors.border}` }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <TrendingUp size={20} color={colors.primary} /> Trending Reviews
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {getTrendingTags(posts).map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setFilterTag(item.tag)}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '8px 14px',
                                            borderRadius: '12px',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            background: item.postCount > 5 ? `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}11)` : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${item.postCount > 5 ? colors.primary + '33' : 'rgba(255,255,255,0.05)'}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '2px',
                                            minWidth: 'fit-content',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        className="hover-bg"
                                    >
                                        {item.postCount > 10 && (
                                            <div style={{ position: 'absolute', top: -5, right: -5, width: '20px', height: '20px', background: colors.accent, filter: 'blur(10px)', opacity: 0.3 }} />
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Hash size={12} color={item.isMention ? colors.accent : colors.primary} />
                                            <span style={{ fontWeight: 700, fontSize: '13px', color: item.postCount > 5 ? '#fff' : '#cbd5e1' }}>{item.tag}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '10px', color: '#64748b' }}>{item.count}</span>
                                            {item.trending && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.primary }} className="pulse" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button style={{
                                width: '100%',
                                marginTop: '24px',
                                background: colors.primary,
                                color: '#fff',
                                border: 'none',
                                padding: '12px',
                                borderRadius: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0, 150, 255, 0.2)'
                            }}>Explore Trends</button>
                        </div>

                        <div style={{ background: colors.card, borderRadius: '16px', padding: '20px', border: `1px solid ${colors.border}`, marginTop: '24px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: colors.accent }}>Top Reviewers</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {getTopReviewers(posts).map((user, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: colors.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: colors.accent }}>
                                            {user.avatar}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600 }}>{user.name}</div>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>{user.posts} {user.posts === 1 ? 'post' : 'posts'}</div>
                                        </div>
                                        <button
                                            onClick={() => setFilterAuthor(user.name)}
                                            style={{ padding: '4px 10px', borderRadius: '6px', background: 'transparent', border: `1px solid ${colors.primary}`, color: colors.primary, fontSize: '11px', cursor: 'pointer' }}
                                        >
                                            Follow
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                )}
            </div>

            <style>{`
        .pulse {
          animation: pulse-animation 2s infinite;
        }
        @keyframes pulse-animation {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .hover-bg:hover { background-color: rgba(255,255,255,0.05) !important; color: white !important; }
        .hover-text:hover { color: white !important; }
        
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
            {/* Modal Portal */}
            <CustomModal
                {...modalConfig}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
            />
        </div>
    );
};

export default ReviewPage;
