import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'IIT Madras - Indian Institute of Technology - [IITM], Chennai',
  shortName: 'IIT Madras',
  location: 'Chennai, Tamil Nadu',
  type: 'Deemed Government',
  domain: 'iitm.ac.in',
  logo: 'https://logo.clearbit.com/iitm.ac.in',
  fees: '₹9,38,668',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹21,48,000',
  highestPlacement: '₹4,30,00,000',
  rating: 4.9,
  reviews: 466,
  ranking: '#1st/500 in India for Engineering College Review 2026',
  badges: ['NIRF #1', 'NAAC A++', 'QS World Top 100'],
  about: `Indian Institute of Technology Madras (IIT Madras) is the top-ranked engineering institution in India, consistently holding NIRF #1 position for engineering. Established in 1959, IIT Madras is a research university with a sprawling 600-acre campus that includes a natural deer park. It is located in Chennai, Tamil Nadu, and has produced some of India's finest engineers, scientists, and entrepreneurs. The institute is also home to the IIT Madras Research Park, one of India's most successful technology parks.`,
  courses: [
    { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹9,38,668' },
    { name: 'B.Tech Aerospace Engineering', duration: '4 Years', fees: '₹9,38,668' },
    { name: 'B.Tech Ocean Engineering', duration: '4 Years', fees: '₹9,38,668' },
    { name: 'B.Tech Biotechnology', duration: '4 Years', fees: '₹9,38,668' },
    { name: 'M.Tech AI', duration: '2 Years', fees: '₹75,000' },
    { name: 'MBA (DoMS)', duration: '2 Years', fees: '₹8,00,000' },
  ],
  admission: [
    'Qualify JEE Advanced (Top ranks get CSE at IIT Madras)',
    'Register on JoSAA counselling portal',
    'Accept seat, pay seat acceptance fee',
    'Physical document verification and reporting',
    'M.Tech admission through GATE; PhD through written test + interview',
  ],
  facts: [
    { label: 'Established', value: '1959' },
    { label: 'Campus Size', value: '617 Acres' },
    { label: 'Total Students', value: '9,000+' },
    { label: 'Faculty', value: '600+' },
    { label: 'Entrance Exam', value: 'JEE Advanced (B.Tech)' },
    { label: 'Affiliation', value: 'Autonomous Institute' },
    { label: 'Location', value: 'Adyar, Chennai' },
    { label: 'NIRF Ranking', value: '#1 (Engineering 2024)' },
  ],
  sources: {
    official:    'https://www.iitm.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/IIT_Madras',
    shiksha:     'https://www.shiksha.com/university/iit-madras-college-of-engineering-677',
    collegedunia:'https://collegedunia.com/university/26-indian-institute-of-technology-iit-madras-chennai',
    career360:   'https://university.careers360.com/colleges/iit-madras',
  },
};

export default function IITMadras() {
  return <CollegePage college={data} />;
}
