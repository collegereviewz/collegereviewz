import React from 'react';
import { Star, GraduationCap, BookOpen, FileText, Users, ArrowLeftRight, Globe } from 'lucide-react';

const items = [
  { title: 'Verified Reviews', desc: '12,000+ verified student-led reviews', icon: Star, accent: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { title: 'Colleges Directory', desc: 'Find Colleges by Course, State, Fees & Ranking', icon: GraduationCap, accent: '#5b51d8', bg: '#eef2ff', border: '#c7d2fe', badge: '3,200+ colleges' },
  { title: 'Courses & Careers', desc: 'Explore 140+ disciplines and future career paths', icon: BookOpen, accent: '#0ea5e9', bg: '#e0f2fe', border: '#bae6fd' },
  { title: 'Entrance Exams', desc: 'NEET, JEE, CUET, UPSC, CAT, GATE & more', icon: FileText, accent: '#8b5cf6', bg: '#ede9fe', border: '#c4b5fd' },
  { title: 'Counselling Support', desc: 'Personalized guidance from neutral experts', icon: Users, accent: '#5b51d8', bg: '#eef2ff', border: '#c7d2fe' },
  { title: 'Compare Colleges', desc: 'Side-by-side comparison of placements & fees', icon: ArrowLeftRight, accent: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
  { title: 'Scholarships & Fees', desc: 'Financial aid, costs & educational loan guidance', icon: GraduationCap, accent: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
  { title: 'Study Abroad', desc: 'International opportunities and visa support', icon: Globe, accent: '#ec4899', bg: '#fdf2f8', border: '#fbcfe8' },
];

const ExploreSection = ({ onNavigate }) => {
  return (
    <section style={{ padding: '72px 32px', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: '#5b51d8', opacity: 0.4 }} />
            Explore
            <div style={{ width: '32px', height: '1px', background: '#5b51d8', opacity: 0.4 }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#111827', marginBottom: '20px', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
            Everything You Need — <br />
            <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              In One Place
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', fontWeight: 500, margin: '0 auto', lineHeight: 1.7 }}>
            From finding colleges to comparing fees — we give you every tool to navigate your higher education journey with confidence.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="explore-grid">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (item.title === 'Colleges Directory') onNavigate('Explore Colleges');
                if (item.title === 'Courses & Careers') onNavigate('Courses');
              }}
              style={{
                background: '#fff', borderRadius: '20px', padding: '24px 22px',
                border: '1.5px solid #f1f5f9', cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease', position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 24px 60px rgba(${item.accent === '#5b51d8' ? '91,81,216' : '0,0,0'},0.12)`;
                e.currentTarget.style.borderColor = item.border;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#f1f5f9';
              }}
            >
              {/* Badge */}
              {item.badge && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  backgroundColor: item.bg, color: item.accent,
                  fontSize: '10px', fontWeight: 800, padding: '4px 10px',
                  borderRadius: '50px', letterSpacing: '0.05em', border: `1px solid ${item.border}`
                }}>
                  {item.badge}
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px', border: `1.5px solid ${item.border}`
              }}>
                <item.icon size={22} style={{ color: item.accent }} strokeWidth={2.2} />
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '6px', letterSpacing: '-0.2px' }}>{item.title}</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .explore-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .explore-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default ExploreSection;
