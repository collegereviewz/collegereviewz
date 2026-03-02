import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'IIT Delhi - Indian Institute of Technology [IITD], New Delhi',
  shortName: 'IIT Delhi',
  location: 'Hauz Khas, New Delhi',
  type: 'Deemed Government',
  domain: 'iitd.ac.in',
  logo: 'https://logo.clearbit.com/iitd.ac.in',
  fees: '₹8,62,550',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹25,82,000',
  highestPlacement: '₹2,00,00,000',
  rating: 4.7,
  reviews: 993,
  ranking: '#2nd/500 in India for Engineering College Review 2026',
  badges: ['NIRF #2', 'NAAC A++', 'QS World Top 200'],
  about: `Indian Institute of Technology Delhi (IIT Delhi) is one of the oldest and most prestigious technical institutions of India, established in 1961. Located in the heart of New Delhi, it offers a vibrant academic environment with world-class research facilities. IIT Delhi is consistently ranked among the top 2 engineering institutions in India by NIRF. The institute is known for its exceptional placement record, innovative research, and alumni network that spans the globe across technology, business, and public sectors.`,
  courses: [
    { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹8,62,550' },
    { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: '₹8,62,550' },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: '₹8,62,550' },
    { name: 'B.Tech Chemical Engineering', duration: '4 Years', fees: '₹8,62,550' },
    { name: 'M.Tech Computer Technology', duration: '2 Years', fees: '₹1,00,000' },
    { name: 'MBA', duration: '2 Years', fees: '₹6,00,000' },
  ],
  admission: [
    'Qualify JEE Advanced with a valid rank (for B.Tech)',
    'Register on JoSAA portal and participate in counselling rounds',
    'Document verification and fee payment online',
    'Physical reporting to IIT Delhi campus',
    'For M.Tech: qualify GATE; For MBA: qualify CAT',
  ],
  facts: [
    { label: 'Established', value: '1961' },
    { label: 'Campus Size', value: '325 Acres' },
    { label: 'Total Students', value: '8,000+' },
    { label: 'Faculty', value: '500+' },
    { label: 'Entrance Exam', value: 'JEE Advanced (B.Tech)' },
    { label: 'Affiliation', value: 'Autonomous Institute' },
    { label: 'Location', value: 'Hauz Khas, South Delhi' },
    { label: 'NIRF Ranking', value: '#2 (Engineering 2024)' },
  ],
  sources: {
    official:    'https://home.iitd.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/IIT_Delhi',
    shiksha:     'https://www.shiksha.com/university/iit-delhi-college-of-engineering-679',
    collegedunia:'https://collegedunia.com/university/25-indian-institute-of-technology-iit-delhi',
    career360:   'https://university.careers360.com/colleges/iit-delhi',
  },
};

export default function IITDelhi() {
  return <CollegePage college={data} />;
}
