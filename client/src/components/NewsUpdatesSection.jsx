import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cross, Laptop, Scale, FlaskConical, ShoppingCart, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'MBBS', icon: Cross },
  { name: 'BE/B.Tech', icon: Laptop },
  { name: 'Law', icon: Scale },
  { name: 'Science', icon: FlaskConical },
  { name: 'Commerce', icon: ShoppingCart },
  { name: 'Pharmacy', icon: Cross },
  { name: 'ME/M.Tech', icon: Laptop },
  { name: 'B.Sc Nursing', icon: Cross },
];

const alertTabs = ['Exam Alerts', 'Admission Alerts', 'College Alerts'];

const newsItems = [
  {
    id: 1,
    title: 'GATE 2021 Geology and Geophysics (GG) Question Paper Available — Download Here with Solution PDF',
    author: 'Rahul Roy',
    date: '8 Jan 2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
    thumbnailText: 'GATE GEOLOGY AND GEOPHYSICS PREVIOUS YEAR PAPERS WITH SOLUTIONS'
  },
  {
    id: 2,
    title: 'GATE 2021 Statistics (ST) Question Paper Available — Download Here with Solution PDF',
    author: 'Sujay Das',
    date: '8 Jan 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80',
    thumbnailText: 'GATE STATISTICS PREVIOUS YEAR PAPERS WITH SOLUTIONS'
  },
  {
    id: 3,
    title: 'GATE 2021 Electrical Engineering (EE) Question Paper Available — Download Here with Solution PDF',
    author: 'Akash Das',
    date: '8 Jan 2026',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=300&q=80',
    thumbnailText: 'GATE ELECTRICAL ENGINEERING PREVIOUS YEAR PAPERS WITH SOLUTIONS'
  },
  {
    id: 4,
    title: 'GATE 2021 Mathematics (MA) Question Paper Available — Download Here with Solution PDF',
    author: 'Sk Sofik',
    date: '8 Jan 2026',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=300&q=80',
    thumbnailText: 'GATE MATHEMATICS PREVIOUS YEAR PAPERS WITH SOLUTIONS'
  },
];

const NewsUpdatesSection = () => {
  const [activeCat, setActiveCat] = useState('MBBS');
  const [activeTab, setActiveTab] = useState('Exam Alerts');

  return (
    <section style={{ padding: '40px 24px', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', zoom: 0.8 }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1e293b' }}>
            Latest <span style={{ color: '#5b51d8' }}>News & Updates</span>
          </h2>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px',
                background: activeCat === cat.name ? '#5b51d8' : '#f8fafc',
                color: activeCat === cat.name ? '#fff' : '#1e293b',
                border: '1px solid', borderColor: activeCat === cat.name ? 'transparent' : '#e2e8f0',
                fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              <cat.icon size={14} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Alert Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
          {alertTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 20px', borderRadius: '10px',
                background: activeTab === tab ? '#fff' : '#fff',
                color: activeTab === tab ? '#1e293b' : '#64748b',
                border: '1.2px solid', borderColor: activeTab === tab ? '#1e293b' : '#e2e8f0',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* News Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {newsItems.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ x: 5 }}
              style={{ 
                display: 'flex', gap: '24px', padding: '12px 0', borderBottom: '1.5px solid #f1f5f9',
                cursor: 'pointer', alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ 
                    background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 800, 
                    padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' 
                  }}>
                    Live
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', fontWeight: 500 }}>
                  <span>{item.author}</span>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
                  <span>{item.date}</span>
                </div>
              </div>
              <div style={{ width: '160px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                <img src={item.image} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ 
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', textAlign: 'center'
                }}>
                  <span style={{ color: '#fff', fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.thumbnailText}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button style={{
            padding: '10px 24px', borderRadius: '8px', background: '#f8fafc',
            border: '1.2px solid #e2e8f0', color: '#1e293b', fontSize: '13px',
            fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}>
            View All News & Updates <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default NewsUpdatesSection;
