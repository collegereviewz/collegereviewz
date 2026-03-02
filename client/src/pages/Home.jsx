import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import NewsUpdatesSection from '../components/NewsUpdatesSection';
import TopColleges from '../components/TopColleges';
import ExploreSection from '../components/ExploreSection';
import PopularCourses from '../components/PopularCourses';
import RewardsSection from '../components/RewardsSection';
import ScholarshipSection from '../components/ScholarshipSection';
import ExamsSection from '../components/ExamsSection';
import BoardExamsSection from '../components/BoardExamsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsSection from '../components/NewsSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (view) => {
    if (view === 'Home') navigate('/');
    else if (view === 'Courses') navigate('/Courses/');
    else if (view === 'Explore Colleges') navigate('/ExploreColleges/');
    else if (view === 'Write Review') navigate('/WriteReview/');
    window.scrollTo(0, 0);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  };

  return (
    <>
      <Hero onNavigate={handleNavigate} />

      <motion.div {...fadeInUp}>
        <NewsUpdatesSection />
      </motion.div>

      <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
        <TopColleges />
      </motion.div>

      <motion.div {...fadeInUp}>
        <ExploreSection onNavigate={handleNavigate} />
      </motion.div>

      <motion.div {...fadeInUp}>
        <PopularCourses onNavigate={handleNavigate} />
      </motion.div>

      <motion.div {...fadeInUp}>
        <RewardsSection />
      </motion.div>

      <motion.div {...fadeInUp}>
        <ScholarshipSection />
      </motion.div>

      <motion.div {...fadeInUp}>
        <ExamsSection />
      </motion.div>

      <motion.div {...fadeInUp}>
        <BoardExamsSection />
      </motion.div>

      <motion.div {...fadeInUp}>
        <TestimonialsSection />
      </motion.div>

      <motion.div {...fadeInUp}>
        <NewsSection />
      </motion.div>
    </>
  );
};

export default Home;
