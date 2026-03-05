import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Edit3, GraduationCap, Twitter, Facebook, Instagram, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';

import logoImg from '../assets/logo6.png';

const Header = ({ currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);

    const updateAuthUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) { console.error(e) }
      } else {
        setUser(null);
      }
    };

    updateAuthUser(); // Initial check

    // Listen for auth changes
    window.addEventListener('auth-change', updateAuthUser);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('auth-change', updateAuthUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setProfileMenuOpen(false);
    // Dispatch event so other components know auth state changed
    window.dispatchEvent(new Event('auth-change'));
    navigate('/Login/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Colleges', path: '/ExploreColleges/' },
    { name: 'Courses', path: '/Courses/' },
    { name: 'Exams', path: '/Exams/' },
    { name: 'Scholarship', path: '/Scholarship/' },
    { name: 'Study Abroad', path: '/StudyAbroad/' },
    { name: 'Contact Us', path: '/Contact/' }
  ];

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >

        {/* Top announcement bar */}
        {!scrolled && (
          <div style={{ backgroundColor: '#5196cd', color: '#fff', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', fontWeight: 600 }}>
            <span style={{ opacity: 0.95 }}>Helping students choose better — Write a review &amp; earn points!</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <NavLink to="/Support/" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95 }}>Support</NavLink>
                <span style={{ opacity: 0.4 }}>/</span>
                <NavLink to="/Login/" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95 }}>Login</NavLink>
              </div>
              <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Twitter size={14} strokeWidth={3} style={{ cursor: 'pointer', opacity: 0.9 }} />
                <Facebook size={14} strokeWidth={3} style={{ cursor: 'pointer', opacity: 0.9 }} />
                <Instagram size={14} strokeWidth={3} style={{ cursor: 'pointer', opacity: 0.9 }} />
              </div>
            </div>
          </div>
        )}

        {/* Main nav */}
        <nav style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #f1f5f9',
          padding: scrolled ? '12px 32px' : '18px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease'
        }}>

          {/* Logo */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            className="nav-logo-wrap"
            onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
          >
            <img src={logoImg} alt="Logo" style={{ width: '40px', height: '40px' }} className="nav-logo-icon" />
            <span style={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.5px' }} className="nav-logo-text">CollegeReviewZ</span>
          </div>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px', fontSize: '14px', fontWeight: 700 }} className="hidden-mobile">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end
                onClick={() => window.scrollTo(0, 0)}
                style={({ isActive }) => ({
                  color: isActive ? '#5b51d8' : '#64748b',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  borderBottom: isActive ? '2px solid #5b51d8' : '2px solid transparent',
                  paddingBottom: '4px'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="nav-right-wrap">
            <NavLink
              to="/WriteReview/"
              className="nav-cta"
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(91,81,216,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(91,81,216,0.25)'; }}
            >
              <span>Write Review</span> <Edit3 size={15} strokeWidth={2.5} />
            </NavLink>

            {/* Profile Dropdown */}
            {user && (
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <div
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
                    userSelect: 'none'
                  }}>
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>

                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        top: '120%', right: 0,
                        background: '#ffffff',
                        border: '1px solid #f1f5f9',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        width: '240px',
                        overflow: 'hidden',
                        zIndex: 1000
                      }}
                    >
                      <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#111827' }}>{user.fullName}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{user.email}</p>
                      </div>
                      <div style={{ padding: '8px' }}>
                        <NavLink to="/Profile/"
                          onClick={() => setProfileMenuOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', color: '#475569', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s', fontSize: '14px', fontWeight: 600 }}>
                          <UserIcon size={18} /> My Profile
                        </NavLink>
                        <button onClick={handleLogout}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', color: '#ef4444', textDecoration: 'none', background: 'none', border: 'none', width: '100%', borderRadius: '8px', transition: 'background 0.2s', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                          <LogOut size={18} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#111827', display: 'none' }}
              className="show-mobile"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f1f5f9', padding: '20px 24px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end
                onClick={() => {
                  setMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '14px 0',
                  borderBottom: '1px solid #f8fafc',
                  color: isActive ? '#5b51d8' : '#111827',
                  fontWeight: 700,
                  fontSize: '16px',
                  textDecoration: 'none'
                })}
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/WriteReview/"
              onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', color: '#fff', padding: '16px', marginTop: '20px', borderRadius: '16px', fontWeight: 800, textDecoration: 'none' }}
            >
              Write Review <Edit3 size={18} />
            </NavLink>
          </div>
        )}

        <style>{`
        .nav-logo-text { font-size: 22px; }
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          color: #fff;
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 13.5px;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
          transition: all 0.2s ease;
          border: none;
          white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          nav { padding: 10px 16px !important; }
          .nav-logo-text { font-size: 18px; }
          .nav-logo-icon { width: 26px; height: 26px; }
          .nav-cta { 
            padding: 8px 16px; 
            font-size: 11px;
            gap: 5px;
          }
          .nav-cta span { display: inline; }
        }

        @media (max-width: 400px) {
          .nav-logo-text { font-size: 16px; }
          .nav-cta { padding: 7px 12px; font-size: 10px; }
        }

        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
      </motion.div>
    </header>
  );
};

export default Header;
