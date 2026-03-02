import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'IIT Kharagpur - Indian Institute of Technology - [IITKGP], Kharagpur',
  shortName: 'IIT Kharagpur',
  location: 'Kharagpur, West Bengal',
  type: 'Deemed Government',
  domain: 'iitkgp.ac.in',
  logo: 'https://logo.clearbit.com/iitkgp.ac.in',
  fees: '₹8,96,300',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹24,30,000',
  highestPlacement: '₹2,14,00,000',
  rating: 4.4,
  reviews: 842,
  ranking: '#5th/500 in India for Engineering College Review 2026',
  badges: ['NIRF #5', 'NAAC A++', 'QS World Top 300'],
  about: `Indian Institute of Technology Kharagpur (IIT Kharagpur) is the oldest of the IITs, established in 1951. It has the largest campus among all IITs and offers the widest range of academic programs. Located in Kharagpur, West Bengal, IIT KGP is a fully residential campus with over 100 years of institutional history. The institute is known for its diverse programs spanning engineering, technology, science, law, management, architecture, and humanities — a truly multidisciplinary university.`,
  courses: [
    { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹8,96,300' },
    { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: '₹8,96,300' },
    { name: 'B.Tech Mining Engineering', duration: '4 Years', fees: '₹8,96,300' },
    { name: 'Integrated M.Sc Mathematics', duration: '5 Years', fees: '₹8,96,300' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹75,000' },
    { name: 'MBA (VGSoM)', duration: '2 Years', fees: '₹9,00,000' },
  ],
  admission: [
    'B.Tech via JEE Advanced + JoSAA counselling',
    'Integrated M.Sc via JAM examination',
    'M.Tech via GATE score',
    'MBA via CAT score at Vinod Gupta School of Management',
    'PhD via GATE/UGC NET + written test and interview',
  ],
  facts: [
    { label: 'Established', value: '1951 (Oldest IIT)' },
    { label: 'Campus Size', value: '2,100 Acres' },
    { label: 'Total Students', value: '14,000+' },
    { label: 'Faculty', value: '650+' },
    { label: 'Entrance Exam', value: 'JEE Advanced' },
    { label: 'Location', value: 'Midnapore, West Bengal' },
    { label: 'NIRF Ranking', value: '#5 (Engineering 2024)' },
    { label: 'Departments', value: '19 Departments' },
  ],
  sources: {
    official:    'https://www.iitkgp.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/IIT_Kharagpur',
    shiksha:     'https://www.shiksha.com/university/iit-kharagpur-college-of-engineering-674',
    collegedunia:'https://collegedunia.com/university/22-indian-institute-of-technology-iit-kharagpur',
    career360:   'https://university.careers360.com/colleges/iit-kharagpur',
  },
};

export default function IITKharagpur() {
  return <CollegePage college={data} />;
}
