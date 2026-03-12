import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Award, Clock, GraduationCap, MapPin, Building,
    CalendarDays, ChevronRight, Filter, FileText, CheckCircle2,
    Briefcase, Globe, Info, PlayCircle, Star, ArrowUpRight, 
    Send, Smartphone, ShieldCheck, HelpCircle, Bell, Heart, Upload, Share2,
    BookOpen, Users, TrendingUp, Mail
} from 'lucide-react';
import ScholarshipForm from '../components/ScholarshipForm';

const Scholarship = () => {
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('Recommended');

    // Smooth UI Styles
    const cardStyle = {
        background: '#fff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        transition: 'all 0.3s ease'
    };

    const gradientText = {
        background: 'linear-gradient(135deg, #5b51d8, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
            
            {/* Modal for Application Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
                            background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflowY: 'auto', padding: '40px 20px'
                        }}
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.95 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            onClick={e => e.stopPropagation()}
                            style={{ position: 'relative', background: '#fff', borderRadius: '32px', maxWidth: '1000px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                        >
                            <button 
                                onClick={() => setShowForm(false)}
                                style={{ position: 'absolute', top: '24px', right: '24px', background: '#f1f5f9', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', fontWeight: 900, zIndex: 10 }}
                            >
                                ✕
                            </button>
                            {/* Existing component rendered safely */}
                            <div style={{ maxHeight: '90vh', overflowY: 'auto', borderRadius: '32px' }}>
                                <ScholarshipForm />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Secondary Header Navigation */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', sticky: 'top', overflowX: 'auto' }}>
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', display: 'flex', gap: '24px', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1e293b', fontWeight: 900, fontSize: '14px', borderBottom: '3px solid #5b51d8', padding: '16px 0' }}>
                        <CheckCircle2 size={16} color="#5b51d8" /> India
                    </div>
                    {['UG', 'PG', 'State', 'Abroad', 'Govt', 'Private', 'Closing Soon'].map(nav => (
                        <div key={nav} style={{ color: '#64748b', fontWeight: 700, fontSize: '14px', padding: '16px 0', cursor: 'pointer' }}>
                            {nav}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <div style={{ background: '#fff', padding: '60px 0', borderBottom: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', background: 'linear-gradient(to left, #eff6ff, rgba(255,255,255,0))', zIndex: 0 }} />
                
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#1e293b', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-1px' }}>
                            Find the Right Scholarship<br/>in <span style={gradientText}>2 Minutes</span>
                        </h1>
                        <p style={{ fontSize: '18px', color: '#475569', fontWeight: 600, lineHeight: 1.5, marginBottom: '32px', maxWidth: '600px' }}>
                            India (National + State + Govt + Private) + Study Abroad scholarships — with eligibility check, document checklist, and <strong style={{color: '#1e293b'}}>deadline alerts.</strong>
                        </p>

                        <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '16px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <Search size={24} color="#94a3b8" style={{ margin: '0 16px' }} />
                            <input 
                                type="text" 
                                placeholder="Search scholarship by name, class, course, state, country..." 
                                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', color: '#1e293b', fontWeight: 600 }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button style={{ background: '#1e40af', color: '#fff', padding: '14px 28px', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(30, 64, 175, 0.2)' }}>
                                Find My Scholarships <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '8px', fontSize: '12px' }}>Match Score</span>
                            </button>
                            <button style={{ background: '#fffbeb', color: '#d97706', padding: '14px 28px', borderRadius: '12px', border: '1.5px solid #fde68a', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle2 size={18} /> Check Eligibility
                            </button>
                            <button style={{ background: '#f1f5f9', color: '#475569', padding: '14px 28px', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Send size={18} /> Login
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '24px', marginTop: '32px', fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#10b981" /> Verified sources</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#3b82f6" /> Scam-safe tips</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={16} color="#f59e0b" /> Free deadline alerts</span>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {/* Decorative Hero Image replacement */}
                        <div style={{ background: 'linear-gradient(45deg, #e0e7ff, #bae6fd)', borderRadius: '32px', height: '360px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <GraduationCap size={150} color="rgba(255,255,255,0.5)" />
                            </div>
                            {/* Floating Action Cards */}
                            <div style={{ position: 'absolute', right: '20px', bottom: '20px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#1e293b', fontWeight: 800, fontSize: '14px' }}>
                                    <Clock size={16} color="#5b51d8" /> Quick Picks <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 600 }}>Next 30 Days</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                                    <span style={{ color: '#475569' }}><CalendarDays size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }}/> Fresh Apps</span>
                                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '6px' }}>2 Active</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 700 }}>
                                    <span style={{ color: '#475569' }}><Building size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }}/> Top Colleges</span>
                                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '2px 8px', borderRadius: '6px' }}>8 Matches</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1440px', margin: '40px auto 0', padding: '0 32px' }}>
                
                {/* Quick Picks Tags Section */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '20px' }}>Quick Picks</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {[
                            { name: 'Closing This Week', icon: <Clock size={16} color="#d97706" />, bg: '#fffbeb', border: '#fde68a' },
                            { name: 'Newly Added', icon: <Star size={16} color="#3b82f6" />, bg: '#eff6ff', border: '#bfdbfe' },
                            { name: 'Top Govt Scholarships', icon: <Building size={16} color="#059669" />, bg: '#ecfdf5', border: '#a7f3d0' },
                            { name: 'Top Private Scholarships', icon: <Briefcase size={16} color="#7c3aed" />, bg: '#f5f3ff', border: '#ddd6fe' },
                            { name: 'State Specific', icon: <MapPin size={16} color="#ea580c" />, bg: '#fff7ed', border: '#ffedd5' },
                            { name: 'Scholarships for Girls', icon: <Award size={16} color="#db2777" />, bg: '#fdf2f8', border: '#fbcfe8' },
                            { name: 'Merit Based', icon: <TrendingUp size={16} color="#4f46e5" />, bg: '#eef2ff', border: '#c7d2fe' },
                            { name: 'Minority', icon: <Users size={16} color="#0d9488" />, bg: '#f0fdfa', border: '#ccfbf1' },
                            { name: 'Exam-based Scholarships', icon: <FileText size={16} color="#2563eb" />, bg: '#eff6ff', border: '#bfdbfe' },
                        ].map((tag, i) => (
                            <div key={i} style={{ 
                                background: tag.bg, border: `1px solid ${tag.border}`, padding: '12px 20px', 
                                borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px',
                                fontSize: '14px', fontWeight: 800, color: '#1e293b', cursor: 'pointer', transition: 'all 0.2s',
                            }}>
                                {tag.icon} {tag.name} <ChevronRight size={14} color="#94a3b8" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
                    
                    {/* Left side column */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b' }}>Recommended for You</h3>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', background: '#fff', padding: '6px 12px', borderRadius: '50px', border: '1px solid #e2e8f0' }}>310 check alerts</div>
                        </div>

                        {/* Top Scholarship Match Card */}
                        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 2fr', marginBottom: '32px' }}>
                            
                            {/* Left Side Matching Sidebar */}
                            <div style={{ background: '#f8fafc', padding: '24px', borderRight: '1.5px solid #f1f5f9' }}>
                                <div style={{ background: '#059669', color: '#fff', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                                    Match Score: 95% <ArrowUpRight size={14} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <p style={{ fontSize: '14px', color: '#334155', fontWeight: 700, lineHeight: 1.4 }}>Education Profile: Matched (UG)</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <p style={{ fontSize: '14px', color: '#334155', fontWeight: 700, lineHeight: 1.4 }}>Eligible Score: 85%+ in 12th</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <p style={{ fontSize: '14px', color: '#334155', fontWeight: 700, lineHeight: 1.4 }}>Income Match: Below 8 LPA</p>
                                    </div>
                                </div>
                                <button style={{ width: '100%', background: '#fff', border: '1.5px solid #e2e8f0', color: '#1e293b', padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 800, marginTop: '24px', cursor: 'pointer' }}>
                                    Experience Gee Check
                                </button>
                            </div>

                            {/* Right Side Content Area */}
                            <div style={{ padding: '24px', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Award size={24} color="#059669" />
                                        </div>
                                        <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b' }}>Reliance Foundation UG Scholarship 2024</h4>
                                    </div>
                                    <button style={{ background: '#f1f5f9', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: 800, padding: '6px 16px', borderRadius: '50px', cursor: 'pointer' }}>View Info</button>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px' }}>
                                    <div>
                                        <p style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Award Amount</p>
                                        <p style={{ fontSize: '24px', fontWeight: 950, color: '#1e40af' }}>Up to ₹2,00,000</p>
                                    </div>
                                    <div style={{ background: '#ecfdf5', color: '#059669', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={14} /> 12 Days Left
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                                    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '12px', fontWeight: 800, padding: '6px 12px', borderRadius: '6px' }}>UG 1st Year Students</span>
                                    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '12px', fontWeight: 800, padding: '6px 12px', borderRadius: '6px' }}>All India</span>
                                    <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '12px', fontWeight: 800, padding: '6px 12px', borderRadius: '6px' }}>Income &lt; 15 Lakh</span>
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <button style={{ flex: 1, background: '#1e40af', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Star size={18} /> Find Match Details
                                    </button>
                                    <button onClick={() => setShowForm(true)} style={{ flex: 1, background: '#fff', color: '#1e293b', border: '1.5px solid #e2e8f0', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}>
                                        <Send size={18} /> Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Explore Scholarships Section */}
                        <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '20px', marginTop: '40px' }}>Explore Scholarships</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                            {[
                                { title: 'Central Govt', desc: 'Endorsed with India Govt. policies. For Post & Pre-metric.', icon: <Building size={20} color="#b91c1c" />, bg: '#fef2f2' },
                                { title: 'State Govt', desc: 'Domicile priority. Found from particular states at eligibility.', icon: <MapPin size={20} color="#059669" />, bg: '#ecfdf5' },
                                { title: 'Private & CSR', desc: 'Given by top corporate brands like Reliance, Tata, HDFC.', icon: <Briefcase size={20} color="#4f46e5" />, bg: '#eef2ff' },
                                { title: 'UG Scholarships', desc: 'Pursuing B.Tech, BSC, BCom, Arts & more programs.', icon: <GraduationCap size={20} color="#0284c7" />, bg: '#f0f9ff' },
                                { title: 'PG Scholarships', desc: 'Government schemes, Merit list for Masters & PhD.', icon: <BookOpen size={20} color="#d97706" />, bg: '#fffbeb' },
                                { title: 'Study Abroad', desc: 'Opportunities for funding international education across map.', icon: <Globe size={20} color="#0d9488" />, bg: '#f0fdfa' },
                            ].map((cat, i) => (
                                <div key={i} style={{ ...cardStyle, cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ padding: '8px', background: cat.bg, borderRadius: '8px' }}>{cat.icon}</div>
                                        <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#1e293b' }}>{cat.title}</h4>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, lineHeight: 1.5 }}>{cat.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1e293b', fontWeight: 800, fontSize: '15px' }}>
                                <Award size={20} color="#f59e0b" /> Need more? Explore All 1000+ Scholarships
                            </div>
                            <button style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, color: '#475569', fontSize: '13px', cursor: 'pointer' }}>Explore All</button>
                        </div>
                    </div>

                    {/* Right side column */}
                    <div>
                        {/* Deadline Calendar */}
                        <div style={{ ...cardStyle, marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CalendarDays size={20} color="#5b51d8" /> Deadline Calendar
                            </h3>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e40af', fontWeight: 900, marginBottom: '16px' }}>
                                        <CalendarDays size={18} /> April 2026
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12}/> Today: 12 Active</p>
                                    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Building size={12}/> Next week: 8 Deadlines</p>
                                </div>
                                <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e40af', fontWeight: 900, marginBottom: '16px' }}>
                                        <CalendarDays size={18} /> May 2026
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={12}/> Month: 42 Active</p>
                                    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Building size={12}/> Govt Forms: 15 Deadlines</p>
                                </div>
                            </div>

                            <button style={{ width: '100%', background: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Smartphone size={18} /> Get WhatsApp Alerts
                            </button>
                            <button style={{ width: '100%', background: '#1e40af', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Mail size={18} /> Get Email Alerts
                            </button>
                        </div>

                        {/* Guides & Resources */}
                        <div style={{ ...cardStyle, background: '#1e293b', color: '#fff' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Guides & Resources</h3>
                                <div style={{ width: '32px', height: '32px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <HelpCircle size={16} color="#94a3b8" />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {[
                                    { icon: <FileText size={16} />, text: 'How to Apply Guides' },
                                    { icon: <CheckCircle2 size={16} />, text: 'Documents Checklist' },
                                    { icon: <FileText size={16} />, text: 'SOP/Essay Help (Abroad)' },
                                    { icon: <Clock size={16} />, text: 'Scholarship Renewal Rules' },
                                    { icon: <ShieldCheck size={16} />, text: 'Scholarship Scam Alerts' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 12px', borderBottom: i < 4 ? '1px solid #334155' : 'none', cursor: 'pointer' }}>
                                        <div style={{ color: '#94a3b8' }}>{item.icon}</div>
                                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#e2e8f0' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <button style={{ width: '100%', background: '#fef08a', color: '#854d0e', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                                <Briefcase size={18} /> Use Scholarship Tools <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

// No longer need SVG fallbacks because we imported them from lucide-react.

export default Scholarship;
