import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Heart, Share2, Users, Scale, FlaskConical, Landmark,
  Stethoscope, Palette, Code, Briefcase, ChevronLeft, ChevronRight,
  Search, Filter, MapPin, Award, BookOpen, ChevronDown, GraduationCap, Star,
  Trash2, SlidersHorizontal, ArrowRight, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import CollegeLogo from '../../components/CollegeLogo.jsx';
// import engineeringColleges from '../../data/engineeringColleges';

// Map: exact college name → route path for individual detail pages
const COLLEGE_ROUTES = {
  'IIT BOMBAY - INDIAN INSTITUTE OF TECHNOLOGY - [IITB]': '/ExploreColleges/BE-BTech/IIT-Bombay',
  'IIT DELHI - INDIAN INSTITUTE OF TECHNOLOGY [IITD], NEW DELHI': '/ExploreColleges/BE-BTech/IIT-Delhi',
  'IIT MADRAS - INDIAN INSTITUTE OF TECHNOLOGY - [IITM], CHENNAI': '/ExploreColleges/BE-BTech/IIT-Madras',
  'IIT KANPUR - INDIAN INSTITUTE OF TECHNOLOGY - [IITK], KANPUR': '/ExploreColleges/BE-BTech/IIT-Kanpur',
  'IIT KHARAGPUR - INDIAN INSTITUTE OF TECHNOLOGY - [IITKGP], KHARAGPUR': '/ExploreColleges/BE-BTech/IIT-Kharagpur',
  'IIT ROORKEE - INDIAN INSTITUTE OF TECHNOLOGY - [IITR], ROORKEE': '/ExploreColleges/BE-BTech/IIT-Roorkee',
  'NIT TRICHY - NATIONAL INSTITUTE OF TECHNOLOGY - [NITT], TIRUCHIRAPPALLI': '/ExploreColleges/BE-BTech/NIT-Trichy',
  'BITS PILANI - BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE, PILANI': '/ExploreColleges/BE-BTech/BITS-Pilani',
  'VIT VELLORE - VELLORE INSTITUTE OF TECHNOLOGY': '/ExploreColleges/BE-BTech/VIT-Vellore',
  'SRM INSTITUTE OF SCIENCE AND TECHNOLOGY, KATTANKULATHUR': '/ExploreColleges/BE-BTech/SRM-Chennai',
};

function getCollegeRoute(name) {
  return COLLEGE_ROUTES[name.toUpperCase().trim()] || null;
}

