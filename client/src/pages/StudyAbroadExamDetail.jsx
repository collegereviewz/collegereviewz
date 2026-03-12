import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, TrendingUp, Award, Briefcase, Globe,
  ChevronDown, ChevronUp, CheckCircle2, Target, BarChart2, Star, BookOpen
} from 'lucide-react';

// ─── MODULAR YEAR-WISE DATA ───────────────────────────────────────────────────
// To add a new year's data, simply push a new object: { year: 2026, students: XXXXX }
const PARTICIPATION_DATA = {
  ielts:   [
    { year: 2015, students: 2100000 }, { year: 2016, students: 2400000 },
    { year: 2017, students: 2700000 }, { year: 2018, students: 3000000 },
    { year: 2019, students: 3500000 }, { year: 2020, students: 2800000 },
    { year: 2021, students: 3200000 }, { year: 2022, students: 3700000 },
    { year: 2023, students: 4000000 }, { year: 2024, students: 4200000 },
  ],
  toefl:   [
    { year: 2015, students: 900000  }, { year: 2016, students: 1050000 },
    { year: 2017, students: 1150000 }, { year: 2018, students: 1250000 },
    { year: 2019, students: 1400000 }, { year: 2020, students: 1100000 },
    { year: 2021, students: 1250000 }, { year: 2022, students: 1350000 },
    { year: 2023, students: 1450000 }, { year: 2024, students: 1500000 },
  ],
  gre:     [
    { year: 2015, students: 580000  }, { year: 2016, students: 600000  },
    { year: 2017, students: 620000  }, { year: 2018, students: 640000  },
    { year: 2019, students: 670000  }, { year: 2020, students: 530000  },
    { year: 2021, students: 560000  }, { year: 2022, students: 590000  },
    { year: 2023, students: 620000  }, { year: 2024, students: 650000  },
  ],
  gmat:    [
    { year: 2015, students: 230000  }, { year: 2016, students: 245000  },
    { year: 2017, students: 260000  }, { year: 2018, students: 265000  },
    { year: 2019, students: 270000  }, { year: 2020, students: 200000  },
    { year: 2021, students: 220000  }, { year: 2022, students: 240000  },
    { year: 2023, students: 255000  }, { year: 2024, students: 260000  },
  ],
  sat:     [
    { year: 2015, students: 1700000 }, { year: 2016, students: 1800000 },
    { year: 2017, students: 1900000 }, { year: 2018, students: 2100000 },
    { year: 2019, students: 2200000 }, { year: 2020, students: 1800000 },
    { year: 2021, students: 1900000 }, { year: 2022, students: 2100000 },
    { year: 2023, students: 2300000 }, { year: 2024, students: 2400000 },
  ],
  duolingo: [
    { year: 2015, students: 80000   }, { year: 2016, students: 120000  },
    { year: 2017, students: 200000  }, { year: 2018, students: 350000  },
    { year: 2019, students: 550000  }, { year: 2020, students: 900000  },
    { year: 2021, students: 1200000 }, { year: 2022, students: 1650000 },
    { year: 2023, students: 2000000 }, { year: 2024, students: 2400000 },
  ],
};

