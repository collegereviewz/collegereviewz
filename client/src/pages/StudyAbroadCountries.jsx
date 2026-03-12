import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, ArrowRight, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudyAbroadCountries = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/study-abroad');
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '60px 24px'
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={containerStyle}>
        
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              color: '#64748b', background: 'transparent', border: 'none', 
              fontWeight: 700, fontSize: '14px', cursor: 'pointer', marginBottom: '24px'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#5b51d8', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            <Globe size={20} /> GLOBAL DESTINATIONS
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: 950, color: '#1e293b', lineHeight: 1.2 }}>
            Popular Countries to <span style={{ color: '#5b51d8' }}>Study Abroad</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: 500, marginTop: '16px', maxWidth: '600px' }}>
            Explore the world's leading educational destinations. Find out which country fits your academic goals and career aspirations.
          </p>
        </div>

        {/* Search Box */}
        <div style={{ position: 'relative', maxWidth: '520px', marginBottom: '40px' }}>
          <Search size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search countries — e.g. Canada, Germany, Japan..."
            style={{
              width: '100%', padding: '16px 48px 16px 50px', borderRadius: '16px',
              border: '2px solid #e2e8f0', fontSize: '16px', fontWeight: 600, color: '#1e293b',
              background: '#fff', outline: 'none', boxSizing: 'border-box',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)', transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = '#5b51d8'}
            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search result count */}
        {search && (
          <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
            {filtered.length === 0 ? 'No countries found.' : `Showing ${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search}"`}
          </p>
        )}

        {/* Countries Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748b', fontWeight: 'bold' }}>Loading Countries...</div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ 
                background: '#fff', borderRadius: '24px', padding: '32px', 
                border: '1.5px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column'
              }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderColor: '#e2e8f0' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <img src={c.flag} alt={c.name} style={{ height: '56px', borderRadius: '8px', border: '1px solid #f1f5f9' }} />
                <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', margin: 0 }}>{c.name}</h3>
              </div>
              
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.5, fontWeight: 500, marginBottom: '24px', flexGrow: 1 }}>
                {c.description}
              </p>

              <div style={{ display: 'grid', gap: '12px', color: '#475569', fontSize: '14px', fontWeight: 600, marginBottom: '32px', background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Popular Intakes:</span>
                  <span style={{ color: '#1e293b', fontWeight: 800 }}>{c.intake}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>No. Of Colleges:</span>
                  <span style={{ color: '#1e293b', fontWeight: 800 }}>{c.colleges}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Avg. Tuition:</span>
                  <span style={{ color: '#1e293b', fontWeight: 800 }}>{c.tuition}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/StudyAbroad/Countries/${c.id}`)}
                style={{ 
                  width: '100%', padding: '16px', borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #5b51d8, #4f46e5)', 
                  color: '#fff', fontWeight: 800, fontSize: '15px', 
                  cursor: 'pointer', border: 'none', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)'
              }}>
                View Detailed Info <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
        )}

      </div>
    </div>
  );
};

export default StudyAbroadCountries;
