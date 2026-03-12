import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import StudyAbroad from './models/StudyAbroad.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Load env variables

// We will read the static file in the client and inject it into MongoDB!
// Wait - since we wrote studyAbroadData as ES Module export, we can't easily parse it dynamically here.
// Instead, I'll copy the 6 countries JSON payload directly here to guarantee the seed works standalone.

const seedData = [
  {
    id: 'canada',
    name: 'Canada',
    flag: 'https://flagcdn.com/w320/ca.png',
    description: 'Canada offers top-tier education, diverse culture, and excellent post-study work opportunities.',
    intake: 'Fall / Winter',
    colleges: '2,023',
    tuition: '₹8.1L - ₹21.2L/yr',
    country_core: {
      currency: 'CAD',
      language: 'English, French',
      time_zone: 'EST, PST, MST, CST, AST, NST',
      student_popularity_score: 9.5
    },
    hero: {
      summary: 'Canada is best for MS CS, Business, and Healthcare seekers. Expect total yearly cost of ₹15L–₹35L depending on city. Visa approval depends mainly on funds and academic progression.',
      lastUpdated: '10 March 2026',
      visaPolicyVersion: 'V.2026.1 (Cap Policies Active)',
      decisionStrip: {
        costLevel: 'Medium',
        visaDifficulty: 'Medium',
        partTimeFeasibility: 'High',
        jobOutcomeStrength: 'Medium',
        prPath: 'Moderate (Points Based)'
      }
    },
    snapshot: {
      bestFor: 'MS CS seekers, Business diplomas, Healthcare professionals, Engineering.',
      avoidIf: 'Low budget, needs guaranteed job immediately, low IELTS score.',
      topCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
      popularCourses: ['Computer Science', 'Business Administration', 'Nursing', 'Data Analytics'],
      knownRisks: 'Housing crunch in major cities, stricter visa cap allocated to provinces.'
    },
    education_system: {
      ug: {
        entry: '12th Grade: 65-80% minimum depending on course.',
        duration: '3-4 years',
        notes: 'Co-op programs available that provide work experience.'
      },
      pg: {
        entry: 'Bachelor’s degree with 65-75% equivalent.',
        tests: 'IELTS/TOEFL required. GRE/GMAT for top universities.',
        duration: '1-2 years',
        internship: 'Co-op often integrated.'
      },
      diploma: {
        bestFor: 'Budget conscious, practical work-oriented students.',
        transfer: 'Credits can often transfer to 4-year degree (2+2).'
      }
    },
    eligibility: {
      academics: 'Min 60% standard, highly competitive for top 5 (85%+)',
      backlogs: 'Up to 5 accepted by many, top unis prefer 0-2.',
      gapYears: 'Up to 2 years accepted easily if justified with work ex.',
      englishTests: 'IELTS min 6.0-6.5 mostly, PTE 60+.'
    },
    intakes: [
      { name: 'Fall (Sept)', deadline: 'Dec - Mar previous year' },
      { name: 'Winter (Jan)', deadline: 'Jul - Sept previous year' },
      { name: 'Summer (May)', deadline: 'Oct - Jan previous year (Limited courses)' }
    ],
    cost: {
      summary: {
        low: '₹15,000,000',
        mid: '₹22,000,000',
        high: '₹35,000,000'
      },
      tuition: {
        ug: '₹12L - ₹25L/year',
        pg: '₹10L - ₹22L/year',
        diploma: '₹8L - ₹14L/year'
      },
      livingCost: {
        rent: '$600 - $1200 / month (Shared vs Private)',
        food: '$250 - $400 / month',
        transport: '$100 - $150 / month',
        insurance: '$60 - $80 / month',
        monthlyTotal: '$1100 - $1800 (₹66k - ₹1L)'
      },
      oneTime: {
        appFee: '$100-$150 per uni',
        visa: '$150 CAD + Biometrics',
        flight: '₹80k - ₹1.2L'
      }
    },
    scholarships: [
      { name: 'Vanier Canada Graduate', amount: '$50,000/year', eligibility: 'PhD research excellence', deadline: 'Nov', difficulty: 'Hard' },
      { name: 'Lester B. Pearson', amount: 'Full Tuition', eligibility: 'UG outstanding academics', deadline: 'Jan', difficulty: 'Hard' },
      { name: 'University Specific Merit', amount: '$2,000 - $10,000', eligibility: 'High entrance average', deadline: 'Varies', difficulty: 'Medium' }
    ],
    visa_policy: {
      typeString: 'Study Permit (SDS / Non-SDS)',
      processingTime: '4-8 weeks',
      fundsProof: 'GIC of $20,635 CAD + 1 year tuition receipt.',
      refusalReasons: [
        'Insufficient financial support (GIC not done properly).',
        'Weak study intent (course mismatch with previous degree).',
        'Lack of ties to home country (India).'
      ]
    },
    work: {
      allowedHours: '20 hours/week (off-campus) during studies, 40 hours during scheduled breaks.',
      wageRange: '$15 - $20 CAD/hour (₹900 - ₹1200)',
      reality: 'Medium to get jobs in retail, warehousing, campus dining.'
    },
    post_study: {
      pswDuration: 'Up to 3 years (PGWP) depending on course length.',
      eligibility: 'Must graduate from a DLI eligible program.',
      jobMarket: [
        { sector: 'IT/CS', demand: 'High', salary: '$65k - $95k CAD', notes: 'Strong demand in Toronto, Vancouver.' },
        { sector: 'Healthcare', demand: 'Very High', salary: '$60k - $85k CAD', notes: 'Licensing constraints for Indians.' }
      ],
      prPath: 'Express Entry (CRS), Provincial Nominee Programs (PNP). Currently highly competitive (CRS 500+ usually needed).'
    },
    risks: [
      { scenario: 'Visa Refused', plan: 'Re-apply addressing GCMS notes, consider another country.' },
      { scenario: 'Cannot find housing', plan: 'Book temporary Airbnb for 2 weeks, connect with Indian student associations.' }
    ],
    roi: {
      avgStartingSalary: '$65,000 CAD (approx ₹40L)',
      breakEven: '2 - 3 years of full-time work (frugal living).'
    },
    faqs: [
      { q: 'What is GIC?', a: 'Guaranteed Investment Certificate. It is a mandatory $20,635 CAD deposit for SDS visa.' },
      { q: 'Is PR guaranteed?', a: 'No. PR depends on Express Entry draws and points (age, education, Canadian work experience, language).' }
    ],
    topUniversities: {
      engineering: ['University of Toronto', 'University of British Columbia', 'University of Waterloo'],
      medical: ['University of Toronto', 'McMaster University', 'McGill University'],
      business: ['Rotman (UofT)', 'Ivey (Western)', 'Schulich (York)'],
      design: ['OCAD University', 'Emily Carr', 'Ryerson (TMU)']
    }
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: 'https://flagcdn.com/w320/gb.png',
    description: 'The UK is home to some of the world\'s oldest and most prestigious universities.',
    intake: 'September / January',
    colleges: '178',
    tuition: '₹10.4L - ₹31.2L/yr',
    country_core: {
      currency: 'GBP',
      language: 'English',
      time_zone: 'GMT/BST',
      student_popularity_score: 9.0
    },
    hero: {
      summary: 'The UK is best for 1-year Master’s seekers and Business students. Expect total yearly cost of ₹20L–₹40L. Visa approval is straightforward if CAS is secured and funds are 28 days old.',
      lastUpdated: '01 March 2026',
      visaPolicyVersion: 'V.2025.2 (Dependent Rules Restricted)',
      decisionStrip: {
        costLevel: 'High',
        visaDifficulty: 'Easy',
        partTimeFeasibility: 'Medium',
        jobOutcomeStrength: 'Medium',
        prPath: 'Weak (Requires Sponsorship)'
      }
    },
    snapshot: {
      bestFor: '1-year MSc/MBA, Arts & Design, Humanities, Finance.',
      avoidIf: 'Looking for easy PR, dependents accompanying on Master’s (restricted).',
      topCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham'],
      popularCourses: ['Business Analytics', 'Data Science', 'Law', 'Finance'],
      knownRisks: 'Post-study immigration policies are volatile; cost of living crisis in South.'
    },
    education_system: {
      ug: { entry: '12th Grade: 70-85%+', duration: '3 years (mostly), 4 in Scotland', notes: 'Foundation yr common for lower %.' },
      pg: { entry: 'Bachelor’s: 55-65% (UK 2:1 or 2:2 equiv).', tests: 'IELTS required.', duration: '1 year intense.', internship: 'Some offer placement years.' },
      diploma: { bestFor: 'N/A generally for Indians due to visa structure.', transfer: 'N/A' }
    },
    eligibility: {
      academics: 'Min 55-60% usually. Russell group wants 65-75% from Tier 1 Indian unis.',
      backlogs: 'Generous, many accept 5-8+',
      gapYears: 'Up to 3-5 years often okay with experience.',
      englishTests: 'IELTS 6.0-7.0 (MOI accepted by some based on 12th English score).'
    },
    intakes: [
      { name: 'September (Main)', deadline: 'Jan (UCAS) / May-Jul (PG)' },
      { name: 'January', deadline: 'Oct - Nov' }
    ],
    cost: {
      summary: { low: '₹18,000,000', mid: '₹28,000,000', high: '₹45,000,000' },
      tuition: { ug: '£15k - £25k/yr', pg: '£16k - £35k/yr', diploma: 'N/A' },
      livingCost: {
        rent: '£500 - £1200 / month',
        food: '£200 - £300 / month',
        transport: '£60 - £100 / month',
        insurance: 'IHS Surcharge (approx £776/year)',
        monthlyTotal: '£900 - £1500 (₹95k - ₹1.6L)'
      },
      oneTime: { appFee: '£25 (UCAS) / Free for PG', visa: '£490 + IHS', flight: '₹50k - ₹80k' }
    },
    scholarships: [
      { name: 'Chevening Scholarship', amount: 'Full Cover', eligibility: '2 yr work ex, leadership', deadline: 'Nov', difficulty: 'V. Hard' },
      { name: 'GREAT Scholarships', amount: '£10,000', eligibility: 'Indian nationals, specific subjects', deadline: 'May', difficulty: 'Hard' }
    ],
    visa_policy: {
      typeString: 'Student Route (Tier 4)',
      processingTime: '3-4 weeks',
      fundsProof: 'Tuition + Living (London: £1334/mo, Outside: £1023/mo for 9 months). Must be 28 days old in bank.',
      refusalReasons: ['Funds not maintained for 28 consecutive days.', 'Fake documents/bank statements.', 'Failing credibility interview.']
    },
    work: {
      allowedHours: '20 hours/week term time.',
      wageRange: '£10.42 - £11.44/hour minimum wage.',
      reality: 'Job market for part-time is okay outside London, highly competitive in London.'
    },
    post_study: {
      pswDuration: '2 years (Graduate Route).',
      eligibility: 'Must complete a degree at bachelor’s level or above.',
      jobMarket: [
        { sector: 'Finance & Banking', demand: 'High', salary: '£30k - £45k', notes: 'London is the hub.' },
        { sector: 'Healthcare (NHS)', demand: 'Very High', salary: '£28k - £40k', notes: 'Easiest path to sponsorship.' }
      ],
      prPath: 'Must switch to Skilled Worker Visa (SWV) within 2 years. PR (ILR) takes 5 years on SWV. Difficult to get sponsorship.'
    },
    risks: [
      { scenario: 'No SWV Sponsorship found', plan: 'Must leave UK after 2-year Graduate Route. Gain 2 yrs UK work ex and return to India.' }
    ],
    roi: {
      avgStartingSalary: '£30,000 (approx ₹31L)',
      breakEven: '1-year MSc makes break-even faster (2 years work).'
    },
    faqs: [
      { q: 'Do I need IELTS if I scored 85 in 12th English?', a: 'Many universities waive IELTS for Indian students with >70-80% in 12th English (CBSE/ISC/State boards).' }
    ],
    topUniversities: {
      engineering: ['Cambridge', 'Oxford', 'Imperial College'],
      medical: ['Oxford', 'Cambridge', 'UCL'],
      business: ['LBS', 'Oxford (Saïd)', 'Cambridge (Judge)'],
      design: ['Royal College of Art', 'UAL', 'Glasgow School of Art']
    }
  },
  {
    id: 'usa',
    name: 'United States',
    flag: 'https://flagcdn.com/w320/us.png',
    description: 'The US features the largest number of top-ranked universities globally with immense research opportunities.',
    intake: 'Fall / Spring',
    colleges: '1,018',
    tuition: '₹18.6L - ₹41.8L/yr',
    country_core: {
      currency: 'USD',
      language: 'English',
      time_zone: 'EST, CST, MST, PST',
      student_popularity_score: 10.0
    },
    hero: {
      summary: 'The USA is best for MS CS, STEM, and MBA seekers. Expect total yearly cost of ₹25L–₹50L+. Visa approval depends heavily on the interview intent and university tier.',
      lastUpdated: '15 March 2026',
      visaPolicyVersion: 'V.2026.1',
      decisionStrip: {
        costLevel: 'High',
        visaDifficulty: 'Hard',
        partTimeFeasibility: 'Low (On-campus only)',
        jobOutcomeStrength: 'High',
        prPath: 'Weak (H1B lottery dependency)'
      }
    },
    snapshot: {
      bestFor: 'Top-tier tech (Silicon Valley), Ivy League MBAs, Heavy PhD research.',
      avoidIf: 'Low budget, rely entirely on off-campus part-time work (illegal).',
      topCities: ['Boston', 'New York', 'San Francisco', 'Chicago'],
      popularCourses: ['MS Computer Science', 'Data Science', 'MBA', 'AI/ML'],
      knownRisks: 'H1B lottery uncertainty; off-campus work is strictly illegal on F1.'
    },
    education_system: {
      ug: { entry: '12th Grade: strong academics, SAT/ACT often optional now but preferred.', duration: '4 years', notes: 'Broad curriculum in first 2 years.' },
      pg: { entry: '4-year Bachelor’s (3-year accepted by some).', tests: 'GRE/GMAT highly recommended/required. TOEFL/IELTS.', duration: '1.5-2 years', internship: 'CPT available.' },
      diploma: { bestFor: 'N/A', transfer: 'N/A' }
    },
    eligibility: {
      academics: 'GPA 3.0/4.0 scale (approx 70-75% India).',
      backlogs: 'Varies. Top tier wants 0-2. Lower tier accepts 5+.',
      gapYears: 'Detailed explanation required, work ex preferred.',
      englishTests: 'TOEFL 80+, IELTS 6.5+.'
    },
    intakes: [
      { name: 'Fall (August)', deadline: 'Dec-Jan (Top), Mar-May (Others)' },
      { name: 'Spring (Jan)', deadline: 'Aug-Oct' }
    ],
    cost: {
      summary: { low: '₹22,000,000', mid: '₹35,000,000', high: '₹60,000,000' },
      tuition: { ug: '$25k - $60k/yr', pg: '$20k - $55k/yr', diploma: 'N/A' },
      livingCost: {
        rent: '$800 - $1800 / month',
        food: '$300 - $500 / month',
        transport: '$80 - $150 / month',
        insurance: '$150 / month',
        monthlyTotal: '$1300 - $2500 (₹1.1L - ₹2.1L)'
      },
      oneTime: { appFee: '$75 - $150', visa: '$185 (Visa) + $350 (SEVIS)', flight: '₹80k - ₹1.5L' }
    },
    scholarships: [
      { name: 'Fulbright-Nehru', amount: 'Full Cover', eligibility: 'Leadership, specific PG fields', deadline: 'May', difficulty: 'V. Hard' },
      { name: 'Graduate Assistantships (TA/RA)', amount: 'Tuition Waiver + Stipend', eligibility: 'Strong profile, early applicant', deadline: 'Dec', difficulty: 'Medium/Hard' }
    ],
    visa_policy: {
      typeString: 'F-1 Student Visa',
      processingTime: 'Variable (interview wait times can be months).',
      fundsProof: 'Liquid funds for 1st Year (I-20 amount). Bank letters, education loans.',
      refusalReasons: ['Failed to prove non-immigrant intent (Section 214(b)).', 'Uncreduous sponsor.', 'Poor interview performance.']
    },
    work: {
      allowedHours: '20 hours/week ONLY ON-CAMPUS.',
      wageRange: '$10 - $15/hour.',
      reality: 'Hard to get off-campus (illegal). CPT allows paid off-campus internships after 1 year.'
    },
    post_study: {
      pswDuration: '1 year (OPT) + 2 years (STEM Extension). Total 3 years for STEM.',
      eligibility: 'Must graduate. Non-STEM only gets 1 year.',
      jobMarket: [
        { sector: 'Tech / Software', demand: 'High', salary: '$80k - $130k+', notes: 'Top tech companies sponsor H1B.' },
        { sector: 'Data Analytics', demand: 'High', salary: '$75k - $110k', notes: 'Very popular among Indians.' }
      ],
      prPath: 'Very difficult for Indians. F1 -> OPT -> H1B (Lottery) -> Green Card (Waitlist is decades long).'
    },
    risks: [
      { scenario: 'H1B not picked in 3 years', plan: 'Relocate to employer’s Canada/Europe office (L1 visa route) or return.' },
      { scenario: 'Layoffs on H1B', plan: 'Have 60 days to find a new job or leave.' }
    ],
    roi: {
      avgStartingSalary: '$85,000 (approx ₹70L)',
      breakEven: '1-1.5 years of US work on OPT.'
    },
    faqs: [
      { q: 'Is a 3-year bachelor degree accepted?', a: 'Top tier usually requires 16 years (4-year UG). Some universities (WES evaluated) accept 3-year degrees.' }
    ],
    topUniversities: {
      engineering: ['MIT', 'Stanford', 'UC Berkeley'],
      medical: ['Harvard', 'Johns Hopkins', 'Stanford'],
      business: ['Stanford GSB', 'Wharton (Penn)', 'Harvard Business School'],
      design: ['RISD', 'Parsons', 'Pratt']
    }
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: 'https://flagcdn.com/w320/au.png',
    description: 'Australia provides a high quality of life, outstanding education, and post-study work rights.',
    intake: 'February / July',
    colleges: '43',
    tuition: '₹15L - ₹30L/yr',
    country_core: {
      currency: 'AUD',
      language: 'English',
      time_zone: 'AWST, ACST, AEST',
      student_popularity_score: 8.5
    },
    hero: {
      summary: 'Australia is best for ease of living, high minimum wages, and robust post-study work rights. Expect total yearly cost of ₹25L–₹40L. Visa requires strict Genuine Student (GS) compliance.',
      lastUpdated: '20 March 2026',
      visaPolicyVersion: 'V.2026.1 (GS Requirement Active)',
      decisionStrip: {
        costLevel: 'High',
        visaDifficulty: 'Hard',
        partTimeFeasibility: 'High',
        jobOutcomeStrength: 'Medium',
        prPath: 'Moderate (Points Based)'
      }
    },
    snapshot: {
      bestFor: 'Engineering, Accounting, Nursing, IT, relaxed lifestyle.',
      avoidIf: 'You have a high number of backlogs or unexplained education gaps.',
      topCities: ['Melbourne', 'Sydney', 'Brisbane', 'Adelaide'],
      popularCourses: ['Nursing', 'Accounting', 'IT', 'Engineering'],
      knownRisks: 'Visa rejections high for high-risk regions in India; housing crisis in Sydney/Melbourne.'
    },
    education_system: {
      ug: { entry: '12th Grade: 65%+', duration: '3 years (mostly), 4 for Hons', notes: 'Vocational (VET) pathways exist.' },
      pg: { entry: 'Bachelor’s: usually Section 1/2 uni in India requirement.', tests: 'IELTS/PTE required.', duration: '1.5-2 years', internship: 'Available.' },
      diploma: { bestFor: 'Trades, cooking, automotive.', transfer: 'TAFE to Uni pathways.' }
    },
    eligibility: {
      academics: '60-70% from Section 1/2 recognized unis.',
      backlogs: 'Strict. Generally under 5-6.',
      gapYears: 'Highly scrutinized. 1 year max without strong proof.',
      englishTests: 'IELTS 6.5 (no band less than 6.0), PTE 58.'
    },
    intakes: [
      { name: 'Semester 1 (Feb/Mar)', deadline: 'Oct - Dec' },
      { name: 'Semester 2 (July)', deadline: 'Apr - May' }
    ],
    cost: {
      summary: { low: '₹20,000,000', mid: '₹30,000,000', high: '₹45,000,000' },
      tuition: { ug: '$30k - $45k/yr', pg: '$32k - $50k/yr', diploma: '$15k - $20k/yr' },
      livingCost: {
        rent: '$800 - $1500 / month',
        food: '$300 - $500 / month',
        transport: '$100 - $150 / month',
        insurance: 'OSHC ($500 - $600/year)',
        monthlyTotal: '$1500 - $2500 (₹80k - ₹1.3L)'
      },
      oneTime: { appFee: '$50 - $100', visa: '$1600 AUD', flight: '₹60k - ₹1L' }
    },
    scholarships: [
      { name: 'Australia Awards', amount: 'Full Cover', eligibility: 'Target countries, leadership', deadline: 'April', difficulty: 'V. Hard' },
      { name: 'Vice Chancellor’s Int Merit', amount: '15%-50% Tuition', eligibility: 'High GPA', deadline: 'Varies', difficulty: 'Medium' }
    ],
    visa_policy: {
      typeString: 'Subclass 500',
      processingTime: '4-8 weeks',
      fundsProof: 'Living expenses set at $29,710 AUD per year + Tuition. Must be in bank for 3 months or fresh education loan.',
      refusalReasons: ['Failed Genuine Student (GS) criteria.', 'Fraudulent documents from high-risk regions.', 'Irregular fund deposits.']
    },
    work: {
      allowedHours: '48 hours per fortnight (2 weeks).',
      wageRange: '$23.23 AUD/hour (legal minimum) (₹1200+).',
      reality: 'High minimum wage makes part-time very lucrative to cover living costs.'
    },
    post_study: {
      pswDuration: '2-4 years (Temporary Graduate visa Subclass 485).',
      eligibility: 'Must complete a CRICOS registered course of at least 92 weeks.',
      jobMarket: [
        { sector: 'Nursing & Healthcare', demand: 'Very High', salary: '$70k - $90k AUD', notes: 'Almost guaranteed PR pathways.' },
        { sector: 'IT & Data', demand: 'Medium', salary: '$65k - $85k AUD', notes: 'Competitive entry level.' }
      ],
      prPath: 'Points-tested system (Subclass 189/190/491). Need high points (English, Age, State sponsorship).'
    },
    risks: [
      { scenario: 'Visa Rejected', plan: 'Very hard to overturn. Avoid applying from high-risk states without pristine paperwork.' }
    ],
    roi: {
      avgStartingSalary: '$65,000 AUD (approx ₹35L)',
      breakEven: '2.5 - 3.5 years of work.'
    },
    faqs: [
      { q: 'Is PTE accepted?', a: 'Yes, PTE Academic is widely accepted by 100% of Australian universities and immigration.' }
    ],
    topUniversities: {
      engineering: ['UNSW', 'Melbourne', 'Monash'],
      medical: ['Melbourne', 'Sydney', 'Monash'],
      business: ['Melbourne Business School', 'AGSM', 'Monash'],
      design: ['RMIT', 'UTS', 'Melbourne']
    }
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: 'https://flagcdn.com/w320/de.png',
    description: 'Germany is known for world-class technical education, very low tuition fees, and strong engineering sectors.',
    intake: 'Winter (Oct) / Summer (Apr)',
    colleges: '380+',
    tuition: 'Mostly Free (Public)',
    country_core: {
      currency: 'EUR',
      language: 'German, English',
      time_zone: 'CET/CEST',
      student_popularity_score: 9.3
    },
    hero: {
      summary: 'Germany is best for low-cost, high-quality Engineering and Tech education. Expect total yearly cost of ₹10L–₹12L (mostly living expenses). Visa requires a Blocked Account.',
      lastUpdated: '05 March 2026',
      visaPolicyVersion: 'V.2025.10 (APS Certificate Mandatory)',
      decisionStrip: {
        costLevel: 'Low',
        visaDifficulty: 'Medium',
        partTimeFeasibility: 'Medium',
        jobOutcomeStrength: 'High (If you speak German)',
        prPath: 'Strong'
      }
    },
    snapshot: {
      bestFor: 'Mechanical/Auto Engineering, CS, core tech, highly budget-conscious students.',
      avoidIf: 'You refuse to learn German; you want a huge campus party lifestyle.',
      topCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
      popularCourses: ['Automotive Engineering', 'Computer Science', 'Data Engineering', 'Management'],
      knownRisks: 'APS certificate causes severe delays (apply 4-6 months early). Language barrier for jobs.'
    },
    education_system: {
      ug: { entry: '13 years of education needed. Pass JEE Adv or do Studienkolleg (1 yr prep).', duration: '3-4 years', notes: 'Public unis free.' },
      pg: { entry: 'Bachelor’s degree (strict credit matching with German bachelor’s).', tests: 'IELTS required. GRE for some TU9.', duration: '1.5-2 years', internship: 'Yes' },
      diploma: { bestFor: 'Ausbildung (Apprenticeship)', transfer: 'Trade focused.' }
    },
    eligibility: {
      academics: '70%+ minimum, but top TU9 require 80-85%+.',
      backlogs: 'Unfavorable. Keep it to 0-2.',
      gapYears: 'Tolerated if justified with relevant work experience.',
      englishTests: 'IELTS 6.5. (A1/A2 German highly recommended even for English taught courses).'
    },
    intakes: [
      { name: 'Winter (Oct)', deadline: '15 July' },
      { name: 'Summer (April)', deadline: '15 Jan' }
    ],
    cost: {
      summary: { low: '₹10,000,000', mid: '₹12,000,000', high: '₹20,000,000 (Private Uni)' },
      tuition: { ug: 'Free (Public) / €10k-15k (Private)', pg: 'Free (Public) / €10k-20k (Private)', diploma: 'N/A' },
      livingCost: {
        rent: '€350 - €600 / month',
        food: '€200 - €250 / month',
        transport: 'Covered in semester ticket (€150-300 per semester)',
        insurance: '€120 / month (TK/AOK)',
        monthlyTotal: '€850 - €1100 (₹75k - ₹95k)'
      },
      oneTime: { appFee: '€75 via UniAssist', visa: '€75 + ₹18,000 APS Cert', flight: '₹50k - ₹70k' }
    },
    scholarships: [
      { name: 'DAAD Scholarships', amount: '€934/month + travel', eligibility: 'Exceptional grads/PhDs', deadline: 'Oct-Nov', difficulty: 'Hard' }
    ],
    visa_policy: {
      typeString: 'National Visa (Type D)',
      processingTime: '4-8 weeks (After APS is received)',
      fundsProof: 'Blocked Account (Sperrkonto) of €11,208 for 1 year living expenses.',
      refusalReasons: ['APS Certificate missing or delayed.', 'Fake academic docs.']
    },
    work: {
      allowedHours: '120 full days or 240 half days per year.',
      wageRange: '€12 - €15/hour.',
      reality: 'Without B1+ German, only delivery (Lieferando) or warehouse jobs available.'
    },
    post_study: {
      pswDuration: '18 months job seeker visa.',
      eligibility: 'Must graduate from a recognized institution.',
      jobMarket: [
        { sector: 'Automotive / Core Engg', demand: 'High', salary: '€45k - €60k', notes: 'German is mandatory.' },
        { sector: 'Software / IT', demand: 'Very High', salary: '€48k - €65k', notes: 'English-only jobs widely available in Berlin/Munich.' }
      ],
      prPath: 'Very fast. Can apply for PR (Settlement Permit) after 21 months of working on EU Blue Card if you have B1 German (or 33 months with A1).'
    },
    risks: [
      { scenario: 'Can\'t graduate', plan: 'German grading is brutal (Exams count for 100%). Must study consistently.' }
    ],
    roi: {
      avgStartingSalary: '€50,000 (approx ₹45L)',
      breakEven: '<1 year (since you only spend on living costs and recoup it quickly).'
    },
    faqs: [
      { q: 'What is APS?', a: 'Academic Evaluation Centre certificate. It verifies Indian degrees. Mandatory for German visa. Takes 3-5 months.' },
      { q: 'Is education totally free?', a: 'Public universities charge no tuition, only a semester contribution of €150-€350 which covers local transport.' }
    ],
    topUniversities: {
      engineering: ['TUM', 'RWTH Aachen', 'TU Berlin'],
      medical: ['Heidelberg', 'Charité Berlin', 'LMU Munich'],
      business: ['Mannheim', 'ESMT', 'WHU'],
      design: ['Bauhaus Weimar', 'UdK Berlin', 'Pforzheim']
    }
  },
  {
    id: 'ireland',
    name: 'Ireland',
    flag: 'https://flagcdn.com/w320/ie.png',
    description: 'Ireland is the tech hub of Europe (Google, Meta, Apple HQs). Best for IT/CS 1-year master’s with a 2-year post-study work visa.',
    intake: 'September / January',
    colleges: '30+',
    tuition: '₹10L - ₹22L/yr',
    country_core: {
      currency: 'EUR',
      language: 'English',
      time_zone: 'GMT/IST',
      student_popularity_score: 8.0
    },
    hero: {
      summary: 'Ireland is the tech hub of Europe (Google, Meta, Apple HQs). Best for IT/CS 1-year master’s with a 2-year post-study work visa. Lower cost than UK/US.',
      lastUpdated: '10 Feb 2026',
      visaPolicyVersion: 'V.2025.5',
      decisionStrip: {
        costLevel: 'Medium',
        visaDifficulty: 'Easy',
        partTimeFeasibility: 'Medium',
        jobOutcomeStrength: 'Medium (High for IT)',
        prPath: 'Moderate (Critical Skills)'
      }
    },
    snapshot: {
      bestFor: 'IT, Data Science, Pharma, 1-year quick ROI master’s.',
      avoidIf: 'Looking for non-STEM jobs, low budget for housing.',
      topCities: ['Dublin', 'Cork', 'Galway', 'Limerick'],
      popularCourses: ['Data Analytics', 'Computer Science', 'Pharmaceutical Sci', 'Digital Marketing'],
      knownRisks: 'Severe accommodation crisis in Dublin, rent is extremely high.'
    },
    education_system: {
      ug: { entry: '12th Grade: 70%+', duration: '3-4 years', notes: 'Level 8 Honours degree.' },
      pg: { entry: 'Bachelor’s: 60%+ usually accepted.', tests: 'IELTS 6.5.', duration: '1 year', internship: 'Some colleges offer placement.' },
      diploma: { bestFor: 'Level 7 ordinary degrees/Higher Diplomas.', transfer: 'Yes' }
    },
    eligibility: {
      academics: '60% min. Top Unis (TCD/UCD) want 75%+.',
      backlogs: 'Acceptable up to 4-5.',
      gapYears: 'Acceptable with work ex.',
      englishTests: 'IELTS 6.5, Duolingo often accepted.'
    },
    intakes: [
      { name: 'September', deadline: 'March - June' },
      { name: 'January', deadline: 'October' }
    ],
    cost: {
      summary: { low: '₹15,000,000', mid: '₹22,000,000', high: '₹30,000,000' },
      tuition: { ug: '€10k - €20k/yr', pg: '€12k - €25k/yr', diploma: '€9k - €12k/yr' },
      livingCost: {
        rent: '€600 - €1000 / month',
        food: '€250 - €350 / month',
        transport: '€80 / month',
        insurance: '€150 / year',
        monthlyTotal: '€1000 - €1500 (₹90k - ₹1.3L)'
      },
      oneTime: { appFee: '€50', visa: '€100', flight: '₹60k - ₹80k' }
    },
    scholarships: [
      { name: 'GOI-IES', amount: '€10,000 + Tuition waiver', eligibility: 'Outstanding offer holder', deadline: 'March', difficulty: 'V. Hard' }
    ],
    visa_policy: {
      typeString: 'Stamp 2',
      processingTime: '4-6 weeks',
      fundsProof: '€10,000 for living expenses in bank + fee payment receipt.',
      refusalReasons: ['Insufficient/unclear source of funds.', 'Poor academic progression.']
    },
    work: {
      allowedHours: '20 hours term time, 40 hours during holidays (May-Aug, Dec).',
      wageRange: '€11.30/hour minimum.',
      reality: 'Plentiful retail/hospitality jobs, but Dublin competition is high.'
    },
    post_study: {
      pswDuration: '1G Visa: 1 year for UG, 2 years for PG.',
      eligibility: 'Level 8 (UG) or Level 9 (PG) graduate.',
      jobMarket: [
        { sector: 'IT/Tech', demand: 'Very High', salary: '€35k - €50k', notes: 'Hub for FAANG European HQs.' },
        { sector: 'Pharma / Biotech', demand: 'High', salary: '€32k - €45k', notes: 'Ireland is a major export hub for pharma.' }
      ],
      prPath: 'Get a Critical Skills Employment Permit (CSEP) for 2 years -> Stamp 4 (PR equivalent).'
    },
    risks: [
      { scenario: 'Housing Crisis', plan: 'Look for accommodation outside Dublin center or in provincial towns like Limerick/Cork.' }
    ],
    roi: {
      avgStartingSalary: '€35,000 (approx ₹31L)',
      breakEven: '1-2 years.'
    },
    faqs: [
      { q: 'Is Duolingo English Test (DET) accepted?', a: 'Yes, many Irish universities and Irish immigration (INIS) accept DET currently.' },
      { q: 'What is the Critical Skills list?', a: 'A list of highly demanded professions (IT, Engineering, Nursing). Getting a job on this list makes PR very easy.' }
    ],
    topUniversities: {
      engineering: ['Trinity College Dublin (TCD)', 'University College Dublin (UCD)', 'University of Galway'],
      medical: ['RCSI', 'TCD', 'UCC'],
      business: ['UCD Smurfit', 'TCD Business School', 'DCU'],
      design: ['NCAD', 'TUD', 'IADT']
    }
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    flag: 'https://flagcdn.com/w320/nz.png',
    description: 'New Zealand offers excellent education, safety, and a stunning environment with strong pathways to PR.',
    intake: 'February / July',
    colleges: '8 Universities',
    tuition: '₹14L - ₹22L/yr',
    country_core: {
      currency: 'NZD',
      language: 'English',
      time_zone: 'NZST',
      student_popularity_score: 8.2
    },
    hero: {
      summary: 'New Zealand is best for Agriculture, Forestry, IT, and stable pathways to PR. Expect total yearly cost of ₹20L–₹35L. Student visa requires upfront funds proof.',
      lastUpdated: '01 April 2026',
      visaPolicyVersion: 'V.2026.1',
      decisionStrip: {
        costLevel: 'Medium',
        visaDifficulty: 'Medium',
        partTimeFeasibility: 'High',
        jobOutcomeStrength: 'Medium',
        prPath: 'Strong'
      }
    },
    snapshot: {
      bestFor: 'Agriculture, IT, Hospitality, seeking high quality of life.',
      avoidIf: 'Seeking massive metropolitan tech hubs similar to US/UK.',
      topCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
      popularCourses: ['Agriculture', 'Computer Science', 'Business', 'Tourism'],
      knownRisks: 'Smaller job market compared to Australia.'
    },
    education_system: {
      ug: { entry: '12th Grade: 70%+', duration: '3 years', notes: 'Degree structures similar to UK.' },
      pg: { entry: 'Bachelor’s: 60%+', tests: 'IELTS 6.5', duration: '1.5-2 years', internship: 'Available' },
      diploma: { bestFor: 'Vocational training', transfer: 'Pathways exist' }
    },
    eligibility: {
      academics: '60% min, tier 1 prefers 70%+',
      backlogs: 'Acceptable up to 5',
      gapYears: 'Acceptable with valid reasons',
      englishTests: 'IELTS 6.5, PTE 58'
    },
    intakes: [
      { name: 'Semester 1 (Feb)', deadline: 'Nov-Dec' },
      { name: 'Semester 2 (Jul)', deadline: 'Apr-May' }
    ],
    cost: {
      summary: { low: '₹20,000,000', mid: '₹28,000,000', high: '₹35,000,000' },
      tuition: { ug: 'NZ$28k - $35k/yr', pg: 'NZ$30k - $40k/yr', diploma: 'NZ$18k - $25k/yr' },
      livingCost: {
        rent: 'NZ$800 - $1200 / month',
        food: 'NZ$300 - $400 / month',
        transport: 'NZ$100 / month',
        insurance: 'NZ$600 / year',
        monthlyTotal: 'NZ$1300 - $1800 (₹65k - ₹90k)'
      },
      oneTime: { appFee: 'NZ$50', visa: 'NZ$430', flight: '₹70k - ₹1L' }
    },
    scholarships: [
      { name: 'NZ Excellence Awards', amount: 'NZ$10,000', eligibility: 'Indian UG/PG students', deadline: 'Nov', difficulty: 'Hard' }
    ],
    visa_policy: {
      typeString: 'Fee Paying Student Visa',
      processingTime: '4-6 weeks',
      fundsProof: 'NZ$20,000 per year + tuition. FTS (Fund Transfer Scheme) often recommended.',
      refusalReasons: ['Unclear study intent', 'Insufficient funds']
    },
    work: {
      allowedHours: '20 hours term time, full time holidays',
      wageRange: 'NZ$23.15/hour min',
      reality: 'Good part time opportunities in hospitality/retail.'
    },
    post_study: {
      pswDuration: '1-3 years depending on qualification level.',
      eligibility: 'Level 7 degree or higher.',
      jobMarket: [
        { sector: 'IT/Tech', demand: 'Medium', salary: 'NZ$60k - $80k', notes: 'Growing in Auckland' },
        { sector: 'Agriculture/Environment', demand: 'High', salary: 'NZ$55k - $75k', notes: 'Major industry' }
      ],
      prPath: 'Skilled Migrant Category (Points based). Relatively straightforward if you secure a skilled job.'
    },
    risks: [
      { scenario: 'Limited job market', plan: 'Network aggressively during studies.' }
    ],
    roi: {
      avgStartingSalary: 'NZ$60,000 (approx ₹30L)',
      breakEven: '2-3 years'
    },
    faqs: [
      { q: 'Is FTS mandatory?', a: 'Not mandatory but highly recommended by INZ for Indian students to prove funds.' }
    ],
    topUniversities: {
      engineering: ['University of Auckland', 'University of Canterbury', 'Massey University'],
      medical: ['University of Otago', 'University of Auckland'],
      business: ['Auckland University of Technology (AUT)', 'Victoria University of Wellington'],
      design: ['Massey University', 'AUT', 'Victoria University']
    }
  },
  {
    id: 'france',
    name: 'France',
    flag: 'https://flagcdn.com/w320/fr.png',
    description: 'France is a premier destination for Business (MIM) and Fashion, offering low tuition and a 2-year PSW visa.',
    intake: 'September / January',
    colleges: '3500+',
    tuition: '₹3L - ₹15L/yr',
    country_core: {
      currency: 'EUR',
      language: 'French, English',
      time_zone: 'CET/CEST',
      student_popularity_score: 8.1
    },
    hero: {
      summary: 'France is top-tier for Management (MIM), Luxury/Fashion, and Engineering. High ROI due to low public tuition and strong European career mobility.',
      lastUpdated: '15 March 2026',
      visaPolicyVersion: 'V.2025.8',
      decisionStrip: {
        costLevel: 'Low',
        visaDifficulty: 'Medium',
        partTimeFeasibility: 'Medium',
        jobOutcomeStrength: 'Medium (French needed)',
        prPath: 'Moderate'
      }
    },
    snapshot: {
      bestFor: 'MBA, MIM, Fashion Design, Gastronomy, Engineering.',
      avoidIf: 'Refuse to learn basic French.',
      topCities: ['Paris', 'Lyon', 'Toulouse', 'Lille'],
      popularCourses: ['Masters in Management (MIM)', 'Luxury Brand Management', 'Data Science'],
      knownRisks: 'Language barrier severely limits job prospects outside tech/finance.'
    },
    education_system: {
      ug: { entry: '12th Grade: 70%+', duration: '3 years', notes: 'Licence degree.' },
      pg: { entry: 'Bachelor’s: 60%+', tests: 'IELTS/TOEFL. GMAT for top Business schools.', duration: '1-2 years', internship: 'Mandatory in most PGs.' },
      diploma: { bestFor: 'Culinary, Arts', transfer: 'N/A' }
    },
    eligibility: {
      academics: '60% min, 75%+ for Grandes Écoles',
      backlogs: 'Up to 5 acceptable',
      gapYears: 'Tolerated if justified',
      englishTests: 'IELTS 6.0 - 6.5. TCF/DELF if studying in French.'
    },
    intakes: [
      { name: 'September', deadline: 'Feb-May' },
      { name: 'January/February', deadline: 'Sept-Nov' }
    ],
    cost: {
      summary: { low: '₹12,000,000', mid: '₹20,000,000', high: '₹30,000,000' },
      tuition: { ug: '€2770/yr (Public)', pg: '€3770/yr (Public) or €10k-25k (Private/Business)', diploma: 'Varies' },
      livingCost: {
        rent: '€400 - €800 / month (CAF subsidies available)',
        food: '€200 - €300 / month',
        transport: '€30 - €50 / month',
        insurance: 'Free public healthcare (CVEC fee €100/yr)',
        monthlyTotal: '€700 - €1200 (₹65k - ₹1L)'
      },
      oneTime: { appFee: '€50-€100', visa: '€50 (VFS Campus France)', flight: '₹45k - ₹65k' }
    },
    scholarships: [
      { name: 'Charpak Scholarship', amount: '€860/month + Tuition waiver', eligibility: 'Indian nationals, merit', deadline: 'April', difficulty: 'Hard' }
    ],
    visa_policy: {
      typeString: 'VLS-TS (Long Stay Student Visa)',
      processingTime: '2-4 weeks',
      fundsProof: '€615 per month for living expenses + Tuition.',
      refusalReasons: ['Campus France interview failure', 'Inadequate funds']
    },
    work: {
      allowedHours: '964 hours per year (approx 20 hours/week).',
      wageRange: '€11.65/hour (SMIC).',
      reality: 'French required for customer-facing jobs.'
    },
    post_study: {
      pswDuration: '2 Years (APS/RECE visa) specifically for Indians holding French Masters.',
      eligibility: 'Masters degree from France.',
      jobMarket: [
        { sector: 'Business / Finance', demand: 'High', salary: '€40k - €55k', notes: 'Paris is a major hub.' },
        { sector: 'Luxury / Fashion', demand: 'Very High', salary: '€35k - €50k', notes: 'Global center for luxury brands.' }
      ],
      prPath: 'Can apply for PR after 5 years of residence, but reduced to 2 years if having a degree from a French higher ed institution. Must pass B1 French test.'
    },
    risks: [
      { scenario: 'No job in 2 years', plan: 'If B2 French is not achieved, corporate networking becomes hard.' }
    ],
    roi: {
      avgStartingSalary: '€40,000 (approx ₹36L)',
      breakEven: '1-2 years (Especially for public universities).'
    },
    faqs: [
      { q: 'What is CAF?', a: 'A French government housing subsidy that pays up to 30-40% of student rent.' }
    ],
    topUniversities: {
      engineering: ['École Polytechnique', 'Sorbonne', 'CentraleSupélec'],
      medical: ['Sorbonne', 'Université de Paris'],
      business: ['HEC Paris', 'INSEAD', 'ESSEC', 'ESCP'],
      design: ['Institut Français de la Mode (IFM)', 'ESMOD']
    }
  }
];

const seedStudyAbroad = async () => {
  try {
    const uri = process.env.DATABASE_URL;
    if (!uri) throw new Error('DATABASE_URL is not defined');
    
    await mongoose.connect(uri);
    console.log('MongoDB Connected to seed data.');

    await StudyAbroad.deleteMany({}); // clear old
    console.log('Cleared existing StudyAbroad data.');

    await StudyAbroad.insertMany(seedData);
    console.log('Successfully seeded 8 countries into MongoDB!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedStudyAbroad();
