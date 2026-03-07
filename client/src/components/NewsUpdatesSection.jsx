import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross, Laptop, Scale, FlaskConical, ShoppingCart, ArrowRight, Bell, Calendar, ExternalLink } from 'lucide-react';
import axios from 'axios';

const categories = [
  { name: 'All', icon: Bell },
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

const NewsPulseLoader = () => (
  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%', background: '#5b51d8',
        position: 'relative', animation: 'ripple 1.5s infinite ease-in-out'
      }} />
    </div>
    {[1, 2].map(i => (
      <div key={i} style={{ display: 'flex', gap: '10px', padding: '6px', background: '#f8fafc', borderRadius: '10px' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#e2e8f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ width: '70%', height: '10px', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
          <div style={{ width: '40%', height: '8px', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
        </div>
      </div>
    ))}
    <style>{`
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(91, 81, 216, 0.4); }
          70% { transform: scale(1); opacity: 0.2; box-shadow: 0 0 0 20px rgba(91, 81, 216, 0); }
          100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 0 0 rgba(91, 81, 216, 0); }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
  </div>
);

const NewsUpdatesSection = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [activeTab, setActiveTab] = useState('Exam Alerts');
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/news`);
        const data = response.data.data || [];
        setAllNews(data);
        filterLocalNews(data, activeCat, activeTab);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    filterLocalNews(allNews, activeCat, activeTab);
  }, [activeCat, activeTab, allNews]);

  const filterLocalNews = (data, cat, tab) => {
    let filtered = [...data];
    if (cat !== 'All') {
      filtered = filtered.filter(item => item.category === cat);
    }
    if (tab) {
      filtered = filtered.filter(item => item.type === tab);
    }
    setNews(filtered);
  };

  return (
    <section id="news-section" style={{ padding: '60px 24px', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>
              Real-time <span style={{ color: '#5b51d8' }}>Education Pulse</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>
              Curated notifications and exam alerts categorized for your goals.
            </p>
          </div>
          <button style={{
            padding: '8px 16px', borderRadius: '8px', background: '#fff',
            border: '1px solid #e2e8f0', color: '#5b51d8', fontSize: '13px',
            fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            View All <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px',
          marginBottom: '24px', scrollbarWidth: 'none', msOverflowStyle: 'none'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '12px',
                background: activeCat === cat.name ? '#5b51d8' : '#fff',
                color: activeCat === cat.name ? '#fff' : '#475569',
                border: '1px solid', borderColor: activeCat === cat.name ? '#5b51d8' : '#e2e8f0',
                fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <cat.icon size={14} />
              {cat.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alertTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: '12px',
                  background: activeTab === tab ? '#eff6ff' : 'transparent',
                  color: activeTab === tab ? '#1d4ed8' : '#64748b',
                  fontSize: '14px', fontWeight: 700, border: 'none',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
              >
                {tab}
                {activeTab === tab && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1d4ed8' }} />}
              </button>
            ))}
          </div>

          <div className="news-scroll-container" style={{ flex: 1, minWidth: '300px' }}>
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '6px',
              border: '1px solid #e2e8f0',
              height: '160px',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#e2e8f0 transparent'
            }}>
              <style>{`
                .news-scroll-container div::-webkit-scrollbar { width: 5px; }
                .news-scroll-container div::-webkit-scrollbar-track { background: transparent; }
                .news-scroll-container div::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .news-scroll-container div::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
              `}</style>
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <NewsPulseLoader />
                  </motion.div>
                ) : news.length > 0 ? (
                  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {news.map((item, idx) => (
                      <motion.a
                        key={item._id || idx}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ background: '#f8fafc', x: 4 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                          borderBottom: idx === news.length - 1 ? 'none' : '1px solid #f1f5f9',
                          textDecoration: 'none', borderRadius: '12px'
                        }}
                      >
                        <div style={{ textAlign: 'center', flexShrink: 0, width: '60px' }}>
                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#ef4444' }}>LIVE</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                            {new Date(item.updatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '1px', lineHeight: '1.2' }}>{item.title}</h4>
                          <p style={{
                            fontSize: '11px', color: '#64748b',
                            display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
                            overflow: 'hidden', lineHeight: '1.2'
                          }}>
                            {item.summary}
                          </p>
                        </div>
                        <div style={{ fontSize: '9px', fontWeight: 900, background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.category}
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="fallback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>
                        No specific {activeTab} for {activeCat} right now.
                      </p>
                      <p style={{ color: '#94a3b8', fontSize: '11px' }}>Showing latest updates instead:</p>
                    </div>
                    {allNews.slice(0, 10).map((item, idx) => (
                      <a key={idx} href={item.link} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textDecoration: 'none' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>{item.title}</div>
                        <div style={{ fontSize: '10px', color: '#5b51d8', fontWeight: 600 }}>{item.category} • {item.type}</div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdatesSection;
