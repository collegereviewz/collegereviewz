import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, FileText, BarChart3, Clock,
  GraduationCap, Users, Settings, Scale, FlaskConical, Landmark,
  Stethoscope, Palette, Code, Search, MessageSquare, TrendingUp, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Exam Logos from Assets
import cuetLogo from '../assets/Exams/cuet.png';
import gateLogo from '../assets/Exams/gate.png';
import jeeLogo from '../assets/Exams/jee.png';
import jeeAdvLogo from '../assets/Exams/jeeadvanced.png';
import jeeMainLogo from '../assets/Exams/jee.png';
import tsEamcetLogo from '../assets/Exams/taseamcat.png';
import wbjeeLogo from '../assets/Exams/wbjee.png';

const ExamsSection = ({ showHeader = true }) => {
  const [selectedStream, setSelectedStream] = useState('MBBS');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabsRef = useRef(null);

  const checkScroll = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);
  const exams = [
    {
      id: 1,
      name: 'CUET 2025',
      fullName: 'Common Universities Entrance Test',
      category: 'Science',
      examDate: '11 May 26 - 31 May 26',
      appDate: '03 Jan 26 - 30 Jan 26',
      resultDate: '30 Jul 26',
      logo: cuetLogo,
      color: '#f97316'
    },
    {
      id: 2,
      name: 'JEE Main 2026',
      fullName: 'Joint Entrance Exam Main',
      category: 'BE/B.Tech',
      examDate: '22 Jan 26 - 29 Jan 26',
      appDate: '15 Oct 25 - 25 Nov 25',
      resultDate: '19 Feb 26',
      logo: jeeMainLogo,
      color: '#06b6d4'
    },
    {
      id: 3,
      name: 'JEE Advanced 2026',
      fullName: 'Joint Entrance Examination Advanced',
      category: 'BE/B.Tech',
      examDate: '17 May 26',
      appDate: '23 Apr 26 - 02 May 26',
      resultDate: '01 Jun 26',
      logo: jeeAdvLogo,
      color: '#64748b'
    },
    {
      id: 4,
      name: 'TS EAMCET 2026',
      fullName: 'Telangana State Engineering Agriculture...',
      category: 'BE/B.Tech',
      examDate: '29 Apr 26 - 05 May 26',
      appDate: '01 Mar 26 - 04 Apr 26',
      resultDate: '11 May 26',
      logo: tsEamcetLogo,
      color: '#0891b2'
    },
    {
      id: 5,
      name: 'GATE 2026',
      fullName: 'Graduate Aptitude Test in Engineering',
      category: 'ME/M.Tech',
      examDate: '07 Feb 26',
      appDate: '28 Aug 25 - 13 Oct 25',
      resultDate: '19 Mar 26',
      logo: gateLogo,
      color: '#eab308'
    },
    {
      id: 6,
      name: 'WBJEE 2025',
      fullName: 'West Bengal Joint Entrance Examination',
      category: 'BE/B.Tech',
      examDate: '27 Apr 25',
      appDate: '09 Jan 25 - 05 Feb 25',
      resultDate: '22 Aug 25',
      logo: wbjeeLogo,
      color: '#6366f1'
    }
  ];

  const filteredExams = exams.filter(e => e.category === selectedStream || selectedStream === 'All');

  return (
    <section style={{ padding: '30px 0 80px', background: '#fff', position: 'relative' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Header Section */}
        {showHeader && (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
             <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#1e293b', marginBottom: '16px', letterSpacing: '-1.5px' }}>
               Entrance Exams — <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>In India</span>
             </h1>
             <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 600, maxWidth: '800px', margin: '0 auto', lineHeight: '1.5' }}>
               Entrance exams in India determine eligibility for admission to higher education institutions.
             </p>
          </div>
        )}

        {/* Tab Selection with Scroll Controls */}
        <div style={{ position: 'relative', marginBottom: '60px', maxWidth: '1350px', margin: '0 auto 60px' }}>
          {/* Left Scroll Button */}
          {canScrollLeft && (
          <button 
            onClick={() => {
              const el = tabsRef.current;
              el.scrollBy({ left: -200, behavior: 'smooth' });
              setTimeout(checkScroll, 350);
            }}
            style={{
              position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
              width: '40px', height: '40px', borderRadius: '50%', background: '#fff',
              border: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#5b51d8'
            }}
          >
            <ChevronLeft size={20} />
          </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
          <button 
            onClick={() => {
              const el = tabsRef.current;
              el.scrollBy({ left: 200, behavior: 'smooth' });
              setTimeout(checkScroll, 350);
            }}
            style={{
              position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
              width: '40px', height: '40px', borderRadius: '50%', background: '#fff',
              border: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', color: '#5b51d8'
            }}
          >
            <ChevronRight size={20} />
          </button>
          )}

          <div 
            ref={tabsRef}
            id="exam-tabs-scroll"
            style={{ 
              display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 40px', 
              scrollbarWidth: 'none', position: 'relative', scrollSnapType: 'x mandatory'
            }} 
            className="no-scrollbar"
          >
            {['MBBS', 'BE/B.Tech', 'BBA', 'BCA', 'B.Sc (Nursing)', 'Arts', 'Law', 'Science', 'Commerce', 'Pharmacy', 'ME/M.Tech'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedStream(tab)}
                style={{
                  padding: '14px 36px', borderRadius: '50px', whiteSpace: 'nowrap',
                  border: '1.5px solid #f1f5f9',
                  background: selectedStream === tab ? 'linear-gradient(135deg, #5b51d8, #38bdf8)' : '#fff',
                  color: selectedStream === tab ? '#fff' : '#1e293b',
                  fontSize: '17px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  boxShadow: selectedStream === tab ? '0 10px 25px rgba(91, 81, 216, 0.3)' : 'none',
                  transform: selectedStream === tab ? 'scale(1.05)' : 'scale(1)',
                  scrollSnapAlign: 'start'
                }}
              >
                {tab === 'MBBS' && <Users size={18} />}
                {tab === 'BE/B.Tech' && <Settings size={18} />}
                {tab === 'BBA' && <Briefcase size={18} />}
                {tab === 'BCA' && <Code size={18} />}
                {tab === 'B.Sc (Nursing)' && <Stethoscope size={18} />}
                {tab === 'Arts' && <Palette size={18} />}
                {tab === 'Law' && <Scale size={18} />}
                {tab === 'Science' && <FlaskConical size={18} />}
                {tab === 'Commerce' && <TrendingUp size={18} />}
                {tab === 'Pharmacy' && <Stethoscope size={18} />}
                {tab === 'ME/M.Tech' && <Settings size={18} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          <AnimatePresence mode="popLayout">
            {filteredExams.map((exam) => (
              <motion.div
                key={exam.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5 }}
                style={{
                  background: '#fff', borderRadius: '24px', padding: '24px',
                  border: '1.5px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  display: 'flex', flexDirection: 'column', gap: '20px'
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
                  <div style={{ 
                    width: '64px', height: '64px', borderRadius: '12px', 
                    background: '#f8fafc', border: '1px solid #f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', padding: '10px', flexShrink: 0
                  }}>
                    <img 
                      src={exam.logo} 
                      alt={exam.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => { e.currentTarget.src = 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/placeholder-exam.png'; }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 950, color: '#1e293b', marginBottom: '4px' }}>{exam.name}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, lineHeight: 1.3 }}>{exam.fullName}</p>
                  </div>
                </div>

                <div style={{ padding: '0 4px' }}>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748b' }}>Exam Date</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{exam.examDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748b' }}>Application Form</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{exam.appDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#64748b' }}>Result Announce</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{exam.resultDate}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                  <button style={{ 
                    flex: 1, padding: '12px 0', borderRadius: '50px', border: 'none',
                    background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff',
                    fontSize: '14px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(91, 81, 216, 0.2)'
                  }}>
                    Read More
                  </button>
                  <button style={{ 
                    flex: 1, padding: '12px 0', borderRadius: '50px', border: '1.5px solid #5b51d8',
                    background: 'transparent', color: '#5b51d8',
                    fontSize: '14px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s ease'
                  }}>
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ExamsSection;