const ExploreColleges = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [selectedStream, setSelectedStream] = useState('All');
  const [sortBy, setSortBy] = useState('Ranking');
  const [selectedState, setSelectedState] = useState('All');
  const [openFilter, setOpenFilter] = useState(null); // Tracks which filter dropdown is open ('State', 'City', etc.)
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabsRef = useRef(null);

  const [canScrollFilterLeft, setCanScrollFilterLeft] = useState(false);
  const [canScrollFilterRight, setCanScrollFilterRight] = useState(true);
  const filtersRef = useRef(null);

  const streams = [
    { name: 'All', icon: <GraduationCap size={16} /> },
    { name: 'MBBS', icon: <Stethoscope size={16} /> },
    { name: 'BE/B.Tech', icon: <SlidersHorizontal size={16} /> },
    { name: 'BBA', icon: <Briefcase size={16} /> },
    { name: 'BCA', icon: <Code size={16} /> },
    { name: 'B.Sc (Nursing)', icon: <Heart size={16} /> },
    { name: 'Arts', icon: <Palette size={16} /> },
    { name: 'MBA', icon: <Award size={16} /> },
    { name: 'Law', icon: <Scale size={16} /> },
    { name: 'Science', icon: <FlaskConical size={16} /> },
    { name: 'Commerce', icon: <Landmark size={16} /> },
    { name: 'Pharmacy', icon: <FlaskConical size={16} /> },
    { name: 'ME/M.Tech', icon: <GraduationCap size={16} /> },
    { name: 'MCA', icon: <Code size={16} /> },
  ];

  const INDIAN_STATES = [
    "All", "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const filters = [
    { label: 'Stream', options: ['BE/B.Tech', 'MBBS', 'MBA', 'Law', 'Science', 'Commerce'] },
    { label: 'Sub Stream', options: ['Computer Science', 'Mechanical', 'Electrical', 'Civil'] },
    { label: 'State', options: INDIAN_STATES },
    { label: 'City', options: ['Mumbai', 'Pune', 'Bangalore', 'Chennai'] },
    { label: 'Specialization', options: ['AI & ML', 'Data Science', 'Cyber Security'] },
    { label: 'Program Type', options: ['Full Time', 'Part Time', 'Distance'] },
    { label: 'Type of College', options: ['Private', 'Government'] },
    { label: 'Entrance/Exam Accepted', options: ['JEE Main', 'MHT CET', 'GATE'] },
    { label: 'Total Fee', options: ['< 1 Lakh', '1 - 2 Lakhs', '> 2 Lakhs'] },
    { label: 'Course Type', options: ['Degree', 'Diploma', 'Certificate'] },
    { label: 'Affiliation', options: ['AICTE', 'UGC', 'NAAC'] },
    { label: 'Approval', options: ['AICTE', 'UGC', 'PCI', 'INC'] },
    { label: 'Gender Accepted', options: ['Co-Ed', 'Girls Only', 'Boys Only'] },
  ];

  const [allColleges, setAllColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalColleges, setTotalColleges] = useState(0);
  const itemsPerPage = 5;

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

  const checkFilterScroll = useCallback(() => {
    const el = filtersRef.current;
    if (!el) return;
    setCanScrollFilterLeft(el.scrollLeft > 5);
    setCanScrollFilterRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = filtersRef.current;
    if (!el) return;
    checkFilterScroll();
    el.addEventListener('scroll', checkFilterScroll);
    window.addEventListener('resize', checkFilterScroll);
    return () => {
      el.removeEventListener('scroll', checkFilterScroll);
      window.removeEventListener('resize', checkFilterScroll);
    };
  }, [checkFilterScroll]);

  // Removed IntersectionObserver — using robust CSS position: sticky instead
  // Load colleges from pre-processed data file (fast — no network request)
  useEffect(() => {
    let isMounted = true;
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm.trim(),
          state: selectedState,
          course: selectedStream
        });

        const res = await fetch(`http://localhost:5000/api/colleges?${queryParams.toString()}`);
        const data = await res.json();

        if (isMounted) {
          if (data.success) {
            // Map the data to the format ExploreColleges expects natively
            const mapped = data.data.map(col => {
              // Determine fee display: Prioritize the 'fees' field if it's a descriptive string (from Gemini)
              let displayFees = "Check Website";

              const cleanFee = (str) => {
                if (!str) return null;
                const s = str.toString().trim();

                // If it already looks like a formatted range or has units, keep it but clean currency
                if (s.toLowerCase().includes('lakh') || s.toLowerCase().includes('cr') || s.includes('-')) {
                  return s.replace('₹', '').trim();
                }

                const num = parseFloat(s.replace(/[^0-9.]/g, ''));
                if (!isNaN(num) && num > 0) {
                  if (num < 100) {
                    // It's likely already in Lakhs (e.g. 3.5), just missing unit
                    return `${num}- ${num} Lakh`;
                  } else if (num >= 10000000) {
                    const cr = (num / 10000000).toFixed(2);
                    return `${cr}- ${cr} Cr`;
                  } else if (num >= 10000) {
                    const lakh = (num / 100000).toFixed(2);
                    return `${lakh}- ${lakh} Lakh`;
                  }
                  return `₹${num.toLocaleString('en-IN')}`;
                }
                return s;
              };

              if (col.fees) {
                displayFees = cleanFee(col.fees);
              } else if (col.courses && col.courses.length > 0) {
                const validFees = col.courses
                  .map(c => parseInt(c.fees?.replace(/[^0-9]/g, '') || '0'))
                  .filter(f => f > 0);
                if (validFees.length > 0) {
                  const min = Math.min(...validFees);
                  if (min < 100) displayFees = `${min}- ${min} Lakh`;
                  else displayFees = `₹${min.toLocaleString('en-IN')}`;
                }
              }

              return {
                id: col._id,
                name: col.name,
                location: `${col.district || ''}, ${col.state || ''}`.replace(/^, | , $/g, ''),
                fees: displayFees,
                placement: col.avgPackage || "Check Website",
                highestPackage: col.highestPackage || (col.avgPackage ? `₹${(parseInt(col.avgPackage.replace(/[^0-9]/g, '') || '0') * 1.5).toLocaleString('en-IN')}` : null),
                rankingInfo: col.institutionType || "AICTE Approved",
                rating: col.rating || 0,
                reviewsCount: col.reviewsCount || 0,
                courses: col.courses || [],
                establishedYear: col.establishedYear || "—",
                managementType: col.managementType || "Private"
              };
            });
            setDisplayedColleges(mapped);
            setTotalPages(data.totalPages || 1);
            setTotalColleges(data.totalColleges || 0);
          } else {
            setDisplayedColleges([]);
            setTotalPages(1);
            setTotalColleges(0);
          }
        }
      } catch (err) {
        console.error("Fetch colleges error:", err);
        if (isMounted) {
          setDisplayedColleges([]);
          setTotalPages(1);
          setTotalColleges(0);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchColleges();

    return () => {
      isMounted = false;
    };
  }, [selectedStream, currentPage, searchTerm, selectedState]);


  const STRIP_H = 130;

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingTop: '100px' }}>

      {/* Page title - scrolls away */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
          <div style={{ width: '24px', height: '24px', background: 'rgba(91,81,216,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5b51d8' }}>
            <GraduationCap size={14} />
          </div>
          COLLEGES
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: 900, color: '#1e293b', lineHeight: 1.2 }}>
          List of Colleges, <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Fees, Cutoff &amp; Rankings</span>
        </h1>
      </div>

      {/* Tabs + Filter strip — sticky under header */}
      <div style={{
        position: 'sticky',
        top: '64px', // Height of the scrolled header
        left: 0,
        right: 0,
        zIndex: 900,
        background: '#f1f5f9',
        padding: '14px 0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>

          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', position: 'relative' }}>
            {/* Left Scroll Arrow for Tabs */}
            {canScrollLeft && (
              <button
                onClick={() => tabsRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                style={{
                  width: '36px', height: '36px', background: '#fff',
                  border: '1px solid #e2e8f0', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer', flexShrink: 0
                }}
              >
                <ChevronLeft size={18} color="#64748b" />
              </button>
            )}

            <div ref={tabsRef} style={{ display: 'flex', gap: '16px', overflowX: 'auto', flex: 1, padding: '4px 0' }} className="no-scrollbar">
              {streams.map((s) => (
                <button
                  key={s.name}
                  onClick={() => { setSelectedStream(s.name); setCurrentPage(1); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '50px',
                    whiteSpace: 'nowrap',
                    background: selectedStream === s.name ? 'linear-gradient(135deg, #5b51d8, #38bdf8)' : '#fff',
                    color: selectedStream === s.name ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {s.icon}
                  {s.name}
                </button>
              ))}
            </div>

            {/* Right Scroll Arrow for Tabs */}
            {canScrollRight && (
              <button
                onClick={() => tabsRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                style={{
                  width: '36px', height: '36px', background: '#fff',
                  border: '1px solid #e2e8f0', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer', flexShrink: 0
                }}
              >
                <ChevronRight size={18} color="#64748b" />
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div style={{
            background: '#fff', padding: '10px', borderRadius: '16px',
            display: 'flex', alignItems: 'center',
            gap: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', background: '#fff', border: 'none',
              borderRadius: '50px', fontSize: '13px', fontWeight: 700, color: '#64748b', cursor: 'pointer', flexShrink: 0
            }}>
              <Filter size={16} /> All Filter
            </button>

            <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 4px', flexShrink: 0 }} />

            {/* Left Scroll Arrow for Filters */}
            {canScrollFilterLeft && (
              <button
                onClick={() => filtersRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                style={{
                  width: '32px', height: '32px', background: '#cbd5e1', color: '#fff',
                  border: 'none', borderRadius: '50px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                }}
              >
                <ChevronLeft size={16} />
              </button>
            )}

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
              ref={filtersRef} 
              className="no-scrollbar" 
              style={{ display: 'flex', flex: 1, gap: '12px', overflowX: 'auto', scrollBehavior: 'smooth' }}
            >
              {filters.map((f, i) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  key={i}
                  onClick={() => setOpenFilter(openFilter === f.label ? null : f.label)}
                  style={{
                    flexShrink: 0, minWidth: '150px', background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: '12px', padding: '8px 16px', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: (f.label === 'State' && selectedState !== 'All') ? '#5b51d8' : '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {f.label === 'State' && selectedState !== 'All' ? selectedState : f.label}
                  </span>
                  <ChevronDown size={14} color="#64748b" style={{ flexShrink: 0, marginLeft: '8px' }} />

                  {/* Dropdown for State */}
                  <AnimatePresence>
                    {openFilter === f.label && f.label === 'State' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                          position: 'absolute', top: '100%', left: 0, marginTop: '8px',
                          background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 1000,
                          width: '220px', maxHeight: '300px', overflowY: 'auto'
                        }}
                        className="no-scrollbar"
                      >
                        {f.options.map((opt, idx) => (
                          <div
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedState(opt);
                              setOpenFilter(null);
                              setCurrentPage(1);
                            }}
                            style={{
                              padding: '10px 16px', fontSize: '13px', fontWeight: 600,
                              color: selectedState === opt ? '#5b51d8' : '#1e293b',
                              background: selectedState === opt ? '#f4f7ff' : 'transparent',
                              borderBottom: '1px solid #f1f5f9',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.background = selectedState === opt ? '#f4f7ff' : 'transparent'}
                          >
                            {opt}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Scroll Arrow for Filters */}
            {canScrollFilterRight && (
              <button
                onClick={() => filtersRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                style={{
                  width: '32px', height: '32px', background: '#cbd5e1', color: '#fff',
                  border: 'none', borderRadius: '50px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                }}
              >
                <ArrowRight size={16} />
              </button>
            )}

            <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 4px', flexShrink: 0 }} />

            {/* Search Input */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px',
              background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '50px',
              flexShrink: 0, minWidth: '240px', transition: 'all 0.2s ease'
            }}>
              <Search size={18} color="#64748b" />
              <input
                type="text"
                placeholder="Search College Name or Location..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '13px', fontWeight: 600, color: '#1e293b', width: '100%'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                >
                  <Trash2 size={14} color="#94a3b8" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>



      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>

        {/* Count and Sort Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px', marginTop: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>
            Found {totalColleges} {selectedStream === 'All' ? '' : selectedStream} Colleges
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>Sort</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Popularity', 'Highest Fees', 'Lowest Fees', 'Ranking'].map((s) => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === s}
                    onChange={() => setSortBy(s)}
                    style={{ accentColor: '#5b51d8', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{s}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflow: 'hidden', marginBottom: '60px', background: '#fff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff' }}>
                <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>CD Rank</th>
                <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>Colleges</th>
                <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>Fees Structure</th>
                {selectedStream === 'MBBS' ? (
                  <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>Clinical Exposure</th>
                ) : (
                  <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>Placement</th>
                )}
                <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.1)' }}>User Review</th>
                {selectedStream === 'MBBS' ? (
                  <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center' }}>Institution Type & Ranking</th>
                ) : (
                  <th style={{ padding: '18px 20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center' }}>Ranking</th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ padding: '80px', textAlign: 'center', fontSize: '18px', fontWeight: 800, color: '#64748b' }}>Loading colleges from database...</td></tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {displayedColleges.map((col, idx) => {
                    const rankNum = (currentPage - 1) * itemsPerPage + idx + 1;

                    return (
                      <React.Fragment key={col._id || idx}>
                        <motion.tr 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          style={{ transition: 'background 0.2s ease' }}
                        >
                      {/* CD RANK */}
                      <td style={{ padding: '24px 20px 10px', fontSize: '14px', fontWeight: 700, color: '#334155', verticalAlign: 'top', borderRight: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>#{rankNum}</td>

                      {/* COLLEGES */}
                      <td style={{ padding: '24px 20px 10px', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <div style={{ width: '45px', height: '45px', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '4px', background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <CollegeLogo collegeName={col.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 onClick={() => {
                              const route = getCollegeRoute(col.name);
                              if (route) navigate(route);
                              else navigate(`/college/${encodeURIComponent(col.name)}`, { state: { collegeData: col } });
                            }}
                              style={{ fontSize: '15px', fontWeight: 800, color: '#5b51d8', marginBottom: '4px', cursor: 'pointer', lineHeight: 1.4, textTransform: 'uppercase' }}>
                              {col.name}
                            </h4>
                            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '14px' }}>
                              {col.location} | Estd: {col.establishedYear} | {col.managementType} | AICTE, UGC Approved
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{ padding: '7px 14px', background: '#5b51d8', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowRight size={13} /> Apply</button>
                              <button style={{ padding: '7px 14px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Download size={13} /> Brochure</button>
                              <button style={{ padding: '7px 14px', background: '#fff', color: '#5b51d8', border: '1px solid #5b51d8', borderRadius: '4px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={13} /> Save</button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* FEES STRUCTURE */}
                      <td style={{ padding: '24px 20px 10px', verticalAlign: 'top', borderRight: '1px solid rgba(0,0,0,0.1)', textAlign: 'center' }}>
                        <div style={{ fontSize: '15px', fontWeight: 900, color: '#10b981', marginBottom: '4px' }}>{col.fees}</div>
                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, marginBottom: '12px', lineHeight: 1.4 }}>
                          {selectedStream} - Total Fees
                        </div>
                        <button style={{ padding: '7px 12px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}>
                          <Users size={12} color="#f59e0b" /> Compare Fees
                        </button>
                      </td>

                      {/* PLACEMENT / CLINICAL EXPOSURE */}
                      <td style={{ padding: '24px 20px 10px', verticalAlign: 'top', borderRight: '1px solid rgba(0,0,0,0.1)', textAlign: 'center', position: 'relative' }}>
                        {selectedStream === 'MBBS' ? (
                          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', filter: !user ? 'blur(4px)' : 'none' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: '#10b981', marginBottom: '4px' }}>Excellent</div>
                            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Clinical Exposure</div>
                          </div>
                        ) : (
                          <>
                            <div style={{ marginBottom: '10px', filter: !user ? 'blur(5px)' : 'none' }}>
                              <div style={{ fontSize: '14px', fontWeight: 900, color: '#10b981' }}>{user ? col.placement : '₹ XX.X LPA'}</div>
                              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Average Package</div>
                            </div>
                            <div style={{ marginBottom: '12px', filter: !user ? 'blur(5px)' : 'none' }}>
                              <div style={{ fontSize: '14px', fontWeight: 900, color: '#10b981' }}>{user ? col.highestPackage : '₹ XX.X LPA'}</div>
                              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Highest Package</div>
                            </div>
                            <button 
                              onClick={() => {
                                if (!user) window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'login' }));
                              }}
                              style={{ padding: '7px 12px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}>
                              {!user ? <Scale size={12} color="#f59e0b" /> : <FlaskConical size={12} color="#5b51d8" />} 
                              {user ? 'Compare Placement' : 'Login to View'}
                            </button>
                          </>
                        )}
                      </td>

                      {/* USER REVIEW */}
                      <td style={{ padding: '24px 20px 10px', verticalAlign: 'top', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                          <Star size={24} fill="#f59e0b" color="#f59e0b" />
                          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                            <span style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>
                              {Number(col.rating).toFixed(1)}
                            </span>
                            <span style={{ color: '#64748b', fontWeight: 700, fontSize: '12px' }}>
                              ({col.reviewsCount} Reviews)
                            </span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <button
                            onClick={() => {
                              const route = getCollegeRoute(col.name);
                              if (route) navigate(route, { state: { activeTab: 'Reviews' } });
                              else navigate(`/college/${encodeURIComponent(col.name)}`, { state: { collegeData: col, activeTab: 'Reviews' } });
                            }}
                            style={{ padding: '6px 0', width: '100px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Read Review
                          </button>
                          <button
                            onClick={() => {
                              const route = getCollegeRoute(col.name);
                              if (route) navigate(route, { state: { activeTab: 'Reviews', openWriteReview: true } });
                              else navigate(`/college/${encodeURIComponent(col.name)}`, { state: { collegeData: col, activeTab: 'Reviews', openWriteReview: true } });
                            }}
                            style={{ padding: '6px 0', width: '100px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Write Review
                          </button>
                        </div>
                      </td>

                      {/* RANKING OR INSTITUTION TYPE */}
                      <td style={{ padding: '24px 20px 10px', verticalAlign: 'top', textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '8px', lineHeight: 1.4 }}>
                          {selectedStream === 'MBBS' ? col.institutionType || 'Medical College' : col.rankingInfo}
                        </div>
                        <div style={{ display: 'inline-block', background: '#fff7ed', color: '#f59e0b', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', marginBottom: '14px' }}>
                          Best in Social Life
                        </div>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button style={{ padding: '7px 12px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={12} /> Scholarship</button>
                          <button style={{ padding: '7px 12px', background: '#eef2ff', color: '#5b51d8', border: 'none', borderRadius: '4px', fontSize: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Landmark size={12} /> Apply for Loan</button>
                        </div>
                      </td>
                    </motion.tr>
                        {/* THE "ONE LINE" UNDER THE BOX */}
                        <tr key={`${idx}-footer`} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                          <td colSpan="6" style={{ padding: '0 20px 0px' }}>
                            {/* Internal line removed */}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px',
              borderRadius: '10px',
              border: '1.5px solid',
              borderColor: currentPage === 1 ? '#e2e8f0' : '#5b51d8',
              background: currentPage === 1 ? '#f8fafc' : '#fff',
              color: currentPage === 1 ? '#94a3b8' : '#5b51d8',
              fontSize: '14px', fontWeight: 800,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: currentPage === 1 ? 0.6 : 1
            }}
            onMouseEnter={e => { if (currentPage !== 1) { e.currentTarget.style.background = 'linear-gradient(135deg, #5b51d8, #38bdf8)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent'; } }}
            onMouseLeave={e => { if (currentPage !== 1) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#5b51d8'; } }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {/* Page Info */}
          <div style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 800,
            minWidth: '110px',
            textAlign: 'center'
          }}>
            Page {currentPage}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={displayedColleges.length < itemsPerPage}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px',
              borderRadius: '10px',
              border: '1.5px solid',
              borderColor: displayedColleges.length < itemsPerPage ? '#e2e8f0' : '#5b51d8',
              background: displayedColleges.length < itemsPerPage ? '#f8fafc' : '#fff',
              color: displayedColleges.length < itemsPerPage ? '#94a3b8' : '#5b51d8',
              fontSize: '14px', fontWeight: 800,
              cursor: displayedColleges.length < itemsPerPage ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: displayedColleges.length < itemsPerPage ? 0.6 : 1
            }}
            onMouseEnter={e => { if (displayedColleges.length >= itemsPerPage) { e.currentTarget.style.background = 'linear-gradient(135deg, #5b51d8, #38bdf8)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent'; } }}
            onMouseLeave={e => { if (displayedColleges.length >= itemsPerPage) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#5b51d8'; e.currentTarget.style.borderColor = '#5b51d8'; } }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-width: 1024px) {
            .filters-tabs-container {
                overflow-x: auto !important;
                padding-bottom: 8px !important;
            }
            .college-table-container {
                overflow-x: auto !important;
            }
            .college-table {
                min-width: 900px !important; /* Forces horizontal scroll on table but keeps structure */
            }
            .college-row {
                font-size: 13px !important;
            }
        }
        
        @media (max-width: 640px) {
            .college-table-container {
                display: block !important;
            }
            /* Alternative: Hide table and show cards on mobile. 
             * But for now, let's just make it scrollable as requested for consistency.
             */
        }
      `}</style>
    </div>
  );
};

export default ExploreColleges;
