import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0',
    borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', fontWeight: 500,
    outline: 'none', background: '#fff', transition: 'border-color 0.2s',
    boxSizing: 'border-box', color: '#1e293b'
  };

  const labelStyle = {
    fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px', display: 'block'
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <style>{`
        .contact-input:focus { border-color: #5b51d8 !important; box-shadow: 0 0 0 3px rgba(91,81,216,0.08); }
        .contact-input::placeholder { color: #94a3b8; font-weight: 500; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; }
        .contact-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .contact-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #5b51d8 0%, #7c3aed 30%, #38bdf8 70%, #a78bfa 100%)',
        padding: '125px 24px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '42px', fontWeight: 950, color: '#fff', marginBottom: '16px', position: 'relative', zIndex: 1 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', fontWeight: 500, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, position: 'relative', zIndex: 1 }}
        >
          Have questions about colleges, admissions, or need guidance? Our team is here to help you make informed decisions about your education journey.
        </motion.p>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
        <div className="contact-grid">
          
          {/* Left Side — Contact Info Cards */}
          <div>
            <div className="contact-cards" style={{ marginBottom: '20px' }}>
              {/* Call Us */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1.5px solid #f1f5f9' }}
              >
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '16px' }}>
                  <Phone size={22} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Call Us</h3>
                <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '16px', lineHeight: 1.5 }}>Speak directly with our student support team</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontSize: '13px', fontWeight: 700 }}>
                    <Phone size={14} /> +91 97179 87058
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontSize: '13px', fontWeight: 700 }}>
                    <Phone size={14} /> +91 97179 87058
                  </div>
                </div>
              </motion.div>

              {/* Email Us */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1.5px solid #f1f5f9' }}
              >
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '16px' }}>
                  <Mail size={22} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Email Us</h3>
                <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '16px', lineHeight: 1.5 }}>Send detailed queries for comprehensive guidance</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontSize: '13px', fontWeight: 700 }}>
                    <Mail size={14} /> admin@collegereviewz.com
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5b51d8', fontSize: '13px', fontWeight: 700 }}>
                    <Mail size={14} /> info@collegereviewz.com
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visit Us */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ background: '#fff', borderRadius: '20px', padding: '28px', border: '1.5px solid #f1f5f9' }}
            >
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '16px' }}>
                <MapPin size={22} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>Visit Us</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} style={{ color: '#5b51d8', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Monday – Saturday: 10:00 AM – 7:00 PM</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                <p style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>Office Address:</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Building2 size={14} style={{ color: '#5b51d8', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, lineHeight: 1.6 }}>
                     217, 2nd Floor, Diamond
Arcade,<br />
                    Shyam Nagar Road, 68 Jessore Road,<br />
                    Kolkata – 700055, India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side — Send a Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ background: '#fff', borderRadius: '24px', padding: '36px', border: '1.5px solid #f1f5f9' }}
          >
            <h2 style={{ fontSize: '26px', fontWeight: 950, color: '#1e293b', marginBottom: '8px' }}>Send a Message</h2>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginBottom: '28px' }}>Fill out the form below and we'll get back to you soon.</p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Enter your full name" required className="contact-input"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Enter your email address" required className="contact-input"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Enter your phone number" className="contact-input"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Subject *</label>
                <input
                  type="text" name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Enter subject" required className="contact-input"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Write your message here..." required className="contact-input"
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #5b51d8, #38bdf8)', color: '#fff',
                  padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: 800,
                  fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '10px', width: '100%',
                  boxShadow: '0 8px 24px rgba(91,81,216,0.2)', fontFamily: 'inherit',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(91,81,216,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(91,81,216,0.2)'; }}
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Find Our Office — Map Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '30px', fontWeight: 950, color: '#1e293b', marginBottom: '24px' }}
        >
          Find Our Office
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #f1f5f9', height: '400px' }}
        >
          <a 
            href="https://www.google.com/maps/search/217+2nd+Floor+Diamond+Arcade+Shyam+Nagar+Road+68+Jessore+Road+Kolkata+700055" 
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}
          >
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.5!2d88.3932!3d22.6068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e10069ec0e7%3A0x0!2s68+Jessore+Road%2C+Kolkata%2C+West+Bengal+700055!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }}
              allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
