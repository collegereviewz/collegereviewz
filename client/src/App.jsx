import React, { useState, useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CoursesListing from './pages/CoursesListing'
import Exams from './pages/Exams'
import Scholarship from './pages/Scholarship'
import StudyAbroad from './pages/StudyAbroad'
import Contact from './pages/Contact'
import WriteAReview from './pages/WriteAReview'
import Support from './pages/Support'
import Login from './pages/LoginPage'
import FloatingAskExperts from './components/FloatingAskExperts'
import SignupPage from './pages/SignupPage'
import ExploreColleges from './pages/ExploreColleges/ExploreColleges';
import CollegeProfileWrapper from './pages/CollegeProfileWrapper';
import { lazy } from 'react';

// Individual college pages (lazy loaded)
const IITBombay    = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/IITBombay'));
const IITDelhi     = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/IITDelhi'));
const IITMadras    = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/IITMadras'));
const IITKanpur    = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/IITKanpur'));
const IITKharagpur = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/IITKharagpur'));
const IITRoorkee   = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/IITRoorkee'));
const NITTrichy    = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/NITTrichy'));
const BITSPilani   = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/BITSPilani'));
const VITVellore   = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/VITVellore'));
const SRMChennai   = lazy(() => import('./pages/ExploreColleges/BE-BTech/Colleges/SRMChennai'));

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
                <Route path="/WriteReview/" element={<WriteAReview />} />
                <Route path="/Support/" element={<Support />} />
                <Route path="/Login/" element={<Login />} />
                <Route path="/Signup/" element={<SignupPage />} />
                <Route path="/college/:collegeName" element={<CollegeProfileWrapper />} />

                {/* Individual College Pages (lazy) */}
                <Route path="/ExploreColleges/BE-BTech/IIT-Bombay"    element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><IITBombay /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/IIT-Delhi"     element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><IITDelhi /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/IIT-Madras"    element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><IITMadras /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/IIT-Kanpur"    element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><IITKanpur /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/IIT-Kharagpur" element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><IITKharagpur /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/IIT-Roorkee"   element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><IITRoorkee /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/NIT-Trichy"    element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><NITTrichy /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/BITS-Pilani"   element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><BITSPilani /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/VIT-Vellore"   element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><VITVellore /></Suspense>} />
                <Route path="/ExploreColleges/BE-BTech/SRM-Chennai"   element={<Suspense fallback={<div style={{padding:'120px',textAlign:'center',color:'#5b51d8',fontWeight:800}}>Loading...</div>}><SRMChennai /></Suspense>} />
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
