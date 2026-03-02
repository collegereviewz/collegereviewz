import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'NIT Trichy - National Institute of Technology - [NITT], Tiruchirappalli',
  shortName: 'NIT Trichy',
  location: 'Tiruchirappalli, Tamil Nadu',
  type: 'Government',
  domain: 'nitt.edu',
  logo: 'https://logo.clearbit.com/nitt.edu',
  fees: '₹5,80,000',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹14,60,000',
  highestPlacement: '₹80,00,000',
  rating: 4.3,
  reviews: 735,
  ranking: '#8th/500 in India for Engineering College Review 2026',
  badges: ['NIRF #8', 'NAAC A++', 'NBA Accredited'],
  about: `National Institute of Technology, Tiruchirappalli (NIT Trichy), established in 1964, is consistently ranked as the top NIT in India. Located in Tiruchirappalli, Tamil Nadu, the institute is known for its excellent academic standards, research output, and outstanding placement record. NIT Trichy offers programs across 11 engineering departments, sciences, and humanities. The campus is fully residential with world-class infrastructure, making it the most sought-after NIT among engineering aspirants.`,
  courses: [
    { name: 'B.Tech Computer Science', duration: '4 Years', fees: '₹5,80,000' },
    { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: '₹5,80,000' },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: '₹5,80,000' },
    { name: 'B.Tech Chemical Engineering', duration: '4 Years', fees: '₹5,80,000' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹1,20,000' },
    { name: 'MBA', duration: '2 Years', fees: '₹3,00,000' },
  ],
  admission: [
    'B.Tech: JEE Main rank + JoSAA/CSAB counselling',
    'All-India & Home-State quota seats available',
    'Document verification and fee payment',
    'M.Tech: Valid GATE score required',
    'MBA: CAT/GMAT score based admission',
  ],
  facts: [
    { label: 'Established', value: '1964' },
    { label: 'Campus Size', value: '800 Acres' },
    { label: 'Total Students', value: '7,000+' },
    { label: 'Faculty', value: '350+' },
    { label: 'Entrance Exam', value: 'JEE Main (B.Tech)' },
    { label: 'Location', value: 'Tiruchirappalli, TN' },
    { label: 'NIRF Ranking', value: '#8 (Engineering 2024)' },
    { label: 'Type', value: 'National Importance Institute' },
  ],
  sources: {
    official:    'https://www.nitt.edu',
    wikipedia:   'https://en.wikipedia.org/wiki/NIT_Tiruchirappalli',
    shiksha:     'https://www.shiksha.com/university/nit-trichy-college-of-engineering-755',
    collegedunia:'https://collegedunia.com/university/36-national-institute-of-technology-nit-tiruchirappalli',
    career360:   'https://university.careers360.com/colleges/nit-trichy',
  },
};

export default function NITTrichy() {
  return <CollegePage college={data} />;
}
