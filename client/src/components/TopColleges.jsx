import React, { useState } from 'react';
import { Star, MapPin, Award, ChevronRight, BookOpen } from 'lucide-react';
import { getCollegeLogo, guessDomainByName } from '../utils/logoUtils';

const colleges = [
  { name: 'IIT Delhi', location: 'New Delhi, India', rating: 4.8, reviews: 2340, courses: 42, fees: '₹2.2L/yr', rank: '#1 Engineering', website: 'https://home.iitd.ac.in', color: '#c7001e' },
  { name: 'AIIMS New Delhi', location: 'New Delhi, India', rating: 4.9, reviews: 3120, courses: 18, fees: '₹1.6K/yr', rank: '#1 Medical', website: 'https://www.aiims.edu', color: '#0a6fb8' },
  { name: 'IIM Ahmedabad', location: 'Ahmedabad, Gujarat', rating: 4.7, reviews: 1890, courses: 12, fees: '₹23L/yr', rank: '#1 Management', website: 'https://www.iima.ac.in', color: '#7c3aed' },
  { name: 'NIT Trichy', location: 'Tiruchirappalli, TN', rating: 4.6, reviews: 1450, courses: 36, fees: '₹1.5L/yr', rank: '#5 Engineering', website: 'https://www.nitt.edu', color: '#047857' },
  { name: 'Manipal University', location: 'Manipal, Karnataka', rating: 4.5, reviews: 2800, courses: 80, fees: '₹4.5L/yr', rank: '#8 Private Univ', website: 'https://www.manipal.edu', color: '#b45309' },
  { name: 'BITS Pilani', location: 'Pilani, Rajasthan', rating: 4.7, reviews: 2100, courses: 28, fees: '₹5.2L/yr', rank: '#3 Engineering', website: 'https://www.bits-pilani.ac.in', color: '#e11d48' },
];

const categories = ['All', 'Engineering', 'Medical', 'MBA', 'Law', 'Arts'];

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map(s => (
      <Star key={s} size={13} fill={s <= Math.round(rating) ? '#f59e0b' : 'transparent'} style={{ color: '#f59e0b' }} strokeWidth={2} />
    ))}
  </div>
);

const TopColleges = () => {
  const [active, setActive] = useState('All');

  return (
    <section style={{ padding: '72px 32px', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: '#5b51d8', opacity: 0.4 }} />
            Top Colleges
            <div style={{ width: '32px', height: '1px', background: '#5b51d8', opacity: 0.4 }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#111827', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            India's Best Colleges — <span style={{ color: '#38bdf8' }}>Rated by Students</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontWeight: 500 }}>
            Real ratings from verified students. Explore fees, placements, and campus life.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '10px 24px', borderRadius: '50px', fontWeight: 700, fontSize: '14px',
                cursor: 'pointer', border: 'none', transition: 'all 0.2s ease', fontFamily: 'inherit',
                background: active === cat ? '#111827' : '#f8fafc',
                color: active === cat ? '#fff' : '#64748b',
                boxShadow: active === cat ? '0 4px 16px rgba(17,24,39,0.2)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* College Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="colleges-grid">
          {colleges.map((col, i) => {
            const logoUrl = getCollegeLogo(col.website || guessDomainByName(col.name), col.name);
            
            return (
              <div
                key={i}
                style={{
                  background: '#fff', borderRadius: '24px', padding: '24px 20px',
                  border: '1.5px solid #f1f5f9', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s ease',
                  display: 'flex', flexDirection: 'column', gap: '16px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 32px 80px rgba(91,81,216,0.14)';
                  e.currentTarget.style.borderColor = '#e0e7ff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = '#f1f5f9';
                }}
              >
                {/* Top: Rank badge + Logo */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '12px', 
                    background: logoUrl ? '#fff' : col.color, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: '#fff', fontWeight: 900, fontSize: '12px', overflow: 'hidden',
                    border: '1px solid #f1f5f9'
                  }}>
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={col.name} 
                        style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.background = col.color;
                          e.target.parentElement.innerHTML = col.name.split(' ').map(n => n[0]).join('');
                        }}
                      />
                    ) : (
                      col.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '10px', fontWeight: 800, padding: '5px 10px', borderRadius: '50px', border: '1px solid #bbf7d0', letterSpacing: '0.05em' }}>
                  {col.rank}
                </span>
              </div>

              {/* Name + Location */}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#111827', marginBottom: '4px', letterSpacing: '-0.3px' }}>{col.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '12.5px', fontWeight: 600 }}>
                  <MapPin size={12} strokeWidth={2.5} />
                  {col.location}
                </div>
              </div>

              {/* Ratings */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#fafafa', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                <Stars rating={col.rating} />
                <span style={{ fontSize: '14px', fontWeight: 900, color: '#111827' }}>{col.rating}</span>
                <span style={{ color: '#94a3b8', fontSize: '11.5px', fontWeight: 600 }}>({col.reviews.toLocaleString()})</span>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#5b51d8', marginBottom: '3px' }}>
                    <BookOpen size={12} strokeWidth={2.5} />
                    <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Courses</span>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '16px', color: '#111827' }}>{col.courses}+</div>
                </div>
                <div style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', marginBottom: '3px' }}>
                    <Award size={12} strokeWidth={2.5} />
                    <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg. Fees</span>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '16px', color: '#111827' }}>{col.fees}</div>
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button style={{
                  flex: 1, padding: '12px 6px', borderRadius: '12px',
                  background: '#111827', color: '#fff', fontWeight: 800, fontSize: '12px',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#5b51d8'}
                onMouseLeave={e => e.currentTarget.style.background = '#111827'}
                >
                  Read Reviews
                </button>
                <button style={{
                  flex: 1, padding: '12px 6px', borderRadius: '12px',
                  background: '#f1f5f9', color: '#475569', fontWeight: 800, fontSize: '12px',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
                >
                  View College
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 1200px) { .colleges-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) { .colleges-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .colleges-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default TopColleges;
