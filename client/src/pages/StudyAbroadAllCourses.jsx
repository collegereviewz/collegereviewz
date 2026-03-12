import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Globe, Search, X } from 'lucide-react';

const ALL_COURSES = [
  // STEM & Engineering
  { id: 'engineering', category: 'Engineering & Technology', title: 'Computer Science & Engineering', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇩🇪', '🇨🇦', '🇸🇬'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Mechanical Engineering', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇩🇪', '🇺🇸', '🇨🇦', '🇦🇺'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Electrical & Electronics Engineering', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇩🇪', '🇸🇬', '🇬🇧'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Civil & Structural Engineering', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇦🇺', '🇬🇧', '🇸🇬', '🇺🇸'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Aerospace Engineering', duration: '4 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Robotics & Automation', duration: '2-4 yrs', level: 'UG/PG', countries: ['🇩🇪', '🇯🇵', '🇺🇸', '🇸🇬'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Chemical Engineering', duration: '4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇳🇱', '🇩🇪'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Environmental Engineering', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇩🇪', '🇸🇪', '🇫🇮', '🇳🇱'], color: '#6366f1' },
  { id: 'engineering', category: 'Engineering & Technology', title: 'Biomedical Engineering', duration: '4 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇩🇪', '🇨🇭', '🇸🇬'], color: '#6366f1' },

  // Data Science & AI
  { id: 'data-science', category: 'Data Science & AI', title: 'Machine Learning & AI', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇨🇦', '🇬🇧', '🇩🇪'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Data Science & Analytics', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇸🇬', '🇦🇺'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Business Intelligence', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇳🇱', '🇺🇸', '🇸🇬'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Big Data Engineering', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇮🇪', '🇩🇪', '🇸🇪'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Computer Vision & NLP', duration: '2 yrs', level: 'PG', countries: ['🇺🇸', '🇨🇦', '🇬🇧', '🇸🇬'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Cybersecurity & InfoSec', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇮🇱', '🇸🇬'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Cloud Computing & DevOps', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇮🇪', '🇺🇸', '🇳🇱'], color: '#10b981' },
  { id: 'data-science', category: 'Data Science & AI', title: 'Blockchain & Web3', duration: '1-2 yrs', level: 'PG', countries: ['🇨🇭', '🇸🇬', '🇬🇧', '🇺🇸'], color: '#10b981' },

  // Business & Management
  { id: 'business', category: 'Business & Management', title: 'MBA (General Management)', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇦🇺', '🇫🇷'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'MBA Finance & Accounting', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇸🇬', '🇭🇰'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'MSc Marketing & Brand Management', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇫🇷', '🇳🇱', '🇸🇪'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'Masters in Management (MIM)', duration: '1-2 yrs', level: 'PG', countries: ['🇫🇷', '🇩🇪', '🇬🇧', '🇮🇹'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'International Business', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇸🇬', '🇦🇺'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'Supply Chain & Operations', duration: '1 yr', level: 'PG', countries: ['🇳🇱', '🇺🇸', '🇩🇪', '🇬🇧'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'Entrepreneurship & Innovation', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇸🇪', '🇫🇮', '🇮🇪'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'Human Resource Management', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇦🇺', '🇨🇦', '🇸🇬'], color: '#f59e0b' },
  { id: 'business', category: 'Business & Management', title: 'Luxury Brand Management', duration: '1-2 yrs', level: 'PG', countries: ['🇫🇷', '🇮🇹', '🇬🇧', '🇨🇭'], color: '#f59e0b' },

  // Medicine & Healthcare
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'MBBS / MD Medicine', duration: '5-6 yrs', level: 'UG', countries: ['🇬🇧', '🇦🇺', '🇺🇸', '🇩🇪'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'MSc Nursing', duration: '1-2 yrs', level: 'PG', countries: ['🇬🇧', '🇦🇺', '🇨🇦', '🇮🇪'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'Pharmacy & Pharmacology', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇦🇺', '🇩🇪'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'Public Health & Epidemiology', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇦🇺', '🇸🇬'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'Dentistry (BDS)', duration: '4-5 yrs', level: 'UG', countries: ['🇬🇧', '🇦🇺', '🇭🇺', '🇱🇻'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'Physiotherapy & Rehabilitation', duration: '3-4 yrs', level: 'UG/PG', countries: ['�Oz', '🇬🇧', '🇨🇦', '🇩🇪'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'Medical Biotechnology', duration: '2 yrs', level: 'PG', countries: ['🇩🇪', '🇨🇭', '🇸🇪', '🇺🇸'], color: '#ef4444' },
  { id: 'medicine', category: 'Medicine & Healthcare', title: 'Global Health & Policy', duration: '1 yr', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇸🇪', '🇨🇭'], color: '#ef4444' },

  // Arts & Humanities
  { id: 'arts', category: 'Arts & Humanities', title: 'Industrial & Product Design', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇮🇹', '🇩🇪', '🇸🇪'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'UX / Interaction Design', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇸🇪', '🇳🇱'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Fashion Design & Technology', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇮🇹', '🇫🇷', '🇬🇧', '🇺🇸'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Animation & Visual Effects (VFX)', duration: '2-3 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Architecture', duration: '5 yrs', level: 'UG', countries: ['🇮🇹', '🇬🇧', '🇺🇸', '🇪🇸'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Film & Media Studies', duration: '1-3 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Music & Performing Arts', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇦🇹', '🇩🇪', '🇺🇸'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Interior Design', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇮🇹', '🇫🇷', '🇬🇧', '🇦🇺'], color: '#a855f7' },
  { id: 'arts', category: 'Arts & Humanities', title: 'Graphic Design & Communication', duration: '1-3 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇳🇱', '🇺🇸', '🇸🇪'], color: '#a855f7' },

  // Law
  { id: 'law', category: 'Law & Legal Studies', title: 'LLB (Bachelor of Laws)', duration: '3 yrs', level: 'UG', countries: ['🇬🇧', '🇦🇺', '🇸🇬', '🇨🇦'], color: '#0ea5e9' },
  { id: 'law', category: 'Law & Legal Studies', title: 'LLM International Law', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇺🇸', '🇳🇱', '🇸🇬'], color: '#0ea5e9' },
  { id: 'law', category: 'Law & Legal Studies', title: 'LLM Corporate & Commercial Law', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇺🇸', '🇦🇺', '🇸🇬'], color: '#0ea5e9' },
  { id: 'law', category: 'Law & Legal Studies', title: 'LLM Human Rights Law', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇺🇸', '🇳🇱', '🇨🇭'], color: '#0ea5e9' },
  { id: 'law', category: 'Law & Legal Studies', title: 'LLM Intellectual Property Law', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇺🇸', '🇩🇪', '🇳🇱'], color: '#0ea5e9' },

  // Natural Sciences
  { id: 'engineering', category: 'Natural Sciences', title: 'Physics & Astrophysics', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇩🇪', '🇨🇭'], color: '#8b5cf6' },
  { id: 'engineering', category: 'Natural Sciences', title: 'Chemistry & Materials Science', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇩🇪', '🇬🇧', '🇺🇸', '🇳🇱'], color: '#8b5cf6' },
  { id: 'engineering', category: 'Natural Sciences', title: 'Biology & Life Sciences', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇩🇪', '🇸🇪'], color: '#8b5cf6' },
  { id: 'engineering', category: 'Natural Sciences', title: 'Environmental Science', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇸🇪', '🇩🇪', '🇳🇱', '🇦🇺'], color: '#8b5cf6' },
  { id: 'engineering', category: 'Natural Sciences', title: 'Mathematics & Statistics', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇨🇭', '🇩🇪'], color: '#8b5cf6' },
  { id: 'engineering', category: 'Natural Sciences', title: 'Geology & Earth Sciences', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇦🇺', '🇨🇦', '🇬🇧', '🇳🇿'], color: '#8b5cf6' },

  // Social Sciences
  { id: 'arts', category: 'Social Sciences', title: 'Psychology', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺'], color: '#ec4899' },
  { id: 'arts', category: 'Social Sciences', title: 'Sociology & Anthropology', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇨🇦', '🇸🇪'], color: '#ec4899' },
  { id: 'arts', category: 'Social Sciences', title: 'Political Science & IR', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇫🇷', '🇳🇱'], color: '#ec4899' },
  { id: 'arts', category: 'Social Sciences', title: 'Economics', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇬🇧', '🇺🇸', '🇨🇭', '🇸🇪'], color: '#ec4899' },
  { id: 'arts', category: 'Social Sciences', title: 'Global Affairs & Development', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇨🇭', '🇸🇪'], color: '#ec4899' },
  { id: 'business', category: 'Social Sciences', title: 'Public Policy & Governance', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇸🇬', '🇸🇪'], color: '#ec4899' },

  // Hospitality & Tourism
  { id: 'business', category: 'Hospitality & Tourism', title: 'Hospitality & Hotel Management', duration: '2-4 yrs', level: 'UG/PG', countries: ['🇨🇭', '🇫🇷', '🇦🇺', '🇸🇬'], color: '#f97316' },
  { id: 'business', category: 'Hospitality & Tourism', title: 'Tourism & Event Management', duration: '1-3 yrs', level: 'UG/PG', countries: ['🇨🇭', '🇦🇺', '🇳🇿', '🇸🇬'], color: '#f97316' },
  { id: 'business', category: 'Hospitality & Tourism', title: 'Culinary Arts & Gastronomy', duration: '1-3 yrs', level: 'UG', countries: ['🇫🇷', '🇮🇹', '🇺🇸', '🇨🇭'], color: '#f97316' },

  // Education
  { id: 'arts', category: 'Education', title: 'Masters in Education (MEd)', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇦🇺', '🇫🇮'], color: '#14b8a6' },
  { id: 'arts', category: 'Education', title: 'TESOL / Linguistics', duration: '1 yr', level: 'PG', countries: ['🇬🇧', '🇦🇺', '🇺🇸', '🇨🇦'], color: '#14b8a6' },
  { id: 'arts', category: 'Education', title: 'Educational Leadership', duration: '1-2 yrs', level: 'PG', countries: ['🇺🇸', '🇬🇧', '🇦🇺', '🇸🇬'], color: '#14b8a6' },

  // Agriculture & Environment
  { id: 'engineering', category: 'Agriculture & Environment', title: 'Agricultural Science', duration: '3-4 yrs', level: 'UG/PG', countries: ['🇦🇺', '🇳🇿', '🇳🇱', '🇨🇦'], color: '#84cc16' },
  { id: 'engineering', category: 'Agriculture & Environment', title: 'Sustainable Energy & Renewables', duration: '1-2 yrs', level: 'PG', countries: ['🇩🇪', '🇸🇪', '🇩🇰', '🇳🇱'], color: '#84cc16' },
  { id: 'engineering', category: 'Agriculture & Environment', title: 'Climate Change & Policy', duration: '1-2 yrs', level: 'PG', countries: ['🇸🇪', '🇩🇪', '🇬🇧', '🇨🇭'], color: '#84cc16' },

  // Aviation
  { id: 'engineering', category: 'Aviation & Transport', title: 'Aviation Management', duration: '3 yrs', level: 'UG', countries: ['🇦🇺', '🇺🇸', '🇸🇬', '🇦🇪'], color: '#64748b' },
  { id: 'engineering', category: 'Aviation & Transport', title: 'Logistics & Supply Chain', duration: '1-2 yrs', level: 'PG', countries: ['🇳🇱', '🇸🇬', '🇩🇪', '🇬🇧'], color: '#64748b' },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_COURSES.map(c => c.category)))];
const LEVELS = ['All Levels', 'UG', 'PG', 'UG/PG'];

const StudyAbroadAllCourses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All Levels');

  const filtered = ALL_COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === 'All' || c.category === activeCat;
    const matchLevel = activeLevel === 'All Levels' || c.level.includes(activeLevel);
    return matchSearch && matchCat && matchLevel;
  });

  const grouped = {};
  filtered.forEach(c => {
    if (!grouped[c.category]) grouped[c.category] = [];
    grouped[c.category].push(c);
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 60%, #bae6fd 100%)', padding: '48px 0 36px', borderBottom: '1px solid #e0f2fe' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(91,81,216,0.08)', border: '1px solid rgba(91,81,216,0.2)', color: '#5b51d8', padding: '7px 16px', borderRadius: '50px', cursor: 'pointer', marginBottom: '24px', fontSize: '13px', fontWeight: 700 }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5b51d8', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            <Globe size={14} /> All World Courses
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', marginBottom: '12px' }}>
            Explore <span style={{ color: '#0ea5e9' }}>{ALL_COURSES.length}+ Courses</span> to Study Abroad
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 500 }}>Every major program available globally for Indian students — filter by field, level, and search.</p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '480px', marginTop: '28px' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search courses e.g. Machine Learning, MBA..."
              style={{ width: '100%', padding: '14px 44px 14px 44px', borderRadius: '14px', border: '2px solid #e2e8f0', background: '#fff', color: '#1e293b', fontSize: '14px', fontWeight: 600, outline: 'none', boxSizing: 'border-box', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
            />
            {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={12} /></button>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 0' }}>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {LEVELS.map(l => (
            <button key={l} onClick={() => setActiveLevel(l)} style={{ padding: '7px 16px', borderRadius: '99px', border: `1.5px solid ${activeLevel === l ? '#5b51d8' : '#e2e8f0'}`, background: activeLevel === l ? '#5b51d8' : '#fff', color: activeLevel === l ? '#fff' : '#64748b', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}>{l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px', overflowX: 'auto' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{ padding: '7px 16px', borderRadius: '99px', border: `1.5px solid ${activeCat === cat ? '#5b51d8' : '#e2e8f0'}`, background: activeCat === cat ? '#5b51d8' : '#fff', color: activeCat === cat ? '#fff' : '#64748b', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>{cat}</button>
          ))}
        </div>

        {Object.keys(grouped).length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', fontSize: '18px', fontWeight: 600 }}>No courses found for "{search}"</div>
        )}

        {/* Course Groups */}
        {Object.entries(grouped).map(([category, courses]) => (
          <div key={category} style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '12px', borderBottom: `2px solid ${courses[0].color}25` }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: courses[0].color, flexShrink: 0 }} />
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>{category}</h2>
              <span style={{ background: `${courses[0].color}15`, color: courses[0].color, padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 800 }}>{courses.length} Courses</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {courses.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 30px ${c.color}18` }}
                  style={{ background: '#fff', borderRadius: '18px', padding: '22px', border: `1.5px solid ${c.color}20`, display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${c.color}, ${c.color}50)` }} />

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '6px', lineHeight: 1.3 }}>{c.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: `${c.color}12`, color: c.color, padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 800 }}>{c.duration}</span>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 800 }}>{c.level}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {c.countries.map((flag, fi) => (
                        <span key={fi} style={{ fontSize: '18px' }}>{flag}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/StudyAbroad/Programs/${c.id}`)}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', background: c.color, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}
                    >
                      Explore <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyAbroadAllCourses;
