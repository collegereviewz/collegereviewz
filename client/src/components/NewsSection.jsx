import React, { useState } from 'react';
import { Share2, ChevronRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const newsItems = [
  {
    id: 1,
    tag: 'LIVE',
    title: 'GATE 2026 Geology and Geophysics (GG) Question Paper Available — Download with Solution PDF',
    author: 'Rahul Roy',
    date: '8 Jan 2026',
    image: 'https://img.freepik.com/free-vector/digital-world-news-map-background-design_1017-26801.jpg',
    category: 'Exam Alert',
  },
  {
    id: 2,
    tag: 'LIVE',
    title: 'GATE 2026 Statistics (ST) Question Paper Available — Download with Solution PDF',
    author: 'Sujay Das',
    date: '8 Jan 2026',
    image: 'https://img.freepik.com/free-vector/news-concept-landing-page_23-2148118029.jpg',
    category: 'Exam Alert',
  },
  {
    id: 3,
    tag: 'NEW',
    title: 'GATE 2026 Electrical Engineering (EE) Question Paper Available — Download with Solution PDF',
    author: 'Akash Das',
    date: '8 Jan 2026',
    image: 'https://img.freepik.com/free-vector/global-breaking-news-background-world-map_1017-27464.jpg',
    category: 'Admission Alert',
  },
  {
    id: 4,
    tag: 'NEW',
    title: 'GATE 2026 Mathematics (MA) Question Paper Available — Download with Solution PDF',
    author: 'Sk Sofik',
    date: '8 Jan 2026',
    image: 'https://img.freepik.com/free-vector/digital-global-news-template-with-world-map_1017-23112.jpg',
    category: 'College Alert',
  },
];

const categories = ['MBBS', 'BE/B.Tech', 'Law', 'Science', 'Commerce', 'Pharmacy', 'ME/M.Tech', 'B.Sc Nursing'];
const alertTabs = ['Exam Alerts', 'Admission Alerts', 'College Alerts'];

const NewsSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Engineering Colleges in India — Updated 2025",
      subtitle: "Your Guide to the Best B.Tech Programs",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      size: 'large'
    },
    {
      id: 2,
      title: "How to Choose the Right College After Class 12?",
      subtitle: "Your Roadmap to a Brighter Future",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      size: 'small'
    },
    {
      id: 3,
      title: "5 Things Students Must Check Before Taking Admission",
      subtitle: "Your Essential College Application Checklist",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      size: 'small'
    }
  ];

  return (
    <section style={{ padding: '100px 32px', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>
             <Share2 size={14} /> Latest Posts
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: 950, color: '#1e293b' }}>
            Our latest <span style={{ color: '#38bdf8' }}>student blogs</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }} className="blogs-grid">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -10 }}
              style={{
                position: 'relative', borderRadius: '32px', overflow: 'hidden', height: '480px',
                cursor: 'pointer', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 30%, rgba(15,23,42,0.95) 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px'
              }}>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 900, marginBottom: '12px', lineHeight: 1.2 }}>
                  {blog.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 500, marginBottom: '24px' }}>
                  {blog.subtitle}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#fff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }}>
                    Read Article
                  </span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b' }}>
                    <ChevronRight size={20} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <style>{`
        @media (max-width: 1024px) {
          .blogs-grid { grid-template-columns: 1fr !important; }
          .blogs-grid > div { height: 400px !important; }
        }
      `}</style>
    </section>
  );
};

export default NewsSection;
