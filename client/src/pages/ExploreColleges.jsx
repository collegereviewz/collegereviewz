import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Heart, Share2, Users, Scale, FlaskConical, Landmark,
  Stethoscope, Palette, Code, Briefcase, ChevronLeft, ChevronRight,
  Search, Filter, MapPin, Award, BookOpen, ChevronDown, GraduationCap, Star, 
  Trash2, SlidersHorizontal, ArrowRight, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCollegeLogo, guessDomainByName } from '../utils/logoUtils';

// College Logos
import iitBombayLogo from '../assets/ExploreColleges/iitbombay.png';
import iitDelhiLogo from '../assets/ExploreColleges/iitdelhi.png';
import iitMadrasLogo from '../assets/ExploreColleges/iitmadras.png';
import iitKanpurLogo from '../assets/ExploreColleges/iitkanpur.png';
import iitKgpLogo from '../assets/ExploreColleges/iitkgp.png';

const ExploreColleges = () => {
  const [selectedStream, setSelectedStream] = useState('BE/B.Tech');
  const [sortBy, setSortBy] = useState('Ranking');
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

  const filters = [
    { label: 'Stream', options: ['BE/B.Tech', 'MBBS', 'MBA', 'Law', 'Science', 'Commerce'] },
    { label: 'Sub Stream', options: ['Computer Science', 'Mechanical', 'Electrical', 'Civil'] },
    { label: 'State', options: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu'] },
    { label: 'City', options: ['Mumbai', 'Pune', 'Bangalore', 'Chennai'] },
    { label: 'Specialization', options: ['AI & ML', 'Data Science', 'Cyber Security'] },
  ];

  const colleges = [
    { 
      rank: '#1', 
      name: 'IIT Bombay - Indian Institute of Technology - [IITB]', 
      location: 'Mumbai, Maharashtra | AICTE, UGC Approved',
      fees: '₹8,82,500', 
      feesType: 'B.Tech Computer Science and Engineering - Total Fees',
      placement: '₹24,30,000',
      placementLabel: 'Average Package',
      highestPlacement: '₹1,00,00,000',
      rating: 4.8,
      reviews: 842,
      rankingInfo: '#5th/500 in India for Engineering College Review 2026',
      website: 'https://www.iitb.ac.in',
      color: '#c7001e',
      logo: iitBombayLogo
    },
    { 
      rank: '#2', 
      name: 'IIT Delhi - Indian Institute of Technology [IITD], New Delhi', 
      location: 'New Delhi, Delhi NCR',
      fees: '₹8,62,550', 
      feesType: 'B.Tech Computer Science and Engineering - Total Fees',
      placement: '₹25,82,000',
      placementLabel: 'Average Package',
      highestPlacement: '₹2,00,00,000',
      rating: 4.7,
      reviews: 993,
      rankingInfo: '#2th/500 in India for Engineering College Review 2026',
      website: 'https://home.iitd.ac.in',
      color: '#0a6fb8',
      logo: iitDelhiLogo
    },
    { 
      rank: '#3', 
      name: 'IIT Madras - Indian Institute of Technology - [IITM], Chennai', 
      location: 'Chennai, Tamil Nadu | AICTE Approved',
      fees: '₹9,38,668', 
      feesType: 'B.Tech Computer Science and Engineering - Total Fees',
      placement: '₹21,48,000',
      placementLabel: 'Average Package',
      highestPlacement: '₹4,30,00,000',
      rating: 4.9,
      reviews: 466,
      rankingInfo: '#4th/500 in India for Engineering College Review 2026',
      website: 'https://www.iitm.ac.in',
      color: '#7c3aed',
      logo: iitMadrasLogo
    },
    { 
      rank: '#4', 
      name: 'IIT Kanpur - Indian Institute of Technology - [IITK], Kanpur', 
      location: 'Kanpur, Uttar Pradesh',
      fees: '₹9,18,880', 
      feesType: 'B.Tech Computer Science and Engineering - Total Fees',
      placement: '₹17,20,000',
      placementLabel: 'Average Package',
      highestPlacement: '₹1,90,00,000',
      rating: 4.8,
      reviews: 320,
      rankingInfo: '#4th/500 in India for Engineering College Review 2026',
      website: 'https://www.iitk.ac.in',
      color: '#047857',
      logo: iitKanpurLogo
    },
    { 
      rank: '#5', 
      name: 'IIT Kharagpur - Indian Institute of Technology - [IITKGP], Kharagpur', 
      location: 'Kharagpur, West Bengal | AICTE, UGC, NBA Approved',
      fees: '₹8,96,300', 
      feesType: 'B.Tech Computer Science and Engineering - Total Fees',
      placement: '₹24,30,000',
      placementLabel: 'Average Package',
      highestPlacement: '₹2,14,00,000',
      rating: 4.4,
      reviews: 842,
      rankingInfo: '#5th/500 in India for Engineering College Review 2026',
      website: 'https://www.iitkgp.ac.in',
      color: '#1e3a8a',
      logo: iitKgpLogo
    }
  ];

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '140px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '24px', background: 'rgba(91, 81, 216, 0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={14} />
              </div>
              COLLEGES
           </div>
           <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#1e293b', marginBottom: '32px', letterSpacing: '-1.5px' }}>
             List of Colleges , <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Fees, Cutoff & Rankings</span>
           </h1>
        </div>

        {/* Tab Selection with Scroll Controls */}
        <div style={{ position: 'relative', marginBottom: '30px' }}>
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
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
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
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <ChevronRight size={20} />
          </button>
          )}

          <div 
            ref={tabsRef}
            id="course-tabs-scroll"
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
                  {tab === 'MBBS' && <Users size={14} />}
                  {tab === 'BE/B.Tech' && <SlidersHorizontal size={14} />}
                  {tab === 'BBA' && <Briefcase size={14} />}
                  {tab === 'BCA' && <Code size={14} />}
                  {tab === 'B.Sc (Nursing)' && <Stethoscope size={14} />}
                  {tab === 'Arts' && <Palette size={14} />}
                  {tab === 'Law' && <Scale size={14} />}
                  {tab === 'Science' && <FlaskConical size={14} />}
                  {tab === 'Commerce' && <Landmark size={14} />}
                  {tab === 'Pharmacy' && <FlaskConical size={14} />}
                  {tab === 'ME/M.Tech' && <SlidersHorizontal size={14} />}
                </div>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ 
          background: '#fff', borderRadius: '16px', border: '1.5px solid #f1f5f9', 
          padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px',
          marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflowX: 'auto'
        }}>
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', 
              border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px',
              fontSize: '13px', fontWeight: 800, color: '#64748b', whiteSpace: 'nowrap'
            }}>
              <Filter size={16} /> All Filter
            </button>
            <div style={{ width: '1.5px', height: '30px', background: '#e2e8f0' }} />
            
            {filters.map(f => (
              <div key={f.label} style={{ position: 'relative', flex: 1, minWidth: '150px' }}>
                <select style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b',
                  fontSize: '13px', fontWeight: 700, appearance: 'none', cursor: 'pointer',
                  outline: 'none'
                }}>
                  <option>{f.label}</option>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '55%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
              </div>
            ))}
        </div>

        {/* Stats and Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>
               Found {colleges.length} {selectedStream === 'BE/B.Tech' ? 'Engineering' : selectedStream} Colleges
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b' }}>Sort By</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                    {['Popularity', 'Highest Fees', 'Lowest Fees', 'Ranking'].map(s => (
                      <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="sort" 
                          checked={sortBy === s} 
                          onChange={() => setSortBy(s)}
                          style={{ accentColor: '#5b51d8' }} 
                        />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{s}</span>
                      </label>
                    ))}
                </div>
            </div>
        </div>

        {/* Data Table */}
        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '60px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff' }}>
                        <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>CD Rank</th>
                        <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Colleges</th>
                        <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Fees Structure</th>
                        <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Placement</th>
                        <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>User Review</th>
                        <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>Ranking</th>
                    </tr>
                </thead>
                <motion.tbody
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                    {colleges.map((col, idx) => {
                      const logoUrl = getCollegeLogo(col.website || guessDomainByName(col.name), col.name);
                      const rowVariants = {
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                      };
                      return (
                        <motion.tr 
                          key={idx} 
                          variants={rowVariants}
                          style={{ borderBottom: '1.5px solid #f1f5f9' }}
                        >
                            <td style={{ padding: '30px 20px', fontSize: '15px', fontWeight: 800, color: '#1e293b', verticalAlign: 'top', borderRight: '1.5px solid #f1f5f9' }}>
                                {col.rank}
                            </td>
                            <td style={{ padding: '30px 20px', borderRight: '1.5px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '8px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                        <img src={col.logo || logoUrl} alt="logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#5b51d8', marginBottom: '6px', lineHeight: 1.4 }}>{col.name}</h4>
                                        <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '16px' }}>{col.location}</p>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button 
                                                style={{ 
                                                  padding: '8px 16px', background: '#10b981', color: '#fff', 
                                                  border: '1px solid #10b981', borderRadius: '6px', fontSize: '12px', 
                                                  fontWeight: 800, cursor: 'pointer', display: 'flex', 
                                                  alignItems: 'center', gap: '6px', transition: 'all 0.2s ease' 
                                                }}
                                                onMouseEnter={e => {
                                                  e.currentTarget.style.background = '#fff';
                                                  e.currentTarget.style.color = '#10b981';
                                                }}
                                                onMouseLeave={e => {
                                                  e.currentTarget.style.background = '#10b981';
                                                  e.currentTarget.style.color = '#fff';
                                                }}
                                            >
                                                <ArrowRight size={14} /> Apply
                                            </button>
                                            <button 
                                                style={{ 
                                                  padding: '8px 16px', background: '#eef2ff', color: '#5b51d8', 
                                                  border: 'none', borderRadius: '6px', fontSize: '12px', 
                                                  fontWeight: 800, cursor: 'pointer', display: 'flex', 
                                                  alignItems: 'center', gap: '6px', transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={e => {
                                                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)';
                                                  e.currentTarget.style.color = '#fff';
                                                }}
                                                onMouseLeave={e => {
                                                  e.currentTarget.style.background = '#eef2ff';
                                                  e.currentTarget.style.color = '#5b51d8';
                                                }}
                                            >
                                                <Download size={14} /> Brochure
                                            </button>
                                            <button 
                                                style={{ 
                                                  padding: '8px 16px', background: '#fef2f2', color: '#ef4444', 
                                                  border: 'none', borderRadius: '6px', fontSize: '12px', 
                                                  fontWeight: 800, cursor: 'pointer', display: 'flex', 
                                                  alignItems: 'center', gap: '6px', transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={e => {
                                                  e.currentTarget.style.background = '#ef4444';
                                                  e.currentTarget.style.color = '#fff';
                                                }}
                                                onMouseLeave={e => {
                                                  e.currentTarget.style.background = '#fef2f2';
                                                  e.currentTarget.style.color = '#ef4444';
                                                }}
                                            >
                                                <Heart size={14} /> Save
                                            </button>
                                            <div style={{ padding: '8px', border: '1.5px solid #e2e8f0', borderRadius: '6px', color: '#5b51d8', cursor: 'pointer' }}>
                                                <Share2 size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '30px 20px', verticalAlign: 'top', borderRight: '1.5px solid #f1f5f9' }}>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981', marginBottom: '4px' }}>{col.fees}</div>
                                <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, maxWidth: '140px', lineHeight: 1.4, marginBottom: '12px' }}>{col.feesType}</p>
                                <button 
                                    style={{ 
                                      background: 'none', border: '1.5px solid #e2e8f0', borderRadius: '6px', 
                                      padding: '6px 12px', fontSize: '11px', fontWeight: 800, color: '#5b51d8', 
                                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={e => {
                                      e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)';
                                      e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                    onMouseLeave={e => {
                                      e.currentTarget.style.background = 'none';
                                      e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#e2e8f0';
                                    }}
                                >
                                   <SlidersHorizontal size={12} /> Compare Fees
                                </button>
                            </td>
                            <td style={{ padding: '30px 20px', verticalAlign: 'top', borderRight: '1.5px solid #f1f5f9' }}>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: '#38bdf8', marginBottom: '4px' }}>{col.placement}</div>
                                <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>{col.placementLabel}</p>
                                <div style={{ fontSize: '14px', fontWeight: 900, color: '#111827', marginBottom: '12px' }}>{col.highestPlacement} <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8' }}>Highest</span></div>
                                <button 
                                    style={{ 
                                      background: 'none', border: '1.5px solid #e2e8f0', 
                                      borderRadius: '6px', padding: '6px 12px', fontSize: '11px', 
                                      fontWeight: 800, color: '#5b51d8', 
                                      cursor: 'pointer', display: 'flex', 
                                      alignItems: 'center', gap: '6px', transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={e => { 
                                      e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)'; 
                                      e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent';
                                    }}
                                    onMouseLeave={e => { 
                                      e.currentTarget.style.background = 'none'; 
                                      e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#e2e8f0';
                                    }}
                                >
                                   <ArrowRight size={12} /> Compare Placement
                                </button>
                            </td>
                            <td style={{ padding: '30px 20px', verticalAlign: 'top', borderRight: '1.5px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b' }}>{col.rating} / 5</span>
                                </div>
                                <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '12px' }}>Based on {col.reviews} User Reviews</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <button 
                                        style={{ 
                                          padding: '6px 12px', background: '#eef2ff', color: '#1e293b', 
                                          border: 'none', borderRadius: '6px', fontSize: '11px', 
                                          fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.color = '#1e293b'; }}
                                    >
                                        Read Review
                                    </button>
                                    <button 
                                        style={{ 
                                          padding: '6px 12px', background: 'none', border: '1.5px solid #e2e8f0', 
                                          color: '#5b51d8', borderRadius: '6px', fontSize: '11px', 
                                          fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={e => { 
                                          e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)'; 
                                          e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent';
                                        }}
                                        onMouseLeave={e => { 
                                          e.currentTarget.style.background = 'none'; 
                                          e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#e2e8f0';
                                        }}
                                    >
                                        Write Review
                                    </button>
                                </div>
                            </td>
                            <td style={{ padding: '30px 20px', verticalAlign: 'top' }}>
                                <div style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', lineHeight: 1.4, marginBottom: '12px', maxWidth: '180px' }}>
                                  {col.rankingInfo}
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                   <div 
                                       style={{ 
                                         padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', 
                                         borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#5b51d8', 
                                         display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s ease'
                                       }}
                                       onMouseEnter={e => {
                                         e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)';
                                         e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent';
                                       }}
                                       onMouseLeave={e => {
                                         e.currentTarget.style.background = '#f8fafc';
                                         e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#e2e8f0';
                                       }}
                                   >
                                      <GraduationCap size={14} /> Scholarship
                                   </div>
                                   <div 
                                       style={{ 
                                         padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', 
                                         borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#5b51d8', 
                                         display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s ease'
                                       }}
                                       onMouseEnter={e => {
                                         e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1, #0ea5e9)';
                                         e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent';
                                       }}
                                       onMouseLeave={e => {
                                         e.currentTarget.style.background = '#f8fafc';
                                         e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#e2e8f0';
                                       }}
                                   >
                                      <Download size={14} /> Apply for Loan
                                   </div>
                                </div>
                            </td>
                        </motion.tr>
                      );
                    })}
                </motion.tbody>
            </table>
        </div>
        
        {/* Pagination Section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '60px' }}>
          <button 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', 
              background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', 
              color: '#94a3b8', fontSize: '15px', fontWeight: 700, cursor: 'not-allowed',
              transition: 'all 0.2s ease'
            }}
            disabled
          >
            <ChevronLeft size={16} /> Prev
          </button>
          
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#5b51d8' }}>Page 1 of 1</span>
          
          <button 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', 
              background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', 
              color: '#94a3b8', fontSize: '15px', fontWeight: 700, cursor: 'not-allowed',
              transition: 'all 0.2s ease'
            }}
            disabled
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-width: 1024px) {
           table { display: block; overflow-x: auto; }
        }
      `}</style>
    </div>
  );
};

export default ExploreColleges;
