import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, MapPin, Send, CheckCircle2, ChevronDown, 
  Flag, Globe, Calendar, GraduationCap, BookOpen, 
  Briefcase, Percent, ShieldCheck, Mail
} from 'lucide-react';

const ScholarshipForm = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    location: 'Kolkata',
    startYear: '2026',
    countries: [],
    levelOfStudy: 'Bachelors (Graduation)',
    course: '',
    specialization: '',
    class10Year: '2022',
    class10Percent: 85,
    studyAbroadExam: 'No',
    consent: false
  });

  const years = ['2026', '2027', 'Later'];
  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
  const levels = ['Bachelors (Graduation)', 'Masters', 'PhD'];

  const toggleCountry = (country) => {
    setFormData(prev => {
      if (prev.countries.includes(country)) {
          return { ...prev, countries: prev.countries.filter(c => c !== country) };
      }
      if (prev.countries.length < 3) {
          return { ...prev, countries: [...prev.countries, country] };
      }
      return prev;
    });
  };

  const sectionStyle = {
    background: '#fff',
    borderRadius: '24px',
    padding: '40px',
    border: '1.5px solid #f1f5f9',
    boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
    marginBottom: '32px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: '12px'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '12px',
    border: '1.5px solid #e2e8f0',
    fontSize: '15px',
    fontWeight: 600,
    color: '#1e293b',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const pillStyle = (selected) => ({
    padding: '10px 24px',
    borderRadius: '100px',
    border: selected ? '2px solid #5b51d8' : '1.5px solid #e2e8f0',
    background: selected ? 'rgba(91, 81, 216, 0.08)' : '#fff',
    color: selected ? '#5b51d8' : '#64748b',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 950, color: '#1e293b', marginBottom: '12px', letterSpacing: '-1.5px' }}>
          Apply for <span style={{ color: '#5b51d8' }}>scholarship</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>
          Make an informed decision about your abroad education. Complete your profile to proceed.
        </p>
      </div>

      <div style={sectionStyle}>
        {/* Section 1: Personal Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(91, 81, 216, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5b51d8', fontWeight: 900, fontSize: '14px' }}>1</div>
            <div>
               <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>Personal details</h2>
               <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>This will create your account. You can opt-out anytime.</p>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
            <div>
                <label style={labelStyle}><Phone size={16} /> Phone Number</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <select style={{ ...inputStyle, width: '120px' }}>
                        <option>IND (+91)</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Mobile number" 
                      style={inputStyle}
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    />
                </div>
            </div>
            <div>
                <label style={labelStyle}><MapPin size={16} /> Current location</label>
                <div style={{ ...inputStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={18} color="#5b51d8" />
                        <span>{formData.location}</span>
                    </div>
                    <span style={{ color: '#5b51d8', cursor: 'pointer', fontSize: '14px', fontWeight: 800 }}>Change</span>
                </div>
            </div>
        </div>

        <div style={{ background: 'rgba(91, 81, 216, 0.04)', padding: '16px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: '#5b51d8', fontSize: '14px', fontWeight: 700 }}>
            <Phone size={16} />
            One time passcode will be sent to this number
        </div>

        <hr style={{ border: 'none', borderTop: '1.5px solid #f1f5f9', margin: '40px 0' }} />
        {/* Section 2: Future Education Preference */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(91, 81, 216, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5b51d8', fontWeight: 900, fontSize: '14px' }}>2</div>
            <div>
               <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>Future education preference</h2>
               <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Helps us show courses & countries matching your interest.</p>
            </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}><Calendar size={16} /> Start year</label>
            <div style={{ display: 'flex', gap: '12px' }}>
                {years.map(y => (
                    <button key={y} onClick={() => setFormData({...formData, startYear: y})} style={pillStyle(formData.startYear === y)}>{y}</button>
                ))}
            </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}><Globe size={16} /> Preferred countries (max 3)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                {countries.map(c => (
                    <button key={c} onClick={() => toggleCountry(c)} style={pillStyle(formData.countries.includes(c))}>{c}</button>
                ))}
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>Selected: {formData.countries.length > 0 ? formData.countries.join(', ') : 'None'}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
            <div style={{ gridColumn: 'span 1' }}>
                <label style={labelStyle}><GraduationCap size={16} /> Level of study</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {levels.map(l => (
                        <button key={l} onClick={() => setFormData({...formData, levelOfStudy: l})} style={{ ...pillStyle(formData.levelOfStudy === l), padding: '10px 16px', fontSize: '12px' }}>{l}</button>
                    ))}
                </div>
            </div>
            <div style={{ gridColumn: 'span 1' }}>
                <label style={labelStyle}><BookOpen size={16} /> Preferred course</label>
                <div style={{ position: 'relative' }}>
                    <select 
                      style={{ ...inputStyle, appearance: 'none' }}
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                    >
                        <option value="">B.Com (Bachelor of Commerce)</option>
                        <option value="bba">BBA</option>
                        <option value="btech">B.Tech</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                </div>
            </div>
            <div style={{ gridColumn: 'span 1' }}>
                <label style={labelStyle}><Briefcase size={16} /> Specialization</label>
                <input 
                  type="text" 
                  placeholder="e.g. Finance" 
                  style={inputStyle}
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                />
            </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1.5px solid #f1f5f9', margin: '40px 0' }} />
        {/* Section 3: Current Education Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(91, 81, 216, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5b51d8', fontWeight: 900, fontSize: '14px' }}>3</div>
            <div>
               <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>Current education details</h2>
               <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Accurate details help us match scholarships to your profile.</p>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', alignItems: 'start' }}>
            <div>
                <label style={labelStyle}>Class 10 passing year</label>
                <div style={{ position: 'relative' }}>
                    <select 
                      style={{ ...inputStyle, appearance: 'none' }}
                      value={formData.class10Year}
                      onChange={(e) => setFormData({...formData, class10Year: e.target.value})}
                    >
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                    </select>
                    <ChevronDown size={18} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                </div>
            </div>
            <div>
                <label style={labelStyle}>Class 10th percentage</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                    <input 
                      type="range" 
                      min="33" 
                      max="100" 
                      value={formData.class10Percent}
                      onChange={(e) => setFormData({...formData, class10Percent: parseInt(e.target.value)})}
                      style={{ width: '100%', height: '6px', background: 'linear-gradient(to right, #5b51d8 0%, #5b51d8 ' + (formData.class10Percent - 33) * 1.5 + '%, #e2e8f0 ' + (formData.class10Percent - 33) * 1.5 + '%, #e2e8f0 100%)', borderRadius: '5px', appearance: 'none', outline: 'none' }}
                    />
                    <div style={{ minWidth: '45px', background: 'rgba(91, 81, 216, 0.1)', color: '#5b51d8', padding: '6px 10px', borderRadius: '8px', fontSize: '14px', fontWeight: 900 }}>
                        {formData.class10Percent}%
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>
                    <span>33%</span>
                    <span>100%</span>
                </div>
            </div>
            <div>
                <label style={labelStyle}>Study abroad exam</label>
                <div style={{ ...inputStyle, padding: '10px 16px', display: 'flex', gap: '12px' }}>
                    {['Yes', 'No', 'Booked'].map(opt => (
                        <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1e293b', fontWeight: 700, cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name="studyAbroad" 
                              checked={formData.studyAbroadExam === opt}
                              onChange={() => setFormData({...formData, studyAbroadExam: opt})}
                              style={{ accentColor: '#5b51d8' }}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            </div>
        </div>

      <div style={{ marginBottom: '40px' }}>
          <label style={{ display: 'flex', gap: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <input 
                type="checkbox" 
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                style={{ width: '20px', height: '20px', flexShrink: 0, accentColor: '#5b51d8' }}
              />
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, lineHeight: 1.5 }}>
                I have read and provide consent for my data to be processed for purposes mentioned in the <span style={{ color: '#5b51d8' }}>Privacy Policy</span> and the <span style={{ color: '#5b51d8' }}>Terms and Conditions</span>, and agree to be contacted for Education related services & promotions (you can edit your preference under My Profile).
              </span>
          </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '320px',
          padding: '18px',
          borderRadius: '50px',
          border: 'none',
          background: 'linear-gradient(135deg, #5b51d8, #38bdf8)',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          cursor: formData.consent ? 'pointer' : 'not-allowed',
          opacity: formData.consent ? 1 : 0.7,
          boxShadow: '0 15px 35px rgba(91, 81, 216, 0.3)'
        }}
      >
        <Send size={20} />
        Apply for Scholarship
      </motion.button>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            background: #fff;
            border: 3px solid #5b51d8;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
      `}</style>

    </div>
  );
};

export default ScholarshipForm;
