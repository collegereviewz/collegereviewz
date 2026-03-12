import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const NEET = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const neetDetailedData = {
        name: 'NEET UG 2026',
        fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
        conductingBody: 'National Testing Agency (NTA)',
        logo: 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/neet.png',
        applyLink: 'https://neet.nta.nic.in/',
        summary: 'National Eligibility cum Entrance Test (Medical) is the primary entrance for MBBS/BDS courses in India. It is one of the most competitive exams globally.',
        category: 'MBBS',
        highlights: {
            mode: 'Pen & Paper (OMR)',
            totalMarks: '720 Marks',
            negative: '-1 Mark',
            duration: '3 Hours 20 Mins',
            languages: '13 Languages',
            frequency: 'Annual'
        },
        dates: [
            { label: 'Registration', date: 'Feb - Mar 2026', status: 'Confirmed' },
            { label: 'Exam Date', date: 'May 03, 2026', status: 'Confirmed' },
            { label: 'Result', date: 'June 2026', status: 'Expected' }
        ],
        colleges: [
            { label: 'AIIMS New Delhi', rank: 'AIR 1-50' },
            { label: 'MAMC Delhi', rank: 'AIR 50-200' },
            { label: 'VMMC Delhi', rank: 'AIR 200-500' }
        ]
    };

    const finalData = { ...defaultData, ...neetDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default NEET;
