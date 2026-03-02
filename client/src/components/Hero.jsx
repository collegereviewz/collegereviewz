import React from 'react';
import { Search, CheckCircle, MessageSquare, ChevronRight, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import heroBg from '../assets/background3.png';

const stats = [
  { num: '12,000+', label: 'Verified Reviews' },
  { num: '3,200+', label: 'Colleges Listed' },
  { num: '1.5M+', label: 'Students Helped' },
  { num: '87%', label: 'Satisfaction Rate' },
];

const checks = [
  '10,000+ Verified Student Reviews',
  'AI-powered College Matching',
  'Neutral, Unbiased Expert Guidance',
];



const Hero = ({ onNavigate }) => (
  <>
    {/* ── Responsive CSS ───────────────────────────────────────────────── */}
    <style>{`
      .hero-section {
        background: linear-gradient(160deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.85) 60%),
                    url(${heroBg});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        background-blend-mode: overlay;
        padding-top: 140px;
        padding-bottom: 24px;
        position: relative;
        overflow: hidden;
        min-height: 85vh;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
      }

      .hero-glow-mesh {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: 
          radial-gradient(circle at 10% 10%, rgba(56,189,248,0.08) 0%, transparent 25%),
          radial-gradient(circle at 90% 10%, rgba(91,81,216,0.1) 0%, transparent 30%),
          radial-gradient(circle at 50% 90%, rgba(56,189,248,0.05) 0%, transparent 40%);
        pointer-events: none;
        z-index: 0;
      }

      .floating-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
      }

      @keyframes float-p {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
      }

      .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: #38bdf8;
        border-radius: 50%;
        filter: blur(1px);
        animation: float-p infinite ease-in-out;
      }

      /* ── Two-column grid ── */
      .hero-grid {
        display: grid;
        grid-template-columns: 1.25fr 0.75fr;
        gap: 56px;
        align-items: center;
        padding-top: 40px;
      }

      /* ── Badge ── */
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        background: rgba(91,81,216,0.2);
        border: 1px solid rgba(91,81,216,0.4);
        color: #a5b4fc;
        border-radius: 50px;
        padding: 5px 12px;
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 20px;
      }

      /* ── Headline ── */
      .hero-h1 {
        font-size: clamp(30px, 4.2vw, 58px);
        font-weight: 900;
        color: #fff;
        line-height: 1.1;
        margin-bottom: 18px;
        letter-spacing: -1.5px;
      }

      /* ── Subtext ── */
      .hero-sub {
        color: rgba(255,255,255,0.65);
        font-size: clamp(14px, 1.5vw, 16px);
        line-height: 1.8;
        margin-bottom: 18px;
        font-weight: 400;
      }

      /* ── Checklist ── */
      .hero-checks {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 22px;
        margin-bottom: 24px;
        align-items: center;
        white-space: nowrap;
      }

      /* ── Search bar ── */
      .hero-search-wrap {
        position: relative;
        margin-bottom: 6px;
        max-width: 520px;
      }

      /* ── CTA buttons ── */
      .hero-ctas {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 22px;
      }

      /* ── Stats bar ── */
      .hero-stats {
        display: flex;
        gap: 14px;
        flex-wrap: nowrap;
        padding-top: 18px;
        border-top: 1px solid rgba(255,255,255,0.08);
        overflow: hidden;
      }

      /* ── Inner container ── */
      .hero-inner {
        max-width: 1280px;
        margin: 0 auto;
        width: 100%;
        padding: 0 60px 0 10px;
        position: relative;
        z-index: 10;
        box-sizing: border-box;
      }

      /* ── Right illustration ── */
      .hero-right {
        position: relative;
        padding-left: 40px;
      }

      /* ── Eye blink animation ── */
      @keyframes eyeBlink {
        0%, 93%          { transform: scaleY(1);    }
        95%              { transform: scaleY(0.04);  }
        96.5%            { transform: scaleY(0.04);  }
        99%, 100%        { transform: scaleY(1);    }
      }
      @keyframes eyeBlinkR {
        0%, 93.5%        { transform: scaleY(1);    }
        95.5%            { transform: scaleY(0.04);  }
        97%              { transform: scaleY(0.04);  }
        99.5%, 100%      { transform: scaleY(1);    }
      }
      .robot-eye-l {
        animation: eyeBlink 2s ease-in-out infinite;
        transform-origin: center;
        transform-box: fill-box;
      }
      .robot-eye-r {
        animation: eyeBlinkR 2s ease-in-out infinite;
        transform-origin: center;
        transform-box: fill-box;
      }

      /* ══════════════════════════════════
         TABLET  768px – 1024px
      ══════════════════════════════════ */
      @media (max-width: 1024px) and (min-width: 769px) {
        .hero-section {
          height: auto;
          min-height: 100vh;
          padding-top: 108px;
          padding-bottom: 40px;
          align-items: flex-start;
        }
        .hero-inner { padding: 0 32px; }
        .hero-grid {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .hero-h1 {
          font-size: clamp(24px, 3.5vw, 36px);
        }
        .hero-sub { font-size: 13px; }
        .hero-right { display: block; }
        .hero-stats { flex-wrap: wrap; gap: 10px; }
      }

      /* ══════════════════════════════════
         MOBILE  ≤ 768px
      ══════════════════════════════════ */
      @media (max-width: 768px) {
        .hero-section {
          height: auto;
          min-height: 100vh;
          padding-top: 145px;
          padding-bottom: 60px;
          align-items: flex-start;
          background-position: 43% center;
        }
        .hero-inner { padding: 0 22px; }
        .hero-grid {
          grid-template-columns: 1fr;
          gap: 0;
        }
        .hero-right { display: none; }
        .hero-h1 { font-size: clamp(26px, 7vw, 38px); letter-spacing: -0.5px; margin-bottom: 22px; }
        .hero-sub { font-size: 14px; max-width: 100%; margin-bottom: 26px; line-height: 2; }
        .hero-badge { font-size: 10px; padding: 7px 16px; margin-bottom: 26px; }
        .hero-checks { 
          flex-wrap: wrap; 
          gap: 12px; 
          margin-bottom: 26px;
          white-space: normal;
        }
        .hero-search-wrap { max-width: 100%; margin-bottom: 14px; }
        .hero-ctas { gap: 14px; margin-bottom: 30px; flex-direction: column; }
        .hero-ctas button { font-size: 14px !important; padding: 16px 20px !important; width: 100% !important; justify-content: center; }
        .hero-stats {
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 22px;
        }
        .hero-stat-item { min-width: 42%; }
      }

      /* ══════════════════════════════════
         SMALL MOBILE  ≤ 420px
      ══════════════════════════════════ */
      @media (max-width: 420px) {
        .hero-h1 { font-size: 24px; }
        .hero-sub { font-size: 13px; }
        .hero-ctas { flex-direction: column; }
        .hero-ctas button { width: 100% !important; justify-content: center; }
      }
    `}</style>

    <section className="hero-section">
      {/* Background Enhancements */}
      <div className="hero-glow-mesh" />
      <div className="floating-particles">
        <div className="particle" style={{ top: '20%', left: '10%', animationDuration: '8s' }} />
        <div className="particle" style={{ top: '40%', left: '25%', animationDuration: '12s', width: '2px', height: '2px' }} />
        <div className="particle" style={{ top: '15%', left: '70%', animationDuration: '10s', background: '#818cf8' }} />
        <div className="particle" style={{ top: '60%', left: '85%', animationDuration: '15s' }} />
        <div className="particle" style={{ top: '80%', left: '40%', animationDuration: '9s', width: '4px', height: '4px', opacity: 0.2 }} />
      </div>

      {/* Glow blobs with enhanced intensity */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(91,81,216,0.3) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '-150px', left: '-100px', width: '900px', height: '900px', background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(91,81,216,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="hero-inner">

        <div className="hero-grid">

          {/* ── LEFT ──────────────────────────────── */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-badge"
            >
              <Shield size={12} strokeWidth={2.5} />
              India's #1 Trusted Platform
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-h1"
            >
              India's Most Trusted<br />
              <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                College Reviewz
              </span><br />
              &amp; Counselling Platform
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hero-sub"
            >
              Real ratings from verified students. Explore fees, placements, and campus life.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hero-checks"
            >
              {checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#e2e8f0', fontSize: '13px', fontWeight: 600 }}>
                  <CheckCircle size={15} style={{ color: '#38bdf8', flexShrink: 0 }} strokeWidth={2.5} />
                  {c}
                </div>
              ))}
            </motion.div>

            <div className="hero-search-wrap">
              <input
                type="text"
                placeholder="Search colleges, courses, exams or reviews..."
                style={{
                  width: '100%', padding: '14px 62px 14px 22px',
                  background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '50px', color: '#fff', fontSize: '13px',
                  outline: 'none', backdropFilter: 'blur(10px)',
                  boxSizing: 'border-box', fontFamily: 'inherit', fontWeight: 400
                }}
                onFocus={e => e.target.style.borderColor = '#38bdf8'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
              <button style={{
                position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)',
                background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
                border: 'none', borderRadius: '50px', padding: '9px 18px',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center'
              }}>
                <Search size={17} strokeWidth={2.5} />
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '22px', marginBottom: '18px' }}>
              Every review is manually verified for authenticity.
            </p>

            <div className="hero-ctas">
              <button 
                onClick={() => onNavigate('Explore Colleges')}
                style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', padding: '13px 28px', borderRadius: '50px', fontWeight: 800, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(91,81,216,0.25)', fontFamily: 'inherit', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(91,81,216,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(91,81,216,0.25)'; }}>
                Find College
              </button>
              <button style={{ background: 'transparent', color: '#fff', padding: '13px 24px', borderRadius: '50px', fontWeight: 800, fontSize: '13px', border: '2px solid rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent'; }}>
                Get Expert Counselling
              </button>
              <button style={{ background: '#fff', color: '#1e293b', padding: '13px 24px', borderRadius: '50px', fontWeight: 800, fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 6px 20px rgba(0,0,0,0.2)', fontFamily: 'inherit', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Write A Review &amp; Earn <ChevronRight size={15} strokeWidth={3} style={{ color: '#5b51d8' }} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginBottom: '24px' }}>
              {[
                { label: 'Verified\nStudent Reviews' },
                { label: 'Trusted By\n1.5M+ Students' },
                { label: 'AI + Human\nValidation System' },
                { label: 'ISO Certified\nData Handling' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} style={{ color: '#38bdf8', flexShrink: 0 }} strokeWidth={2} />
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: 600, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="hero-stat-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle size={15} style={{ color: '#38bdf8' }} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 900, fontSize: '15px', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────── */}
          <div className="hero-right">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(91,81,216,0.3) 0%, transparent 70%)', zIndex: 0, borderRadius: '50%' }} />



            <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px', margin: '0 auto', display: 'flex', justifyContent: 'center', height: '400px' }}>
              {/* Image is now part of the global hero background per request */}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Hero;
