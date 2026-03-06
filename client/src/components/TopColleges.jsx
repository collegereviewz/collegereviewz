import React, { useState, useEffect } from 'react';
import { Star, MapPin, Award, ChevronRight, BookOpen, Loader2 } from 'lucide-react';
import { getCollegeLogo, guessDomainByName } from '../utils/logoUtils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Engineering', 'Medical', 'MBA', 'Law', 'Arts'];

const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(s => (
      <Star key={s} size={13} fill={s <= Math.round(rating) ? '#f59e0b' : 'transparent'} style={{ color: '#f59e0b' }} strokeWidth={2} />
    ))}
  </div>
);

const TopColleges = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('All');
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopColleges = async () => {
      try {
        setLoading(true);
        // Map UI categories to API course filters
        let courseFilter = active;
        if (active === 'Engineering') courseFilter = 'BE/B.Tech';
        if (active === 'Medical') courseFilter = 'MBBS';

        const params = {
          limit: 12,
          course: courseFilter === 'All' ? 'All' : courseFilter
        };

        const res = await axios.get('http://localhost:5000/api/colleges', { params });
        if (res.data.success) {
          setColleges(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching top colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopColleges();
  }, [active]);

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
            Real ratings from verified students. Explore proper fees, placements, and campus life.
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
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <Loader2 className="animate-spin" size={40} color="#5b51d8" />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="colleges-grid">
            {colleges.map((col, i) => {
              const domain = col.officialWebsite || guessDomainByName(col.name);
              const logoUrl = getCollegeLogo(domain, col.name);

              // Formatting Proper Fee
              let displayFee = col.fees || "Check Website";
              if (!col.fees && col.courses?.length > 0) {
                const minFee = Math.min(...col.courses.map(c => parseInt(c.fees?.replace(/[^0-9]/g, '') || '0')).filter(f => f > 0));
                if (minFee !== Infinity) displayFee = `₹${(minFee / 100000).toFixed(1)}L/yr`;
              }

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
                      background: '#fff',
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
                            e.target.parentElement.style.background = '#5b51d8';
                            e.target.parentElement.innerHTML = col.name.split(' ').map(n => n[0]).join('');
                          }}
                        />
                      ) : (
                        col.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '10px', fontWeight: 800, padding: '5px 10px', borderRadius: '50px', border: '1px solid #bbf7d0', letterSpacing: '0.05em' }}>
                      #{i + 1} Best
                    </span>
                  </div>

                  {/* Name + Location */}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#111827', marginBottom: '4px', letterSpacing: '-0.3px', height: '44px', overflow: 'hidden' }}>{col.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>
                      <MapPin size={12} strokeWidth={2.5} />
                      {col.district}, {col.state}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#fafafa', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                    <Stars rating={col.rating || 4.5} />
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#111827' }}>{Number(col.rating || 4.5).toFixed(1)}</span>
                    <span style={{ color: '#94a3b8', fontSize: '11.5px', fontWeight: 600 }}>({(col.reviewsCount || 100).toLocaleString()})</span>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#5b51d8', marginBottom: '2px' }}>
                          <BookOpen size={10} strokeWidth={3} />
                          <span style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Average Package</span>
                        </div>
                        <div style={{ fontWeight: 900, fontSize: '13px', color: '#111827' }}>{col.avgPackage || '—'}</div>
                      </div>
                      <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', marginBottom: '2px' }}>
                          <Award size={10} strokeWidth={3} />
                          <span style={{ fontSize: '8.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Highest Package</span>
                        </div>
                        <div style={{ fontWeight: 900, fontSize: '13px', color: '#111827' }}>{col.highestPackage || '—'}</div>
                      </div>
                    </div>
                    <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
                        <Award size={12} strokeWidth={2.5} />
                        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>Courses & Fees</span>
                      </div>
                      <div style={{ fontWeight: 900, fontSize: '13px', color: '#111827' }}>{displayFee}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/college/${encodeURIComponent(col.name)}`, { state: { collegeData: col, activeTab: 'Reviews' } });
                      }}
                      style={{
                        flex: 1, padding: '12px 2px', borderRadius: '12px',
                        background: '#111827', color: '#fff', fontWeight: 800, fontSize: '11px',
                        border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit'
                      }}
                    >
                      Read Reviews
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/college/${encodeURIComponent(col.name)}`, { state: { collegeData: col } });
                      }}
                      style={{
                        flex: 1, padding: '12px 2px', borderRadius: '12px',
                        background: '#f1f5f9', color: '#475569', fontWeight: 800, fontSize: '11px',
                        border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit'
                      }}
                    >
                      View College
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
