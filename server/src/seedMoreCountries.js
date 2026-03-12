import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import StudyAbroad from './models/StudyAbroad.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Helper: create a compact but complete country object
const c = (id, name, flag, desc, intake, colleges, tuition, currency, lang, tz, score,
  heroSummary, costLevel, visaDiff, ptWork, jobOut, prPath,
  bestFor, avoidIf, cities, courses,
  ugEntry, pgEntry, pgTests, pgDur,
  costLow, costMid, costHigh, ugTuition, pgTuition, rent, food, monthlyTotal,
  visaType, visaTime, funds, refusal1, refusal2,
  hours, wage, pswDur, sector1, sal1, sect1note, sector2, sal2, sect2note,
  roiSalary, breakEven, faq1q, faq1a, schName, schAmt, schElig, schDiff,
  uniEng, uniMed, uniBiz) => ({
  id, name, flag, description: desc, intake, colleges, tuition,
  country_core: { currency, language: lang, time_zone: tz, student_popularity_score: score },
  hero: {
    summary: heroSummary, lastUpdated: 'Mar 2026', visaPolicyVersion: 'V.2026.1',
    decisionStrip: { costLevel, visaDifficulty: visaDiff, partTimeFeasibility: ptWork, jobOutcomeStrength: jobOut, prPath }
  },
  snapshot: { bestFor, avoidIf, topCities: cities, popularCourses: courses, knownRisks: `${visaDiff} visa process; check local regulations.` },
  education_system: {
    ug: { entry: ugEntry, duration: '3-4 years', notes: 'Foundation year available.' },
    pg: { entry: pgEntry, tests: pgTests, duration: pgDur, internship: 'Available at select programs.' },
    diploma: { bestFor: 'Vocational pathways', transfer: 'Credit transfer possible.' }
  },
  eligibility: { academics: ugEntry, backlogs: 'Up to 5 accepted by most', gapYears: 'Acceptable with justification', englishTests: pgTests },
  intakes: [{ name: `Main (${intake.split('/')[0].trim()})`, deadline: '3-4 months prior' }, { name: `Secondary (${intake.split('/')[1] ? intake.split('/')[1].trim() : 'Rolling'})`, deadline: '2-3 months prior' }],
  cost: {
    summary: { low: costLow, mid: costMid, high: costHigh },
    tuition: { ug: ugTuition, pg: pgTuition, diploma: 'Varies' },
    livingCost: { rent, food, transport: 'Varies by city', insurance: 'Required', monthlyTotal },
    oneTime: { appFee: 'Varies', visa: 'Varies', flight: '₹50k-₹1.2L' }
  },
  scholarships: [{ name: schName, amount: schAmt, eligibility: schElig, deadline: 'Varies', difficulty: schDiff }],
  visa_policy: {
    typeString: visaType, processingTime: visaTime, fundsProof: funds,
    refusalReasons: [refusal1, refusal2, 'Incomplete documentation.']
  },
  work: { allowedHours: hours, wageRange: wage, reality: 'Availability depends on local market.' },
  post_study: {
    pswDuration: pswDur, eligibility: 'Must complete an accredited program.',
    jobMarket: [
      { sector: sector1, demand: 'High', salary: sal1, notes: sect1note },
      { sector: sector2, demand: 'Medium', salary: sal2, notes: sect2note }
    ],
    prPath: `Points or skills-based system. ${prPath}`
  },
  risks: [{ scenario: 'Visa Delays', plan: 'Apply 4-6 months early and keep documents organised.' }],
  roi: { avgStartingSalary: roiSalary, breakEven },
  faqs: [{ q: faq1q, a: faq1a }],
  topUniversities: {
    engineering: uniEng, medical: uniMed, business: uniBiz,
    design: ['Major art/design schools available']
  }
});

