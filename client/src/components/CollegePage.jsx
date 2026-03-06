import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Award, BookOpen, ExternalLink, Globe, BookMarked,
  DollarSign, Users, TrendingUp, ChevronRight, Share2, Heart, Download, ArrowLeft
} from 'lucide-react';
import { getCollegeLogo, guessDomainByName } from '../utils/logoUtils';

const CollegePage = ({ college }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  if (!college) return null;

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', paddingTop: '80px', fontFamily: "'Inter', sans-serif" }}>

      {/* Back Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', maxWidth: '1440px', margin: '0 auto' }}
        onClick={() => navigate(-1)}>
        <ArrowLeft size={18} color="#5b51d8" />
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#5b51d8' }}>Back to Colleges</span>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px' }}>

        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 60%, #5b51d8)',
          borderRadius: '24px', padding: '40px', marginBottom: '28px',
          color: '#fff', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />

          <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', position: 'relative' }}>
            {/* Logo */}
            <div style={{ width: '90px', height: '90px', background: '#fff', borderRadius: '16px', padding: '12px', flexShrink: 0 }}>
              <img src={college.logo || `https://logo.clearbit.com/${college.domain}`}
                   alt={college.name}
                   style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                   onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(college.name)}&background=5b51d8&color=fff&size=80&bold=true`; }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                {(college.badges || []).map(b => (
                  <span key={b} style={{ padding: '4px 12px', background: 'rgba(56,189,248,0.2)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: '50px', fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>{b}</span>
                ))}
                <span style={{ padding: '4px 12px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '50px', fontSize: '11px', fontWeight: 700, color: '#10b981' }}>{college.type}</span>
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 950, marginBottom: '8px', lineHeight: 1.3 }}>{college.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                <MapPin size={15} /> {college.location}
              </div>

              {/* Rating + Quick Stats */}
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontWeight: 900, fontSize: '18px' }}>{college.rating}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>/ 5 ({college.reviews} reviews)</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{college.ranking}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
              <button
                onClick={() => setSaved(s => !s)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: saved ? '#ef4444' : 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                <Heart size={15} fill={saved ? '#fff' : 'none'} /> {saved ? 'Saved' : 'Save'}
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                <Download size={15} /> Brochure
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#10b981', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
                <ChevronRight size={15} /> Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
          {[
            { label: 'Total Fees', value: college.fees, sub: college.feesType, icon: <DollarSign size={22} color="#10b981" />, color: '#10b981' },
            { label: 'Average Package', value: college.placement, sub: 'Highest: ' + college.highestPlacement, icon: <TrendingUp size={22} color="#38bdf8" />, color: '#38bdf8' },
            { label: 'NIRF Ranking', value: college.ranking, sub: 'India Rankings 2026', icon: <Award size={22} color="#f59e0b" />, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: `${s.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 950, color: s.color, marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* About */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>About {college.shortName || college.name}</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', fontWeight: 500 }}>{college.about}</p>
            </div>

            {/* Courses Offered */}
            {college.courses && (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '20px' }}>
                  <BookOpen size={20} style={{ display: 'inline', marginRight: '8px', color: '#5b51d8' }} />
                  Courses Offered
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {college.courses.map((c, i) => (
                    <div key={i} style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{c.duration} | {c.fees}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admission Process */}
            {college.admission && (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>Admission</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {college.admission.map((a, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#475569', fontWeight: 600, alignItems: 'flex-start' }}>
                      <span style={{ width: '22px', height: '22px', background: 'linear-gradient(135deg,#5b51d8,#38bdf8)', borderRadius: '50%', color: '#fff', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i+1}</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Quick Facts */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>Quick Facts</h3>
              {(college.facts || []).map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < (college.facts.length - 1) ? '1px solid #f1f5f9' : 'none' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>{f.label}</span>
                  <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: 900, textAlign: 'right', maxWidth: '55%' }}>{f.value}</span>
                </div>
              ))}
            </div>

            {/* External Links */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1.5px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>Explore More</h3>
              {[
                { label: 'Official Website', url: college.sources?.official, icon: <Globe size={15} />, isOfficial: true },
                { label: 'Wikipedia', url: college.sources?.wikipedia, icon: <BookMarked size={15} /> },
                { label: 'Shiksha', url: college.sources?.shiksha, icon: <ExternalLink size={15} /> },
                { label: 'CollegeDunia', url: college.sources?.collegedunia, icon: <ExternalLink size={15} /> },
                { label: 'Career360', url: college.sources?.career360, icon: <ExternalLink size={15} /> },
              ].filter(l => l.url).map(link => {
                const logoUrl = link.isOfficial ? getCollegeLogo(link.url || guessDomainByName(college.name), college.name) : null;
                
                return (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #f1f5f9', textDecoration: 'none', color: '#5b51d8', fontSize: '13px', fontWeight: 700 }}>
                    {logoUrl ? (
                      <div style={{ width: '20px', height: '20px', background: '#f8fafc', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <img 
                          src={logoUrl} 
                          alt="logo" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                          onError={(e) => { 
                            e.target.style.display = 'none';
                            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            svg.setAttribute("width", "14");
                            svg.setAttribute("height", "14");
                            svg.setAttribute("viewBox", "0 0 24 24");
                            svg.setAttribute("fill", "none");
                            svg.setAttribute("stroke", "currentColor");
                            svg.setAttribute("stroke-width", "2");
                            svg.setAttribute("stroke-linecap", "round");
                            svg.setAttribute("stroke-linejoin", "round");
                            svg.innerHTML = '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>';
                            e.target.parentElement.appendChild(svg);
                          }} 
                        />
                      </div>
                    ) : link.icon} 
                    {link.label}
                    <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
};

export default CollegePage;
