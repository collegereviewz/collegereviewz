import React from 'react';
import CollegePage from '../../../../components/CollegePage';

const data = {
  name: 'BITS Pilani - Birla Institute of Technology and Science, Pilani',
  shortName: 'BITS Pilani',
  location: 'Pilani, Rajasthan',
  type: 'Deemed Private',
  domain: 'bits-pilani.ac.in',
  logo: 'https://logo.clearbit.com/bits-pilani.ac.in',
  fees: '₹20,82,000',
  feesType: 'B.Tech Computer Science and Engineering - Total Fees',
  placement: '₹18,50,000',
  highestPlacement: '₹1,20,00,000',
  rating: 4.6,
  reviews: 1240,
  ranking: '#26th in India Engineering by NIRF 2024',
  badges: ['NAAC A', 'QS World Top 800', 'NIRF #26'],
  about: `BITS Pilani (Birla Institute of Technology and Science) is one of India's top private engineering institutions, established in 1964. Known for its unique BITSAT entrance exam, dual-degree programs, and industry-aligned curriculum, BITS Pilani has produced some of India's most successful entrepreneurs and technology leaders. The institute operates campuses in Pilani, Goa, Hyderabad, and Dubai. Its Practice School program gives students real industry exposure before graduation, making BITS graduates highly sought-after.`,
  courses: [
    { name: 'B.E. Computer Science', duration: '4 Years', fees: '₹20,82,000' },
    { name: 'B.E. Electronics & Instrumentation', duration: '4 Years', fees: '₹20,82,000' },
    { name: 'B.Pharm', duration: '4 Years', fees: '₹18,00,000' },
    { name: 'M.Sc Economics (Dual)', duration: '5 Years', fees: '₹22,00,000' },
    { name: 'M.E. Computer Science', duration: '2 Years', fees: '₹8,00,000' },
    { name: 'MBA (WILP)', duration: '2 Years', fees: '₹5,50,000' },
  ],
  admission: [
    'BITSAT (BITS own online entrance test) — register at bitsadmission.com',
    'Fill application, take BITSAT exam (12th standard or appearing)',
    'Board marks + BITSAT score considered for admission',
    'Iteration process for seat allotment after results',
    'Direct admission for 12th board toppers (state-level 1st rank holders)',
  ],
  facts: [
    { label: 'Established', value: '1964' },
    { label: 'Campus Size', value: '328 Acres (Pilani)' },
    { label: 'Total Students', value: '6,000+ (Pilani)' },
    { label: 'Faculty', value: '300+' },
    { label: 'Entrance Exam', value: 'BITSAT' },
    { label: 'Location', value: 'Vidya Vihar, Pilani' },
    { label: 'NIRF Ranking', value: '#26 (Engineering 2024)' },
    { label: 'Other Campuses', value: 'Goa, Hyderabad, Dubai' },
  ],
  sources: {
    official:    'https://www.bits-pilani.ac.in',
    wikipedia:   'https://en.wikipedia.org/wiki/BITS_Pilani',
    shiksha:     'https://www.shiksha.com/university/bits-pilani-5672',
    collegedunia:'https://collegedunia.com/university/84-birla-institute-of-technology-and-science-bits-pilani',
    career360:   'https://university.careers360.com/colleges/bits-pilani',
  },
};

export default function BITSPilani() {
  return <CollegePage college={data} />;
}