// ─── EXAM DATA ────────────────────────────────────────────────────────────────
const EXAMS = {
  ielts: {
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    type: 'English Language Proficiency',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg,#2563eb,#38bdf8)',
    emoji: '🌐',
    conductedBy: 'British Council / IDP / Cambridge Assessment',
    frequency: 'Up to 48 times a year',
    validity: '2 years',
    fee: '₹16,500 – ₹17,000',
    scoreRange: 'Band 0–9',
    passingScore: 'Band 6.0–7.5 (varies by institution)',
    about: 'IELTS is the world\'s most popular English language proficiency test for higher education and global migration. It is accepted by over 11,000 organisations in 140+ countries including UK, Canada, Australia, USA and New Zealand. Available in Academic and General Training formats.',
    structure: [
      { section: 'Listening', duration: '30 min', questions: '40 questions', note: 'Audio recordings' },
      { section: 'Reading', duration: '60 min', questions: '40 questions', note: 'Academic or General texts' },
      { section: 'Writing', duration: '60 min', questions: '2 tasks', note: 'Graph/letter + Essay' },
      { section: 'Speaking', duration: '11–14 min', questions: '3 parts', note: 'Face-to-face interview' },
    ],
    opportunities: [
      { icon: '🎓', title: 'UK Universities', desc: 'Minimum Band 6.5–7.5 unlocks admission to Oxford, Cambridge, Imperial, LSE and all Russell Group universities.' },
      { icon: '🍁', title: 'Canada PR (Express Entry)', desc: 'IELTS Band 6+ is essential for Canadian Permanent Residency via Express Entry. Higher scores = more CRS points.' },
      { icon: '🦘', title: 'Australia Student Visa', desc: 'Band 6.0+ is mandatory for Australian student visa. Band 7+ opens top Group of Eight universities.' },
      { icon: '🏥', title: 'UK Healthcare Jobs (NHS)', desc: 'Nurses & Doctors need IELTS 7.0+ for NMC/GMC registration to work in the NHS.' },
      { icon: '🌏', title: 'New Zealand Work Visa', desc: 'Band 6.5+ is required for skilled worker visas in high-demand NZ occupations.' },
      { icon: '💼', title: 'Global MNCs', desc: 'Fortune 500 companies accept IELTS scores as proof of English fluency for international hires.' },
    ],
    sectors: [
      { name: 'Education / Academia', score: 98, desc: 'All English-medium universities globally require IELTS for admission.' },
      { name: 'Healthcare & Nursing', score: 92, desc: 'NHS, Australian, and Canadian healthcare licensing boards mandate IELTS.' },
      { name: 'IT & Tech (Migration)', score: 88, desc: 'Tech workers migrating to UK, Canada, Australia need IELTS for visa.' },
      { name: 'Finance & Banking', score: 85, desc: 'Global banks require IELTS for international recruitment.' },
      { name: 'Hospitality & Tourism', score: 80, desc: 'Hotel chains and airlines require IELTS for English-speaking markets.' },
      { name: 'Engineering & Construction', score: 78, desc: 'Skilled migration programs need IELTS to qualify for points-based visas.' },
    ],
    tips: ['Start 6 months before your target date', 'Daily reading of The Guardian/BBC improves reading score', 'Practice writing essays timed (60 min)', 'IELTS Academic vs General: choose based on your goal', 'Band 7+ requires near-native fluency — focus on coherence'],
  },

  toefl: {
    name: 'TOEFL iBT',
    fullName: 'Test of English as a Foreign Language',
    type: 'English Language Proficiency',
    color: '#10b981',
    gradient: 'linear-gradient(135deg,#059669,#34d399)',
    emoji: '📝',
    conductedBy: 'ETS (Educational Testing Service)',
    frequency: '60+ dates per year',
    validity: '2 years',
    fee: '₹13,000 – ₹15,000',
    scoreRange: '0–120',
    passingScore: '80–100+ (varies by institution)',
    about: 'TOEFL iBT is the premier English language test accepted by 11,500+ universities in 160+ countries. It is predominantly preferred by US universities and is administered entirely online in an academic format. More text-heavy and task-integrated than IELTS, making it closer to actual graduate school demands.',
    structure: [
      { section: 'Reading', duration: '54–72 min', questions: '30–40 questions', note: '3-4 academic passages' },
      { section: 'Listening', duration: '41–57 min', questions: '28–39 questions', note: 'Lectures & conversations' },
      { section: 'Speaking', duration: '17 min', questions: '4 tasks', note: 'Recorded responses' },
      { section: 'Writing', duration: '50 min', questions: '2 tasks', note: 'Integrated + Independent' },
    ],
    opportunities: [
      { icon: '🏛️', title: 'US Universities (Ivy League)', desc: 'Harvard, MIT, Stanford, Columbia require TOEFL 100+ for consideration. Preferred over IELTS.' },
      { icon: '🍁', title: 'Canadian Universities', desc: 'U of Toronto, UBC, McGill accept TOEFL 90–100+ for graduate admissions.' },
      { icon: '🇦🇺', title: 'Australian Universities', desc: 'Go8 universities accept TOEFL as alternative to IELTS for graduate programs.' },
      { icon: '🔬', title: 'Research Fellowships', desc: 'NSF, Fulbright and major research fellowships require TOEFL 100+ for non-native speakers.' },
      { icon: '💻', title: 'FAANG & US Tech Jobs', desc: 'H1B skilled worker visa documentation often uses TOEFL as language proof.' },
      { icon: '🌐', title: 'European Universities', desc: '500+ European universities accept TOEFL for English-taught programs.' },
    ],
    sectors: [
      { name: 'STEM & Research', score: 95, desc: 'Most US MS/PhD programs require TOEFL. Research universities prefer it over IELTS.' },
      { name: 'Business & MBA', score: 88, desc: 'US B-schools widely accept TOEFL alongside GMAT.' },
      { name: 'Education & Teaching', desc: 'Teaching roles and scholarship programs in North America use TOEFL.', score: 82 },
      { name: 'Government & Policy', score: 78, desc: 'US government-funded programs like Fulbright require TOEFL.' },
      { name: 'Healthcare', score: 75, desc: 'Medical licensing boards in North America use TOEFL scores.' },
      { name: 'Law (LLM)', score: 72, desc: 'US law schools require TOEFL 100+ for LLM admission.' },
    ],
    tips: ['TOEFL scores 100+ opens Ivy League doors', 'Speaking tasks are recorded — clarity over accent', 'Integrated writing needs note-taking speed', 'MyBestScores allows combining best section scores', 'Prepare with ETS official TOEFL prep materials'],
  },

  gre: {
    name: 'GRE',
    fullName: 'Graduate Record Examinations',
    type: 'Graduate Aptitude Test',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
    emoji: '🧠',
    conductedBy: 'ETS (Educational Testing Service)',
    frequency: '5 times a year (paper) / Year-round (computer)',
    validity: '5 years',
    fee: '₹16,000 – ₹18,000',
    scoreRange: 'Verbal: 130–170 | Quant: 130–170 | AWA: 0–6',
    passingScore: '310+ (Quant 165+ for STEM MS)',
    about: 'The GRE General Test is the world\'s most widely accepted graduate admissions test. Required for nearly all MS programs in the USA, Canada, and several European countries. Tests Verbal Reasoning, Quantitative Reasoning, and Analytical Writing. GRE Subject Tests exist for specific fields like Mathematics, Physics, Chemistry.',
    structure: [
      { section: 'Analytical Writing', duration: '60 min', questions: '2 essays', note: 'Issue + Argument tasks' },
      { section: 'Verbal Reasoning', duration: '70 min', questions: '40 questions (2 sections)', note: 'Reading, vocabulary, logic' },
      { section: 'Quantitative Reasoning', duration: '70 min', questions: '40 questions (2 sections)', note: 'Arithmetic, Algebra, Geometry, Data' },
      { section: 'Research Section', duration: '30–35 min', questions: 'Unscored', note: 'ETS research purposes' },
    ],
    opportunities: [
      { icon: '🎓', title: 'MS in USA/Canada (STEM)', desc: 'GRE Quant 165+/170 is required for top MS programs at MIT, Stanford, CMU, and all state universities.' },
      { icon: '🔬', title: 'PhD Research Fellowships', desc: 'NSF Graduate Research Fellowship, Fulbright, and DAAD require GRE General for most STEM PhD programs.' },
      { icon: '🏦', title: 'MBA (Alternative)', desc: 'Top B-schools (HBS, Booth, Wharton) now accept GRE instead of GMAT for MBA admissions.' },
      { icon: '🧬', title: 'Biotech / Life Sciences', desc: 'GRE is required for all life science PhD programs in USA — genomics, biochemistry, neuroscience.' },
      { icon: '🤖', title: 'AI / ML Research Labs', desc: 'Deep learning research roles at DeepMind, Google Brain, OpenAI require strong GRE/academic credentials.' },
      { icon: '🌍', title: 'European MS Programs', desc: 'Dutch, German and Scandinavian universities increasingly accept GRE for English-medium MS programs.' },
    ],
    sectors: [
      { name: 'Technology & CS', score: 96, desc: 'GRE Quant 167+ is standard for MSCS/MSAI at top US universities.' },
      { name: 'Data Science & AI/ML', score: 94, desc: 'GRE is required for virtually all MS Data Science programs globally.' },
      { name: 'Engineering (All)', score: 92, desc: 'Every US engineering MS program lists GRE as requirement.' },
      { name: 'Finance & Econometrics', score: 85, desc: 'MS Finance, MFE, and Economics PhDs require strong GRE scores.' },
      { name: 'Life Sciences & Biology', score: 88, desc: 'All US biology, chemistry, and biomedical PhD programs need GRE.' },
      { name: 'Social Sciences', score: 78, desc: 'Psychology, Political Science, and Economics programs use GRE.' },
    ],
    tips: ['Quant 168+ is the gold standard for top STEM programs', 'Target 155+ Verbal for humanities/MBA', 'AWA 4.5+ is sufficient for STEM programs', 'Magoosh and Manhattan Prep are top resources', 'SuperScore: ETS sends only your best section scores'],
  },

  gmat: {
    name: 'GMAT',
    fullName: 'Graduate Management Admission Test',
    type: 'Business School Aptitude',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#d97706,#fbbf24)',
    emoji: '📊',
    conductedBy: 'GMAC (Graduate Management Admission Council)',
    frequency: 'Year-round (up to 5 times per year)',
    validity: '5 years',
    fee: '₹22,000 – ₹25,000',
    scoreRange: '205–805',
    passingScore: '650+ (700+ for M7 schools)',
    about: 'The GMAT is the premier entrance test for MBA and business master\'s programs globally. Accepted by 7,700+ programs at 2,300+ business schools worldwide. In 2023, GMAC introduced the GMAT Focus Edition — a shorter, more adaptive 2h15min version with improved scoring. Tests Data Insights, Verbal Reasoning, and Quantitative Reasoning.',
    structure: [
      { section: 'Quantitative Reasoning', duration: '45 min', questions: '21 questions', note: 'No geometry; arithmetic & algebra' },
      { section: 'Verbal Reasoning', duration: '45 min', questions: '23 questions', note: 'Reading comprehension & critical reasoning' },
      { section: 'Data Insights', duration: '45 min', questions: '20 questions', note: 'Data Sufficiency, Multi-source reasoning, Charts' },
    ],
    opportunities: [
      { icon: '🏛️', title: 'M7 Business Schools', desc: 'Harvard, Wharton, Booth, Columbia, Kellogg, Sloan, Tuck expect GMAT 720–760+ from Indian applicants.' },
      { icon: '💰', title: 'Investment Banking & PE', desc: 'Goldman, JP Morgan, Blackstone prefer MBA graduates with GMAT 700+ backgrounds.' },
      { icon: '🌐', title: 'Global Management Consulting', desc: 'McKinsey, BCG, and Bain recruit MBA graduates — GMAT 720+ strengthens your profile significantly.' },
      { icon: '🚀', title: 'Venture Capital & Startups', desc: 'VC firms and startup ecosystems value top MBA credentials from GMAT-qualified business schools.' },
      { icon: '🏢', title: 'Corporate Strategy Roles', desc: 'CFO, COO, and strategy director roles often require top B-school MBA which needs GMAT 680+.' },
      { icon: '🌍', title: 'European Business Schools', desc: 'LBS, INSEAD, HEC Paris, and IE require GMAT 650–720+ for their flagship MBA programs.' },
    ],
    sectors: [
      { name: 'Consulting & Strategy', score: 97, desc: 'MBB firms recruit almost exclusively from top MBA programs requiring GMAT 720+.' },
      { name: 'Investment Banking / PE / VC', score: 95, desc: 'Bulge-bracket banks and PE firms value GMAT-qualified MBA pedigree highest.' },
      { name: 'FMCG / Consumer Goods', score: 85, desc: 'P&G, Unilever, Nestlé recruit brand managers from top MBA programs.' },
      { name: 'Tech (Product & Strategy)', score: 88, desc: 'Google, Amazon, Apple hire MBAs with top GMAT credentials for product and strategy roles.' },
      { name: 'Healthcare Management', score: 80, desc: 'Hospital systems and pharma firms recruit MBA graduates for senior leadership.' },
      { name: 'Real Estate & Infrastructure', score: 75, desc: 'Real estate development and infra finance roles drawn from MBA pools.' },
    ],
    tips: ['GMAT Focus Edition is 2h15m — more efficient', 'Score 700+ before applying to target programs', 'Data Insights is the new critical differentiator', 'Official GMAT Prep is best practice material', 'Apply in Round 1 with 730+ to maximize scholarship chances'],
  },

  sat: {
    name: 'SAT',
    fullName: 'Scholastic Assessment Test',
    type: 'Undergraduate Admissions Test',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg,#dc2626,#f97316)',
    emoji: '🏫',
    conductedBy: 'College Board',
    frequency: '7 times a year (Feb, Mar, May, Jun, Aug, Oct, Nov)',
    validity: 'No expiry (colleges typically consider last 5 years)',
    fee: '₹7,500 – ₹9,000',
    scoreRange: '400–1600',
    passingScore: '1200+ (1400–1580 for Ivy League)',
    about: 'The SAT is the most widely used undergraduate admissions test in the USA, accepted by all 4,000+ US colleges and universities. In 2024, College Board launched the Digital SAT — shorter (2h14m), adaptive, and device-based. Strong SAT scores are essential for merit scholarships worth $10,000–$72,000/year at many universities. The SAT measures Evidence-based Reading & Writing and Math skills.',
    structure: [
      { section: 'Reading & Writing', duration: '64 min', questions: '54 questions (2 modules)', note: 'Evidence-based comprehension, grammar' },
      { section: 'Math', duration: '70 min', questions: '44 questions (2 modules)', note: 'Algebra, Advanced Math, Geometry, Statistics' },
    ],
    opportunities: [
      { icon: '🏛️', title: 'Ivy League Universities', desc: 'Harvard, Yale, Princeton, Columbia typically see admitted students score 1500–1580 on SAT.' },
      { icon: '💵', title: 'Merit Scholarships (USA)', desc: 'National Merit Scholarship ($8,000), university scholarships of up to $72,000+ are SAT-score driven.' },
      { icon: '🤖', title: 'Top Engineering Schools', desc: 'MIT (SAT 1510–1580), Caltech, Carnegie Mellon, Georgia Tech recruit heavily based on SAT Math 750+.' },
      { icon: '🎓', title: 'Liberal Arts Colleges', desc: 'Williams, Amherst, Swarthmore (consistently top-ranked) use SAT as primary screening criteria.' },
      { icon: '🌍', title: 'International Scholarships', desc: 'Many US universities offer full-ride scholarships to international students with SAT 1400+.' },
      { icon: '🇸🇬', title: 'Asian Universities', desc: 'NUS, NTU Singapore and leading Korean universities accept SAT for international undergrad admissions.' },
    ],
    sectors: [
      { name: 'Computer Science (UG)', score: 95, desc: 'MIT, CMU, Stanford require SAT Math 780–800 for CS admission.' },
      { name: 'Engineering (UG)', score: 93, desc: 'Top engineering schools screen by SAT Math 750+ as minimum baseline.' },
      { name: 'Business (UG)', score: 88, desc: 'Wharton undergrad (UPenn), Stern (NYU) require SAT 1450–1560.' },
      { name: 'Pre-Med / Life Sciences', score: 85, desc: 'Pre-med tracks at Johns Hopkins, Emory typically see SAT 1450+.' },
      { name: 'Law (Pre-Law UG)', score: 82, desc: 'Target universities for future law school typically need SAT 1350+.' },
      { name: 'Journalism & Media', score: 75, desc: 'Northwestern, Columbia Journalism programs look for SAT 1400+.' },
    ],
    tips: ['Digital SAT (2024+) is adaptive — first module sets difficulty of second', 'SAT Math covers Algebra 1, 2 and basic statistics', '1400+ qualifies for most merit scholarships', 'Khan Academy offers free official SAT prep', 'Take SAT in Grade 11 — leaving time for retakes'],
  },

  duolingo: {
    name: 'Duolingo English Test',
    fullName: 'Duolingo English Test (DET)',
    type: 'Online English Proficiency Test',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg,#16a34a,#4ade80)',
    emoji: '🦜',
    conductedBy: 'Duolingo Inc.',
    frequency: 'Anytime — on-demand, 24/7',
    validity: '2 years',
    fee: '₹4,200 (~$49)',
    scoreRange: '10–160',
    passingScore: '100–120+ (varies by university)',
    about: 'Duolingo English Test is a fully online, AI-proctored English proficiency test that can be taken anytime from home. It gained massive popularity during COVID-19 when in-person tests were unavailable, and has since been adopted by 5,000+ institutions worldwide including MIT, Harvard, Columbia, Stanford, and University of Toronto. Scores are available within 48 hours. The most affordable language test available.',
    structure: [
      { section: 'Adaptive Challenge Items', duration: '~45 min', questions: '~50 adaptive', note: 'Read, write, listen, speak simultaneously' },
      { section: 'Video Interview', duration: '10 min', questions: '2 prompts', note: 'Unscored but shared with universities' },
      { section: 'Sample Writing', duration: '10 min', questions: '1 writing', note: 'Unscored but shared with universities' },
    ],
    opportunities: [
      { icon: '🏛️', title: 'Top Global Universities', desc: 'MIT, Harvard, Columbia, Yale, Toronto, UCL, and 5,000+ universities now accept DET scores.' },
      { icon: '💸', title: 'Most Affordable Option', desc: 'At just ₹4,200 vs ₹17,000 for IELTS — ideal for multiple applications without financial burden.' },
      { icon: '⚡', title: 'Results in 48 Hours', desc: 'Instant AI scoring with results in 2 days — perfect for last-minute applications and rolling deadlines.' },
      { icon: '🏠', title: 'Take from Home', desc: 'No test center needed — AI proctoring lets you test anytime, anywhere. Huge advantage for global students.' },
      { icon: '🔄', title: 'Unlimited Retakes', desc: 'Take the test multiple times every 30 days — send only your best score to universities.' },
      { icon: '🌏', title: 'Asia & Europe Expansion', desc: 'Growing acceptance in Asian (Japan, Korea, Singapore) and European universities (Netherlands, Germany).' },
    ],
    sectors: [
      { name: 'Technology & CS', score: 90, desc: 'CMU, Cornell, UW accept DET 120+ for MSCS admissions.' },
      { name: 'Business & MBA', score: 85, desc: 'Hult, Babson, and several US B-schools accept DET 105-115+ for MBA.' },
      { name: 'Data Science & AI', score: 88, desc: 'Columbia, NYU, UMass accept DET for MSDS and MSML programs.' },
      { name: 'Engineering Programs', score: 82, desc: 'Ohio State, Northeastern, UConn accept DET 105+ for engineering MS.' },
      { name: 'Social Sciences', score: 78, desc: 'Many liberal arts universities accept DET for Social Sciences UG/PG.' },
      { name: 'Journalism & Communication', score: 72, desc: 'Several communication schools accept DET as a flexible alternative.' },
    ],
    tips: ['DET 120+ = Competitive for top universities', 'Practice the adaptive format — it changes based on your answers', 'Video interview matters — look presentable and speak clearly', 'Re-take every 30 days if needed to improve', 'Check each university\'s specific DET requirement before applying'],
  },
};

// ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────────

const SectorBar = ({ sector, color }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
      <div>
        <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{sector.name}</span>
        <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, margin: '2px 0 0' }}>{sector.desc}</p>
      </div>
      <span style={{ fontSize: '14px', fontWeight: 900, color, minWidth: '40px', textAlign: 'right' }}>{sector.score}%</span>
    </div>
    <div style={{ background: '#f1f5f9', borderRadius: '99px', height: '10px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${sector.score}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${color}80, ${color})` }}
      />
    </div>
  </div>
);

// ─── YEAR-WISE BAR CHART (MODULAR) ────────────────────────────────────────────
const ParticipationChart = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.students));
  const fmt = n => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`;

  return (
    <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1.5px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} color={color} /> Year-wise Participation
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, marginTop: '4px' }}>Global test-takers per year (modular — add new year anytime)</p>
        </div>
        <div style={{ background: `${color}12`, border: `1px solid ${color}30`, borderRadius: '12px', padding: '10px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>2024 Peak</p>
          <p style={{ fontSize: '20px', fontWeight: 950, color, marginTop: '2px' }}>{fmt(data[data.length - 1].students)}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '200px', paddingBottom: '32px', position: 'relative' }}>
        {/* Y-axis reference lines */}
        {[25, 50, 75, 100].map(pct => (
          <div key={pct} style={{ position: 'absolute', left: 0, right: 0, bottom: `${pct * 1.68 + 32}px`, borderTop: '1px dashed #f1f5f9', zIndex: 0 }} />
        ))}

        {data.map((d, i) => {
          const h = Math.max((d.students / max) * 168, 4);
          const isLast = i === data.length - 1;
          return (
            <div key={d.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, position: 'relative' }}>
              {/* Tooltip on hover */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}px` }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
                whileHover="hover"
                style={{ width: '100%', borderRadius: '8px 8px 3px 3px', background: isLast ? color : `${color}70`, cursor: 'default', position: 'relative', overflow: 'visible' }}
              >
                <motion.div
                  variants={{ hover: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 4 } }}
                  initial="initial"
                  style={{ position: 'absolute', top: '-34px', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', color: '#fff', borderRadius: '8px', padding: '3px 8px', fontSize: '11px', fontWeight: 900, whiteSpace: 'nowrap', pointerEvents: 'none', opacity: 0 }}
                >
                  {fmt(d.students)}
                </motion.div>
              </motion.div>
              {/* Value label above bar */}
              <span style={{ position: 'absolute', bottom: `${h + 4}px`, fontSize: '10px', fontWeight: 800, color, whiteSpace: 'nowrap' }}>{fmt(d.students)}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginTop: '6px', position: 'absolute', bottom: '-22px' }}>{d.year}</span>
            </div>
          );
        })}
      </div>

      {/* Growth indicator */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
        {[
          { label: '10-Year Growth', val: `${(((data[data.length - 1].students - data[0].students) / data[0].students) * 100).toFixed(0)}%`, icon: '📈' },
          { label: 'Peak Year', val: data.reduce((a, b) => a.students > b.students ? a : b).year, icon: '🏆' },
          { label: 'Total (10 Yrs)', val: fmt(data.reduce((sum, d) => sum + d.students, 0)), icon: '🌍' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, minWidth: '120px', background: `${color}08`, borderRadius: '14px', padding: '14px 18px' }}>
            <p style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</p>
            <p style={{ fontSize: '18px', fontWeight: 950, color, marginBottom: '2px' }}>{stat.val}</p>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const StudyAbroadExamDetail = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = EXAMS[examId] || EXAMS['ielts'];
  const chartData = PARTICIPATION_DATA[examId] || PARTICIPATION_DATA['ielts'];
  const [activeTab, setActiveTab] = useState('overview');
  const [openTip, setOpenTip] = useState(null);

  const tabs = [
    { id: 'overview', label: '📋 Overview' },
    { id: 'opportunities', label: '🚀 Opportunities' },
    { id: 'sectors', label: '📊 Top Sectors' },
    { id: 'chart', label: '📈 Year-wise Data' },
    { id: 'tips', label: '💡 Expert Tips' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* Hero */}
      <div style={{ background: exam.gradient, padding: '52px 0 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: '50px', cursor: 'pointer', marginBottom: '22px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(8px)' }}>
            <ArrowLeft size={13} /> Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div style={{ fontSize: '44px' }}>{exam.emoji}</div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{exam.type}</p>
              <h1 style={{ fontSize: '32px', fontWeight: 950, color: '#fff', lineHeight: 1.1 }}>{exam.name}</h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>{exam.fullName}</p>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: '4px', marginTop: '20px' }}>
            {[
              { label: 'Fee', value: exam.fee },
              { label: 'Score Range', value: exam.scoreRange },
              { label: 'Valid For', value: exam.validity },
              { label: 'Frequency', value: exam.frequency },
              { label: 'Conducted By', value: exam.conductedBy },
            ].map(stat => (
              <div key={stat.label} style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '12px', padding: '10px 16px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ color: '#fff', fontSize: '13px', fontWeight: 800, whiteSpace: 'nowrap' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '80px', zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '16px 22px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 800, fontSize: '13px', whiteSpace: 'nowrap', color: activeTab === tab.id ? exam.color : '#64748b', borderBottom: activeTab === tab.id ? `3px solid ${exam.color}` : '3px solid transparent', transition: 'all 0.2s' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={20} color={exam.color} /> What is {exam.name}?</h2>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, fontWeight: 500, marginBottom: '24px' }}>{exam.about}</p>

              <div style={{ background: `${exam.color}08`, border: `1.5px solid ${exam.color}25`, borderRadius: '20px', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color={exam.color} /> Qualifying Score</h3>
                <p style={{ fontSize: '22px', fontWeight: 950, color: exam.color }}>{exam.passingScore}</p>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>📐 Exam Structure</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exam.structure.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ background: '#fff', borderRadius: '16px', padding: '18px 20px', border: '1.5px solid #e2e8f0', borderLeft: `4px solid ${exam.color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 900, color: '#1e293b', marginBottom: '4px' }}>{s.section}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{s.note}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', fontWeight: 800, color: exam.color }}>{s.duration}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{s.questions}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OPPORTUNITIES TAB */}
        {activeTab === 'opportunities' && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>What doors does {exam.name} open?</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>Opportunities unlocked by clearing or scoring well on this exam.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {exam.opportunities.map((op, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, boxShadow: `0 16px 32px ${exam.color}18` }} style={{ background: '#fff', borderRadius: '20px', padding: '26px', border: `1.5px solid ${exam.color}20`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${exam.color}, ${exam.color}50)` }} />
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{op.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>{op.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{op.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTORS TAB */}
        {activeTab === 'sectors' && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Top Sectors Valuing {exam.name}</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>Relevance score of {exam.name} across career sectors.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1.5px solid #e2e8f0' }}>
                {exam.sectors.map((s, i) => <SectorBar key={i} sector={s} color={exam.color} />)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {exam.sectors.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} style={{ background: '#fff', borderRadius: '16px', padding: '18px 20px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${exam.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: exam.color }}>{s.score}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', marginBottom: '2px' }}>{s.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHART TAB */}
        {activeTab === 'chart' && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Year-wise Global Participation</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>10-year trend of test-takers worldwide. Chart is modular — new years can be added anytime in the data file.</p>
            <ParticipationChart data={chartData} color={exam.color} />
            <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1.5px solid #e2e8f0', marginTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#1e293b', marginBottom: '12px' }}>📦 How to Add Next Year's Data</h3>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', fontFamily: 'monospace', fontSize: '13px', color: '#475569' }}>
                <p style={{ color: '#94a3b8', marginBottom: '4px' }}>// In StudyAbroadExamDetail.jsx → PARTICIPATION_DATA.{examId}</p>
                <p style={{ color: '#22c55e' }}>{'{ year: 2025, students: XXXXXXX },'}</p>
                <p style={{ color: '#94a3b8' }}>// Simply push a new object — chart auto-scales</p>
              </div>
            </div>
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Expert Preparation Tips</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '28px' }}>Proven strategies for {exam.name} from top scorers.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {exam.tips.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} style={{ background: '#fff', borderRadius: '16px', padding: '20px 24px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${exam.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={16} color={exam.color} />
                  </div>
                  <p style={{ fontSize: '15px', color: '#1e293b', fontWeight: 600, lineHeight: 1.6 }}>{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudyAbroadExamDetail;
