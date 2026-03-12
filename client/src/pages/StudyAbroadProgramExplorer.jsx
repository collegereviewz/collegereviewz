import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, TrendingUp, Globe, Building2,
  Star, ChevronDown, ChevronUp, BarChart2, Award
} from 'lucide-react';

// Country name → ISO 3166-1 alpha-2 flag code
const FLAG_MAP = {
  'USA': 'us', 'United States': 'us',
  'UK': 'gb', 'United Kingdom': 'gb',
  'Germany': 'de', 'Canada': 'ca',
  'Australia': 'au', 'France': 'fr',
  'Ireland': 'ie', 'New Zealand': 'nz',
  'Netherlands': 'nl', 'Sweden': 'se',
  'Finland': 'fi', 'Spain': 'es',
  'Italy': 'it', 'Switzerland': 'ch',
  'Singapore': 'sg', 'Japan': 'jp',
  'South Korea': 'kr', 'Portugal': 'pt',
  'Philippines': 'ph', 'Belgium': 'be',
};
const flagUrl = name => `https://flagcdn.com/w40/${FLAG_MAP[name] || 'un'}.png`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROGRAMS = {
  engineering: {
    title: 'Engineering & Technology',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg,#6366f1,#38bdf8)',
    emoji: '⚙️',
    overview: 'Engineering graduates are among the highest-paid globally. STEM remains the strongest field for Indian students seeking PR and H1B sponsorships.',
    countries: [
      { name: 'USA', score: 95, avgSalary: '$95,000', demand: 'Very High', topUniversity: 'MIT, Stanford', tuition: '₹28–52L/yr' },
      { name: 'Germany', score: 90, avgSalary: '€52,000', demand: 'High', topUniversity: 'TUM, RWTH Aachen', tuition: 'Free (Public)' },
      { name: 'Canada', score: 82, avgSalary: 'CA$72,000', demand: 'High', topUniversity: 'U of Toronto, UBC', tuition: '₹14–28L/yr' },
      { name: 'Australia', score: 78, avgSalary: 'A$78,000', demand: 'Medium-High', topUniversity: 'UNSW, Monash', tuition: '₹22–38L/yr' },
      { name: 'UK', score: 76, avgSalary: '£38,000', demand: 'Medium', topUniversity: 'Imperial, Cambridge', tuition: '₹20–40L/yr' },
      { name: 'Singapore', score: 88, avgSalary: 'S$72,000', demand: 'High', topUniversity: 'NUS, NTU', tuition: '₹18–32L/yr' },
    ],
    sectors: [
      {
        name: 'Software / IT',
        growth: 92,
        color: '#6366f1',
        companies: {
          startups: ['Stripe', 'Figma', 'Notion', 'Linear', 'Vercel', 'Replit'],
          midsize: ['GitLab', 'HashiCorp', 'PagerDuty', 'Twilio', 'Cloudflare'],
          large: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'IBM'],
        }
      },
      {
        name: 'Semiconductor / Chips',
        growth: 85,
        color: '#8b5cf6',
        companies: {
          startups: ['Tenstorrent', 'SiFive', 'Esperanto', 'Cerebras'],
          midsize: ['Marvell', 'Lattice Semi', 'Rambus', 'Monolithic Power'],
          large: ['NVIDIA', 'Intel', 'AMD', 'Qualcomm', 'TSMC', 'ASML'],
        }
      },
      {
        name: 'Automotive / EV / Robotics',
        growth: 80,
        color: '#0ea5e9',
        companies: {
          startups: ['Rivian', 'Lucid Motors', 'Aptera', 'Joby Aviation'],
          midsize: ['BorgWarner', 'Aptiv', 'Lear Corporation', 'Visteon'],
          large: ['Tesla', 'Volkswagen', 'BMW', 'Toyota', 'Bosch', 'Continental'],
        }
      },
    ],
    salaryTimeline: [
      { year: 'Graduation', inr: 18 },
      { year: '2 Yrs', inr: 38 },
      { year: '5 Yrs', inr: 70 },
      { year: '10 Yrs', inr: 130 },
    ],
    facts: ['Engineers in USA earn avg $95k starting salary', 'Germany has 0 tuition at TU9 public unis', '120,000+ unfilled engineering jobs in Canada by 2025', 'NVIDIA alone hired 10k+ engineers in 2024'],
  },

  business: {
    title: 'Business & Management (MBA)',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    emoji: '📈',
    overview: 'MBA remains the #1 career accelerator globally. Top schools in USA and UK deliver salary jumps of 80–120% post-graduation.',
    countries: [
      { name: 'USA', score: 98, avgSalary: '$115,000', demand: 'Very High', topUniversity: 'Harvard, Wharton, Kellogg', tuition: '₹55–95L/yr' },
      { name: 'UK', score: 88, avgSalary: '£65,000', demand: 'High', topUniversity: 'LBS, Oxford (Saïd), INSEAD', tuition: '₹32–65L/yr' },
      { name: 'Canada', score: 80, avgSalary: 'CA$85,000', demand: 'High', topUniversity: 'Rotman, Ivey, Schulich', tuition: '₹20–45L/yr' },
      { name: 'Australia', score: 75, avgSalary: 'A$90,000', demand: 'Medium', topUniversity: 'MBS, AGSM', tuition: '₹28–50L/yr' },
      { name: 'France', score: 82, avgSalary: '€58,000', demand: 'High (MIM)', topUniversity: 'HEC Paris, INSEAD', tuition: '₹25–60L/yr' },
      { name: 'Singapore', score: 85, avgSalary: 'S$90,000', demand: 'High', topUniversity: 'NUS Business, NTU NBS', tuition: '₹30–55L/yr' },
    ],
    sectors: [
      {
        name: 'Consulting & Strategy',
        growth: 88,
        color: '#f59e0b',
        companies: {
          startups: ['Siena AI', 'Klarna', 'Bolt', 'Wise', 'Monzo'],
          midsize: ['FTI Consulting', 'Korn Ferry', 'Huron Consulting', 'West Monroe'],
          large: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Accenture', 'KPMG'],
        }
      },
      {
        name: 'Investment Banking / PE',
        growth: 82,
        color: '#ef4444',
        companies: {
          startups: ['Brex', 'Ramp', 'Plaid', 'Robinhood', 'Carta'],
          midsize: ['Lazard', 'Jefferies', 'Piper Sandler', 'Raymond James'],
          large: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'BlackRock', 'Carlyle'],
        }
      },
      {
        name: 'E-Commerce / Retail Tech',
        growth: 75,
        color: '#10b981',
        companies: {
          startups: ['Faire', 'Attentive', 'Fabric', 'Omnivore'],
          midsize: ['Overstock', 'Wayfair', 'Chewy', 'Poshmark'],
          large: ['Amazon', 'Walmart', 'Alibaba', 'JD.com', 'Shopify', 'eBay'],
        }
      },
    ],
    salaryTimeline: [
      { year: 'Pre-MBA', inr: 12 },
      { year: 'Post-MBA', inr: 45 },
      { year: '3 Yrs', inr: 80 },
      { year: '8 Yrs', inr: 160 },
    ],
    facts: ['Post-MBA avg salary USA: $115k–$175k', 'Top 3 MBA schools have avg ROI < 18 months', 'PE & VC hiring MBAs grew 37% in 2024', 'HEC Paris MIM avg starting salary: €52k'],
  },

  'data-science': {
    title: 'Data Science & AI',
    color: '#10b981',
    gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
    emoji: '🤖',
    overview: 'AI/ML and Data Science are the fastest-growing fields globally. Demand is outpacing supply by 3.5x in most developed economies.',
    countries: [
      { name: 'USA', score: 99, avgSalary: '$105,000', demand: 'Exceptional', topUniversity: 'Stanford, CMU, MIT', tuition: '₹25–55L/yr' },
      { name: 'Canada', score: 90, avgSalary: 'CA$88,000', demand: 'Very High', topUniversity: 'U of Toronto, Waterloo', tuition: '₹14–28L/yr' },
      { name: 'UK', score: 85, avgSalary: '£50,000', demand: 'High', topUniversity: 'Oxford, UCL, Edinburgh', tuition: '₹20–38L/yr' },
      { name: 'Germany', score: 88, avgSalary: '€60,000', demand: 'High', topUniversity: 'TUM, TU Berlin', tuition: 'Free (Public)' },
      { name: 'Australia', score: 78, avgSalary: 'A$82,000', demand: 'High', topUniversity: 'UNSW, UMelbourne', tuition: '₹22–38L/yr' },
      { name: 'Singapore', score: 92, avgSalary: 'S$80,000', demand: 'Very High', topUniversity: 'NUS, NTU', tuition: '₹20–38L/yr' },
    ],
    sectors: [
      {
        name: 'Generative AI / LLMs',
        growth: 99,
        color: '#10b981',
        companies: {
          startups: ['Mistral AI', 'Cohere', 'Adept', 'Inflection', 'Pika Labs'],
          midsize: ['Hugging Face', 'Scale AI', 'Stability AI', 'Runway ML'],
          large: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Meta AI', 'Microsoft Research'],
        }
      },
      {
        name: 'Data Engineering / Analytics',
        growth: 90,
        color: '#06b6d4',
        companies: {
          startups: ['dbt Labs', 'Airbyte', 'Monte Carlo', 'Anomalo'],
          midsize: ['Fivetran', 'Talend', 'Looker (acquired)', 'Matillion'],
          large: ['Snowflake', 'Databricks', 'Palantir', 'Tableau / Salesforce', 'AWS'],
        }
      },
      {
        name: 'FinTech AI',
        growth: 82,
        color: '#8b5cf6',
        companies: {
          startups: ['Zest AI', 'Ocrolus', 'Scienaptic', 'Pagaya'],
          midsize: ['Upstart', 'Blend', 'Socure', 'MX Technologies'],
          large: ['Bloomberg', 'Goldman (Marcus)', 'Stripe', 'Mastercard', 'Visa'],
        }
      },
    ],
    salaryTimeline: [
      { year: 'Graduation', inr: 22 },
      { year: '2 Yrs', inr: 50 },
      { year: '5 Yrs', inr: 95 },
      { year: '10 Yrs', inr: 180 },
    ],
    facts: ['AI/ML demand grew 75% YoY globally', 'Data Scientists in Singapore earn avg S$80k+', 'Germany has 0-tuition MS Data Science at public unis', 'OpenAI hired 1,200+ researchers in H1 2024'],
  },

  medicine: {
    title: 'Medicine & Healthcare',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg,#ef4444,#f97316)',
    emoji: '🏥',
    overview: 'Healthcare is the most stable job sector globally. Doctors, nurses, and pharmacists enjoy exceptional PR pathways in Australia, Canada, and Germany.',
    countries: [
      { name: 'Australia', score: 92, avgSalary: 'A$95,000', demand: 'Very High', topUniversity: 'U Melbourne, Monash', tuition: '₹35–60L/yr' },
      { name: 'UK', score: 88, avgSalary: '£40,000 (NHS)', demand: 'Very High', topUniversity: 'Oxford, Cambridge, UCL', tuition: '₹25–50L/yr' },
      { name: 'Germany', score: 85, avgSalary: '€65,000', demand: 'High', topUniversity: 'Charité Berlin, Heidelberg', tuition: 'Free (Public)' },
      { name: 'USA', score: 75, avgSalary: '$220,000 (post-residency)', demand: 'High', topUniversity: 'Harvard Med, Johns Hopkins', tuition: '₹80L–₹1.6Cr/yr' },
      { name: 'Canada', score: 72, avgSalary: 'CA$110,000', demand: 'High', topUniversity: 'UofT, McMaster', tuition: '₹40–80L/yr' },
      { name: 'Philippines', score: 65, avgSalary: 'US$50k (MCI exam needed)', demand: 'Medium', topUniversity: 'UST, AIM', tuition: '₹3–7L/yr' },
    ],
    sectors: [
      {
        name: 'Hospital Networks',
        growth: 85,
        color: '#ef4444',
        companies: {
          startups: ['Carbon Health', 'One Medical (Amazon)', 'Nuvation Bio', 'Spring Health'],
          midsize: ['Envision Healthcare', 'TeamHealth', 'Surgery Partners', 'LifePoint'],
          large: ['NHS (UK)', 'HCA Healthcare', 'Mayo Clinic', 'Cleveland Clinic', 'Apollo Hospitals'],
        }
      },
      {
        name: 'Pharma / Biotech',
        growth: 88,
        color: '#f97316',
        companies: {
          startups: ['Recursion Pharma', 'Insitro', 'BigHat Biosciences', 'Absci'],
          midsize: ['Seagen', 'Regeneron', 'BioNTech', 'Moderna'],
          large: ['Pfizer', 'AstraZeneca', 'Novartis', 'Roche', 'Johnson & Johnson'],
        }
      },
      {
        name: 'HealthTech / Digital Health',
        growth: 90,
        color: '#8b5cf6',
        companies: {
          startups: ['Tempus', 'Flatiron Health', 'Nuvation', 'Heal'],
          midsize: ['Teladoc', 'Doximity', 'Veeva Systems', 'Evolent Health'],
          large: ['Siemens Healthineers', 'Philips Health', 'GE HealthCare', 'Epic Systems'],
        }
      },
    ],
    salaryTimeline: [
      { year: 'Intern/Resident', inr: 6 },
      { year: '3 Yrs (GP)', inr: 40 },
      { year: '6 Yrs (Specialist)', inr: 85 },
      { year: '12 Yrs (Senior)', inr: 150 },
    ],
    facts: ['Australia has critical shortage: 30,000+ nurses needed', 'NHS UK actively recruits Indian doctors', 'Germany doctors earn avg €65k starting', 'USA specialist MDs among world\'s highest paid ($220k+)'],
  },

  arts: {
    title: 'Arts & Humanities',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg,#a855f7,#ec4899)',
    emoji: '🎨',
    overview: 'Arts, Design, and Humanities graduates thrive in creative industries, media, and UX. UK, USA, and Italy are top destinations.',
    countries: [
      { name: 'UK', score: 92, avgSalary: '£28,000', demand: 'High (Creative)', topUniversity: 'RCA, UAL, Goldsmiths', tuition: '₹22–38L/yr' },
      { name: 'USA', score: 88, avgSalary: '$55,000', demand: 'Medium-High', topUniversity: 'RISD, Parsons, Pratt', tuition: '₹30–58L/yr' },
      { name: 'Italy', score: 85, avgSalary: '€28,000', demand: 'High (Fashion)', topUniversity: 'Politecnico Milano, Domus', tuition: '₹1.5–8L/yr' },
      { name: 'France', score: 80, avgSalary: '€32,000', demand: 'High (Luxury/Fashion)', topUniversity: 'École des Beaux-Arts, Parsons Paris', tuition: '₹5–20L/yr' },
      { name: 'Canada', score: 72, avgSalary: 'CA$48,000', demand: 'Medium', topUniversity: 'Emily Carr, OCAD', tuition: '₹15–28L/yr' },
      { name: 'Australia', score: 70, avgSalary: 'A$58,000', demand: 'Medium', topUniversity: 'RMIT, ANU', tuition: '₹22–35L/yr' },
    ],
    sectors: [
      {
        name: 'UX / Product Design',
        growth: 88,
        color: '#a855f7',
        companies: {
          startups: ['Figma', 'Pitch', 'Loom', 'Coda', 'Miro', 'Notion'],
          midsize: ['InVision', 'Abstract', 'Maze', 'Hotjar', 'FullStory'],
          large: ['Google', 'Apple', 'Adobe', 'Autodesk', 'Salesforce', 'Microsoft'],
        }
      },
      {
        name: 'Fashion & Luxury',
        growth: 72,
        color: '#ec4899',
        companies: {
          startups: ['Rent the Runway', 'ThredUp', 'Poshmark', 'Material Bank'],
          midsize: ['Farfetch', 'Mytheresa', 'Vestiaire Collective', 'Ssense'],
          large: ['LVMH', 'Kering', 'Richemont', 'Chanel', 'Hermès', 'Zara (Inditex)'],
        }
      },
      {
        name: 'Media / Entertainment',
        growth: 80,
        color: '#f97316',
        companies: {
          startups: ['Canva', 'Later', 'Frame.io', 'Descript', 'Kapwing'],
          midsize: ['Weta Digital', 'DNEG', 'MPC', 'Framestore'],
          large: ['Netflix', 'Disney', 'BBC', 'Warner Bros', 'Pixar / Lucasfilm'],
        }
      },
    ],
    salaryTimeline: [
      { year: 'Graduation', inr: 8 },
      { year: '2 Yrs', inr: 18 },
      { year: '5 Yrs', inr: 35 },
      { year: '10 Yrs', inr: 70 },
    ],
    facts: ['UX Designers in USA earn $80k–$130k', 'Italy: Cheapest world-class Fashion Design education', 'Milan Fashion Week generates €1bn+ annually', 'Netflix UX research salaries: $120k+'],
  },

  law: {
    title: 'Law & Legal Studies',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    emoji: '⚖️',
    overview: 'LLM degrees from UK or USA open doors to global corporate law, international arbitration, and human rights careers. 1-year LLM is fastest ROI.',
    countries: [
      { name: 'UK', score: 96, avgSalary: '£50,000 (Magic Circle)', demand: 'Very High', topUniversity: 'Oxford, Cambridge, LSE, UCL', tuition: '₹22–42L/yr' },
      { name: 'USA', score: 92, avgSalary: '$160,000 (BigLaw)', demand: 'High', topUniversity: 'Yale, Harvard, Columbia', tuition: '₹55–1.1Cr/yr' },
      { name: 'Australia', score: 80, avgSalary: 'A$85,000', demand: 'Medium-High', topUniversity: 'U Melbourne, UNSW', tuition: '₹25–45L/yr' },
      { name: 'Canada', score: 78, avgSalary: 'CA$80,000', demand: 'Medium', topUniversity: 'UofT, Osgoode, UBC', tuition: '₹20–38L/yr' },
      { name: 'Netherlands', score: 75, avgSalary: '€48,000', demand: 'Medium', topUniversity: 'Leiden, University of Amsterdam', tuition: '₹8–18L/yr' },
      { name: 'Singapore', score: 82, avgSalary: 'S$75,000', demand: 'High', topUniversity: 'NUS, SMU', tuition: '₹22–42L/yr' },
    ],
    sectors: [
      {
        name: 'Corporate / M&A Law',
        growth: 82,
        color: '#0ea5e9',
        companies: {
          startups: ['Clio', 'LegalZoom', 'Rocket Lawyer', 'Ironclad'],
          midsize: ['DLA Piper', 'Herbert Smith Freehills', 'Norton Rose', 'Simmons & Simmons'],
          large: ['Freshfields', 'Linklaters', 'Allen & Overy', 'Clifford Chance', 'Slaughter & May'],
        }
      },
      {
        name: 'International Arbitration',
        growth: 78,
        color: '#6366f1',
        companies: {
          startups: ['Jus Mundi', 'Opus 2', 'eLex', 'CaseMark AI'],
          midsize: ['Three Crowns', 'Debevoise', 'Dechert', 'WilmerHale'],
          large: ['ICC', 'LCIA', 'ICSID', 'PCA', 'AAA-ICDR'],
        }
      },
      {
        name: 'LegalTech',
        growth: 88,
        color: '#10b981',
        companies: {
          startups: ['Harvey AI', 'Casetext', 'Spellbook', 'EvenUp', 'Legora'],
          midsize: ['ROSS Intelligence', 'Kira Systems', 'Relativity', 'Luminance'],
          large: ['Thomson Reuters', 'LexisNexis', 'Wolters Kluwer', 'RELX Group'],
        }
      },
    ],
    salaryTimeline: [
      { year: 'Graduation', inr: 14 },
      { year: '2 Yrs (Associate)', inr: 35 },
      { year: '5 Yrs (Senior)', inr: 75 },
      { year: '10 Yrs (Partner)', inr: 200 },
    ],
    facts: ['BigLaw US firms pay $215k to first-year associates', 'Oxford/Cambridge LLM opens Magic Circle doors', 'UK LLM is 1 year — fastest ROI of any law degree', 'LegalTech is fastest growing sub-sector at 28% CAGR'],
  },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const BarMeter = ({ value, color, label }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 900, color }}>{'★'.repeat(Math.round(value / 20))}</span>
    </div>
    <div style={{ background: '#f1f5f9', borderRadius: '99px', height: '10px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${color}80, ${color})` }}
      />
    </div>
  </div>
);

const CountryScoreCard = ({ c, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}20` }}
    style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: `1.5px solid ${color}25`, position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={flagUrl(c.name)} alt={c.name} style={{ height: '22px', borderRadius: '3px', border: '1px solid #e2e8f0', flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>{c.name}</p>
          <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>{c.topUniversity}</p>
        </div>
      </div>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '20px', fontWeight: 950, color }}>{c.score}</span>
      </div>
    </div>
    <BarMeter value={c.score} color={color} label="Opportunity Score" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
      <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px' }}>
        <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>Avg Salary</p>
        <p style={{ fontSize: '13px', fontWeight: 900, color: '#1e293b' }}>{c.avgSalary}</p>
      </div>
      <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px' }}>
        <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>Tuition</p>
        <p style={{ fontSize: '13px', fontWeight: 900, color: '#1e293b' }}>{c.tuition}</p>
      </div>
      <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', gridColumn: '1 / -1' }}>
        <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>Job Demand</p>
        <p style={{ fontSize: '13px', fontWeight: 900, color }}>{c.demand}</p>
      </div>
    </div>
  </motion.div>
);

const SectorCard = ({ sector, color }) => {
  const [open, setOpen] = useState(false);
  const tiers = [
    { key: 'startups', label: '🚀 Startups', bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
    { key: 'midsize', label: '🏢 Mid-Size', bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
    { key: 'large', label: '🌐 Global Leaders', bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      style={{ background: '#fff', borderRadius: '24px', border: '1.5px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `5px solid ${sector.color}` }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '10px' }}>{sector.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '99px', height: '8px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${sector.growth}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: '99px', background: `linear-gradient(90deg, ${sector.color}70, ${sector.color})` }}
              />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 900, color: sector.color, minWidth: '42px' }}>{sector.growth}%</span>
          </div>
          <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginTop: '4px' }}>Sector Growth Score</p>
        </div>
        <div style={{ marginLeft: '20px', color: '#64748b' }}>
          {open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 24px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {tiers.map(tier => (
                  <div key={tier.key} style={{ background: tier.bg, border: `1px solid ${tier.border}`, borderRadius: '16px', padding: '16px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 900, color: tier.text, marginBottom: '10px' }}>{tier.label}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {sector.companies[tier.key].map(co => (
                        <span key={co} style={{ background: '#fff', border: `1px solid ${tier.border}`, borderRadius: '99px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{co}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SalaryTimeline = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.inr));
  return (
    <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1.5px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <TrendingUp size={20} color={color} /> Salary Growth Timeline (₹ Lakhs)
      </h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '160px' }}>
        {data.map((d, i) => {
          const h = (d.inr / max) * 140;
          return (
            <motion.div
              key={i}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}px` }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: 'easeOut' }}
                style={{ width: '100%', background: `linear-gradient(to top, ${color}, ${color}60)`, borderRadius: '10px 10px 4px 4px', position: 'relative', overflow: 'visible' }}
              >
                <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', background: color, color: '#fff', borderRadius: '8px', padding: '3px 8px', fontSize: '12px', fontWeight: 900, whiteSpace: 'nowrap' }}>
                  ₹{d.inr}L
                </div>
              </motion.div>
              <p style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textAlign: 'center' }}>{d.year}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const StudyAbroadProgramExplorer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const prog = PROGRAMS[courseId] || PROGRAMS['engineering'];
  const [activeTab, setActiveTab] = useState('countries');

  const tabs = [
    { id: 'countries', label: '🌍 Country Comparison', icon: Globe },
    { id: 'sectors', label: '📊 Industry Sectors', icon: BarChart2 },
    { id: 'companies', label: '🏢 Top Companies', icon: Building2 },
    { id: 'salary', label: '💰 Salary Growth', icon: TrendingUp },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* Hero */}
      <div style={{ background: prog.gradient, padding: '52px 0 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '6px 14px', borderRadius: '50px', cursor: 'pointer', marginBottom: '20px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(8px)' }}
          >
            <ArrowLeft size={13} /> Back
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
            <div style={{ fontSize: '38px' }}>{prog.emoji}</div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Program Explorer</p>
              <h1 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', lineHeight: 1.1 }}>{prog.title}</h1>
            </div>
          </div>

          {/* single-line description */}
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', marginBottom: '18px' }}>{prog.overview}</p>

          {/* Facts — single scrollable row */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', flexWrap: 'nowrap' }}>
            {prog.facts.map((f, i) => (
              <div key={i} style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '10px', padding: '7px 13px', color: '#fff', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                ✦ {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Programs Navigation */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '80px', zIndex: 40 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '18px 24px', border: 'none', background: 'transparent', cursor: 'pointer',
                fontWeight: 800, fontSize: '14px', whiteSpace: 'nowrap',
                color: activeTab === tab.id ? prog.color : '#64748b',
                borderBottom: activeTab === tab.id ? `3px solid ${prog.color}` : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>

        {/* TAB: Country Comparison */}
        {activeTab === 'countries' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Country Opportunity Score</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>Scored across salary, demand, visa ease, PR pathways and tuition value.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {prog.countries.map((c, i) => <CountryScoreCard key={i} c={c} color={prog.color} />)}
            </div>
          </div>
        )}

        {/* TAB: Industry Sectors */}
        {activeTab === 'sectors' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Industry Sectors & Growth</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>Click any sector to expand and see companies at every stage — startups, mid-size, and global leaders.</p>
            {prog.sectors.map((s, i) => <SectorCard key={i} sector={s} color={prog.color} />)}
          </div>
        )}

        {/* TAB: Top Companies */}
        {activeTab === 'companies' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Top Hiring Companies</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>All companies actively hiring candidates from this field, segmented by company stage.</p>
            {prog.sectors.map((s, si) => (
              <div key={si} style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '12px', borderBottom: `2px solid ${s.color}25` }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: s.color }} />
                  <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1e293b' }}>{s.name}</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {[
                    { key: 'startups', label: '🚀 Startups & Early Stage', bg: '#f0fdf4', border: '#86efac', badgeBg: '#dcfce7', badgeText: '#166534' },
                    { key: 'midsize', label: '🏢 Mid-Size (200–5000 emp)', bg: '#eff6ff', border: '#93c5fd', badgeBg: '#dbeafe', badgeText: '#1e40af' },
                    { key: 'large', label: '🌐 Large / Global Enterprises', bg: '#faf5ff', border: '#c4b5fd', badgeBg: '#ede9fe', badgeText: '#6b21a8' },
                  ].map(tier => (
                    <div key={tier.key} style={{ background: tier.bg, border: `1.5px solid ${tier.border}`, borderRadius: '20px', padding: '24px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 900, color: '#1e293b', marginBottom: '16px' }}>{tier.label}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {s.companies[tier.key].map(co => (
                          <span key={co} style={{ background: tier.badgeBg, color: tier.badgeText, border: `1px solid ${tier.border}`, borderRadius: '99px', padding: '5px 14px', fontSize: '13px', fontWeight: 700 }}>{co}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: Salary Growth */}
        {activeTab === 'salary' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '8px' }}>Salary Growth Projection</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>Based on average INR-equivalent earnings trajectory for Indian students working abroad.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <SalaryTimeline data={prog.salaryTimeline} color={prog.color} />
              <div>
                <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1.5px solid #e2e8f0', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} color={prog.color} /> Key Salary Milestones
                  </h3>
                  {prog.salaryTimeline.map((d, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < prog.salaryTimeline.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#475569' }}>{d.year}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 950, color: prog.color }}>₹{d.inr}L</span>
                        {i > 0 && <span style={{ background: '#dcfce7', color: '#166534', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>+{prog.salaryTimeline[i].inr - prog.salaryTimeline[i-1].inr}L</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: prog.gradient, borderRadius: '24px', padding: '28px', color: '#fff', textAlign: 'center' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, opacity: 0.8, marginBottom: '8px' }}>Peak Earning Potential (10 Yrs)</p>
                  <p style={{ fontSize: '42px', fontWeight: 950, marginBottom: '8px' }}>₹{prog.salaryTimeline[prog.salaryTimeline.length - 1].inr}L</p>
                  <p style={{ fontSize: '13px', opacity: 0.75 }}>INR equivalent per year</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudyAbroadProgramExplorer;
