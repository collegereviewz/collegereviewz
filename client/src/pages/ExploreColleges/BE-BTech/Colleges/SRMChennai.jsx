import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'SRM Institute of Science and Technology, Kattankulathur',
  shortName: 'SRM IST',
  location: 'Kattankulathur, Tamil Nadu',
  type: 'Deemed Private',
  domain: 'srmist.edu.in',
  logo: 'https://logo.clearbit.com/srmist.edu.in',
  fees: '₹8,40,000',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹6,85,000',
  highestPlacement: '₹42,00,000',
  rating: 4.0,
  reviews: 3200,
  ranking: '#36th in India Engineering by NIRF 2024',
  badges: ['NIRF #36', 'NAAC A++', 'QS Asia Top 300'],
  about: `SRM Institute of Science and Technology (Formerly SRM University) is one of India's largest and most prestigious private engineering institutions, established in 1985. Located near Chennai, Tamil Nadu, SRM IST has a large sprawling campus and offers over 200 programs across engineering, science, management, law, and humanities. The institute is known for its industrial focus, good placement record with multinational companies, and vibrant student life.`,
  courses: [
    { name: 'B.Tech Computer Science', duration: '4 Years', fees: '₹8,40,000' },
    { name: 'B.Tech Artificial Intelligence & ML', duration: '4 Years', fees: '₹10,00,000' },
    { name: 'B.Tech Biotechnology', duration: '4 Years', fees: '₹6,80,000' },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: '₹6,80,000' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹2,40,000' },
    { name: 'MBA', duration: '2 Years', fees: '₹3,20,000' },
  ],
  admission: [
    'Register at srmist.edu.in and apply for SRMJEEE',
    'Take SRMJEEE exam (online, conducted by SRM)',
    'Rank-based counselling rounds at SRM campus',
    'Alternatively, admission via JEE Main merit list',
    'Document verification and reporting to campus',
  ],
  facts: [
    { label: 'Established', value: '1985' },
    { label: 'Campus Size', value: '250 Acres' },
    { label: 'Total Students', value: '50,000+' },
    { label: 'Faculty', value: '3,000+' },
    { label: 'Entrance Exam', value: 'SRMJEEE / JEE Main' },
    { label: 'Location', value: 'Kattankulathur, Chennai' },
    { label: 'NIRF Ranking', value: '#36 (Engineering 2024)' },
    { label: 'Other Campuses', value: 'Delhi-NCR, AP, Sikkim' },
  ],
  sources: {
    official:    'https://www.srmist.edu.in',
    wikipedia:   'https://en.wikipedia.org/wiki/SRM_Institute_of_Science_and_Technology',
    shiksha:     'https://www.shiksha.com/university/srm-university-chennai-2181',
    collegedunia:'https://collegedunia.com/university/197-srm-institute-of-science-and-technology-kattankulathur',
    career360:   'https://university.careers360.com/colleges/srm-university',
  },
};

export default function SRMChennai() {
  return <CollegePage college={data} />;
}
