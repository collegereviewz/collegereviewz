import React, { useState, useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CoursesListing from './pages/CoursesListing'
import ExploreColleges from './pages/ExploreColleges'
import Exams from './pages/Exams'
import Scholarship from './pages/Scholarship'
import StudyAbroad from './pages/StudyAbroad'
import Contact from './pages/Contact'
import Resources from './pages/Resources'
import WriteReview from './pages/ReviewPage'
import Support from './pages/Support'
import Login from './pages/LoginPage'
import FloatingAskExperts from './components/FloatingAskExperts'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Artificial delay to show the premium loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  // Determine current view based on pathname
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

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      <div style={{ minHeight: '100vh', background: '#fff', zoom: 1.1 }}>
        <Header currentView={getCurrentView()} />
        <main>
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
                <Route path="/Login/" element={<Login />} />
                <Route path="/Signup/" element={<SignupPage />} />
                <Route path="/Profile/" element={<ProfilePage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingAskExperts />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}



export default App