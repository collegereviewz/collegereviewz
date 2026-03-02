import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe, GraduationCap, MapPin, Search, Plane,
  ArrowRight, CheckCircle2, Award, Briefcase,
  BookOpen, Star, HelpingHand, ShieldCheck,
  ChevronRight, Laptop, MessageCircle,
  Cpu, TrendingUp, Bot, Heart, Palette, Scale, Languages, ClipboardList
} from 'lucide-react';
import counselorImg from '../assets/StudyAbroad/study_abroad.png';
import canadaImg from '../assets/StudyAbroad/Canada.png';
import ukImg from '../assets/StudyAbroad/uk.png';
import usImg from '../assets/StudyAbroad/us.png';

const StudyAbroadSection = () => {
  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px'
  };

  const countries = [
    { name: 'Canada', flag: canadaImg, intake: 'Fall / Winter', colleges: '2,023', tuition: '₹8.1L - ₹21.2L/year' },
    { name: 'United Kingdom', flag: ukImg, intake: 'September / January', colleges: '178', tuition: '₹10.4L - ₹31.2L/year' },
    { name: 'United States', flag: usImg, intake: 'Fall / Spring', colleges: '1,018', tuition: '₹18.6L - ₹41.8L/year' }
  ];

  const features = [
    { title: 'World-class Universities', desc: 'Access top-ranked universities with excellent infrastructure, faculty, and research facilities.', icon: GraduationCap },
    { title: 'Global Career Opportunities', desc: 'Enhance your employability with international exposure and networking opportunities.', icon: Briefcase },
    { title: 'International Exposure', desc: 'Experience diverse cultures, build global perspectives, and develop cross-cultural skills.', icon: Globe },
    { title: 'High ROI & Scholarships', desc: 'Access various scholarships and funding options with excellent return on investment.', icon: Star }
  ];

  const courses = [
    { title: 'Engineering & Technology', duration: '2-4 years', desc: 'Specializations in Computer Science, Mechanical, Civil, Electrical, and Aerospace Engineering with hands-on research opportunities.', tags: ['USA', 'Germany', 'Canada'], icon: Cpu },
    { title: 'Business & Management (MBA)', duration: '1-2 years', desc: 'Finance, Marketing, Entrepreneurship, and International Business programs at top global business schools.', tags: ['USA', 'UK', 'Canada', 'Australia'], icon: TrendingUp },
    { title: 'Data Science & AI', duration: '1-2 years', desc: 'Machine Learning, Artificial Intelligence, Big Data Analytics, and Business Intelligence programs.', tags: ['USA', 'UK', 'Canada', 'Germany'], icon: Bot },
    { title: 'Medicine & Healthcare', duration: '4-6 years', desc: 'MBBS, Nursing, Dentistry, Pharmacy, Public Health, and Biomedical Science programs.', tags: ['UK', 'USA', 'Australia', 'Germany'], icon: Heart },
    { title: 'Arts & Humanities', duration: '3-4 years', desc: 'Literature, History, Philosophy, Fine Arts, Design, and Cultural Studies programs.', tags: ['UK', 'USA', 'Canada', 'Australia'], icon: Palette },
    { title: 'Law & Legal Studies', duration: '3-4 years', desc: 'LLB, LLM, International Law, Corporate Law, and Human Rights programs at prestigious law schools.', tags: ['UK', 'USA', 'Australia', 'Canada'], icon: Scale }
  ];

  const exams = [
    { name: 'IELTS', type: 'English Language Proficiency', desc: 'Accepted in UK, USA, Canada, Australia, New Zealand and 140+ countries.', icon: Languages },
    { name: 'TOEFL', type: 'English Language Proficiency', desc: 'Accepted in USA, Canada, Australia, UK and 150+ countries worldwide.', icon: ClipboardList },
    { name: 'GRE', type: 'Graduate Record Examination', desc: 'Required for MS programs in USA, Canada, and other countries.', icon: BookOpen },
    { name: 'GMAT', type: 'Graduate Management Admission Test', desc: 'Required for MBA programs globally, especially in USA and Europe.', icon: Briefcase },
    { name: 'SAT', type: 'Scholastic Assessment Test', desc: 'Required for undergraduate programs in USA and some other countries.', icon: GraduationCap },
    { name: 'Duolingo', type: 'English Test', desc: 'Accepted by 3000+ institutions worldwide, online proctored test.', icon: Globe }
  ];

  const steps = [
    { id: 1, title: 'Choose Country & Course', desc: 'Select your preferred destination and program based on career goals.' },
    { id: 2, title: 'Prepare Exams', desc: 'Take required language and entrance tests with our preparation support.' },
    { id: 3, title: 'Apply to Universities', desc: 'Get help with applications, SOPs, LORs, and documentation.' },
    { id: 4, title: 'Get Offer Letter', desc: 'Receive acceptance from universities and choose the best option.' },
    { id: 5, title: 'Apply for Visa', desc: 'Complete visa application with our guidance and documentation support.' }
  ];

  return (
    <div style={{ background: '#f8fafc' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '50px 0', background: 'linear-gradient(to bottom, #eff6ff, #fff)' }}>
        <div style={{ ...containerStyle, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }} className="hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>
                <Globe size={16} /> STUDY ABROAD
             </div>
             <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#1e293b', lineHeight: 1.1, marginBottom: '24px' }}>
                Study Abroad: <span style={{ color: '#5b51d8' }}>Explore Top <br /> Universities Worldwide</span>
             </h1>
             <p style={{ color: '#64748b', fontSize: '18px', fontWeight: 500, marginBottom: '40px', maxWidth: '500px' }}>
                Courses, countries, scholarships & expert guidance for Indian students.
             </p>
             <div style={{ display: 'flex', gap: '20px' }}>
                <button style={{ 
                  background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', 
                  padding: '16px 32px', borderRadius: '12px', border: 'none', fontWeight: 800, 
                  fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)' 
                }}>
                  Explore Countries
                </button>
                <button style={{ 
                  background: 'transparent', color: '#5b51d8', 
                  padding: '16px 32px', borderRadius: '12px', border: '2px solid #5b51d8', 
                  fontWeight: 800, fontSize: '16px', cursor: 'pointer'
                }}>
                  Get Counselling
                </button>
             </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
             <div style={{ background: '#fff', borderRadius: '32px', padding: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                <img src={counselorImg} alt="Study Abroad" style={{ width: '100%', borderRadius: '20px' }} />
                {/* Abstract decor */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(91, 81, 216, 0.1)', borderRadius: '50%', zIndex: 0 }} />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Countries */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
             <span style={{ color: '#1e293b', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Countries</span>
             <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', marginTop: '12px' }}>
                Popular Countries to <span style={{ color: '#5b51d8' }}>Study Abroad</span>
             </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="responsive-grid">
             {countries.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ 
                    background: '#fff', borderRadius: '24px', padding: '32px', 
                    border: '1.5px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    transition: 'transform 0.3s ease'
                  }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                >
                   <div style={{ marginBottom: '16px' }}>
                     <img src={c.flag} alt={c.name} style={{ height: '48px', width: 'auto', objectFit: 'contain', borderRadius: '6px' }} />
                   </div>
                   <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>{c.name}</h3>
                   <div style={{ display: 'grid', gap: '8px', color: '#64748b', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
                      <p>Popular Intakes: <span style={{ color: '#1e293b' }}>{c.intake}</span></p>
                      <p>No. Of Colleges: <span style={{ color: '#1e293b' }}>{c.colleges}</span></p>
                      <p>Avg. Tuition: <span style={{ color: '#1e293b' }}>{c.tuition}</span></p>
                   </div>
                   <button style={{ 
                     width: '100%', padding: '12px', borderRadius: '10px', 
                     border: '1.5px solid #5b51d8', background: 'transparent', 
                     color: '#5b51d8', fontWeight: 800, fontSize: '14px', cursor: 'pointer' 
                   }}>
                     View Details
                   </button>
                </motion.div>
             ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
             <button style={{ 
               background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', 
               padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 800, 
               fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' 
             }}>
               View All Countries <ArrowRight size={16} />
             </button>
          </div>
        </div>
      </section>

      {/* Why Study Abroad */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={containerStyle}>
          <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', textAlign: 'center', marginBottom: '40px' }}>
             Why <span style={{ color: '#5b51d8' }}>Study Abroad</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="responsive-grid">
             {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ 
                    background: '#fff', borderRadius: '24px', padding: '32px', 
                    textAlign: 'left', border: '1.5px solid #f1f5f9',
                    borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg, #5b51d8, #38bdf8) 1',
                    borderImageSlice: '1 1 0 0'
                  }}
                >
                   <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '24px' }}>
                      <f.icon size={26} strokeWidth={2.5} />
                   </div>
                   <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px', lineHeight: 1.3 }}>{f.title}</h3>
                   <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, fontWeight: 500 }}>{f.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
             <span style={{ color: '#1e293b', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Top Courses</span>
             <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', marginTop: '12px' }}>
                Top Courses to <span style={{ color: '#5b51d8' }}>Study Abroad</span>
             </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="responsive-grid">
             {courses.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ 
                    background: '#fff', borderRadius: '24px', padding: '32px', 
                    border: '1.5px solid #f1f5f9', position: 'relative'
                  }}
                >
                   <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '20px' }}>
                      <c.icon size={24} />
                   </div>
                   <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>{c.title}</h3>
                   <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700, marginBottom: '16px' }}>Duration: {c.duration}</p>
                   <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.5, fontWeight: 500, marginBottom: '24px' }}>{c.desc}</p>
                   
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                      {c.tags.map(t => (
                        <span key={t} style={{ padding: '4px 12px', background: '#f8fafc', borderRadius: '100px', fontSize: '11px', fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>{t}</span>
                      ))}
                   </div>
                   
                   <button style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     color: '#5b51d8', fontWeight: 900, fontSize: '13px', 
                     border: 'none', background: 'transparent', cursor: 'pointer' 
                   }}>
                     Explore Programs <ChevronRight size={16} />
                   </button>
                </motion.div>
             ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
             <button style={{ 
               background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', 
               padding: '12px 32px', borderRadius: '100px', border: 'none', fontWeight: 800, 
               fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' 
             }}>
               View All Courses <ArrowRight size={16} />
             </button>
          </div>
        </div>
      </section>

      {/* Exams Required */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
             <span style={{ color: '#1e293b', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Exams</span>
             <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', marginTop: '12px' }}>
                Exams Required to <span style={{ color: '#5b51d8' }}>Study Abroad</span>
             </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="responsive-grid">
             {exams.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1.5px solid #f1f5f9', display: 'flex', gap: '20px' }}
                >
                   <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                      {e.icon && <e.icon size={20} />}
                   </div>
                   <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '4px' }}>{e.name}</h3>
                      <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 800, marginBottom: '12px' }}>{e.type}</p>
                      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, fontWeight: 500, marginBottom: '16px' }}>{e.desc}</p>
                      <button style={{ color: '#5b51d8', fontWeight: 900, fontSize: '12px', border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Know More <ArrowRight size={14} />
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section style={{ padding: '50px 0', background: '#fff' }}>
        <div style={containerStyle}>
           <div style={{ 
             background: 'linear-gradient(to right, #eff6ff, #f8fafc)', borderRadius: '32px', 
             padding: '48px', border: '1.5px solid #e2e8f0', display: 'flex', 
             justifyContent: 'space-between', alignItems: 'center'
           }} className="cta-box">
              <div style={{ maxWidth: '600px' }}>
                 <h2 style={{ fontSize: '32px', fontWeight: 950, color: '#1e293b', marginBottom: '16px' }}>
                    Scholarships & Financial Aid for <span style={{ color: '#5b51d8' }}>Indian Students</span>
                 </h2>
                 <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 500, marginBottom: '32px' }}>
                    We help you access various funding options to make your study abroad dream affordable.
                 </p>
                 <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <Award size={24} color="#10b981" />
                       <div>
                          <p style={{ fontWeight: 900, fontSize: '14px', color: '#1e293b' }}>Government Scholarships</p>
                          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Fully funded programs</p>
                       </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <GraduationCap size={24} color="#5b51d8" />
                       <div>
                          <p style={{ fontWeight: 900, fontSize: '14px', color: '#1e293b' }}>University Scholarships</p>
                          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Merit-based support</p>
                       </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <HelpingHand size={24} color="#f59e0b" />
                       <div>
                          <p style={{ fontWeight: 900, fontSize: '14px', color: '#1e293b' }}>Financial Aid</p>
                          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Loans & grants</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div>
                 <button style={{ 
                   background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff', 
                   padding: '16px 32px', borderRadius: '12px', border: 'none', fontWeight: 800, 
                   fontSize: '15px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(91, 81, 216, 0.2)' 
                 }}>
                   Apply for Scholarship
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Admission & Visa Guidance */}
      <section style={{ padding: '50px 0', background: '#f8fafc' }}>
        <div style={containerStyle}>
          <h2 style={{ fontSize: '36px', fontWeight: 950, color: '#1e293b', textAlign: 'center', marginBottom: '40px' }}>
             Admission & Visa <span style={{ color: '#5b51d8' }}>Guidance</span>
          </h2>
          
          {/* Staircase Diagram */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px', padding: '20px 0' }} className="staircase-container">
             {steps.map((s, i) => {
               const colors = [
                 'linear-gradient(135deg, #ef4444, #f97316)',
                 'linear-gradient(135deg, #f97316, #eab308)',
                 'linear-gradient(135deg, #22c55e, #10b981)',
                 'linear-gradient(135deg, #3b82f6, #6366f1)',
                 'linear-gradient(135deg, #8b5cf6, #d946ef)'
               ];
               const stepHeight = 100 + (i * 50);
               return (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.12 }}
                   style={{ 
                     display: 'flex', flexDirection: 'column', alignItems: 'center',
                     flex: 1, maxWidth: '220px'
                   }}
                 >
                    {/* Step number circle */}
                    <div style={{ 
                      width: '44px', height: '44px', borderRadius: '50%', 
                      background: colors[i], color: '#fff', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontWeight: 900, fontSize: '16px', marginBottom: '12px',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                    }}>
                      {String(s.id).padStart(2, '0')}
                    </div>
                    
                    {/* Title & Description */}
                    <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', textAlign: 'center', marginBottom: '6px', lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, textAlign: 'center', lineHeight: 1.4, marginBottom: '12px' }}>{s.desc}</p>
                    
                    {/* Stair block */}
                    <div style={{ 
                      width: '100%', height: `${stepHeight}px`, 
                      background: colors[i], borderRadius: '12px 12px 4px 4px',
                      position: 'relative', overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }}>
                       {/* Subtle pattern overlay */}
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.08), transparent 50%)', borderRadius: 'inherit' }} />
                       {/* Icon at bottom */}
                       <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)' }}>
                          {[MapPin, BookOpen, Plane, Award, ShieldCheck][i] && React.createElement([MapPin, BookOpen, Plane, Award, ShieldCheck][i], { size: 28 })}
                       </div>
                    </div>
                 </motion.div>
               );
             })}
          </div>
        </div>
      </section>

      {/* Expert Counselling Banner */}
      <section style={{ padding: '40px 0 60px 0', background: '#fff' }}>
        <div style={containerStyle}>
           <motion.div 
             whileHover={{ scale: 1.01 }}
             style={{ 
               background: 'linear-gradient(100deg, #5b51d8, #38bdf8)', 
               borderRadius: '20px', padding: '28px 40px', color: '#fff', display: 'flex', 
               justifyContent: 'space-between', alignItems: 'center' 
             }}
             className="cta-box"
           >
              <div>
                 <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '6px' }}>
                    Confused about where to study? Get expert counselling
                 </h2>
                 <p style={{ fontSize: '13px', fontWeight: 500, opacity: 0.85 }}>
                    Our experienced counsellors will guide you through country selection, course choice, and application process.
                 </p>
              </div>
              <div>
                 <button style={{ 
                   background: '#1e293b', color: '#fff', padding: '16px 32px', 
                   borderRadius: '12px', border: 'none', fontWeight: 800, 
                   fontSize: '15px', cursor: 'pointer', display: 'flex', 
                   alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' 
                 }}>
                   <MessageCircle size={20} /> Talk to an Expert
                 </button>
              </div>
           </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-grid div { margin: 0 auto !important; }
          .responsive-grid { grid-template-columns: 1fr 1fr !important; }
          .responsive-grid-centered { width: 100% !important; grid-template-columns: 1fr 1fr !important; }
          .cta-box { flex-direction: column; text-align: center; gap: 32px; }
          .staircase-container { overflow-x: auto; }
        }
        @media (max-width: 768px) {
          .responsive-grid { grid-template-columns: 1fr !important; }
          .responsive-grid-centered { grid-template-columns: 1fr !important; }
          .staircase-container { flex-direction: row; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 12px; }
        }
      `}</style>

    </div>
  );
};

export default StudyAbroadSection;
