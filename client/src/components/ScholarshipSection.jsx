import React from 'react';
import { CheckCircle2, GraduationCap, Award, Building2, Wallet, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import counselorImg from '../assets/education_counselore.png';

const ScholarshipSection = () => {
  const bubbles = [
    { label: 'Merit', icon: Award, top: '5%', left: '55%', color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Government', icon: CheckCircle2, top: '2%', left: '68%', color: '#0ea5e9', bg: '#e0f2fe' },
    { label: 'Category', icon: Star, top: '5%', left: '80%', color: '#10b981', bg: '#dcfce7' },
    { label: 'Corporate', icon: Building2, top: '25%', left: '88%', color: '#f97316', bg: '#ffedd5' },
    { label: 'Tier-A University Funds', icon: GraduationCap, top: '50%', left: '92%', color: '#8b5cf6', bg: '#f3e8ff' },
  ];

  return (
    <section style={{ padding: '100px 32px', background: 'linear-gradient(to bottom, #fff, #f8fafc)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        
        {/* Main Layout Container */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr', gap: '60px', alignItems: 'center' }} className="scholar-grid">
          
          {/* Left Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 10 }}
          >
            <h2 style={{ fontSize: '56px', fontWeight: 950, color: '#1e293b', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
              Pay Less for the <br />
              <span style={{ background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Same College
              </span>
            </h2>
            
            <p style={{ color: '#64748b', fontSize: '18px', fontWeight: 500, maxWidth: '500px', marginBottom: '40px', lineHeight: 1.6 }}>
              Merit, government, category & corporate scholarships—matched to your profile.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16,185,129,0.3)' }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                background: '#10b981', color: '#fff', padding: '18px 40px', borderRadius: '12px', 
                fontWeight: 900, fontSize: '18px', border: '2px solid #10b981', cursor: 'pointer',
                transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#10b981';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Check Scholarships I'm Eligible For
            </motion.button>

            <div style={{ display: 'flex', gap: '20px', color: '#94a3b8', fontSize: '14px', fontWeight: 700, marginBottom: '60px' }}>
              <span>Free</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>No spam</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span>Takes 30 seconds</span>
            </div>

            <div style={{ padding: '0 0 10px 0', borderBottom: '1.5px solid #e2e8f0', display: 'inline-block' }}>
              <p style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>
                Many students save <span style={{ color: '#1e293b' }}>₹50,000 – ₹5 Lakhs per year</span>
              </p>
            </div>
          </motion.div>

          {/* Right Illustration Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {/* The main illustration image from the screenshot */}
            <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              
              {/* This is where the background college illustration would be */}
              <div style={{ 
                position: 'absolute', bottom: '0', width: '100%', height: '80%', 
                background: 'url("https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800&q=80")',
                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '40px',
                opacity: 0.1, zIndex: 1
              }} />

              {/* Character Illustration placeholder - stylized family */}
              <div style={{ zIndex: 5, position: 'relative', textAlign: 'center' }}>
                 {/* Using a high-quality illustration placeholder */}
                 <img 
                   src={counselorImg} 
                   alt="Education Counselor"
                   style={{ width: '100%', maxWidth: '600px', borderRadius: '24px' }}
                 />
              </div>

              {/* Bubbles */}
              <AnimatePresence>
                {bubbles.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
                    transition={{ 
                      scale: { duration: 0.5, delay: i * 0.1 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                    }}
                    style={{
                      position: 'absolute', top: b.top, left: b.left,
                      background: b.bg, padding: '12px', borderRadius: '50%',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                      zIndex: 15, border: `2.5px solid #fff`, width: '80px', height: '80px'
                    }}
                  >
                    <b.icon size={20} color={b.color} strokeWidth={2.5} />
                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#1e293b', marginTop: '4px', textAlign: 'center', width: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {b.label}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @media (max-width: 1024px) {
          .scholar-grid { grid-template-columns: 1fr !important; gap: 80px !important; text-align: center; }
          .scholar-grid div { margin: 0 auto !important; }
          .scholar-grid button { margin: 0 auto 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default ScholarshipSection;
