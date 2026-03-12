import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, AlertCircle, FileText, CalendarDays, Wallet, 
  MapPin, ShieldCheck, GraduationCap, Building, Briefcase, Heart, Palette, 
  Cpu, Award, BookOpen, Clock, Calculator, ChevronDown, ChevronUp, Download
} from 'lucide-react';
import axios from 'axios';

// Reusable Section Header
const SectionHeader = ({ title, icon: Icon, color = '#5b51d8' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
    <div style={{ background: `${color}15`, padding: '10px', borderRadius: '12px', color: color }}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.5px' }}>{title}</h2>
  </div>
);

// Reusable Accordion
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', marginBottom: '16px', background: '#fff', overflow: 'hidden' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>{title}</span>
        {isOpen ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 20px 20px', color: '#475569', lineHeight: 1.6, fontSize: '15px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ROI Calculator Component
const ROICalculator = ({ baseSalaryString, baseCurrency }) => {
  const [cost, setCost] = useState(3000000); // 30L INR Default
  const [salaryINR, setSalaryINR] = useState(4000000); // 40L INR Default
  const [savingsRate, setSavingsRate] = useState(30); // 30% Default
  
  const annualSavings = (salaryINR * savingsRate) / 100;
  const breakEvenYears = annualSavings > 0 ? (cost / annualSavings).toFixed(1) : '∞';

  return (
    <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
       <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
         <Calculator size={20} color="#5b51d8" /> Total Cost vs Expected Returns (ROI)
       </h3>
       
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
         <div>
           <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Total Cost (INR)</label>
           <input type="range" min="1000000" max="8000000" step="500000" value={cost} onChange={(e) => setCost(Number(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
           <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '8px' }}>₹{(cost/100000).toFixed(1)} Lakhs</div>
         </div>
         <div>
           <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Expected Salary (INR)</label>
           <input type="range" min="1500000" max="10000000" step="500000" value={salaryINR} onChange={(e) => setSalaryINR(Number(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
           <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '8px' }}>₹{(salaryINR/100000).toFixed(1)} Lakhs</div>
         </div>
         <div>
           <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Savings Rate (%)</label>
           <input type="range" min="10" max="60" step="5" value={savingsRate} onChange={(e) => setSavingsRate(Number(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
           <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '8px' }}>{savingsRate}%</div>
         </div>
       </div>

       <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
         <div>
           <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Expected Time to Break-Even</p>
           <p style={{ fontSize: '32px', fontWeight: 900, color: '#5b51d8' }}>{breakEvenYears} <span style={{ fontSize: '18px', color: '#1e293b' }}>Years</span></p>
         </div>
         <div style={{ textAlign: 'right' }}>
           <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Verdict</p>
           <span style={{ padding: '6px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 800, background: breakEvenYears < 3 ? '#dcfce7' : breakEvenYears < 5 ? '#fef3c7' : '#fee2e2', color: breakEvenYears < 3 ? '#166534' : breakEvenYears < 5 ? '#92400e' : '#991b1b' }}>
             {breakEvenYears < 3 ? 'Excellent ROI' : breakEvenYears < 5 ? 'Moderate ROI' : 'Risky ROI'}
           </span>
         </div>
       </div>
    </div>
  );
};


const StudyAbroadCountryDetail = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [studyTab, setStudyTab] = useState('pg');
  const [showModal, setShowModal] = useState(false);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear(); // Dynamic baseline year
  const projectedYear = currentYear + (new Date().getMonth() > 6 ? 1 : 0); // Always point to upcoming main intake

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCountry = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/study-abroad/${countryId}`);
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [countryId]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748b', fontWeight: 'bold', paddingTop: '150px' }}>Loading Country Profile...</div>;
  if (!country) return <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#64748b', fontWeight: 'bold', paddingTop: '150px' }}>Country Not Found</div>;

  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '100px', paddingTop: '80px' }}>
      
      {/* 2. Hero / Above the Fold */}
      <div style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', color: '#1e293b', padding: '60px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={containerStyle}>
          
          {/* SEO Breadcrumb / Back button */}
          <button onClick={() => navigate('/StudyAbroad/Countries')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.8)', color: '#334155', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', marginBottom: '32px', fontSize: '13px', fontWeight: 700, transition: 'all 0.2s', backdropFilter: 'blur(10px)' }}>
            <ArrowLeft size={16} /> Home {'>'} Study Abroad {'>'} {country.name}
          </button>
          
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Visual Banner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
              <img src={country.flag} alt={country.name} style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid #ffffff' }} />
              
              {/* Trust Bar inside Hero */}
              <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '12px', padding: '16px', fontSize: '12px', backdropFilter: 'blur(10px)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#475569' }}><ShieldCheck size={14} color="#22c55e" /> Verified Policies</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#475569' }}><Clock size={14} /> Updated: {country.hero.lastUpdated}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}><FileText size={14} /> Rule: {country.hero.visaPolicyVersion}</div>
              </div>
            </div>

            {/* Content Array */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h1 style={{ fontSize: '46px', fontWeight: 950, marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-1px' }}>
                Study in {country.name} for Indian Students ({projectedYear}): Cost, Visa & Outcomes
              </h1>
              <p style={{ fontSize: '18px', color: '#475569', fontWeight: 500, lineHeight: 1.6, marginBottom: '32px', maxWidth: '800px' }}>
                {country.hero.summary}
              </p>
              
              {/* CTA Buttons - Now clickable */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <button 
                  onClick={() => setShowModal('fit-score')}
                  style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #38bdf8, #3b82f6)', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: '16px', boxShadow: '0 10px 25px rgba(56, 189, 248, 0.3)' }}>
                  Get Your {country.name} Fit Score
                </button>
                <button 
                  onClick={() => setShowModal('shortlist')}
                  style={{ padding: '16px 32px', background: '#ffffff', color: '#1e293b', borderRadius: '50px', border: '1px solid #cbd5e1', fontWeight: 700, cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  Shortlist Universities
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Decision Strip (5 Tiles) completely integrated into hero transition */}
      <div style={{ background: '#ffffff', padding: '24px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ ...containerStyle, display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between' }}>
           {[
             { label: 'Overall Cost', value: country.hero.decisionStrip.costLevel, c: '#f59e0b' },
             { label: 'Visa Difficulty', value: country.hero.decisionStrip.visaDifficulty, c: '#ef4444' },
             { label: 'Part-Time Work', value: country.hero.decisionStrip.partTimeFeasibility, c: '#10b981' },
             { label: 'Job Outcomes', value: country.hero.decisionStrip.jobOutcomeStrength, c: '#3b82f6' },
             { label: 'PR Pathway', value: country.hero.decisionStrip.prPath, c: '#8b5cf6' }
           ].map((strip, i) => (
             <div key={i} style={{ flex: '1 1 auto', minWidth: '150px', background: '#f8fafc', padding: '16px', borderRadius: '16px', borderLeft: `4px solid ${strip.c}`, borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
               <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>{strip.label}</p>
               <p style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>{strip.value}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Sticky Tab Navigator */}
      <div style={{ position: 'sticky', top: '80px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e2e8f0', zIndex: 40, padding: '16px 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <div style={{ ...containerStyle, display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
           {['Overview', 'Study Options', 'Costs & Budgets', 'Visa & Jobs', 'ROI & Risks'].map(tab => (
             <button 
               key={tab} 
               onClick={() => setActiveTab(tab)}
               style={{ 
                 padding: '10px 20px', borderRadius: '50px', border: 'none', whiteSpace: 'nowrap', cursor: 'pointer', fontWeight: 700, fontSize: '15px', transition: 'all 0.2s',
                 background: activeTab === tab ? '#5b51d8' : 'transparent',
                 color: activeTab === tab ? '#fff' : '#475569'
               }}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div style={{ ...containerStyle, marginTop: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '40px' }}>
        
        {/* =======================================================
            TAB 1: Overview & Snapshot
            ======================================================= */}
        <div style={{ display: activeTab === 'Overview' ? 'block' : 'none' }}>
          
          <SectionHeader title="The 2-Minute Reality Check" icon={AlertCircle} color="#f59e0b" />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#166534' }}>
                <CheckCircle2 size={24} /> <span style={{ fontSize: '20px', fontWeight: 900 }}>Who is this Best For?</span>
              </div>
              <p style={{ fontSize: '16px', color: '#334155', fontWeight: 500, lineHeight: 1.6 }}>{country.snapshot.bestFor}</p>
            </div>
            
            <div style={{ background: '#fef2f2', padding: '32px', borderRadius: '24px', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#991b1b' }}>
                <AlertCircle size={24} /> <span style={{ fontSize: '20px', fontWeight: 900 }}>Avoid If Seeking...</span>
              </div>
              <p style={{ fontSize: '16px', color: '#7f1d1d', fontWeight: 500, lineHeight: 1.6 }}>{country.snapshot.avoidIf}</p>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '24px' }}>Key Demographics</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div>
                 <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Top Indian Student Hubs</h4>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                   {country.snapshot.topCities.map(city => <span key={city} style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>📍 {city}</span>)}
                 </div>
              </div>
              <div>
                 <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px' }}>Highly Pursued Disciplines</h4>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                   {country.snapshot.popularCourses.map(course => <span key={course} style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 600, color: '#334155' }}>🎓 {course}</span>)}
                 </div>
              </div>
            </div>
          </div>

          <SectionHeader title="Top Ranking Universities" icon={Briefcase} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {Object.entries(country.topUniversities).map(([field, unis]) => (
              <div key={field} style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                 <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', textTransform: 'capitalize' }}>{field} Hubs</h4>
                 <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '15px', fontWeight: 500, lineHeight: 1.8 }}>
                   {unis.slice(0, 3).map(u => <li key={u}>{u}</li>)}
                 </ul>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================
            TAB 2: Study Options, Admissions & Eligibility
            ======================================================= */}
        <div style={{ display: activeTab === 'Study Options' ? 'block' : 'none' }}>
           <SectionHeader title="Admissions & Eligibility (Indian Standard)" icon={GraduationCap} />
           
           <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
               <tbody>
                  {[
                    ['Academic Score (10+2/UG)', country.eligibility.academics],
                    ['Backlog Acceptability', country.eligibility.backlogs],
                    ['Education Gap Allowed?', country.eligibility.gapYears],
                    ['English Proficiency', country.eligibility.englishTests]
                  ].map(([label, val], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '20px 0', width: '30%', fontWeight: 700, color: '#64748b' }}>{label}</td>
                      <td style={{ padding: '20px 0', fontWeight: 600, color: '#1e293b' }}>{val}</td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>

           <SectionHeader title="Study Pathways" icon={BookOpen} color="#10b981" />
           
           <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
             {Object.keys(country.education_system).map(key => (
               <button key={key} onClick={() => setStudyTab(key)} style={{ padding: '12px 24px', borderRadius: '50px', border: '1px solid #e2e8f0', background: studyTab === key ? '#10b981' : '#fff', color: studyTab === key ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', fontSize: '13px' }}>
                 {key} Pathway
               </button>
             ))}
           </div>
           
           <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
              <div style={{ display: 'grid', gap: '20px' }}>
                {Object.entries(country.education_system[studyTab]).map(([k, v]) => (
                  <div key={k}>
                    <p style={{ fontSize: '13px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '8px' }}>{k}</p>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>{v}</p>
                  </div>
                ))}
              </div>
           </div>

           <SectionHeader title="Intakes Calendar" icon={CalendarDays} color="#3b82f6" />
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {country.intakes.map((intake, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarDays size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>{intake.name}</h4>
                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Apply by: {intake.deadline}</p>
                  </div>
                </div>
              ))}
           </div>

        </div>

        {/* =======================================================
            TAB 3: Costs, Budgets & Scholarships
            ======================================================= */}
        <div style={{ display: activeTab === 'Costs & Budgets' ? 'block' : 'none' }}>
           
           <SectionHeader title="Total Cost of Ownership" icon={Wallet} color="#f59e0b" />
           
           <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
             <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '24px' }}>Estimated Total Range</h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
               <div style={{ flex: 1, padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                 <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Budget/Low-Tier</p>
                 <p style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b' }}>{country.cost.summary.low}</p>
               </div>
               <div style={{ flex: 1, padding: '24px', background: '#fffbeb', borderRadius: '16px', border: '1px solid #fde68a' }}>
                 <p style={{ fontSize: '14px', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>Average Profile</p>
                 <p style={{ fontSize: '24px', fontWeight: 900, color: '#b45309' }}>{country.cost.summary.mid}</p>
               </div>
               <div style={{ flex: 1, padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                 <p style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Top Tier/Metro Cities</p>
                 <p style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b' }}>{country.cost.summary.high}</p>
               </div>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px' }}>
               <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px', marginBottom: '20px' }}>Yearly Tuition</h3>
                  {Object.entries(country.cost.tuition).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px' }}>
                      <span style={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{k}</span>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{v}</span>
                    </div>
                  ))}
               </div>
               <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px', marginBottom: '20px' }}>Monthly Living (Est.)</h3>
                  {Object.entries(country.cost.livingCost).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px' }}>
                      <span style={{ fontWeight: 700, color: '#64748b', textTransform: 'capitalize' }}>{k}</span>
                      <span style={{ fontWeight: 700, color: k === 'monthlyTotal' ? '#f59e0b' : '#1e293b' }}>{v}</span>
                    </div>
                  ))}
               </div>
             </div>
           </div>

           <SectionHeader title="Major Scholarships" icon={Award} color="#8b5cf6" />
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
             {country.scholarships.map((s, i) => (
               <div key={i} style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                   <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>{s.name}</h4>
                   <span style={{ padding: '4px 8px', borderRadius: '4px', background: s.difficulty === 'V. Hard' ? '#fee2e2' : '#fef3c7', color: s.difficulty === 'V. Hard' ? '#b91c1c' : '#b45309', fontSize: '12px', fontWeight: 800 }}>{s.difficulty}</span>
                 </div>
                 <p style={{ fontSize: '24px', fontWeight: 900, color: '#8b5cf6', marginBottom: '16px' }}>{s.amount}</p>
                 <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>Eligibility: <span style={{ color: '#1e293b' }}>{s.eligibility}</span></p>
                 <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Deadline Cycle: <span style={{ color: '#1e293b' }}>{s.deadline}</span></p>
               </div>
             ))}
           </div>
        </div>

        {/* =======================================================
            TAB 4: Visa & Jobs
            ======================================================= */}
        <div style={{ display: activeTab === 'Visa & Jobs' ? 'block' : 'none' }}>
           
           <SectionHeader title="Visa Master Guide" icon={ShieldCheck} color="#ef4444" />
           <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px', marginBottom: '40px' }}>
              <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                 <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '24px' }}>Visa Profile: {country.visa_policy.type}</h3>
                 <p style={{ fontSize: '15px', color: '#475569', fontWeight: 600, marginBottom: '16px' }}><strong>Processing:</strong> {country.visa_policy.processingTime}</p>
                 <p style={{ fontSize: '15px', color: '#475569', fontWeight: 600, marginBottom: '16px', lineHeight: 1.6 }}><strong>Funds Proof Rules:</strong> {country.visa_policy.fundsProof}</p>
              </div>
              <div style={{ background: '#fef2f2', borderRadius: '24px', padding: '32px', border: '1px solid #fecaca' }}>
                 <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#991b1b', marginBottom: '24px' }}>Top Visa Refusal Triggers</h3>
                 <ul style={{ paddingLeft: '20px', color: '#7f1d1d', fontWeight: 600, lineHeight: 1.6 }}>
                   {country.visa_policy.refusalReasons.map((r, i) => <li key={i} style={{ marginBottom: '8px' }}>{r}</li>)}
                 </ul>
              </div>
           </div>

           <SectionHeader title="Post Study Work & Jobs" icon={Briefcase} color="#3b82f6" />
           
           <div style={{ background: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
             <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>PSW Visa Duration: <span style={{ color: '#3b82f6' }}>{country.post_study.pswDuration}</span></h3>
             <p style={{ fontSize: '16px', color: '#475569', fontWeight: 500, marginBottom: '32px' }}>Eligibility: {country.post_study.eligibility}</p>
             
             <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '20px' }}>Sector Demand & Salaries</h4>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
               {country.post_study.jobMarket.map((j, i) => (
                 <div key={i} style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                     <h5 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>{j.sector}</h5>
                     <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', background: '#059669', padding: '4px 8px', borderRadius: '4px' }}>Demand: {j.demand}</span>
                   </div>
                   <p style={{ fontSize: '18px', fontWeight: 900, color: '#3b82f6', marginBottom: '8px' }}>{j.salary}</p>
                   <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{j.notes}</p>
                 </div>
               ))}
             </div>
           </div>

        </div>

        {/* =======================================================
            TAB 5: ROI, Risks & FAQs
            ======================================================= */}
        <div style={{ display: activeTab === 'ROI & Risks' ? 'block' : 'none' }}>
           
           <ROICalculator baseSalaryString={country.roi.avgStartingSalary} baseCurrency={country.country_core.currency} />

           <div style={{ marginTop: '40px' }}>
             <SectionHeader title="Contingencies & Risks" icon={AlertCircle} color="#ef4444" />
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '40px' }}>
               {country.risks.map((risk, i) => (
                 <div key={i} style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px dashed #ef4444' }}>
                   <p style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', marginBottom: '8px' }}>What If: {risk.scenario}</p>
                   <p style={{ fontSize: '15px', color: '#334155', fontWeight: 600, lineHeight: 1.6 }}>{risk.plan}</p>
                 </div>
               ))}
             </div>
           </div>

           <SectionHeader title="Country Specific FAQs" icon={BookOpen} />
           <div>
             {country.faqs.map((faq, i) => (
               <Accordion key={i} title={faq.q}>
                 {faq.a}
               </Accordion>
             ))}
           </div>
        </div>

      </div>

      {/* Interactive Tool Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(5px)' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#5b51d8' }}>
                <Cpu size={32} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>
                {showModal === 'fit-score' ? 'AI Fit Score Generator' : 'Smart Shortlisting Engine'}
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6, marginBottom: '32px' }}>
                This generative tool is currently being fine-tuned with {projectedYear} admissions data for {country.name}. Check back shortly to access personalized university matches based on your academic profile and budget!
              </p>
              <button 
                onClick={() => setShowModal(false)}
                style={{ width: '100%', padding: '16px', background: '#1e293b', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}
              >
                Understood, Go Back
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StudyAbroadCountryDetail;
