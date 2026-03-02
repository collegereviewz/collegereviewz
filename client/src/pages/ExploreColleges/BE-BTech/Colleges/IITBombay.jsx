import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'IIT Bombay - Indian Institute of Technology - [IITB]',
  shortName: 'IIT Bombay',
  location: 'Mumbai, Maharashtra',
  type: 'Deemed Government',
  domain: 'iitb.ac.in',
  logo: 'https://logo.clearbit.com/iitb.ac.in',
  fees: '₹8,82,500',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹24,30,000',
  highestPlacement: '₹1,00,00,000',
  placementLabel: 'Average Package',
  rating: 4.4,
  reviews: 842,
  ranking: '#5th/500 in India for Engineering College Review 2026',
  badges: ['NIRF #3', 'NAAC A++', 'QS World Top 150'],
  about: `The Indian Institute of Technology Bombay (IIT Bombay) is one of India's most prestigious technical institutions, established in 1958. Located in Powai, Mumbai, it is consistently ranked among the top engineering colleges in India and Asia. IIT Bombay offers undergraduate, postgraduate, and doctoral programs across engineering, sciences, design, and management. The institute is known for its world-class faculty, cutting-edge research, and exceptional campus life. IIT Bombay is among the most sought-after destinations for engineering aspirants who qualify JEE Advanced.`,
  courses: [
    { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹8,82,500' },
    { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: '₹8,82,500' },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: '₹8,82,500' },
    { name: 'B.Tech Civil Engineering', duration: '4 Years', fees: '₹8,82,500' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹1,00,000' },
    { name: 'MBA (SJMSoM)', duration: '2 Years', fees: '₹10,77,000' },
  ],
  admission: [
    'Qualify JEE Advanced with a valid rank (for B.Tech)',
    'Register on JoSAA portal and participate in seat allotment',
    'Complete document verification and fee payment',
    'Attend reporting date for physical reporting at IIT Bombay',
    'For M.Tech: qualify GATE with valid score. For MBA: qualify CAT/GMAT',
  ],
  facts: [
    { label: 'Established', value: '1958' },
    { label: 'Campus Size', value: '550 Acres' },
    { label: 'Total Students', value: '10,000+' },
    { label: 'Faculty', value: '600+' },
    { label: 'Entrance Exam', value: 'JEE Advanced (B.Tech)' },
    { label: 'Affiliation', value: 'Autonomous (Deemed Univ.)' },
    { label: 'Location', value: 'Powai, Mumbai' },
    { label: 'NIRF Ranking', value: '#3 (Engineering 2024)' },
  ],
  sources: {
    official:    'https://www.iitb.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/IIT_Bombay',
    shiksha:     'https://www.shiksha.com/university/iit-bombay-college-of-engineering-676',
    collegedunia:'https://collegedunia.com/university/24-indian-institute-of-technology-iit-bombay-mumbai',
    career360:   'https://university.careers360.com/colleges/iit-bombay',
  },
};

export default function IITBombay() {
  return <CollegePage college={data} />;
}
