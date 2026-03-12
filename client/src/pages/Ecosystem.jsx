import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Users, Compass, Stethoscope, Microscope, FileSearch, GraduationCap, Network } from 'lucide-react';

const Ecosystem = () => {
  const tools = [
    {
      title: 'AI Career Predictor',
      description: 'Discover the ideal career paths mapped precisely to your skills, personality, and trending market data.',
      icon: <BrainCircuit size={32} strokeWidth={1.5} />,
      link: 'https://collegereview.io/',
      isExternal: true,
      color: '#3b82f6', // blue
      comingSoon: false
    },
    {
      title: 'Smart Counseling Portal',
      description: 'Get personalized, data-driven college admission guidance and expert 1-on-1 counseling.',
      icon: <Compass size={32} strokeWidth={1.5} />,
      link: 'https://counseling.collegereview.io/',
      isExternal: true,
      color: '#8b5cf6', // purple
      comingSoon: false
    },
    {
      title: 'Student Community Hub',
      description: 'Read real reviews, write about your experiences, and connect with peers worldwide.',
      icon: <Users size={32} strokeWidth={1.5} />,
      link: '/WriteReview/',
      isExternal: false,
      color: '#10b981', // emerald
      comingSoon: false
    },
    {
      title: 'Branch Forecaster',
      description: 'Predict the best engineering branches based on your entrance ranks, category, and past cutoffs.',
      icon: <Microscope size={32} strokeWidth={1.5} />,
      link: '#',
      isExternal: false,
      color: '#f59e0b', // amber
      comingSoon: true
    },
    {
      title: 'Medical Path Predictor',
      description: 'Forecast your chances at top medical colleges based on NEET scores and state quotas.',
      icon: <Stethoscope size={32} strokeWidth={1.5} />,
      link: '#',
      isExternal: false,
      color: '#ef4444', // red
      comingSoon: true
    },
    {
      title: 'AI ATS Scanner',
      description: 'Instantly evaluate your resume against job descriptions to maximize interview chances.',
      icon: <FileSearch size={32} strokeWidth={1.5} />,
      link: '#',
      isExternal: false,
      color: '#06b6d4', // cyan
      comingSoon: true
    },
    {
      title: 'College Predictor',
      description: 'Determine your admission chances at top colleges based on your academic profile and history.',
      icon: <GraduationCap size={32} strokeWidth={1.5} />,
      link: '#',
      isExternal: false,
      color: '#14b8a6', // teal
      comingSoon: true
    },
    {
      title: '4D Neural Brain Engine',
      description: 'Advanced AI driven analytics engine modeling your complete academic and psychological profile.',
      icon: <Network size={32} strokeWidth={1.5} />,
      link: '#',
      isExternal: false,
      color: '#8b5cf6', // purple
      comingSoon: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      paddingTop: '160px', 
      paddingBottom: '80px',
      background: 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%)' // white to light blue
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              fontSize: '48px', 
              fontWeight: 950, 
              color: '#0f172a', 
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}
          >
            Our <span style={{ color: '#3b82f6' }}>Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: '18px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Explore our suite of advanced intelligent tools built to simplify your academic and career journey.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
            gap: '20px',
            justifyContent: 'center'
          }}
        >
          {tools.map((tool, index) => (
            <motion.a
              key={index}
              href={tool.comingSoon ? undefined : tool.link}
              target={tool.isExternal && !tool.comingSoon ? "_blank" : undefined}
              rel={tool.isExternal && !tool.comingSoon ? "noopener noreferrer" : undefined}
              variants={itemVariants}
              whileHover={tool.comingSoon ? {} : { y: -8, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '30px 24px',
                textDecoration: 'none',
                display: 'flex',
                direction: 'column',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                aspectRatio: '1 / 1', // Square box
                border: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.03)',
                position: 'relative',
                overflow: 'hidden',
                cursor: tool.comingSoon ? 'default' : 'pointer',
                opacity: tool.comingSoon ? 0.8 : 1,
                transition: 'border-color 0.3s'
              }}
            >
              {/* Coming Soon Badge */}
              {tool.comingSoon && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '-32px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '6px 40px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  Coming Soon
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: `${tool.color}15`,
                color: tool.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                transition: 'transform 0.3s ease'
              }}>
                {tool.icon}
              </div>

              {/* Text */}
              <h2 style={{ 
                fontSize: '22px', 
                fontWeight: 800, 
                color: '#1e293b', 
                marginBottom: '16px',
                lineHeight: 1.2
              }}>
                {tool.title}
              </h2>
              
              <p style={{ 
                fontSize: '15px', 
                color: '#64748b', 
                lineHeight: 1.6, 
                fontWeight: 500 
              }}>
                {tool.description}
              </p>

              {/* Hover Indicator Line */}
              {!tool.comingSoon && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: tool.color,
                  opacity: 0.8
                }} />
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '60px', padding: '0 20px' }}
        >
          <p style={{
            fontSize: '18px',
            color: '#475569',
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            Powered by our cutting-edge AI technology to deliver unparalleled insights and personalized guidance.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Ecosystem;
