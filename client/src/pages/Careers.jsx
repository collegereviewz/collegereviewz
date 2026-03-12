import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, X, UploadCloud, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetailsClick = (job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleApplyClick = () => {
    setIsJobDetailsOpen(false);
    setIsModalOpen(true);
    setSubmitSuccess(false);
  };

  const closeJobDetails = () => {
    setIsJobDetailsOpen(false);
    if (!isModalOpen) setSelectedJob(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setFormData({ applicantName: '', email: '', phone: '', coverLetter: '' });
    setResumeFile(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload a resume.");
      return;
    }

    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append('jobId', selectedJob._id);
    submitData.append('applicantName', formData.applicantName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('coverLetter', formData.coverLetter);
    submitData.append('resume', resumeFile);

    try {
      await axios.post('http://localhost:5000/api/jobs/apply', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      paddingTop: '120px', 
      paddingBottom: '80px',
      background: 'linear-gradient(180deg, #ffffff 0%, #e0f2fe 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', marginBottom: '16px', letterSpacing: '-1px' }}
          >
            Build With <span style={{ color: '#3b82f6' }}>Impact</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: '18px', color: '#475569', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Join CollegeReviewz to help shape the future of intelligent academic and career guidance. Discover open roles below.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Search roles, departments, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '16px 24px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              width: '100%',
              maxWidth: '500px',
              fontSize: '16px',
              outline: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s'
            }}
          />
        </div>

        {/* Jobs Listing */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading open roles...</div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>No open roles match your search.</div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)' }}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '12px', lineHeight: 1.3 }}>
                    {job.title}
                  </h2>
                  <div style={{ display: 'flex', gap: '12px', color: '#64748b', fontSize: '13px', fontWeight: 500, flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '100px' }}>
                      <Briefcase size={14} /> {job.department}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '100px' }}>
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '4px 10px', borderRadius: '100px' }}>
                      <Clock size={14} /> {job.type}
                    </span>
                  </div>
                  
                  <p style={{ 
                    color: '#475569', lineHeight: 1.6, fontSize: '14px', marginBottom: '20px', flexGrow: 1,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>
                    {job.description}
                  </p>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Requirements</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '13px', lineHeight: 1.6 }}>
                      {job.requirements.slice(0, 2).map((req, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{req}</li>
                      ))}
                      {job.requirements.length > 2 && (
                        <li style={{ listStyle: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>+ more specific requirements...</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={() => handleViewDetailsClick(job)}
                    style={{
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      width: '100%',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '15px',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#2563eb'}
                    onMouseOut={(e) => e.target.style.background = '#3b82f6'}
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Job Details Modal */}
        <AnimatePresence>
          {isJobDetailsOpen && selectedJob && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, padding: '20px'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  width: '100%',
                  maxWidth: '700px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  position: 'relative'
                }}
              >
                <div style={{ padding: '32px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', lineHeight: 1.2 }}>{selectedJob.title}</h2>
                    <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '15px', fontWeight: 500, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Briefcase size={18} /> {selectedJob.department}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={18} /> {selectedJob.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={18} /> {selectedJob.type}</span>
                    </div>
                  </div>
                  <button onClick={closeJobDetails} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px', marginTop: '-8px', marginRight: '-8px' }}>
                    <X size={28} />
                  </button>
                </div>

                <div style={{ padding: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>About the Role</h3>
                  <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
                    {selectedJob.description}
                  </p>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Requirements</h3>
                  <ul style={{ paddingLeft: '24px', margin: 0, color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>{req}</li>
                    ))}
                  </ul>
                  
                  <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                     <button 
                       onClick={closeJobDetails} 
                       style={{ 
                         padding: '14px 28px', borderRadius: '12px', border: '1px solid #e2e8f0', 
                         background: 'white', fontWeight: 600, color: '#475569', cursor: 'pointer', fontSize: '16px' 
                       }}
                     >
                       Cancel
                     </button>
                     <button 
                       onClick={handleApplyClick} 
                       style={{ 
                         padding: '14px 28px', borderRadius: '12px', border: 'none', 
                         background: '#3b82f6', fontWeight: 600, color: 'white', cursor: 'pointer', fontSize: '16px' 
                       }}
                     >
                       Apply Now
                     </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Application Modal */}
        <AnimatePresence>
          {isModalOpen && selectedJob && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000, padding: '20px'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  width: '100%',
                  maxWidth: '600px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  position: 'relative'
                }}
              >
                {/* Modal Header */}
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Apply for {selectedJob?.title}</h3>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '14px', marginTop: '4px' }}>{selectedJob?.department} · {selectedJob?.location}</p>
                  </div>
                  <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}>
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: '32px' }}>
                  {submitSuccess ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto', marginBottom: '16px' }} />
                      <h4 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Application Submitted</h4>
                      <p style={{ color: '#64748b', fontSize: '16px' }}>Thank you for applying. We'll be in touch soon!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Full Name *</label>
                          <input required type="text" name="applicantName" value={formData.applicantName} onChange={handleInputChange} style={inputStyles} placeholder="John Doe" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Phone Number *</label>
                          <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={inputStyles} placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Email Address *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} style={inputStyles} placeholder="john@example.com" />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Resume / CV (PDF or Word) *</label>
                        <div style={{
                          border: '2px dashed #cbd5e1',
                          borderRadius: '12px',
                          padding: '30px',
                          textAlign: 'center',
                          background: '#f8fafc',
                          position: 'relative'
                        }}>
                          <UploadCloud size={32} color="#64748b" style={{ marginBottom: '12px' }} />
                          <p style={{ margin: 0, fontSize: '14px', color: '#475569', fontWeight: 500 }}>
                            {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                          </p>
                          <input 
                            required 
                            type="file" 
                            accept=".pdf,.doc,.docx" 
                            onChange={handleFileChange}
                            style={{
                              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                              opacity: 0, cursor: 'pointer'
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Cover Letter (Optional)</label>
                        <textarea 
                          name="coverLetter" 
                          value={formData.coverLetter} 
                          onChange={handleInputChange} 
                          rows={4}
                          style={{ ...inputStyles, resize: 'vertical' }} 
                          placeholder="Tell us why you'd be a great fit..." 
                        />
                      </div>

                      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" onClick={closeModal} style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" disabled={isSubmitting} style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#3b82f6', fontWeight: 600, color: 'white', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const inputStyles = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box'
};

export default Careers;
