import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, ChevronLeft, ChevronRight, FileText, BarChart3, Clock,
  GraduationCap, Users, Settings, Scale, FlaskConical, Landmark,
  Stethoscope, Palette, Code, Search, MessageSquare, TrendingUp, Briefcase, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Exam Logos from Assets
import cuetLogo from '../assets/Exams/cuet.png';
import gateLogo from '../assets/Exams/gate.png';
import jeeLogo from '../assets/Exams/jee.png';
import jeeAdvLogo from '../assets/Exams/jeeadvanced.png';
import jeeMainLogo from '../assets/Exams/jeemain.png';
import tsEamcetLogo from '../assets/Exams/taseamcat.png';
import wbjeeLogo from '../assets/Exams/wbjee.png';
import neetLogo from '../assets/Exams/neet.png';
import ibpsLogo from '../assets/Exams/ibps.png';
import sbiLogo from '../assets/Exams/sbi.png';
import kiitteeLogo from '../assets/Exams/kiitee.png';
import clatLogo from '../assets/Exams/clat.png';

// Import Exam Data
import examsListData from '../data/exams_list.json';
import examOfficialLogos from '../data/exam_official_logos.json';

// Logo.dev API Configuration
const LOGO_DEV_PK = 'pk_BcA5p3g7Qs6Yzy2HVMeIhw';
const PLACEHOLDER_LOGO = 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/placeholder-exam.png';

