import React from 'react';
import { motion } from 'framer-motion';
import { Send, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../assets/logo6.png';

const footerData = {
  'MBA': ['Top MBA Colleges', 'Online MBA', 'Executive MBA Colleges', 'MBA Exam', 'MAT', 'CAT', 'MBA Colleges Predictors'],
  'Engineering': ['Engineering', 'Top Engineering Colleges', 'Engineering Exams', 'JEE Main', 'JEE Advanced', 'Engineering Colleges Predictors'],
  'Medcine': ['NEET UG', 'NEET PG', 'NEET SS', 'NEET MDS', 'INI CET', 'FMGE', 'AIPGET', 'Medical Colleges', 'Medical Exams'],
  'Study Abroad': ['Study Abroad', 'B.Tech Abroad', 'MBA Abroad', 'MS Abroad', 'GRE', 'GMAT', 'SAT', 'IELTS', 'TOEFL'],
  'Important Updates': ['XAT 2026', 'NEET 2026', 'CAT Cutoff 2025', 'MMS Colleges In Mumbai', 'IIM Call Predictor', 'JEE Mains', 'CAT Result 2025', 'JEE Main PYQ', 'CAT Score Vs Percentile 2025'],
  'Contact': ['+123 456 789', 'Info@Domain.Com', '123 High Street LN1 1AB United Kingdom'],
  'Other Links': ['Privacy Policy', 'Terms & Conditions', 'About Us', 'Contact Us']
};

const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    style={{ 
      background: 'linear-gradient(135deg, #5b99cd 0%, #3a7caf 50%, #2a699c 100%)', 
    color: '#fff', 
    position: 'relative', 
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif"
  }}>
    
    {/* Geometric Background Overlays */}
    <div style={{ position: 'absolute', left: '-50px', top: '10%', opacity: 0.1, pointerEvents: 'none' }}>
      <svg width="300" height="300" viewBox="0 0 100 100">
        <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>
    <div style={{ position: 'absolute', left: '100px', bottom: '20%', opacity: 0.05, pointerEvents: 'none' }}>
      <svg width="200" height="200" viewBox="0 0 100 100">
        <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>

    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 40px 30px' }}>
      
      {/* Top Section: Logo & Newsletter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '30px', marginBottom: '20px' }}>
        
        {/* Logo & Social */}
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src={logoImg} alt="Logo" style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }} />
              <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px' }}>CollegeReviewZ</span>
           </div>
           
           <div style={{ display: 'flex', gap: '10px' }}>
             {[
               { icon: <span style={{ fontSize: '16px', fontWeight: 900 }}>P</span>, label: 'Pinterest' },
               { icon: <Twitter size={16} fill="white" />, label: 'X' },
               { icon: <Facebook size={16} fill="white" />, label: 'Facebook' },
               { icon: <Instagram size={16} />, label: 'Instagram' }
             ].map((social, i) => (
                <div key={i} style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.8)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {social.icon}
                </div>
             ))}
           </div>
        </div>

        {/* Newsletter */}
        <div style={{ maxWidth: '500px', width: '100%' }}>
           <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Subscribe Our Newsletter:</h4>
           <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', marginBottom: '20px', fontWeight: 500 }}>
             Get top college reviews, rankings & admission alerts — straight to your inbox.
           </p>
           
           <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="email" 
                placeholder="Enter Your Email"
                style={{ 
                  width: '100%', background: '#fff', padding: '16px 28px', borderRadius: '50px', 
                  border: 'none', outline: 'none', color: '#1e293b', fontWeight: 600, fontSize: '15px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}
              />
              <button style={{ 
                position: 'absolute', right: '6px', width: '44px', height: '44px', borderRadius: '50%', 
                background: '#fff', color: '#2a699c', border: 'none', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                <Send size={20} transform="rotate(-15)" strokeWidth={2.5} />
              </button>
           </div>
        </div>
      </div>

      <div style={{ borderTop: '1.2px solid rgba(255,255,255,0.2)', marginBottom: '30px' }} />

      {/* Simplified Main Grid consistent with screenshot column names */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '30px 15px', marginBottom: '40px' }} className="footer-links">
        {Object.entries(footerData).map(([title, links]) => (
          <div key={title} style={{ gridColumn: title === 'Contact' || title === 'Other Links' ? 'auto' : 'span 1' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '14px', letterSpacing: '0.05em' }}>{title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map(link => (
                <li key={link}>
                  <a href="#" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: '0.2s' }} onMouseEnter={e => e.target.style.textDecoration = 'underline'}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>

    {/* Bottom Bar */}
    <div style={{ background: 'rgba(0,0,0,0.15)', padding: '24px 0', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: 700 }}>
        Copyright © 2026 All Rights Reserved. | Designed by CRZ Academic Review Pvt Ltd
      </p>
    </div>

    <style>{`
      @media (max-width: 1200px) {
        .footer-links { grid-template-columns: repeat(3, 1fr) !important; }
      }
      @media (max-width: 768px) {
        .footer-links { grid-template-columns: repeat(2, 1fr) !important; }
        .footer-top { flex-direction: column; align-items: center; text-align: center; }
      }
    `}</style>
  </motion.footer>
);

export default Footer;
