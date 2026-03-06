import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingAskExperts from '../components/FloatingAskExperts';
import AIVoiceAssistant from '../components/AIVoiceAssistant';

const Resources = () => {
    return (
        <>
            <AnimatePresence>
                {loading && <Preloader />}
            </AnimatePresence>
            <div style={{ minHeight: '100vh', background: '#fff', zoom: isAdminRoute ? 1 : 1.1 }}>
                {!isAdminRoute && <Header currentView={getCurrentView()} />}
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
                {!isAdminRoute && <FloatingAskExperts onOpen={() => setIsAssistantOpen(true)} />}
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