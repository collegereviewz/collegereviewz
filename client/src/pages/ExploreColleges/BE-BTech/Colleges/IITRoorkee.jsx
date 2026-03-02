import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'IIT Roorkee - Indian Institute of Technology - [IITR], Roorkee',
  shortName: 'IIT Roorkee',
  location: 'Roorkee, Uttarakhand',
  type: 'Deemed Government',
  domain: 'iitr.ac.in',
  logo: 'https://logo.clearbit.com/iitr.ac.in',
  fees: '₹8,88,500',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹19,50,000',
  highestPlacement: '₹1,50,00,000',
  rating: 4.5,
  reviews: 612,
  ranking: '#6th/500 in India for Engineering College Review 2026',
  badges: ['NIRF #6', 'NAAC A++', 'Asia Top 500'],
  about: `Indian Institute of Technology Roorkee (IIT Roorkee), established in 1847 as Thomason College of Civil Engineering, is one of the oldest technical institutions in Asia. Situated in Roorkee, Uttarakhand, on the foothills of the Himalayas, it became an IIT in 2001. IIT Roorkee is renowned for its civil engineering heritage and consistently ranks among the top engineering colleges in India. The institute offers programs in engineering, applied sciences, management, and architecture.`,
  courses: [
    { name: 'B.Tech Computer Science', duration: '4 Years', fees: '₹8,88,500' },
    { name: 'B.Tech Civil Engineering', duration: '4 Years', fees: '₹8,88,500' },
    { name: 'B.Tech Architecture', duration: '5 Years', fees: '₹8,88,500' },
    { name: 'B.Tech Biotechnology', duration: '4 Years', fees: '₹8,88,500' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹75,000' },
    { name: 'MBA (DMS)', duration: '2 Years', fees: '₹7,00,000' },
  ],
  admission: [
    'B.Tech: JEE Advanced + JoSAA counselling',
    'B.Arch: JEE Main Paper 2 (B.Arch) + JoSAA',
    'M.Tech: GATE score required',
    'MBA: CAT score + GD + PI',
    'PhD: GATE/UGC NET + institute-level test',
  ],
  facts: [
    { label: 'Established', value: '1847 (IIT since 2001)' },
    { label: 'Campus Size', value: '365 Acres' },
    { label: 'Total Students', value: '10,000+' },
    { label: 'Faculty', value: '500+' },
    { label: 'Entrance Exam', value: 'JEE Advanced' },
    { label: 'Location', value: 'Roorkee, Uttarakhand' },
    { label: 'NIRF Ranking', value: '#6 (Engineering 2024)' },
    { label: 'Affiliation', value: 'Autonomous (IIT)' },
  ],
  sources: {
    official:    'https://www.iitr.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/IIT_Roorkee',
    shiksha:     'https://www.shiksha.com/university/iit-roorkee-673',
    collegedunia:'https://collegedunia.com/university/21-indian-institute-of-technology-iit-roorkee',
    career360:   'https://university.careers360.com/colleges/iit-roorkee',
  },
};

export default function IITRoorkee() {
  return <CollegePage college={data} />;
}