const ExamsSection = ({ showHeader = true }) => {
  const navigate = useNavigate();
  const [selectedStream, setSelectedStream] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
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
    setVisibleCount(12);
  }, [selectedStream]);

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

  const exams = examsListData.map(exam => {
    // High Quality Logo Mapping
    let logo = null;
    const name = (exam.fullName || "").toLowerCase();
    const officialLogo =
      examOfficialLogos?.[(exam.fullName || '').toLowerCase().trim()] ||
      examOfficialLogos?.[(exam.name || '').toLowerCase().trim()];
    
    // 0. Official Logos from checking.csv (preferred)
    if (officialLogo) logo = officialLogo;

    // 1. Check Local Assets First
    else if (name.includes('cuet')) logo = cuetLogo;
    else if (name.includes('jee main')) logo = jeeMainLogo;
    else if (name.includes('jee advanced')) logo = jeeAdvLogo;
    else if (name.includes('gate')) logo = gateLogo;
    else if (name.includes('wbjee')) logo = wbjeeLogo;
    else if (name.includes('ts eamcet') || name.includes('ts eapcet')) logo = tsEamcetLogo;
    else if (name.includes('ibps')) logo = ibpsLogo;
    else if (name.includes('sbi')) logo = sbiLogo;
    else if (name.includes('kiit')) logo = kiitteeLogo;
    else if (name.includes('clat')) logo = clatLogo;
    else if (name.includes('nchm')) logo = jeeLogo;
    
    // 2. Use Logo.dev for National/Global Exams (Dynamic Domains)
    else if (name.includes('neet')) logo = neetLogo;
    else if (name.includes('cat')) logo = `https://img.logo.dev/iimcat.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('bitsat')) logo = `https://img.logo.dev/bits-pilani.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('mat')) logo = `https://img.logo.dev/aima.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('xat')) logo = `https://img.logo.dev/xatonline.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('nmat')) logo = `https://img.logo.dev/nmat.org?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('snap')) logo = `https://img.logo.dev/snaptest.org?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('iit') || name.includes('uceed') || name.includes('jam')) logo = `https://img.logo.dev/iitd.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('aiims')) logo = `https://img.logo.dev/aiims.edu?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('nift')) logo = `https://img.logo.dev/nift.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('lsat')) logo = `https://img.logo.dev/lsac.org?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('mhcet') || name.includes('mah-')) logo = `https://img.logo.dev/mahacet.org?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('upcet') || name.includes('uppsc')) logo = `https://img.logo.dev/uppsc.up.nic.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('kcet') || name.includes('kpsc')) logo = `https://img.logo.dev/kpsc.kar.nic.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('tancet') || name.includes('tnpsc')) logo = `https://img.logo.dev/tnpsc.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('upsc')) logo = `https://img.logo.dev/upsc.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('ssc')) logo = `https://img.logo.dev/ssc.nic.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('rbi')) logo = `https://img.logo.dev/rbi.org.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('nabard')) logo = `https://img.logo.dev/nabard.org?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('sebi')) logo = `https://img.logo.dev/sebi.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('rr b') || name.includes('rrb')) logo = `https://img.logo.dev/indianrailways.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('vit')) logo = `https://img.logo.dev/vit.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('srm')) logo = `https://img.logo.dev/srmist.edu.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('manipal') || name.includes('met')) logo = `https://img.logo.dev/manipal.edu?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('amrita') || name.includes('aeee')) logo = `https://img.logo.dev/amrita.edu?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('comedk')) logo = `https://img.logo.dev/comedk.org?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('nata')) logo = `https://img.logo.dev/nata.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('net') || name.includes('ugc')) logo = `https://img.logo.dev/nta.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('appsc')) logo = `https://img.logo.dev/psc.ap.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('gpsc')) logo = `https://img.logo.dev/gpsc.gujarat.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('mppsc')) logo = `https://img.logo.dev/mppsc.mp.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('bpsc')) logo = `https://img.logo.dev/bpsc.bih.nic.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('opsc')) logo = `https://img.logo.dev/opsc.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('rpsc')) logo = `https://img.logo.dev/rpsc.rajasthan.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('wbpsc')) logo = `https://img.logo.dev/wbpsc.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('nid')) logo = `https://img.logo.dev/nid.edu?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('ailet')) logo = `https://img.logo.dev/nludelhi.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('jipmat')) logo = `https://img.logo.dev/jipmat.nta.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('fddi')) logo = `https://img.logo.dev/fddiindia.com?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('klee')) logo = `https://img.logo.dev/cee.kerala.gov.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('nmims') || name.includes('npat')) logo = `https://img.logo.dev/nmims.edu?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('symbiosis') || name.includes('set') || name.includes('slat')) logo = `https://img.logo.dev/siu.edu.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('cusat')) logo = `https://img.logo.dev/cusat.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('ipu')) logo = `https://img.logo.dev/ipu.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('amu')) logo = `https://img.logo.dev/amu.ac.in?token=${LOGO_DEV_PK}&size=128`;
    else if (name.includes('jmi')) logo = `https://img.logo.dev/jmi.ac.in?token=${LOGO_DEV_PK}&size=128`;

    // Fallback to placeholder if no logo is found
    if (!logo) {
      logo = PLACEHOLDER_LOGO;
    }

    // Stream-based Fallback Icons
    const getFallbackIcon = (category) => {
      switch(category) {
        case 'MBBS': return <Users size={28} color="#ef4444" />;
        case 'BE/B.Tech': return <Settings size={28} color="#3b82f6" />;
        case 'Law': return <Scale size={28} color="#6366f1" />;
        case 'BBA': return <Briefcase size={28} color="#f59e0b" />;
        case 'BCA': return <Code size={28} color="#10b981" />;
        case 'Arts': return <Palette size={28} color="#ec4899" />;
        default: return <GraduationCap size={28} color="#64748b" />;
      }
    };

    return {
      ...exam,
      logo,
      fallbackIcon: getFallbackIcon(exam.category),
      // Assign colors based on category
      color: exam.category === 'MBBS' ? '#ef4444' : 
             exam.category === 'BE/B.Tech' ? '#3b82f6' : 
             exam.category === 'Law' ? '#6366f1' : '#f97316'
    };
  });

  const totalExams = exams.length;
  const highQualityLogos = exams.filter(e => e.logo !== PLACEHOLDER_LOGO).length;
  const fallbackLogos = totalExams - highQualityLogos;

  const [visibleCount, setVisibleCount] = useState(12);
  
  const filteredExams = exams.filter(e => {
    const matchesStream = selectedStream === 'All' || e.category === selectedStream;
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStream && matchesSearch;
  }).slice(0, visibleCount);

  return (
    <section id="exams-hub" style={{ padding: '30px 0 80px', background: '#fff', position: 'relative' }}>
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
             <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600, marginTop: '8px' }}>
               Logos added: {highQualityLogos} · Using fallback: {fallbackLogos}
             </p>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '24px',
          marginBottom: '60px',
          maxWidth: '1350px',
          margin: '0 auto 60px'
        }}>
          {/* Scrollable Tabs */}
          <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
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
            {['All', 'MBBS', 'BE/B.Tech', 'BBA', 'BCA', 'B.Sc (Nursing)', 'Arts', 'Law', 'Science', 'Commerce', 'Pharmacy', 'ME/M.Tech'].map(tab => (
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
                {tab === 'All' && <LayoutGrid size={18} />}
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

        {/* Search Input on the Right */}
        <div style={{ 
          position: 'relative', 
          width: '320px', 
          flexShrink: 0 
        }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search all 500+ exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: '50px',
              border: '1.5px solid #f1f5f9',
              background: '#fff',
              color: '#1e293b',
              fontSize: '16px',
              fontWeight: 600,
              outline: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}
            onFocus={(e) => { e.target.style.borderColor = '#5b51d8'; e.target.style.boxShadow = '0 8px 20px rgba(91, 81, 216, 0.08)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#f1f5f9'; e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; }}
          />
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
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER_LOGO; }}
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
                  <button 
                    onClick={() => {
                        const { fallbackIcon, ...serializableExamData } = exam;
                        navigate(`/exams/${exam.name.toLowerCase().replace(/\s+/g, '-')}`, { state: { examData: serializableExamData } });
                    }}
                    style={{ 
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

        {/* View More Button */}
        {exams.filter(e => {
          const matchesStream = selectedStream === 'All' || e.category === selectedStream;
          const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                e.fullName.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesStream && matchesSearch;
        }).length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              style={{
                padding: '16px 48px', borderRadius: '50px', border: '1.5px solid #5b51d8',
                background: '#fff', color: '#5b51d8', fontSize: '16px', fontWeight: 800,
                cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(91, 81, 216, 0.05)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#5b51d8'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#5b51d8'; }}
            >
              View More Exams
            </button>
          </div>
        )}

        {/* Best of Luck / Footer Note */}
        <div style={{ 
          marginTop: '80px', 
          padding: '40px', 
          borderRadius: '32px', 
          background: 'linear-gradient(135deg, rgba(91, 81, 216, 0.03), rgba(56, 189, 248, 0.03))',
          textAlign: 'center',
          border: '1.5px dashed rgba(91, 81, 216, 0.2)'
        }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '8px 24px', 
            borderRadius: '50px', 
            background: '#fff', 
            color: '#5b51d8', 
            fontSize: '14px', 
            fontWeight: 800, 
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(91, 81, 216, 0.08)'
          }}>
            <GraduationCap size={18} /> Official Exam Partner Resource
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#1e293b', marginBottom: '16px' }}>
            Best of luck for your <span style={{ color: '#5b51d8' }}>Brilliant Future!</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#64748b', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>
            We've curated these 500+ official entrance exams to help you navigate your academic journey. Stay focused, stay prepared.
          </p>
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
