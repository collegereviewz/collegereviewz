import React, { useState, useEffect } from 'react';
import { Gift, Users, Trophy, Copy, Search, Clock, ChevronRight, Share2, Star, PenTool, UserPlus, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RewardsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 12,
    minutes: 21,
    seconds: 7
  });

  // Simple timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: 'Write Reviews',
      points: '300 points',
      desc: 'for each approved review',
      icon: PenTool,
      color: '#5b51d8',
      bg: 'rgba(91,81,216,0.1)'
    },
    {
      title: 'Refer Friends',
      points: '20 points',
      desc: 'per successful referral',
      icon: UserPlus,
      color: '#38bdf8',
      bg: 'rgba(56,189,248,0.1)'
    },
    {
      title: 'Win Contests',
      points: '100,000 points',
      desc: 'to win up to 100,000 points',
      icon: CheckCircle,
      color: '#5b51d8',
      bg: 'rgba(91,81,216,0.1)'
    }
  ];

  return (
    <section style={{ padding: '40px 24px', background: '#f0f4ff', position: 'relative', overflow: 'hidden' }}>
      {/* Background accents */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(91,81,216,0.05) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(350px, 1.2fr) 1fr', gap: '40px', alignItems: 'start' }} className="rewards-grid">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', padding: '6px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
            Earn Rewards
          </div>
          
          <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#1e293b', marginBottom: '12px', lineHeight: 1.1, letterSpacing: '-0.3px' }}>
            Write a Review, Refer and <span style={{ color: '#5b51d8' }}>Win Up To</span>
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '13px', maxWidth: '450px', marginBottom: '24px', lineHeight: 1.6, fontWeight: 500 }}>
            Earn points for sharing your college experience and helping other students make better decisions.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 6 }}
                style={{ 
                  background: '#fff', padding: '12px 20px', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', gap: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color }}>
                  <f.icon size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginBottom: '1px' }}>{f.title}</h4>
                  <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                    Earn <span style={{ color: '#5b51d8', fontWeight: 800 }}>{f.points}</span> {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ 
            background: '#1e293b', padding: '18px', borderRadius: '20px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(15,23,42,0.1)'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h4 style={{ color: '#fff', fontSize: '13px', fontWeight: 900, marginBottom: '14px' }}>Unlock Your Referral Code to Start Earning</h4>
              <div style={{ display: 'flex', gap: '0', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '10px 16px', color: '#fff', fontWeight: 900, fontSize: '16px', letterSpacing: '2px' }}>
                  ALL-123
                </div>
                <button style={{ 
                  background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', border: 'none', 
                  padding: '0 32px', fontWeight: 900, cursor: 'pointer', fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}>
                  Copy
                </button>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '16px', fontWeight: 600 }}>
                Share this code with friends to earn 20 points for each referral
              </p>
            </div>
            {/* Background decorative element */}
            <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '240px', height: '240px', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          </div>
        </motion.div>

        {/* Right Side: Card & Contest */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            background: '#fff', padding: '24px', borderRadius: '24px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.05)', border: '1.5px solid #f1f5f9'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '32px' }}>December Contest Ends In:</h4>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {[
                { val: timeLeft.days, label: 'Days' },
                { val: timeLeft.hours, label: 'Hours' },
                { val: timeLeft.minutes, label: 'Minutes' },
                { val: timeLeft.seconds, label: 'Seconds' }
              ].map((t, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 950, color: '#5b51d8', marginBottom: '2px', position: 'relative', minWidth: '36px' }}>
                    {String(t.val).padStart(2, '0')}
                    {i < 3 && <span style={{ color: '#cbd5e1', marginLeft: '6px', position: 'absolute' }}>:</span>}
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '2px', background: '#f1f5f9', marginBottom: '40px' }} />

          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '32px' }}>This Month's Prizes</h4>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px' }}>
              {/* 2nd Place */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ background: '#d1d5db', height: '60px', borderRadius: '12px 12px 6px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#4b5563' }}>2nd</div>
                  <div style={{ fontSize: '13px', fontWeight: 950, color: '#1e293b' }}>₹5,000</div>
                  <div style={{ fontSize: '8px', color: '#6b7280', marginTop: '2px', fontWeight: 700 }}>Garima</div>
                </div>
              </div>
              
              {/* 1st Place */}
              <div style={{ flex: 1.2, textAlign: 'center' }}>
                <div style={{ background: 'linear-gradient(180deg, #ffb347, #ffcc33)', height: '80px', borderRadius: '16px 16px 8px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '12px', boxShadow: '0 8px 16px rgba(255,179,71,0.2)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#92400e' }}>1st</div>
                  <div style={{ fontSize: '15px', fontWeight: 950, color: '#fff' }}>₹10,000</div>
                  <div style={{ fontSize: '9px', color: '#fff', marginTop: '2px', fontWeight: 800 }}>Punet</div>
                </div>
              </div>
              
              {/* 3rd Place */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ background: '#cd7f32', height: '50px', borderRadius: '12px 12px 6px 6px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px', opacity: 0.8 }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff' }}>3rd</div>
                  <div style={{ fontSize: '13px', fontWeight: 950, color: '#fff' }}>₹2,500</div>
                  <div style={{ fontSize: '8px', color: '#fff', marginTop: '2px', fontWeight: 700 }}>Aman Kumar</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '24px', color: '#5b51d8', fontSize: '12px', fontWeight: 900, cursor: 'pointer' }}>+7 More Winners</div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '0', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <input 
                type="text" 
                placeholder="Enter college..."
                style={{
                  flex: 1, padding: '10px 16px', background: 'transparent', border: 'none', fontSize: '13px', outline: 'none', fontWeight: 500, color: '#1e293b'
                }}
              />
              <button style={{ 
                background: '#5b51d8', color: '#fff', border: 'none', 
                padding: '0 20px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '13px'
              }}>
                <Search size={14} /> Search
              </button>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ 
              width: '100%', padding: '12px', borderRadius: '10px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
              color: '#fff', fontWeight: 900, fontSize: '13px', border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(91,81,216,0.2)', transition: 'all 0.3s ease'
            }}>
              Start Reviewing & Earn Points
            </button>
            <button style={{ 
              width: '100%', padding: '12px', borderRadius: '10px', background: 'transparent',
              color: '#5b51d8', fontWeight: 900, fontSize: '13px', border: '2px solid #5b51d8', cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              How To Earn? Know More
            </button>
          </div>
        </motion.div>

      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          .rewards-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
};

export default RewardsSection;
