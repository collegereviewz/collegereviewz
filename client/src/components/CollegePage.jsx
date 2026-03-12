import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, MapPin, Award, BookOpen, ExternalLink, Globe, BookMarked,
  DollarSign, Users, TrendingUp, ChevronRight, Share2, Heart, Download, ArrowLeft, ChevronDown
} from 'lucide-react';
import { getCollegeLogo, guessDomainByName } from '../utils/logoUtils';

const CollegePage = ({ college }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('Info');
  const [showCutoffDropdown, setShowCutoffDropdown] = useState(false);

  if (!college) return null;

  // Dynamic cutoff exams based on college type
  let cutoffExams = ['General Cutoff 2025', 'Previous Year Cutoffs'];
  const type = (college.type || college.name || '').toLowerCase();
  const state = (college.state || '').toLowerCase();
  const locationStr = (college.location || '').toLowerCase();

  const isWestBengal = state.includes('west bengal') || locationStr.includes('west bengal') || locationStr.includes('kolkata') || locationStr.includes('howrah') || locationStr.includes('durgapur');

  if (type.includes('engineering') || type.includes('technology') || type.includes('institute of technology') || type.includes('nit') || type.includes('iit')) {
    cutoffExams = ['JEE Main 2025', 'JEE Advanced 2025', 'GATE 2025'];
    if (isWestBengal) {
      cutoffExams.push('WBJEE 2025');
    }
  } else if (type.includes('medical') || type.includes('dental') || type.includes('aiims')) {
    cutoffExams = ['NEET UG 2025', 'NEET PG 2025', 'AYUSH', 'INI CET'];
  } else if (type.includes('management') || type.includes('business') || type.includes('iim')) {
    cutoffExams = ['CAT 2025', 'MAT 2025', 'XAT', 'CMAT'];
  } else if (type.includes('law') || type.includes('nlu')) {
    cutoffExams = ['CLAT 2025', 'LSAT India', 'AILET'];
  }

  const tabs = [
    'Info', 'Courses & Fees', 'Admission 2026', 'CutOff',
    'Placement', 'Reviews', 'Department', 'Ranking',
    'Gallery', 'Scholarship', 'Faculty', 'News & Articles'
  ];

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

        {/* Tab Navigation */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '0 24px', marginBottom: '28px',
          border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', overflowX: 'auto',
          scrollbarWidth: 'none', msOverflowStyle: 'none', position: 'relative'
        }}>
          <style>{`
            .tab-container::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="tab-container" style={{ display: 'flex', gap: '32px', flex: 1 }}>
            {tabs.map(tab => (
              <div
                key={tab}
                onMouseEnter={() => tab === 'CutOff' && setShowCutoffDropdown(true)}
                onMouseLeave={() => tab === 'CutOff' && setShowCutoffDropdown(false)}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '20px 0',
                  color: activeTab === tab ? '#38bdf8' : '#64748b',
                  fontWeight: activeTab === tab ? 800 : 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #38bdf8' : '3px solid transparent',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {tab}
                {tab === 'CutOff' && <ChevronDown size={14} style={{ color: activeTab === tab ? '#38bdf8' : '#94a3b8' }} />}

                {/* Dropdown for CutOff */}
                {tab === 'CutOff' && showCutoffDropdown && (
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', minWidth: '220px',
                    zIndex: 50, padding: '8px 0', marginTop: '2px',
                    display: 'flex', flexDirection: 'column'
                  }}>
                    {cutoffExams.map((exam, i) => (
                      <div
                        key={exam}
                        style={{
                          padding: '12px 20px', fontSize: '13px', fontWeight: 600, color: '#475569',
                          cursor: 'pointer', borderBottom: i < cutoffExams.length - 1 ? '1px solid #f1f5f9' : 'none',
                          transition: 'background 0.2s ease, color 0.2s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#5b51d8'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}
                        onClick={(e) => { e.stopPropagation(); setActiveTab('CutOff'); setShowCutoffDropdown(false); }}
                      >
                        {exam}
                      </div>
                    ))}
                    <div
                      style={{
                        padding: '12px 20px', fontSize: '13px', fontWeight: 700, color: '#38bdf8',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'
                      }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                      onClick={(e) => { e.stopPropagation(); setActiveTab('CutOff'); setShowCutoffDropdown(false); }}
                    >
                      Read More
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ paddingLeft: '16px', borderLeft: '1px solid #e2e8f0', cursor: 'pointer' }}>
            <ChevronRight size={20} color="#94a3b8" />
          </div>
        </div>

        {/* Dynamic Content based on Active Tab */}
        {activeTab === 'CutOff' ? (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', border: '1.5px solid #e2e8f0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>{college.name} Cutoffs</h2>
            <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px' }}>
              Explore category-wise closing ranks, previous year trends, and detailed admission cutoffs for all programs offered at {college.shortName || college.name}.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', textAlign: 'left' }}>
              {cutoffExams.map(exam => (
                <div key={exam} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#334155', marginBottom: '8px' }}>{exam} Cutoff</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>View closing ranks and counseling details.</div>
                  <button style={{ background: '#fff', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '8px', color: '#5b51d8', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Total Fees', value: college.fees, sub: college.feesType, icon: <DollarSign size={20} color="#10b981" />, color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
                  { label: 'Average Package', value: college.placement, sub: 'Highest: ' + college.highestPlacement, icon: <TrendingUp size={20} color="#38bdf8" />, color: '#0ea5e9', bg: '#e0f2fe', border: '#bae6fd' },
                  { label: 'NIRF Ranking', value: college.ranking, sub: 'India Rankings 2026', icon: <Award size={20} color="#f59e0b" />, color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
                ].map((s, i) => (
                  <div key={i} style={{ background: s.bg, borderRadius: '16px', padding: '20px', border: `1px solid ${s.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ background: '#fff', padding: '6px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{s.icon}</div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 950, color: '#111827', marginBottom: '4px' }}>{s.value}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* About */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>About {college.shortName || college.name}</h2>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', fontWeight: 500 }}>{college.about}</p>
              </div>

              {/* Courses Offered */}
              {college.courses && (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '20px' }}>
                    <BookOpen size={20} style={{ display: 'inline', marginRight: '8px', color: '#10b981' }} />
                    Courses Offered
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {college.courses.map((c, i) => (
                      <div key={i} style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{c.name}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{c.duration}</div>
                          <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 800 }}>{c.fees}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admission Process */}
              {college.admission && (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', border: '1.5px solid #e2e8f0' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>Admission Process</h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {college.admission.map((a, i) => (
                      <li key={i} style={{ display: 'flex', gap: '14px', fontSize: '14px', color: '#475569', fontWeight: 600, alignItems: 'flex-start', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <span style={{ width: '24px', height: '24px', background: '#38bdf8', borderRadius: '50%', color: '#fff', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 8px rgba(56,189,248,0.3)' }}>{i + 1}</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Featured Card */}
              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', marginBottom: '16px' }}>Are You Interested in this College?</h3>
                <button style={{ width: '100%', background: '#ea580c', color: '#fff', padding: '14px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', border: 'none', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Apply Now <ChevronRight size={16} />
                </button>
                <button style={{ width: '100%', background: '#3b82f6', color: '#fff', padding: '14px', borderRadius: '100px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Download Brochure <Download size={16} />
                </button>
              </div>

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
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #f1f5f9', textDecoration: 'none', color: '#38bdf8', fontSize: '13px', fontWeight: 800 }}>
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
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
};

export default CollegePage;
