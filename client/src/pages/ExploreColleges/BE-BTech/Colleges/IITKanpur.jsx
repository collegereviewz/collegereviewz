import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'IIT Kanpur - Indian Institute of Technology - [IITK], Kanpur',
  shortName: 'IIT Kanpur',
  location: 'Kanpur, Uttar Pradesh',
  type: 'Deemed Government',
  domain: 'iitk.ac.in',
  logo: 'https://logo.clearbit.com/iitk.ac.in',
  fees: '₹9,18,880',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹17,20,000',
  highestPlacement: '₹1,90,00,000',
  rating: 4.8,
  reviews: 320,
  ranking: '#4th/500 in India for Engineering College Review 2026',
  badges: ['NIRF #4', 'NAAC A++', 'QS World Top 300'],
  about: `Indian Institute of Technology Kanpur (IIT Kanpur) is one of India's premier technical institutions, established in 1959 with significant collaboration from MIT, USA. It is known as the pioneer of Computer Science education in India, having set up the first computer lab in India in 1963. Located in Kanpur, Uttar Pradesh, IIT Kanpur is consistently ranked among the top 5 engineering colleges in India and has produced numerous Nobel laureates, Padma awardees, and global technology leaders.`,
  courses: [
    { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹9,18,880' },
    { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: '₹9,18,880' },
    { name: 'B.Tech Aerospace Engineering', duration: '4 Years', fees: '₹9,18,880' },
    { name: 'B.Tech Materials Science', duration: '4 Years', fees: '₹9,18,880' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹75,000' },
    { name: 'MBA', duration: '2 Years', fees: '₹7,50,000' },
  ],
  admission: [
    'JEE Advanced qualification required for B.Tech',
    'JoSAA counselling: choose IIT Kanpur and preferred branch',
    'Online document verification and fee payment',
    'Report to campus on the allotted date',
    'M.Tech: GATE score required with minimum qualifying marks',
  ],
  facts: [
    { label: 'Established', value: '1959' },
    { label: 'Campus Size', value: '1,055 Acres' },
    { label: 'Total Students', value: '8,500+' },
    { label: 'Faculty', value: '550+' },
    { label: 'Entrance Exam', value: 'JEE Advanced (B.Tech)' },
    { label: 'Affiliation', value: 'Autonomous Institute' },
    { label: 'Location', value: 'Kalyanpur, Kanpur' },
    { label: 'NIRF Ranking', value: '#4 (Engineering 2024)' },
  ],
  sources: {
    official:    'https://www.iitk.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/IIT_Kanpur',
    shiksha:     'https://www.shiksha.com/university/iit-kanpur-college-of-engineering-675',
    collegedunia:'https://collegedunia.com/university/23-indian-institute-of-technology-iit-kanpur',
    career360:   'https://university.careers360.com/colleges/iit-kanpur',
  },
};

export default function IITKanpur() {
  return <CollegePage college={data} />;
}
