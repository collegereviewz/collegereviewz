import React, { useState, useEffect, Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CoursesListing from './pages/CoursesListing'
import ExploreColleges from './pages/ExploreColleges/ExploreColleges'
import Exams from './pages/Exams'
import Scholarship from './pages/Scholarship'
import StudyAbroad from './pages/StudyAbroad'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import WriteReview from './pages/WriteAReview'
import Support from './pages/Support'
import LoginPage from './pages/LoginPage'
import FloatingAskExperts from './components/FloatingAskExperts'
import SignupPage from './pages/SignupPage'
import AIVoiceAssistant from './components/AIVoiceAssistant'
import ProfilePage from './pages/ProfilePage'
import CollegeProfileWrapper from './pages/CollegeProfileWrapper'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Swal from 'sweetalert2';

// Global alert override matching the website theme
window.alert = (msg) => {
  Swal.fire({
    text: msg,
    background: '#1e293b',
    color: '#fff',
    confirmButtonColor: '#0096FF',
    backdrop: 'rgba(15, 23, 42, 0.85)',
    customClass: {
      popup: 'rounded-xl',
      confirmButton: 'rounded-lg px-4 py-2 font-bold'
    }
  });
};

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const getCurrentView = () => {
    if (location.pathname === '/') return 'Home';
    if (location.pathname.startsWith('/Courses')) return 'Courses';
    if (location.pathname.startsWith('/ExploreColleges')) return 'Explore Colleges';
    if (location.pathname.startsWith('/Exams')) return 'Exams';
    if (location.pathname.startsWith('/Scholarship')) return 'Scholarship';
    if (location.pathname.startsWith('/StudyAbroad')) return 'Study Abroad';
    if (location.pathname.startsWith('/Contact')) return 'Contact Us';
    if (location.pathname.startsWith('/Resources')) return 'Resources';
    return 'Home';
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        zoom: isAdminRoute ? 1 : 1.1
      }}>
        {!isAdminRoute && <Header currentView={getCurrentView()} />}
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/Courses/" element={<CoursesListing />} />
                <Route path="/ExploreColleges/" element={<ExploreColleges />} />
                <Route path="/Exams/" element={<Exams />} />
                <Route path="/Scholarship/" element={<Scholarship />} />
                <Route path="/StudyAbroad/" element={<StudyAbroad />} />
                <Route path="/Contact/" element={<Contact />} />
                <Route path="/Resources/" element={<Resources />} />
                <Route path="/WriteReview/" element={<WriteReview />} />
                <Route path="/Support/" element={<Support />} />
                <Route path="/Login/" element={<LoginPage />} />
                <Route path="/Signup/" element={<SignupPage />} />
                <Route path="/Profile/" element={<ProfilePage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/college/:collegeName" element={<CollegeProfileWrapper />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <FloatingAskExperts onClick={() => setIsAssistantOpen(true)} />}
        {!isAdminRoute && <AIVoiceAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App