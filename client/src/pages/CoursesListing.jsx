import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Heart, Share2, Users, Clock, FileText, BarChart3,
  Settings, Briefcase, Scale, FlaskConical, Landmark,
  Stethoscope, Palette, Code, ChevronLeft, ChevronRight,
  Search, Filter, MapPin, Award, BookOpen, GraduationCap, Star, Trash2, SlidersHorizontal, ArrowRight, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CoursesListing = () => {
  const [selectedStream, setSelectedStream] = useState('BE/B.Tech');
  const [sortBy, setSortBy] = useState('Popularity');
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

  const streamData = {
    'BE/B.Tech': {
      title: 'WHAT IS B.TECH?',
      fullTitle: 'B.Tech (Bachelor of Technology) - Fees, Admissions, Placements, Rankings, Cutoff',
      description: 'Bachelor of Technology (B.Tech) is a 4-year undergraduate engineering degree program that focuses on practical and technical aspects of various engineering disciplines. It is one of the most sought-after courses in India, offering excellent career opportunities in both public and private sectors.',
      bannerBg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      stats: [
        { label: 'Duration', val: '4 Years', icon: <Clock size={20} color="#5b51d8" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#5b51d8" /> },
        { label: 'Eligibility', val: '10+2 with PCM (50%)', icon: <FileText size={20} color="#5b51d8" /> },
        { label: 'Fees', val: '₹1-10 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#5b51d8' }}>₹</span> },
        { label: 'Exams', val: 'JEE Main, JEE Advanced, State Exams', icon: <Landmark size={20} color="#5b51d8" /> }
      ],
      highlights: [
        { val: '3000+', label: 'Engineering Colleges', icon: <Landmark size={24} color="#5b51d8" /> },
        { val: '₹8-10 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#5b51d8' }}>Rs</span> },
        { val: '90%', label: 'Placement Rate', icon: <BarChart3 size={24} color="#5b51d8" /> }
      ]
    },
    'MBBS': {
      title: 'WHAT IS MBBS?',
      fullTitle: 'MBBS (Bachelor of Medicine, Bachelor of Surgery) - Fees, NEET, Admissions, Careers',
      description: 'MBBS is the professional degree for medical practitioners in India. It is a 5.5-year program that combines rigorous academic study with mandatory clinical internship. The program is designed to produce high-quality doctors capable of handling medical emergencies and surgical procedures.',
      bannerBg: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      stats: [
        { label: 'Duration', val: '5.5 Years', icon: <Clock size={20} color="#e11d48" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#e11d48" /> },
        { label: 'Eligibility', val: '10+2 with PCB (50%)', icon: <FileText size={20} color="#e11d48" /> },
        { label: 'Fees', val: '₹50k - ₹1 Cr', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#e11d48' }}>₹</span> },
        { label: 'Exams', val: 'NEET UG', icon: <Landmark size={20} color="#e11d48" /> }
      ],
      highlights: [
        { val: '600+', label: 'Medical Colleges', icon: <Landmark size={24} color="#e11d48" /> },
        { val: '₹10-15 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#e11d48' }}>Rs</span> },
        { val: '100%', label: 'Job Security', icon: <Award size={24} color="#e11d48" /> }
      ]
    },
    'MBA': {
      title: 'WHAT IS MBA?',
      fullTitle: 'MBA (Master of Business Administration) - CAT, Admissions, Fees, Placements',
      description: 'MBA is a globally recognized postgraduate degree designed to develop the skills required for careers in business and management. It covers various areas of business such as accounting, finance, marketing, human resources, and operations.',
      bannerBg: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
      stats: [
        { label: 'Duration', val: '2 Years', icon: <Clock size={20} color="#8b5cf6" /> },
        { label: 'Level', val: 'Postgraduate', icon: <GraduationCap size={20} color="#8b5cf6" /> },
        { label: 'Eligibility', val: 'Graduation (50%)', icon: <FileText size={20} color="#8b5cf6" /> },
        { label: 'Fees', val: '₹2-25 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#8b5cf6' }}>₹</span> },
        { label: 'Exams', val: 'CAT, MAT, XAT, GMAT', icon: <Landmark size={20} color="#8b5cf6" /> }
      ],
      highlights: [
        { val: '5000+', label: 'B-Schools in India', icon: <Landmark size={24} color="#8b5cf6" /> },
        { val: '₹15-25 LPA', label: 'Top Avg Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#8b5cf6' }}>Rs</span> },
        { val: '95%', label: 'Placement Rate', icon: <BarChart3 size={24} color="#8b5cf6" /> }
      ]
    },
    'Law': {
      title: 'WHAT IS LAW?',
      fullTitle: 'LLB/LLM (Bachelor/Master of Laws) - CLAT, Admissions, Careers, Specializations',
      description: 'Law is a professional course that deals with the study of rules and regulations set by a governing authority. Legal education in India is regulated by the Bar Council of India (BCI). Integrated Law courses like BA LLB are highly popular.',
      bannerBg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)',
      stats: [
        { label: 'Duration', val: '3 / 5 Years', icon: <Clock size={20} color="#d97706" /> },
        { label: 'Level', val: 'UG / PG', icon: <GraduationCap size={20} color="#d97706" /> },
        { label: 'Eligibility', val: '10+2 or Grad (45%)', icon: <FileText size={20} color="#d97706" /> },
        { label: 'Fees', val: '₹50k - 5 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#d97706' }}>₹</span> },
        { label: 'Exams', val: 'CLAT, AILET, LSAT', icon: <Landmark size={20} color="#d97706" /> }
      ],
      highlights: [
        { val: '1500+', label: 'Law Colleges', icon: <Landmark size={24} color="#d97706" /> },
        { val: '₹6-12 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#d97706' }}>Rs</span> },
        { val: '80%', label: 'Legal Internship Rate', icon: <Scale size={24} color="#d97706" /> }
      ]
    },
    'Science': {
      title: 'WHAT IS SCIENCE?',
      fullTitle: 'B.Sc (Bachelor of Science) - DU, Admissions, Fees, Specializations, Research',
      description: 'Bachelor of Science (B.Sc) is an undergraduate degree that provides in-depth knowledge in various scientific disciplines. It is the foundation for advanced research and specialized careers in technology, healthcare, and academia.',
      bannerBg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
      stats: [
        { label: 'Duration', val: '3 Years', icon: <Clock size={20} color="#059669" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#059669" /> },
        { label: 'Eligibility', val: '10+2 with Science (50%)', icon: <FileText size={20} color="#059669" /> },
        { label: 'Fees', val: '₹10k - 2 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#059669' }}>₹</span> },
        { label: 'Exams', val: 'CUET, NPAT, NEST', icon: <Landmark size={20} color="#059669" /> }
      ],
      highlights: [
        { val: '2000+', label: 'Science Colleges', icon: <Landmark size={24} color="#059669" /> },
        { val: '₹3-8 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#059669' }}>Rs</span> },
        { val: '75%', label: 'Research Placement', icon: <FlaskConical size={24} color="#059669" /> }
      ]
    },
    'Commerce': {
      title: 'WHAT IS COMMERCE?',
      fullTitle: 'B.Com (Bachelor of Commerce) - Admissions, Fees, CA/CS, Career Scope',
      description: 'B.Com is an undergraduate degree that focuses on commerce, finance, and accounting. It is a highly popular choice for students aiming for careers in banking, insurance, auditing, and corporate finance.',
      bannerBg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
      stats: [
        { label: 'Duration', val: '3 Years', icon: <Clock size={20} color="#2563eb" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#2563eb" /> },
        { label: 'Eligibility', val: '10+2 (45%)', icon: <FileText size={20} color="#2563eb" /> },
        { label: 'Fees', val: '₹5k - 1 Lakh', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#2563eb' }}>₹</span> },
        { label: 'Exams', val: 'CUET, IPU CET', icon: <Landmark size={20} color="#2563eb" /> }
      ],
      highlights: [
        { val: '3500+', label: 'Commerce Colleges', icon: <Landmark size={24} color="#2563eb" /> },
        { val: '₹4-10 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#2563eb' }}>Rs</span> },
        { val: '85%', label: 'Corporate Hiring', icon: <Briefcase size={24} color="#2563eb" /> }
      ]
    },
    'BBA': {
      title: 'WHAT IS BBA?',
      fullTitle: 'BBA (Bachelor of Business Administration) - Admissions, Fees, Specializations, Careers',
      description: 'BBA is a 3-year undergraduate course that provides fundamental knowledge of business and management principles. It is the perfect starting point for students aiming for managerial roles or an MBA in the future.',
      bannerBg: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)',
      stats: [
        { label: 'Duration', val: '3 Years', icon: <Clock size={20} color="#6366f1" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#6366f1" /> },
        { label: 'Eligibility', val: '10+2 (50%)', icon: <FileText size={20} color="#6366f1" /> },
        { label: 'Fees', val: '₹1-8 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#6366f1' }}>₹</span> },
        { label: 'Exams', val: 'SET, IPU CET, NPAT', icon: <Landmark size={20} color="#6366f1" /> }
      ],
      highlights: [
        { val: '2500+', label: 'BBA Colleges', icon: <Landmark size={24} color="#6366f1" /> },
        { val: '₹4-12 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#6366f1' }}>Rs</span> },
        { val: '82%', label: 'Placement Rate', icon: <Briefcase size={24} color="#6366f1" /> }
      ]
    },
    'BCA': {
      title: 'WHAT IS BCA?',
      fullTitle: 'BCA (Bachelor of Computer Applications) - Fees, Admissions, Tech Careers, Syllabus',
      description: 'BCA is a 3-year undergraduate program that focuses on computer applications and software development. It provides students with a strong foundation in programming, database management, and networking.',
      bannerBg: 'linear-gradient(135deg, #0ea5e9 0%, #0c4a6e 100%)',
      stats: [
        { label: 'Duration', val: '3 Years', icon: <Clock size={20} color="#0ea5e9" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#0ea5e9" /> },
        { label: 'Eligibility', val: '10+2 with Math (45%)', icon: <FileText size={20} color="#0ea5e9" /> },
        { label: 'Fees', val: '₹50k - 4 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#0ea5e9' }}>₹</span> },
        { label: 'Exams', val: 'IPU CET, CUET', icon: <Landmark size={20} color="#0ea5e9" /> }
      ],
      highlights: [
        { val: '1800+', label: 'BCA College', icon: <Landmark size={24} color="#0ea5e9" /> },
        { val: '₹3-9 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#0ea5e9' }}>Rs</span> },
        { val: '78%', label: 'IT Hiring Rate', icon: <Code size={24} color="#0ea5e9" /> }
      ]
    },
    'B.Sc (Nursing)': {
      title: 'WHAT IS B.SC NURSING?',
      fullTitle: 'B.Sc Nursing - Admissions, NEET, Indian Nursing Council, Career Scope',
      description: 'B.Sc Nursing is a 4-year undergraduate program that prepares students for a career in healthcare as professional nurses. It involves clinical training, patient care, and medical knowledge.',
      bannerBg: 'linear-gradient(135deg, #0d9488 0%, #134e4a 100%)',
      stats: [
        { label: 'Duration', val: '4 Years', icon: <Clock size={20} color="#14b8a6" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#14b8a6" /> },
        { label: 'Eligibility', val: '10+2 with PCB (45%)', icon: <FileText size={20} color="#14b8a6" /> },
        { label: 'Fees', val: '₹20k - 3 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#14b8a6' }}>₹</span> },
        { label: 'Exams', val: 'NEET, AIIMS Nursing', icon: <Landmark size={20} color="#14b8a6" /> }
      ],
      highlights: [
        { val: '4000+', label: 'Nursing Colleges', icon: <Landmark size={24} color="#14b8a6" /> },
        { val: '₹2.5-6 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#14b8a6' }}>Rs</span> },
        { val: '98%', label: 'Health Employment', icon: <Stethoscope size={24} color="#14b8a6" /> }
      ]
    },
    'Arts': {
      title: 'WHAT IS B.A (ARTS)?',
      fullTitle: 'B.A (Bachelor of Arts) - IAS, UPSC, Media, Psychology, Admissions, Fees',
      description: 'B.A is a 3-year undergraduate course offering various specializations like History, Political Science, Psychology, and Media. It is highly favored by students aspiring for Civil Services.',
      bannerBg: 'linear-gradient(135deg, #be185d 0%, #831843 100%)',
      stats: [
        { label: 'Duration', val: '3 Years', icon: <Clock size={20} color="#db2777" /> },
        { label: 'Level', val: 'Undergraduate', icon: <GraduationCap size={20} color="#db2777" /> },
        { label: 'Eligibility', val: '10+2 (Any Stream)', icon: <FileText size={20} color="#db2777" /> },
        { label: 'Fees', val: '₹5k - 50k', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#db2777' }}>₹</span> },
        { label: 'Exams', val: 'CUET, NPAT', icon: <Landmark size={20} color="#db2777" /> }
      ],
      highlights: [
        { val: '5000+', label: 'Arts Colleges', icon: <Landmark size={24} color="#db2777" /> },
        { val: '₹3-10 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#db2777' }}>Rs</span> },
        { val: '70%', label: 'Civil Services Adv', icon: <Palette size={24} color="#db2777" /> }
      ]
    },
    'ME/M.Tech': {
      title: 'WHAT IS M.TECH?',
      fullTitle: 'ME/M.Tech (Master of Engineering/Technology) - GATE, Admissions, Specializations, Careers',
      description: 'ME/M.Tech is a 2-year postgraduate program that offers advanced technical and practical knowledge in a specific branch of engineering. It is ideal for students wishing to pursue research, teaching, or high-level technical roles.',
      bannerBg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      stats: [
        { label: 'Duration', val: '2 Years', icon: <Clock size={20} color="#94a3b8" /> },
        { label: 'Level', val: 'Postgraduate', icon: <GraduationCap size={20} color="#94a3b8" /> },
        { label: 'Eligibility', val: 'B.E/B.Tech (50%)', icon: <FileText size={20} color="#94a3b8" /> },
        { label: 'Fees', val: '₹1-4 Lakhs', icon: <span style={{ fontWeight: 900, fontSize: '18px', color: '#94a3b8' }}>₹</span> },
        { label: 'Exams', val: 'GATE, TANCET', icon: <Landmark size={20} color="#94a3b8" /> }
      ],
      highlights: [
        { val: '1200+', label: 'M.Tech Colleges', icon: <Landmark size={24} color="#94a3b8" /> },
        { val: '₹6-20 LPA', label: 'Average Salary', icon: <span style={{ fontSize: '24px', fontWeight: 900, color: '#94a3b8' }}>Rs</span> },
        { val: '92%', label: 'R&D Employment', icon: <Settings size={24} color="#94a3b8" /> }
      ]
    }
  };

  const currentData = streamData[selectedStream] || streamData['BE/B.Tech'];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '140px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '24px', background: 'rgba(91, 81, 216, 0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={14} />
              </div>
              COURSES
           </div>
           <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#1e293b', marginBottom: '32px', letterSpacing: '-1.5px' }}>
             List of Courses , <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Exams, Cutoff & Rankings</span>
           </h1>
        </div>

           {/* Tab Selection with Scroll Controls */}
           <div style={{ position: 'relative', marginBottom: '40px' }}>
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
                id="courses-tabs-scroll"
                style={{ 
                  display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 40px', 
                  scrollbarWidth: 'none', position: 'relative', scrollSnapType: 'x mandatory' 
                }} 
                className="no-scrollbar"
              >
                {['MBBS', 'BE/B.Tech', 'BBA', 'BCA', 'B.Sc (Nursing)', 'Arts', 'MBA', 'Law', 'Science', 'Commerce', 'Pharmacy', 'ME/M.Tech'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedStream(tab)}
                    style={{
                      padding: '12px 28px', borderRadius: '50px', whiteSpace: 'nowrap',
                      border: '1.5px solid', borderColor: selectedStream === tab ? 'transparent' : '#f1f5f9',
                      background: selectedStream === tab ? 'linear-gradient(135deg, #5b51d8, #38bdf8)' : '#fff',
                      color: selectedStream === tab ? '#fff' : '#1e293b',
                      fontSize: '15px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      boxShadow: selectedStream === tab ? '0 10px 25px rgba(91, 81, 216, 0.3)' : '0 2px 5px rgba(0,0,0,0.02)',
                      transform: selectedStream === tab ? 'scale(1.05)' : 'scale(1)',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <div style={{ 
                      width: '24px', height: '24px', borderRadius: '50%', 
                      background: selectedStream === tab ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.03)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {tab === 'MBBS' && <Heart size={14} />}
                      {tab === 'BE/B.Tech' && <Settings size={14} />}
                      {tab === 'BBA' && <Briefcase size={14} />}
                      {tab === 'BCA' && <Code size={14} />}
                      {tab === 'B.Sc (Nursing)' && <Stethoscope size={14} />}
                      {tab === 'Arts' && <Palette size={14} />}
                      {tab === 'MBA' && <Briefcase size={14} />}
                      {tab === 'Law' && <Scale size={14} />}
                      {tab === 'Science' && <FlaskConical size={14} />}
                      {tab === 'Commerce' && <Landmark size={14} />}
                      {tab === 'Pharmacy' && <FlaskConical size={14} />}
                      {tab === 'ME/M.Tech' && <Settings size={14} />}
                    </div>
                    {tab}
                  </button>
                ))}
              </div>
           </div>
 
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStream}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Premium Header Banner */}
            <div style={{ 
              width: '100%', 
              height: '180px', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              position: 'relative',
              marginBottom: '24px',
              background: currentData.bannerBg,
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)'
            }}>
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  background: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 60%)',
                  zIndex: 1
                }} />
                
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 40px', zIndex: 2 }}>
                    <div style={{ maxWidth: '550px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: 950, color: '#fff', marginBottom: '10px', lineHeight: 1.15, letterSpacing: '-1px' }}>
                          {currentData.title}
                        </h1>
                        <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500, lineHeight: 1.5, marginBottom: '18px' }}>
                          Advantages, {selectedStream} Courses, Top {selectedStream} Colleges, and Placement Opportunities
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button 
                                style={{ 
                                  padding: '10px 24px', background: '#10b981', 
                                  color: '#fff', border: '1px solid #10b981', borderRadius: '50px', fontWeight: 700, 
                                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', 
                                  fontSize: '13px', transition: 'all 0.3s ease',
                                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.2)'
                                }}
                                onMouseEnter={e => { 
                                  e.currentTarget.style.background = '#fff';
                                  e.currentTarget.style.color = '#10b981';
                                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(16, 185, 129, 0.4)'; 
                                }}
                                onMouseLeave={e => { 
                                  e.currentTarget.style.background = '#10b981';
                                  e.currentTarget.style.color = '#fff';
                                  e.currentTarget.style.transform = 'translateY(0)'; 
                                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.25)'; 
                                }}
                            >
                                <ArrowRight size={16} /> Apply Now
                            </button>
                            <button 
                                style={{ 
                                  padding: '10px 24px', background: 'rgba(255,255,255,0.05)', color: '#fff', 
                                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50px', 
                                  fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(10px)', 
                                  fontSize: '13px', transition: 'all 0.3s ease' 
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)';
                                  e.currentTarget.style.borderColor = 'transparent';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                }}
                            >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                            <div style={{ position: 'absolute', inset: 0, border: '1.5px solid rgba(56, 189, 248, 0.15)', borderRadius: '50%', transform: 'scale(1.1)' }} />
                            <div style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(255, 255, 255, 0.08)', borderRadius: '50%', animation: 'spin-slow 30s linear infinite' }} />
                            <div style={{ position: 'absolute', inset: '20%', background: '#3b82f6', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2 }} />
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ fontSize: '140px', filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.4))' }}>
                                  {(selectedStream === 'MBBS' || selectedStream === 'B.Sc (Nursing)') ? '⚕️' : 
                                   (selectedStream === 'BE/B.Tech' || selectedStream === 'BCA') ? '⚙️' : 
                                   (selectedStream === 'BBA' || selectedStream === 'MBA') ? '💼' : 
                                   (selectedStream === 'Arts') ? '🎨' : '🎓'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              style={{ 
                background: '#fff', 
                borderRadius: '24px', 
                border: '1.5px solid #f1f5f9', 
                padding: '28px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px',
                boxShadow: '0 4px 25px rgba(0,0,0,0.03)'
              }}
            >
                {currentData.stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                  >
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                          {stat.icon}
                      </div>
                      <div>
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{stat.label}</div>
                          <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: 900 }}>{stat.val}</div>
                      </div>
                  </motion.div>
                ))}
            </motion.div>

            {/* Content & Highights Card */}
            <div style={{ background: '#fff', borderRadius: '24px', border: '1.5px solid #f1f5f9', padding: '48px', boxShadow: '0 4px 25px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#1e293b', marginBottom: '20px', lineHeight: 1.2 }}>
                  {currentData.fullTitle}
                </h2>
                
                {/* Internal Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }} className="no-scrollbar">
                    {['Overview', 'Eligibility', 'Admission', 'Exams', 'Colleges', 'Specializations', 'Syllabus', 'Career'].map((nav, i) => (
                      <button key={i} style={{ 
                        padding: '10px 24px', borderRadius: '50px', background: i === 0 ? 'linear-gradient(135deg, #3b82f6, #38bdf8)' : '#f8fafc',
                        color: i === 0 ? '#fff' : '#64748b', border: '1px solid', borderColor: i === 0 ? '#3b82f6' : '#e2e8f0',
                        fontSize: '14px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap'
                      }}>
                        {nav}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '48px' }}>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>{selectedStream} Overview</h3>
                    <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '32px', fontWeight: 500 }}>
                      {currentData.description}
                    </p>
                    
                    <motion.div 
                      key={selectedStream + "-highlights"}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
                    >
                      {currentData.highlights.map((h, i) => (
                        <motion.div 
                          key={i} 
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                          }}
                          style={{ padding: '24px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{h.icon}</div>
                            <div style={{ fontSize: '24px', fontWeight: 950, color: '#1e293b', marginBottom: '4px' }}>{h.val}</div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{h.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '32px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '24px' }}>Key Highlights</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {[
                        { label: 'Colleges', val: '4000+', icon: <Landmark size={20} /> },
                        { label: 'Average Salary', val: currentData.highlights[1].val, icon: <Award size={20} /> },
                        { label: 'Placement Rate', val: currentData.highlights[2].val, icon: <BarChart3 size={20} /> }
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ color: '#5b51d8' }}>{item.icon}</div>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>{item.label}</span>
                          </div>
                          <span style={{ fontSize: '16px', fontWeight: 950, color: '#1e293b' }}>{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                        style={{ 
                          width: '100%', marginTop: '32px', padding: '16px', 
                          background: '#1e293b', color: '#fff', borderRadius: '12px', 
                          fontWeight: 800, border: 'none', cursor: 'pointer', 
                          fontSize: '14px', transition: 'all 0.3s ease' 
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)'}
                        onMouseLeave={e => e.currentTarget.style.background = '#1e293b'}
                    >
                      Explore More Details
                    </button>
                  </div>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CoursesListing;
