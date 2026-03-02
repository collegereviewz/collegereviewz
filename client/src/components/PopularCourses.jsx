import { Heart, Settings, Briefcase, Monitor, Landmark, Scale, Palette, FlaskConical, ChevronRight, Stethoscope, Code } from 'lucide-react';

const courses = [
  { name: 'Medical', sub: 'NEET • MBBS • Cutoff', desc: 'Your journey from NEET aspirant to successful Doctor starts here.', icon: Heart, accent: '#e11d48', bg: '#fff1f2', border: '#fecdd3' },
  { name: 'Engineering', sub: 'JEE • B.Tech • IITs', desc: "Build the future with India's most versatile and in-demand degree.", icon: Settings, accent: '#0ea5e9', bg: '#e0f2fe', border: '#bae6fd' },
  { name: 'MBA', sub: 'CAT • IIMs • ROI', desc: 'High-paying leadership roles and fast-track corporate growth.', icon: Briefcase, accent: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd' },
  { name: 'Computer Science', sub: 'JEE • CSE • Rank', desc: 'Join the highest-paid industry driving the global tech revolution.', icon: Monitor, accent: '#5b51d8', bg: '#eef2ff', border: '#c7d2fe' },
  { name: 'BBA', sub: 'SET • NPAT • ROI', desc: 'The elite business degree for future CEOs and luxury brand managers.', icon: Briefcase, accent: '#4338ca', bg: '#eef2ff', border: '#c7d2fe', featured: true },
  { name: 'BCA', sub: 'IPU CET • IT • Dev', desc: 'Master software development and join the booming digital economy.', icon: Code, accent: '#0ea5e9', bg: '#e0f2fe', border: '#bae6fd' },
  { name: 'B.Sc Nursing', sub: 'NEET • INC • Health', desc: 'Become a respected healthcare leader in patient care and medicine.', icon: Stethoscope, accent: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  { name: 'Arts & Humanities', sub: 'UPSC • Media • Policy', desc: 'The high-value foundation for Civil Services and creative leadership.', icon: Palette, accent: '#db2777', bg: '#fdf2f8', border: '#fbcfe8' },
];

const PopularCourses = ({ onNavigate }) => (
  <section style={{ padding: '96px 32px', background: '#f8fafc' }}>
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '1px', background: '#5b51d8', opacity: 0.4 }} />
          Popular Courses
          <div style={{ width: '32px', height: '1px', background: '#5b51d8', opacity: 0.4 }} />
        </div>
        <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#111827', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
          Most Popular Courses <br />
          <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Students Search</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7, fontWeight: 500 }}>
          Discover the most sought-after career paths, entrance exams, and the best colleges to pursue your dreams.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="courses-grid">
        {courses.map((course, i) => (
          <div
            key={i}
            onClick={() => onNavigate('Courses')}
            style={{
              background: course.featured ? '#111827' : '#fff',
              borderRadius: '28px',
              padding: '36px 28px',
              border: course.featured ? '1.5px solid #1e293b' : '1.5px solid #f1f5f9',
              cursor: 'pointer',
              boxShadow: course.featured ? '0 24px 60px rgba(17,24,39,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Icon */}
            <div style={{
              width: '60px', height: '60px', borderRadius: '18px',
              background: course.featured ? 'rgba(255,255,255,0.1)' : course.bg,
              border: `1.5px solid ${course.featured ? 'rgba(255,255,255,0.15)' : course.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <course.icon size={26} strokeWidth={2.2} style={{ color: course.featured ? '#fff' : course.accent }} />
            </div>

            {/* Name */}
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: course.featured ? '#fff' : '#111827', marginBottom: '4px', letterSpacing: '-0.3px' }}>{course.name}</h3>
            <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: course.featured ? 'rgba(255,255,255,0.5)' : course.accent, marginBottom: '14px' }}>{course.sub}</p>
            <p style={{ fontSize: '13px', color: course.featured ? 'rgba(255,255,255,0.6)' : '#64748b', lineHeight: 1.65, fontWeight: 500, marginBottom: '32px', flexGrow: 1 }}>{course.desc}</p>

            {/* Button */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{
                flex: 1, padding: '14px 12px', borderRadius: '16px',
                background: course.featured ? 'linear-gradient(135deg, #5b51d8, #38bdf8)' : '#111827',
                color: '#fff', fontWeight: 800, fontSize: '12px',
                border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em',
                boxShadow: course.featured ? '0 8px 24px rgba(91,81,216,0.4)' : '0 4px 12px rgba(17,24,39,0.15)',
                transition: 'all 0.2s ease', fontFamily: 'inherit'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View Details
              </button>
              <button style={{
                width: '46px', height: '46px', borderRadius: '14px', border: `1.5px solid ${course.featured ? 'rgba(255,255,255,0.2)' : '#f1f5f9'}`,
                background: 'transparent', color: course.featured ? '#fff' : '#94a3b8',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}>
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      @media (max-width: 1024px) { .courses-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 640px) { .courses-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

export default PopularCourses;
