import React from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const BoardExamsSection = () => {
  const class12Links = [
    'CBSE Class 12', 'CBSE Class 12th Results', 'CBSE Class 12th Previous Year Papers', 'CBSE Class 12th Syllabus',
    'CBSE Class 12th Exam Dates', 'CBSE Class 12th Admit Card', 'NCERT Solutions Class 12th Physics',
    'NCERT Solutions Class 12th Biology', 'NCERT Solutions Class 12th Maths', 'CBSE Class 12th Notes',
    'CBSE Class 12th Physics Notes', 'CBSE Class 12th Chemistry Notes', 'CBSE Class 12th Exam Dates',
    'CBSE Class 12th Biology Notes'
  ];

  const class10Links = [
    'CBSE Class 10', 'CBSE Class 10 Results', 'CBSE Class 10th Previous Year Papers', 'CBSE Class 10th Syllabus',
    'CBSE Class 10th Exam Dates', 'CBSE Class 10th Admit Card', 'NCERT Solutions Class 10th Maths',
    'NCERT Solutions Class 10th Science'
  ];

  const admissions = [
    'B Ed Admission 2026', 'MBA Admission 2026', 'MBBS Admission 2026', 'BA Admission 2026', 'M Tech Admission 2026',
    'PhD Admission 2026', 'LLB Admission 2026', 'D El Ed Admission 2025', 'BSc Admission 2025', 'B Pharmacy Admission 2025'
  ];

  const LinkGroup = ({ title, highlight, links }) => (
    <div style={{ marginBottom: '60px' }}>
      <h3 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '32px' }}>
        {title} <span style={{ color: '#38bdf8' }}>{highlight}</span>
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '1100px', margin: '0 auto' }}>
        {links.map((link, i) => (
          <motion.a
            key={i}
            href="#"
            whileHover={{ scale: 1.05, borderColor: '#38bdf8', transform: 'translateY(-2px)' }}
            style={{
              padding: '12px 20px', borderRadius: '50px', background: '#fff', border: '1.5px solid #f1f5f9',
              color: '#475569', fontSize: '13px', fontWeight: 700, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              transition: 'all 0.2s ease'
            }}
          >
            {link} <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
          </motion.a>
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ padding: '80px 32px', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <LinkGroup title="Class 12" highlight="Board Examination" links={class12Links} />
        <LinkGroup title="Class 10" highlight="Board Examination" links={class10Links} />
        
        <div style={{ marginTop: '80px' }}>
             <h3 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 900, color: '#1e293b', marginBottom: '40px' }}>
                Admission <span style={{ color: '#5b51d8' }}>2026</span>
              </h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', maxWidth: '1100px', margin: '0 auto' }}>
               {admissions.map((link, i) => (
                 <motion.a
                   key={i}
                   href="#"
                   whileHover={{ scale: 1.05, background: 'rgba(91,81,216,0.05)', borderColor: '#5b51d8' }}
                   style={{
                     padding: '14px 24px', borderRadius: '50px', background: '#f8fafc', border: '1.5px solid #e2e8f0',
                     color: '#1e293b', fontSize: '13px', fontWeight: 800, textDecoration: 'none',
                     display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s ease'
                   }}
                 >
                   {link} <ArrowUpRight size={14} color="#5b51d8" />
                 </motion.a>
               ))}
             </div>
        </div>

      </div>
    </section>
  );
};

export default BoardExamsSection;
