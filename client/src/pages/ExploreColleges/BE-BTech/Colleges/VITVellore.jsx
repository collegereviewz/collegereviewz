import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'VIT Vellore - Vellore Institute of Technology',
  shortName: 'VIT Vellore',
  location: 'Vellore, Tamil Nadu',
  type: 'Deemed Private',
  domain: 'vit.ac.in',
  logo: 'https://logo.clearbit.com/vit.ac.in',
  fees: '₹7,86,000',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹8,12,000',
  highestPlacement: '₹44,00,000',
  rating: 4.2,
  reviews: 2150,
  ranking: '#11th in India Engineering by NIRF 2024',
  badges: ['NIRF #11', 'NAAC A++', 'QS Asia Top 200'],
  about: `VIT (Vellore Institute of Technology) is one of India's leading private engineering institutions, established in 1984. Known for its large student intake, industry-relevant curriculum, and state-of-the-art infrastructure, VIT Vellore attracts students from across India and abroad. The institute conducts VITEEE (VIT Engineering Entrance Exam) every year with lakhs of applicants. VIT has campuses in Vellore, Chennai, Amaravati, and Bhopal, offering over 50 specializations across engineering and technology.`,
  courses: [
    { name: 'B.Tech Computer Science (specializations)', duration: '4 Years', fees: '₹7,86,000' },
    { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: '₹7,86,000' },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: '₹6,98,000' },
    { name: 'B.Tech Civil Engineering', duration: '4 Years', fees: '₹6,98,000' },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: '₹3,60,000' },
    { name: 'MBA (SMS)', duration: '2 Years', fees: '₹4,20,000' },
  ],
  admission: [
    'Register for VITEEE at vit.ac.in (online entrance exam)',
    'Take VITEEE exam (usually April) — remote proctored exam',
    'Rank-based counselling through VIT portal',
    'Pay seat acceptance fee and confirm admission',
    '12th marks also considered for merit-based scholarships',
  ],
  facts: [
    { label: 'Established', value: '1984' },
    { label: 'Campus Size', value: '250 Acres (Vellore)' },
    { label: 'Total Students', value: '35,000+ (Vellore)' },
    { label: 'Faculty', value: '2,500+' },
    { label: 'Entrance Exam', value: 'VITEEE' },
    { label: 'Location', value: 'Vellore, Tamil Nadu' },
    { label: 'NIRF Ranking', value: '#11 (Engineering 2024)' },
    { label: 'Other Campuses', value: 'Chennai, Bhopal, AP' },
  ],
  sources: {
    official:    'https://www.vit.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/VIT_University',
    shiksha:     'https://www.shiksha.com/university/vit-university-vellore-2184',
    collegedunia:'https://collegedunia.com/university/193-vit-university-vellore',
    career360:   'https://university.careers360.com/colleges/vit-university',
  },
};

export default function VITVellore() {
  return <CollegePage college={data} />;
}