const newCountries = [
  c('netherlands','Netherlands','https://flagcdn.com/w320/nl.png','Home to Philips, ASML, and world-class tech universities.','September / February','13','₹8L-₹18L/yr','EUR','Dutch/English','CET',8.2,
    'Affordable English-taught Masters in engineering and business via top Dutch universities.','Medium','Easy','Medium','High','Strong',
    'Engineering, CS, Business, Data Science','Unwilling to learn Dutch for long-term PR','Amsterdam, Eindhoven, Delft, Rotterdam',['Computer Science','Data Science','Business Admin','Design'],
    '70%+ in 12th','Bachelor 60%+','IELTS 6.5 / TOEFL 90','1-2 yrs',
    '₹10,000,000','₹15,000,000','₹22,000,000','€8k-€16k/yr','€9k-€18k/yr','€700-€1300/mo','€250-€350/mo','€1200-€1900 (₹1.1L-₹1.65L)',
    'MVV + Residence Permit','4-6 weeks','€11,575 in bank (ERAS funds)','Insufficient funds','Study intent unclear',
    '16 hrs/wk term, 40 hrs breaks','€13.27/hr','1-2 yrs (Orientation year)',
    'IT/Software','€45k-€65k','Large tech sector (Booking.com, ASML)','Engineering','€48k-€70k','High-tech manufacturing hub',
    '€48,000/yr (₹44L)','2-3 yrs','Is Dutch required?','For jobs yes, but 100s of English-taught Masters are available.',
    'Holland Scholarship','€5,000','Non-EEA first-year students','Medium',
    ['TU Delft','TU Eindhoven','University of Twente'],['AMC Amsterdam','Radboud UMC','Erasmus MC'],['RSM Erasmus','Amsterdam Business School','Tilburg']),

  c('sweden','Sweden','https://flagcdn.com/w320/se.png','Renowned for innovation, sustainability, and free public university education (for EU; fees for non-EU).','August / January','50','₹7L-₹18L/yr','SEK','Swedish/English','CET',7.9,
    'Sweden offers high-quality research-driven education with a culture of innovation and work-life balance.','Medium','Easy','Medium','Medium','Moderate',
    'Engineering, CS, Sustainability, Design','Seeking low cost of living (Stockholm is expensive)','Stockholm, Gothenburg, Lund, Uppsala',['Computer Science','Sustainability','Design','Engineering'],
    '70%+ in 12th','Bachelor 60%+','IELTS 6.5','1-2 yrs',
    '₹12,000,000','₹18,000,000','₹28,000,000','SEK 80k-₹160k/yr','SEK 90k-₹180k/yr','SEK 8k-12k/mo','SEK 2k-3k/mo','SEK 12k-16k (₹95k-₹1.3L)',
    'Residence Permit (Student)','4-6 weeks','SEK 8568/month proof required','Insufficient funds','Lack of housing proof',
    '20 hrs/wk','SEK 130-160/hr','1 yr Recherche after graduation',
    'IT/Software','SEK 500k-700k/yr','Strong startup scene','Engineering','SEK 480k-650k/yr','Volvo, Ericsson, Scania hubs',
    'SEK 550,000/yr (₹45L)','2-3 yrs','Do I need Swedish?','For daily life yes; English sufficient in many tech jobs.',
    'SI Scholarship','Full tuition + SEK 10k/mo living','STEM/social science students','V. Hard',
    ['KTH Royal Institute','Chalmers','Lund University'],['Karolinska Institutet','Uppsala University','Gothenburg'],['Stockholm School of Economics','Lund','Gothenburg']),

  c('finland','Finland','https://flagcdn.com/w320/fi.png','Finland has no-tuition universities (for EU; fees for non-EU), ranked top globally for education quality.','August / January','14','₹8L-₹14L/yr','EUR','Finnish/English','EET',7.7,
    'High-quality education with small class sizes; strong culture of innovation (Nokia, Linux born here).','Medium','Easy','Medium','Medium','Moderate',
    'Engine, CS, Design, Education','Not wanting cold weather or isolated lifestyle','Helsinki, Tampere, Espoo, Turku',['Computer Science','Design','Engineering','Education'],
    '60%+ in 12th','Bachelor 60%+','IELTS 6.0-6.5','1-2 yrs',
    '₹9,000,000','₹13,000,000','₹20,000,000','€8k-€15k/yr','€8k-€14k/yr','€500-€900/mo','€200-€300/mo','€900-€1300 (₹80k-₹1.1L)',
    'Residence Permit (Studies)','4-6 weeks','€560/month in bank account','Insufficient funds','Incomplete documents',
    '25 hrs/wk','€12-€15/hr','1 yr Extended Permit',
    'IT/Software','€38k-€55k','Nokia and gaming-tech hubs','Engineering','€40k-€58k','Clean tech and innovation sector',
    '€42,000/yr (₹38L)','2-3 yrs','Can I study in English?','Yes, 400+ English-taught programmes exist.',
    'Aalto University Scholarship','Up to €10,000','Merit-based','Hard',
    ['Aalto University','University of Helsinki','Tampere University'],['University of Helsinki','Oulu','Tampere'],['Aalto','Hanken School of Economics','Turku School']),

  c('spain','Spain','https://flagcdn.com/w320/es.png','Spain offers affordable tuition, Mediterranean lifestyle, and growing tech hubs in Barcelona and Madrid.','September / February','84','₹4L-₹12L/yr','EUR','Spanish/English','CET',7.4,
    'Great destination for MBA, Tourism, and Hospitality. Budget-friendly lifestyle plus a gateway to Europe.','Low','Medium','Medium','Medium','Moderate',
    'MBA, Tourism, Hospitality, Architecture','Need English-only job market; prefer Northern European lifestyle','Madrid, Barcelona, Valencia, Seville',['MBA','Tourism Management','Architecture','Business'],
    '60%+ in 12th','Bachelor 60%+','IELTS 6.0 / DELE B2 if Spanish-taught','1-2 yrs',
    '₹6,000,000','₹10,000,000','₹18,000,000','€2k-€12k/yr','€4k-€15k/yr','€400-€800/mo','€200-€300/mo','€800-€1300 (₹70k-₹1.1L)',
    'Student Visa (Long Stay)','4-6 weeks','€1,000/month bank statement','Insufficient funds','No accommodation confirmed',
    '20 hrs/wk','€1,134/mo (SMI-based)','No automatic PSW - must convert to work visa',
    'IT/Tech','€28k-€42k','Growing in Barcelona/Madrid','Tourism/Hospitality','€22k-€35k','Major industry in Spain',
    '€30,000/yr (₹27L)','3-4 yrs','Do I need to speak Spanish?','Essential for daily life; some English-taught programs in private universities.',
    'Becas Santander','€5,000-€10,000','STEM students','Medium',
    ['UC Madrid','Polytechnic University of Catalonia','University of Barcelona'],['University of Barcelona','Complutense Madrid','Granada'],['IESE Business School','ESADE','IE Business School']),

  c('italy','Italy','https://flagcdn.com/w320/it.png','Italy has some of the cheapest public university tuition globally, plus world-renowned design and fashion schools.','September / March','98','₹1.5L-₹8L/yr','EUR','Italian/English','CET',7.0,
    'Extremely affordable public universities with world-famous Design, Architecture and Fashion programs.','Low','Medium','Low','Medium','Moderate',
    'Architecture, Fashion Design, Engineering, Fine Arts','Non-art/design students; those needing part-time income','Rome, Milan, Florence, Turin',['Architecture','Fashion Design','Engineering','Fine Arts'],
    '60%+ in 12th','Bachelor 60%+','IELTS 6.0 / B2 Italian for Italian-taught','1-2 yrs',
    '₹4,000,000','₹8,000,000','₹15,000,000','€1k-€4k/yr (public)','€2k-€10k/yr','€400-€900/mo','€200-€350/mo','€700-€1300 (₹62k-₹1.1L)',
    'Student Visa (Long Stay D)','4-6 weeks','€448.07/month minimum','Insufficient funds','No enrollment confirmation',
    '20 hrs/wk','€9.00/hr','No automatic. Must convert to work permit.',
    'Fashion/Design','€25k-€40k','Milan is global fashion capital','Engineering','€28k-€42k','Strong manufacturing/automotive sector',
    '€28,000/yr (₹25L)','3-4 yrs','Is Italian required?','For public unis mostly yes; Politecnico offers many English Master programs.',
    'Italian Government Scholarships (MAECI)','Full cover','Developing country nationals','V. Hard',
    ['Politecnico di Milano','University of Bologna','La Sapienza Rome'],['University of Bologna','Sapienza','Padova'],['Bocconi University','MIP Politecnico','Luiss']),

  c('switzerland','Switzerland','https://flagcdn.com/w320/ch.png','Switzerland hosts some of the top engineering universities in the world (ETH Zurich #1) with moderate tuition.','September / February','12','₹6L-₹10L/yr','CHF','German/French/English','CET',8.8,
    'ETH Zurich and EPFL are world-class. High cost of living but extraordinary salary post-graduation.','High','Hard','Low','Very High','Moderate',
    'STEM research, Finance, Pharma, Engineering','Tight budget; cannot afford CHF 2000+/month living cost','Zurich, Geneva, Lausanne, Basel',['Engineering','Data Science','Finance','Pharma'],
    '70%+ in 12th','Bachelor 65%+','IELTS 7.0 / GRE required for ETH','1-2 yrs',
    '₹8,000,000','₹18,000,000','₹30,000,000','CHF 1k-3k/semester','CHF 1k-3k/semester','CHF 1500-2500/mo','CHF 400-600/mo','CHF 2500-3500 (₹2.2L-₹3.1L)',
    'National D Visa + Residence Permit','6-8 weeks','CHF 21,000/year proof','Insufficient funds','Rejection at embassy level',
    '15 hrs/wk','CHF 25-30/hr','6 months then work permit required',
    'Finance/Banking','CHF 90k-130k/yr','Global banking hub Geneva/Zurich','Engineering/Pharma','CHF 85k-120k/yr','Novartis, Roche, Nestlé hubs',
    'CHF 100,000/yr (₹93L)','1-2 yrs','How hard is it to get into ETH?','Very competitive globally (acceptance ~10-15%). Need outstanding GPA + research.',
    'ETH Zurich Excellence Scholarship','CHF 12,000/year','Exceptional Master students','V. Hard',
    ['ETH Zurich','EPFL','University of Zurich'],['University of Zurich','University of Geneva','EPFL'],['University of St. Gallen (HSG)','IMD Lausanne','University of Geneva']),

  c('singapore','Singapore','https://flagcdn.com/w320/sg.png','Singapore is Asia\'s education hub with NUS/NTU in global top 20. Gateway to Southeast Asian job markets.','August / January','6','₹15L-₹35L/yr','SGD','English','SGT',9.2,
    'Highly ranked universities and strategic location as Southeast Asian business hub for finance and tech.','High','Hard','Low','High','Moderate',
    'Engineering, Finance, CS, Business','Looking for cheap education; unwilling to be in Asia','Singapore City',['Computer Science','Finance','Engineering','Business Analytics'],
    '70%+ in 12th','Bachelor 65%+','IELTS 6.5 / GRE','1-2 yrs',
    '₹18,000,000','₹28,000,000','₹45,000,000','SGD 30k-40k/yr','SGD 32k-46k/yr','SGD 1000-2000/mo','SGD 300-500/mo','SGD 1800-2800 (₹1.1L-₹1.7L)',
    'Student Pass (ICA)','3-4 weeks','SGD 30,000 liquid funds','Insufficient funds','Rejected after ICA review',
    '16 hrs/wk','SGD 9-13/hr','1 year temporarily (LTVP or EP route)',
    'Tech/Finance','SGD 60k-90k/yr','Regional HQs for Google, Meta, DBS','Engineering','SGD 55k-80k/yr','Smart city, biotech corridor',
    'SGD 70,000/yr (₹43L)','2 yrs','Is Singapore English-medium?','100% English medium for NUS/NTU/SMU.',
    'NUS Research Scholarship','Full tuition + SGD 2,000/mo stipend','PhD programs only','V. Hard',
    ['NUS','NTU','SMU'],['Duke-NUS Medical','NUS Medicine','NTU Lee Kong Chian'],['NUS Business','NTU NBS','SMU Lee Kong Chian']),

  c('japan','Japan','https://flagcdn.com/w320/jp.png','Japan is an excellent choice for Engineering, Robotics, and Anime/Media arts with moderate tuition and rich culture.','April / October','800+','₹3L-₹8L/yr','JPY','Japanese/English','JST',7.6,
    'Top engineering and technology education with global brands (Toyota, Sony, Honda). MEXT scholarships fully funded.','Low','Medium','Medium','Medium (Japanese needed)','Hard',
    'Robotics, CS, Engineering, Arts/Animation','Those unwilling to seriously learn Japanese','Tokyo, Osaka, Kyoto, Nagoya',['Robotics','Computer Science','Engineering','Animation'],
    '60%+ in 12th; some unis require EJU','Bachelor 60%+','IELTS 6.0 / JLPT N2 highly recommended','1-2 yrs',
    '₹4,000,000','₹8,000,000','₹15,000,000','JPY 500k-1.5M/yr','JPY 500k-1.5M/yr','JPY 50k-100k/mo','JPY 20k-35k/mo','JPY 100k-150k (₹55k-₹82k)',
    'College Student Visa (留学)','4-6 weeks','JPY 2-3M in bank','Insufficient funds','Weak study plan letter',
    '28 hrs/wk','JPY 1,000-1,100 min wage','Tokutei Ginou (Specified Skilled Worker) visa 1-3 yrs',
    'Engineering/Manufacturing','JPY 3.5M-5.5M/yr','Toyota, Sony, Panasonic hubs','IT/Tech','JPY 4M-7M/yr','Growing startup ecosystem',
    'JPY 4,500,000/yr (₹25L)','3-4 yrs','Is MEXT scholarship good?','One of the best: full tuition + ¥144,000/month living stipend.',
    'MEXT Japanese Government Scholarship','Full cover + stipend','Outstanding candidates','V. Hard',
    ['University of Tokyo','Kyoto University','Osaka University'],['University of Tokyo Medical','Kyoto University','Osaka University'],['Hitotsubashi University','Keio University','Waseda']),

  c('south-korea','South Korea','https://flagcdn.com/w320/kr.png','South Korea is home to world-class engineering universities (KAIST, POSTECH) and the booming K-industry.','March / September','200+','₹3L-₹10L/yr','KRW','Korean/English','KST',7.5,
    'Top tech education with Samsung, LG, SK Hynix nearby. Affordable living and a growing global industry.','Low','Medium','Medium','Medium (Korean needed)','Moderate',
    'Engineering, CS, Business, K-culture/Media','Those not interested in Korean culture or language','Seoul, Daejeon, Busan, Incheon',['Computer Science','Engineering','Business','Media Studies'],
    '60%+ in 12th','Bachelor 60%+','IELTS 6.0 / TOPIK preferred','1-2 yrs',
    '₹4,000,000','₹8,000,000','₹14,000,000','KRW 4M-9M/yr','KRW 4M-10M/yr','KRW 400k-800k/mo','KRW 200k-350k/mo','KRW 700k-1.2M (₹42k-₹72k)',
    'D-2 Student Visa','2-4 weeks','USD 10,000 equivalent in bank','Insufficient funds','Weak academic profile',
    '20 hrs/wk','KRW 9,860/hr','D-10 Job seeker visa 1-2 yrs',
    'IT/Tech','KRW 35M-55M/yr','Samsung, Kakao, Naver ecosystem','Engineering','KRW 38M-58M/yr','Semiconductor and EV sector',
    'KRW 40,000,000/yr (₹25L)','3-4 yrs','Is GKS scholarship available?','Yes! Global Korea Scholarship provides full tuition + allowance + Korean language training.',
    'Global Korea Scholarship (GKS)','Full cover + KRW 900k/mo','Undergraduate & Graduate','Hard',
    ['KAIST','POSTECH','Seoul National University'],['Seoul National University','Yonsei','Korea University'],['Yonsei','Korea University','KAIST']),

  c('netherlands','Netherlands','https://flagcdn.com/w320/nl.png','Home to Philips, ASML, and world-class tech universities with 100s of English-taught masters.','September / February','13','₹8L-₹18L/yr','EUR','Dutch/English','CET',8.2,
    'Affordable English-taught Masters in engineering and business via top Dutch universities.','Medium','Easy','Medium','High','Strong',
    'Engineering, CS, Business, Data Science','Unwilling to learn Dutch for long-term stay','Amsterdam, Eindhoven, Delft, Rotterdam',['Computer Science','Data Science','Business Admin','Design'],
    '70%+ in 12th','Bachelor 60%+','IELTS 6.5 / TOEFL 90','1-2 yrs',
    '₹10,000,000','₹15,000,000','₹22,000,000','€8k-€16k/yr','€9k-€18k/yr','€700-€1300/mo','€250-€350/mo','€1200-€1900 (₹1.1L-₹1.65L)',
    'MVV + Residence Permit','4-6 weeks','€11,575 in bank (ERAS funds)','Insufficient funds','Study intent unclear',
    '16 hrs/wk term, 40 hrs breaks','€13.27/hr','1-2 yrs (Orientation year)',
    'IT/Software','€45k-€65k','Large tech sector (Booking.com, ASML)','Engineering','€48k-€70k','High-tech manufacturing hub',
    '€48,000/yr (₹44L)','2-3 yrs','Is Dutch required?','For jobs yes, but 100s of English-taught Masters are available.',
    'Holland Scholarship','€5,000','Non-EEA first-year students','Medium',
    ['TU Delft','TU Eindhoven','University of Twente'],['AMC Amsterdam','Radboud UMC','Erasmus MC'],['RSM Erasmus','Amsterdam Business School','Tilburg']),
];

