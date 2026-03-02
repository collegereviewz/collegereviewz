import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Compass,
    Users,
    School,
    Layers,
    ExternalLink,
    Sparkles,
    ArrowRight,
    MessageSquare,
    FileText,
    Globe2
} from 'lucide-react';

const ToolCard = ({ title, description, link, comingSoon, icon: Icon, delay }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: comingSoon ? 'default' : 'pointer'
            }}
            onClick={() => {
                if (comingSoon || !link) return;
                if (link.startsWith('http')) {
                    window.open(link, '_blank');
                } else {
                    navigate(link);
                    window.scrollTo(0, 0);
                }
            }}
        >
            {/* Decorative background circle */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '120px',
                height: '120px',
                background: comingSoon ? 'rgba(100, 116, 139, 0.05)' : 'rgba(91, 81, 216, 0.05)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    background: comingSoon ? 'linear-gradient(135deg, #94a3b8, #64748b)' : 'linear-gradient(135deg, #5b51d8, #38bdf8)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    marginBottom: '24px',
                    boxShadow: comingSoon ? '0 8px 16px rgba(100, 116, 139, 0.2)' : '0 8px 20px rgba(91, 81, 216, 0.25)'
                }}>
                    <Icon size={28} strokeWidth={2} />
                </div>

                <h3 style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    color: '#1e293b',
                    marginBottom: '12px',
                    letterSpacing: '-0.5px'
                }}>
                    {title}
                </h3>

                <p style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    marginBottom: '24px',
                    fontWeight: 600
                }}>
                    {description}
                </p>
            </div>

            <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                {comingSoon ? (
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: '#f1f5f9',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 800,
                        color: '#64748b'
                    }}>
                        <Sparkles size={14} /> Coming Soon
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#5b51d8'
                    }}>
                        Launch Tool <ArrowRight size={16} />
                    </div>
                )}
            </div>

            {!comingSoon && (
                <ExternalLink
                    size={16}
                    style={{
                        position: 'absolute',
                        top: '24px',
                        right: '24px',
                        color: '#cbd5e1'
                    }}
                />
            )}
        </motion.div>
    );
};

const Resources = () => {
    const tools = [
        {
            title: 'Career Prediction Tool',
            description: 'Find your perfect career path using our advanced AI-driven prediction model designed for Indian students.',
            link: 'https://collegereview.io/',
            icon: Compass,
            comingSoon: false,
            delay: 0.1
        },
        {
            title: 'Study Abroad Counseling Tool',
            description: 'Get expert guidance and one-on-one sessions for medical and engineering counseling processes across India.',
            link: 'https://counseling.collegereview.io/',
            icon: Users,
            comingSoon: false,
            delay: 0.15
        },
        {
            title: 'Community Reviews',
            description: 'Join the community, share your experiences, and help others make informed decisions about their education.',
            link: '/WriteReview/',
            icon: MessageSquare,
            comingSoon: false,
            delay: 0.2
        },
        {
            title: 'College Predictor',
            description: 'Predict your likely college admissions based on your rank, category, and preferred location for NEET and JEE.',
            icon: School,
            comingSoon: true,
            delay: 0.3
        },
        {
            title: 'Department Predictor',
            description: 'Analyze which department or branch fits your profile and scores best to maximize your professional growth.',
            icon: Layers,
            comingSoon: true,
            delay: 0.35
        },
        {
            title: 'AI Resume Builder',
            description: 'Create a professional, ATS-friendly resume in minutes with our AI-powered builder tailored for students.',
            icon: FileText,
            comingSoon: true,
            delay: 0.4
        }
    ];

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '140px 24px 80px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Hero Section */}
                <section style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 style={{
                            fontSize: '48px',
                            fontWeight: 950,
                            color: '#0f172a',
                            marginBottom: '20px',
                            letterSpacing: '-1.5px',
                            lineHeight: 1.1
                        }}>
                            Smart <span style={{
                                background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Tools & Resources</span>
                        </h1>
                        <p style={{
                            fontSize: '18px',
                            color: '#64748b',
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            fontWeight: 600,
                            lineHeight: 1.6
                        }}>
                            Empowering your educational journey with data-driven insights and professional guidance for a better future.
                        </p>
                    </motion.div>
                </section>

                {/* Tools Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px'
                }}>
                    {tools.map((tool, index) => (
                        <ToolCard key={index} {...tool} />
                    ))}
                </div>

                {/* Bottom Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{
                        marginTop: '80px',
                        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                        borderRadius: '32px',
                        padding: '48px',
                        textAlign: 'center',
                        color: '#fff',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}
                >
                    <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '16px' }}>Need Personalized Guidance?</h2>
                    <p style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '32px', fontWeight: 600 }}>Talk to our experts for a detailed analysis of your profile and college options.</p>
                    <button style={{
                        padding: '16px 32px',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
                        color: '#fff',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(91, 81, 216, 0.3)',
                        transition: 'transform 0.2s'
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        Contact Advisor
                    </button>
                </motion.div>

            </div>

            <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { 
          background: #cbd5e1; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
        </div>
    );
};

export default Resources;
