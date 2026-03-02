import React from 'react';
import { Quote, Phone, MessageSquare, ChevronRight, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import counsellingImg from '../assets/request_counselling.png';

const TestimonialsSection = () => {
  return (
    <section style={{ padding: '100px 32px', background: '#fff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Testimonials Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
                <Sparkles size={14} /> Testimonials
             </div>
             <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#1e293b' }}>
               Hear from <span style={{ color: '#38bdf8' }}>our students</span>
             </h2>
        </div>

        {/* Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }} className="testimonials-grid">
          {[
            {
              name: 'Samay Raina',
              role: 'MBBS Aspirant, Delhi',
              text: '"Thanks to College Reviewz, I could compare multiple medical colleges in one place. Reviews from real students helped me understand the campus life and faculty quality. Most reliable platform for NEET aspirants."',
              image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
              accent: '#38bdf8'
            },
            {
              name: 'Kirti Roy',
              role: 'JEE Advanced, Kolkata',
              text: '"Choosing the right IIT was a dream, but this platform made it simple. The comparison tools and cut-off predictors are incredibly accurate. Must-use for anyone aiming for top engineering institutions in India!"',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
              accent: '#6366f1'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ 
                background: '#1e293b', borderRadius: '32px', padding: '40px', position: 'relative', overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(15,23,42,0.1)'
              }}
            >
              <Quote size={32} color={item.accent} style={{ opacity: 0.4, marginBottom: '20px' }} />
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: 600, lineHeight: 1.6, marginBottom: '30px', opacity: 0.9 }}>
                {item.text}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: `2px solid ${item.accent}`, overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 900 }}>{item.name}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Row */}
        <div style={{ 
          background: '#f8fafc', padding: '24px 40px', borderRadius: '24px', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '80px',
          border: '1.5px solid #f1f5f9'
        }} className="contact-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#5b51d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Phone size={20} />
            </div>
            <p style={{ fontSize: '15px', color: '#475569', fontWeight: 600 }}>
              If you any questions or need help contact with team. <span style={{ color: '#111827', fontWeight: 800 }}>+91-123 456 789</span>
            </p>
          </div>
          <button style={{ 
            background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', border: 'none', 
            padding: '14px 28px', borderRadius: '50px', fontWeight: 800, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            Contact Us <MessageSquare size={18} />
          </button>
        </div>

        {/* Career Guidance Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ 
            background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', borderRadius: '32px', 
            padding: '40px 50px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px',
            alignItems: 'center', position: 'relative', overflow: 'hidden'
          }}
          className="guidance-banner"
        >
          {/* Patterns */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
            <svg width="100%" height="100%">
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginBottom: '20px', lineHeight: 1.2 }}>
              Need Career Guidance? <br />
              Get Personalized <br />
              Counselling Today!
            </h2>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Phone size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#fff', opacity: 0.8, fontWeight: 700 }}>Get contact now</div>
                    <div style={{ fontSize: '14px', color: '#fff', fontWeight: 800 }}>+123 456 789</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Send size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#fff', opacity: 0.8, fontWeight: 700 }}>Sent e-mail</div>
                    <div style={{ fontSize: '14px', color: '#fff', fontWeight: 800 }}>info@domainname.com</div>
                  </div>
                </div>
            </div>

            <button style={{ 
              background: '#fff', color: '#6366f1', padding: '14px 32px', borderRadius: '50px', 
              fontWeight: 900, fontSize: '15px', border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              Request Counselling <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
             <div style={{ width: '100%', aspectRatio: '1.2', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
               <img src={counsellingImg} alt="Counselling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-row { flex-direction: column; gap: 20px; text-align: center; }
          .contact-row div { flex-direction: column; }
          .guidance-banner { grid-template-columns: 1fr !important; padding: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