// Remove duplicates by id before inserting
const uniqueCountries = [];
const seen = new Set();
for (const country of newCountries) {
  if (!seen.has(country.id)) {
    seen.add(country.id);
    uniqueCountries.push(country);
  }
}

// Also add bulk compact countries for reaching 54 total
const bulkCountries = [
  { id: 'denmark', name: 'Denmark', flag: 'https://flagcdn.com/w320/dk.png', description: 'Free education for EU; low tuition for others. Strong engineering and design tradition.', intake: 'September / February', colleges: '8 Universities', tuition: '₹10L-₹16L/yr', country_core: { currency: 'DKK', language: 'Danish/English', time_zone: 'CET', student_popularity_score: 7.6 } },
  { id: 'norway', name: 'Norway', flag: 'https://flagcdn.com/w320/no.png', description: 'Tuition-free public universities (in Norwegian). Very high standard of living and pay.', intake: 'August', colleges: '10 Universities', tuition: 'Free (Public)', country_core: { currency: 'NOK', language: 'Norwegian/English', time_zone: 'CET', student_popularity_score: 7.4 } },
  { id: 'austria', name: 'Austria', flag: 'https://flagcdn.com/w320/at.png', description: 'Low-fee universities in Europe\'s cultural capital Vienna. Music, Arts, Engineering.', intake: 'October / March', colleges: '22 Universities', tuition: '₹1.5L-₹6L/yr', country_core: { currency: 'EUR', language: 'German/English', time_zone: 'CET', student_popularity_score: 7.2 } },
  { id: 'poland', name: 'Poland', flag: 'https://flagcdn.com/w320/pl.png', description: 'Very affordable EU country with growing English-medium private and public universities.', intake: 'October / February', colleges: '132 Universities', tuition: '₹1.5L-₹5L/yr', country_core: { currency: 'PLN', language: 'Polish/English', time_zone: 'CET', student_popularity_score: 6.8 } },
  { id: 'czech-republic', name: 'Czech Republic', flag: 'https://flagcdn.com/w320/cz.png', description: 'Free Czech-language education, affordable English-taught programs in Prague.', intake: 'September / February', colleges: '70 Universities', tuition: '₹1.5L-₹6L/yr', country_core: { currency: 'CZK', language: 'Czech/English', time_zone: 'CET', student_popularity_score: 6.8 } },
  { id: 'hungary', name: 'Hungary', flag: 'https://flagcdn.com/w320/hu.png', description: 'Popular destination for MBBS programs at affordable costs with European standards.', intake: 'September', colleges: '65 Universities', tuition: '₹5L-₹12L/yr (MBBS)', country_core: { currency: 'HUF', language: 'Hungarian/English', time_zone: 'CET', student_popularity_score: 6.6 } },
  { id: 'malaysia', name: 'Malaysia', flag: 'https://flagcdn.com/w320/my.png', description: 'Affordable English-medium education with branch campuses of Australian/UK universities.', intake: 'March / September', colleges: '20 Public, 60+ Private', tuition: '₹3L-₹10L/yr', country_core: { currency: 'MYR', language: 'English/Malay', time_zone: 'MYT', student_popularity_score: 7.0 } },
  { id: 'china', name: 'China', flag: 'https://flagcdn.com/w320/cn.png', description: 'World\'s largest higher education system with heavy govt scholarships for international students.', intake: 'September', colleges: '2800+ Universities', tuition: '₹1.5L-₹6L/yr', country_core: { currency: 'CNY', language: 'Mandarin/English', time_zone: 'CST', student_popularity_score: 7.1 } },
  { id: 'uae', name: 'United Arab Emirates', flag: 'https://flagcdn.com/w320/ae.png', description: 'Tax-free salaries, branch campuses of global universities in Dubai and Abu Dhabi.', intake: 'September / January', colleges: '75+ Universities', tuition: '₹8L-₹25L/yr', country_core: { currency: 'AED', language: 'Arabic/English', time_zone: 'GST', student_popularity_score: 8.0 } },
  { id: 'russia', name: 'Russia', flag: 'https://flagcdn.com/w320/ru.png', description: 'Low-cost, high quality STEM and Medical education with government scholarships available.', intake: 'September', colleges: '1000+ Universities', tuition: '₹1.5L-₹5L/yr', country_core: { currency: 'RUB', language: 'Russian/English', time_zone: 'MSK', student_popularity_score: 6.2 } },
  { id: 'ukraine', name: 'Ukraine', flag: 'https://flagcdn.com/w320/ua.png', description: 'Popular MBBS destination pre-conflict; monitoring situation for future admissions.', intake: 'October', colleges: '200 Universities', tuition: '₹2L-₹5L/yr', country_core: { currency: 'UAH', language: 'Ukrainian/English', time_zone: 'EET', student_popularity_score: 5.0 } },
  { id: 'philippines', name: 'Philippines', flag: 'https://flagcdn.com/w320/ph.png', description: 'Very affordable MBBS education with English medium at US-standard medical curriculum.', intake: 'June / November', colleges: '40+ Medical Colleges', tuition: '₹3L-₹8L/yr', country_core: { currency: 'PHP', language: 'English/Filipino', time_zone: 'PHT', student_popularity_score: 6.8 } },
  { id: 'georgia', name: 'Georgia', flag: 'https://flagcdn.com/w320/ge.png', description: 'Affordable MBBS with WHO-recognised universities, English medium, no donation required.', intake: 'September', colleges: '5 Key Medical Universities', tuition: '₹3L-₹7L/yr', country_core: { currency: 'GEL', language: 'Georgian/English', time_zone: 'GET', student_popularity_score: 6.7 } },
  { id: 'kyrgyzstan', name: 'Kyrgyzstan', flag: 'https://flagcdn.com/w320/kg.png', description: 'Very low-cost MBBS; NMC-approved Indian students study here for MCI licensing.', intake: 'September', colleges: '5 Medical Universities', tuition: '₹2L-₹4L/yr', country_core: { currency: 'KGS', language: 'Kyrgyz/Russian/English', time_zone: 'KGT', student_popularity_score: 5.8 } },
  { id: 'kazakhstan', name: 'Kazakhstan', flag: 'https://flagcdn.com/w320/kz.png', description: 'NMC-recognised MBBS courses with Russian-medium and English-medium options.', intake: 'September', colleges: '6 Medical Universities', tuition: '₹3L-₹5L/yr', country_core: { currency: 'KZT', language: 'Kazakh/Russian/English', time_zone: 'ALMT', student_popularity_score: 6.0 } },
  { id: 'bangladesh', name: 'Bangladesh', flag: 'https://flagcdn.com/w320/bd.png', description: 'Cost-effective medical and engineering education closest to India with cultural familiarity.', intake: 'January / July', colleges: '50 Medical Colleges', tuition: '₹4L-₹8L/yr', country_core: { currency: 'BDT', language: 'Bengali/English', time_zone: 'BST', student_popularity_score: 5.5 } },
  { id: 'nepal', name: 'Nepal', flag: 'https://flagcdn.com/w320/np.png', description: 'Open border with India; popular for MBBS at lower cost than most countries.', intake: 'October', colleges: '20 Medical Colleges', tuition: '₹5L-₹10L/yr', country_core: { currency: 'NPR', language: 'Nepali/English', time_zone: 'NPT', student_popularity_score: 5.8 } },
  { id: 'sri-lanka', name: 'Sri Lanka', flag: 'https://flagcdn.com/w320/lk.png', description: 'Emerging education destination; very affordable with cultural proximity to South India.', intake: 'October / March', colleges: '15 Universities', tuition: '₹2L-₹6L/yr', country_core: { currency: 'LKR', language: 'Sinhala/Tamil/English', time_zone: 'SLST', student_popularity_score: 5.6 } },
  { id: 'portugal', name: 'Portugal', flag: 'https://flagcdn.com/w320/pt.png', description: 'Affordable EU education, digital nomad hub, growing tech ecosystem in Lisbon.', intake: 'September / February', colleges: '35 Universities', tuition: '₹2L-₹8L/yr', country_core: { currency: 'EUR', language: 'Portuguese/English', time_zone: 'WET', student_popularity_score: 7.0 } },
  { id: 'belgium', name: 'Belgium', flag: 'https://flagcdn.com/w320/be.png', description: 'Home to EU headquarters; multilingual education system with very affordable tuition.', intake: 'September', colleges: '28 Universities', tuition: '₹1.5L-₹8L/yr', country_core: { currency: 'EUR', language: 'French/Dutch/German/English', time_zone: 'CET', student_popularity_score: 6.9 } },
  { id: 'luxembourg', name: 'Luxembourg', flag: 'https://flagcdn.com/w320/lu.png', description: 'Tiny but mighty: EU capital, home to Eurozone\'s largest financial center. Very affordable education.', intake: 'September', colleges: '1 Main University + Grandes Écoles', tuition: '₹1.5L-₹3L/yr', country_core: { currency: 'EUR', language: 'French/German/Luxembourgish/English', time_zone: 'CET', student_popularity_score: 6.5 } },
  { id: 'malta', name: 'Malta', flag: 'https://flagcdn.com/w320/mt.png', description: 'English-speaking EU country with affordable education, warm Mediterranean climate.', intake: 'October / March', colleges: '1 University + Private Institutes', tuition: '₹3L-₹8L/yr', country_core: { currency: 'EUR', language: 'Maltese/English', time_zone: 'CET', student_popularity_score: 6.3 } },
  { id: 'cyprus', name: 'Cyprus', flag: 'https://flagcdn.com/w320/cy.png', description: 'English-medium EU country with affordable private universities; gateway to Europe.', intake: 'September / February', colleges: '15 Universities', tuition: '₹5L-₹12L/yr', country_core: { currency: 'EUR', language: 'Greek/English', time_zone: 'EET', student_popularity_score: 6.4 } },
  { id: 'greece', name: 'Greece', flag: 'https://flagcdn.com/w320/gr.png', description: 'Birthplace of western education; affordable public and private universities in Athens.', intake: 'October / March', colleges: '24 Universities', tuition: '₹2L-₹8L/yr', country_core: { currency: 'EUR', language: 'Greek/English', time_zone: 'EET', student_popularity_score: 6.2 } },
  { id: 'turkey', name: 'Turkey', flag: 'https://flagcdn.com/w320/tr.png', description: 'Affordable and highly ranked universities bridging East and West; huge scholarship program (Türkiye Scholarships).', intake: 'September', colleges: '200+ Universities', tuition: '₹1.5L-₹6L/yr', country_core: { currency: 'TRY', language: 'Turkish/English', time_zone: 'TRT', student_popularity_score: 7.0 } },
  { id: 'saudi-arabia', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w320/sa.png', description: 'Fully funded King Abdullah (KAUST) scholarship; massive Vision 2030 expansion in higher education.', intake: 'September', colleges: '30+ Public Universities', tuition: 'Mostly Funded', country_core: { currency: 'SAR', language: 'Arabic/English', time_zone: 'AST', student_popularity_score: 6.5 } },
  { id: 'qatar', name: 'Qatar', flag: 'https://flagcdn.com/w320/qa.png', description: 'Education City hosts branch campuses of Cornell, CMU, and Northwestern. Tax-free scholarships.', intake: 'September / January', colleges: 'Education City Campuses', tuition: 'Scholarship Dependent', country_core: { currency: 'QAR', language: 'Arabic/English', time_zone: 'AST', student_popularity_score: 6.8 } },
  { id: 'egypt', name: 'Egypt', flag: 'https://flagcdn.com/w320/eg.png', description: 'Arabic-medium and English-medium universities. Very affordable for pharma and engineering.', intake: 'September', colleges: '27 Public Universities', tuition: '₹1L-₹4L/yr', country_core: { currency: 'EGP', language: 'Arabic/English', time_zone: 'EET', student_popularity_score: 5.8 } },
  { id: 'south-africa', name: 'South Africa', flag: 'https://flagcdn.com/w320/za.png', description: 'Africa\'s highest-ranked universities (UCT, Wits) with English-medium education and low cost.', intake: 'February / July', colleges: '26 Public Universities', tuition: '₹2L-₹6L/yr', country_core: { currency: 'ZAR', language: 'English (11 official)', time_zone: 'SAST', student_popularity_score: 6.1 } },
  { id: 'argentina', name: 'Argentina', flag: 'https://flagcdn.com/w320/ar.png', description: 'Free public university education for international students. Latin America\'s top medical schools.', intake: 'March / August', colleges: '100+ Universities', tuition: 'Free (Public)', country_core: { currency: 'ARS', language: 'Spanish', time_zone: 'ART', student_popularity_score: 6.2 } },
  { id: 'brazil', name: 'Brazil', flag: 'https://flagcdn.com/w320/br.png', description: 'Latin America\'s largest economy; large Portuguese-medium public universities. STEM focus.', intake: 'March / August', colleges: '200+ Federal Universities', tuition: 'Free (Public)', country_core: { currency: 'BRL', language: 'Portuguese', time_zone: 'BRT', student_popularity_score: 6.0 } },
  { id: 'mexico', name: 'Mexico', flag: 'https://flagcdn.com/w320/mx.png', description: 'Affordable Spanish-medium universities; gateway to US tech job market via border location.', intake: 'August / January', colleges: '250+ Public', tuition: '₹1L-₹4L/yr', country_core: { currency: 'MXN', language: 'Spanish', time_zone: 'CST', student_popularity_score: 5.9 } },
  { id: 'taiwan', name: 'Taiwan', flag: 'https://flagcdn.com/w320/tw.png', description: 'World leader in semiconductor education. Scholarships from MOFA and government. Safe and affordable.', intake: 'September / February', colleges: '150+ Universities', tuition: '₹1.5L-₹6L/yr', country_core: { currency: 'TWD', language: 'Mandarin/English', time_zone: 'NST', student_popularity_score: 7.3 } },
  { id: 'hong-kong', name: 'Hong Kong', flag: 'https://flagcdn.com/w320/hk.png', description: 'World-class universities (HKU, CUHK) with English-medium; hub for finance and global business.', intake: 'September', colleges: '8 UGC-funded + private', tuition: '₹10L-₹20L/yr', country_core: { currency: 'HKD', language: 'Cantonese/English', time_zone: 'HKT', student_popularity_score: 8.4 } },
  { id: 'indonesia', name: 'Indonesia', flag: 'https://flagcdn.com/w320/id.png', description: 'Southeast Asia\'s largest economy; growing English-medium programs with government Darmasiswa scholarships.', intake: 'August / February', colleges: '4,700 Universities', tuition: '₹1L-₹5L/yr', country_core: { currency: 'IDR', language: 'Indonesian/English', time_zone: 'WIB', student_popularity_score: 5.8 } },
  { id: 'thailand', name: 'Thailand', flag: 'https://flagcdn.com/w320/th.png', description: 'Affordable ASEAN education with a growing international student body; strong hospitality and tourism programs.', intake: 'June / November', colleges: '170 Universities', tuition: '₹2L-₹8L/yr', country_core: { currency: 'THB', language: 'Thai/English', time_zone: 'ICT', student_popularity_score: 6.1 } },
  { id: 'mauritius', name: 'Mauritius', flag: 'https://flagcdn.com/w320/mu.png', description: 'English-medium African island nation with UK-affiliated universities and tax-free salaries.', intake: 'August / January', colleges: '5 Public + private', tuition: '₹3L-₹7L/yr', country_core: { currency: 'MUR', language: 'English/French/Creole', time_zone: 'MUT', student_popularity_score: 6.2 } },
  { id: 'cuba', name: 'Cuba', flag: 'https://flagcdn.com/w320/cu.png', description: 'Medical education hub with ELAM Medical School providing heavily subsidised MBBS for developing nations.', intake: 'September', colleges: '50+ Universities', tuition: 'Highly Subsidised', country_core: { currency: 'CUP', language: 'Spanish', time_zone: 'CST', student_popularity_score: 5.2 } },
  { id: 'jordan', name: 'Jordan', flag: 'https://flagcdn.com/w320/jo.png', description: 'Top STEM and medical universities in Middle East; relatively affordable at English/Arabic medium.', intake: 'September / February', colleges: '30 Universities', tuition: '₹3L-₹8L/yr', country_core: { currency: 'JOD', language: 'Arabic/English', time_zone: 'EEST', student_popularity_score: 6.0 } },
  { id: 'oman', name: 'Oman', flag: 'https://flagcdn.com/w320/om.png', description: 'Rapidly growing education sector with branch campuses; tax-free income opportunities post-graduation.', intake: 'September / January', colleges: '28 Universities', tuition: '₹5L-₹12L/yr', country_core: { currency: 'OMR', language: 'Arabic/English', time_zone: 'GST', student_popularity_score: 6.0 } },
  { id: 'estonia', name: 'Estonia', flag: 'https://flagcdn.com/w320/ee.png', description: 'Most digitally-advanced country (e-Residency); affordable English programs in computer science.', intake: 'September / January', colleges: '7 Public Universities', tuition: '₹5L-₹10L/yr', country_core: { currency: 'EUR', language: 'Estonian/English', time_zone: 'EET', student_popularity_score: 6.9 } },
  { id: 'latvia', name: 'Latvia', flag: 'https://flagcdn.com/w320/lv.png', description: 'Very affordable EU education; popular for MBBS among Indian students with English medium.', intake: 'September', colleges: '34 Institutions', tuition: '₹3L-₹7L/yr', country_core: { currency: 'EUR', language: 'Latvian/English', time_zone: 'EET', student_popularity_score: 6.3 } },
  { id: 'lithuania', name: 'Lithuania', flag: 'https://flagcdn.com/w320/lt.png', description: 'Affordable EU member with growing English-medium programs in medicine and business.', intake: 'September / March', colleges: '23 Universities', tuition: '₹3L-₹7L/yr', country_core: { currency: 'EUR', language: 'Lithuanian/English', time_zone: 'EET', student_popularity_score: 6.2 } },
  { id: 'croatia', name: 'Croatia', flag: 'https://flagcdn.com/w320/hr.png', description: 'EU member with beautiful coastline; free Croatian-medium and affordable English-medium education.', intake: 'October / March', colleges: '18 Universities', tuition: '₹2L-₹7L/yr', country_core: { currency: 'EUR', language: 'Croatian/English', time_zone: 'CET', student_popularity_score: 6.0 } },
  { id: 'slovakia', name: 'Slovakia', flag: 'https://flagcdn.com/w320/sk.png', description: 'Affordable EU Schengen country with recognized medical and engineering degrees.', intake: 'September', colleges: '20 Universities', tuition: '₹2L-₹6L/yr', country_core: { currency: 'EUR', language: 'Slovak/English', time_zone: 'CET', student_popularity_score: 5.9 } },
  { id: 'romania', name: 'Romania', flag: 'https://flagcdn.com/w320/ro.png', description: 'EU nation with MCI-approved medical universities and very affordable tuition; popular for MBBS.', intake: 'October', colleges: '90+ Universities', tuition: '₹3L-₹7L/yr', country_core: { currency: 'RON', language: 'Romanian/English', time_zone: 'EET', student_popularity_score: 6.3 } },
  { id: 'serbia', name: 'Serbia', flag: 'https://flagcdn.com/w320/rs.png', description: 'Growing popularity for affordable medicine and engineering; English-medium at private colleges.', intake: 'October', colleges: '18 Universities', tuition: '₹2L-₹6L/yr', country_core: { currency: 'RSD', language: 'Serbian/English', time_zone: 'CET', student_popularity_score: 5.8 } },
  { id: 'kenya', name: 'Kenya', flag: 'https://flagcdn.com/w320/ke.png', description: 'East Africa\'s education hub with English-medium universities; growing tech ecosystem (Silicon Savannah).', intake: 'September / January', colleges: '30+ Universities', tuition: '₹2L-₹5L/yr', country_core: { currency: 'KES', language: 'Swahili/English', time_zone: 'EAT', student_popularity_score: 5.7 } },
];

// Fill minimal required fields for bulk countries
const filledBulk = bulkCountries.map(bc => ({
  ...bc,
  hero: { summary: `${bc.name} offers quality education for Indian students abroad. Last updated March 2026.`, lastUpdated: 'Mar 2026', visaPolicyVersion: 'V.2026.1', decisionStrip: { costLevel: 'Medium', visaDifficulty: 'Medium', partTimeFeasibility: 'Medium', jobOutcomeStrength: 'Medium', prPath: 'Varies' } },
  snapshot: { bestFor: 'International students seeking affordable education options.', avoidIf: 'Looking for guaranteed PR or language-free environment.', topCities: ['Capital City', 'Major City 2'], popularCourses: ['Engineering', 'Business', 'Computer Science'], knownRisks: 'Check visa policies and university recognition before applying.' },
  education_system: { ug: { entry: '60%+ in 12th grade', duration: '3-4 years', notes: 'Varies by institution.' }, pg: { entry: 'Bachelor degree 60%+', tests: 'IELTS 6.0-6.5', duration: '1-2 years', internship: 'Available.' }, diploma: { bestFor: 'Vocational training', transfer: 'Some pathways exist.' } },
  eligibility: { academics: '60%+ minimum', backlogs: 'Up to 5 accepted', gapYears: 'Acceptable with explanation', englishTests: 'IELTS 6.0-6.5' },
  intakes: [{ name: `Main (${bc.intake.split('/')[0].trim()})`, deadline: '3-4 months prior' }],
  cost: { summary: { low: '₹5,000,000', mid: '₹10,000,000', high: '₹18,000,000' }, tuition: { ug: bc.tuition, pg: bc.tuition, diploma: 'Varies' }, livingCost: { rent: 'Varies', food: 'Varies', transport: 'Varies', insurance: 'Required', monthlyTotal: 'Varies by city' }, oneTime: { appFee: 'Varies', visa: 'Varies', flight: '₹40k-₹1.2L' } },
  scholarships: [{ name: 'Government Merit Scholarship', amount: 'Varies', eligibility: 'Meritorious students', deadline: 'Varies', difficulty: 'Hard' }],
  visa_policy: { typeString: 'Student Visa', processingTime: '4-8 weeks', fundsProof: 'Tuition + living expenses proof required.', refusalReasons: ['Insufficient funds.', 'Incomplete documents.', 'Unclear study intent.'] },
  work: { allowedHours: '20 hrs/wk (term time)', wageRange: 'Varies by country', reality: 'Check local regulations.' },
  post_study: { pswDuration: '1-2 years.', eligibility: 'Must complete accredited program.', jobMarket: [{ sector: 'Engineering', demand: 'Medium', salary: 'Varies', notes: 'Growing sector.' }, { sector: 'IT', demand: 'Medium', salary: 'Varies', notes: 'Expanding market.' }], prPath: 'Points or skills-based. Check country-specific routes.' },
  risks: [{ scenario: 'Visa Delays', plan: 'Apply 3-4 months in advance with all documents ready.' }],
  roi: { avgStartingSalary: 'Varies by sector', breakEven: '2-4 years depending on cost structure' },
  faqs: [{ q: 'How do I apply?', a: 'Directly via university website or through an authorized agent. Check official embassy for visa guidance.' }],
  topUniversities: { engineering: ['Top Engineering University', 'Technical University', 'National University'], medical: ['Medical University', 'Health Sciences College'], business: ['Business School', 'Management Institute'], design: ['Arts/Design College'] }
}));

const allNew = [...uniqueCountries, ...filledBulk];

const seedExtra = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected.');

    let added = 0;
    let skipped = 0;

    for (const country of allNew) {
      const exists = await StudyAbroad.findOne({ id: country.id });
      if (!exists) {
        await StudyAbroad.create(country);
        console.log(`✅ Added: ${country.name}`);
        added++;
      } else {
        console.log(`⏭️ Already exists: ${country.name}`);
        skipped++;
      }
    }

    const total = await StudyAbroad.countDocuments();
    console.log(`\n🎉 Done! Added ${added} new countries, skipped ${skipped}. Total in DB: ${total}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seedExtra();
