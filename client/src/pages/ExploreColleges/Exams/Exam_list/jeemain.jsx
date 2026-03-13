import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const JEEMAIN = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const jeeMainDetailedData = {
        name: 'JEE Main 2026',
        fullName: 'Joint Entrance Examination Main',
        conductingBody: 'National Testing Agency (NTA)',
        category: 'BE/B.Tech',
        applyLink: 'https://jeemain.nta.nic.in/',
        summary: 'JEE Main is the gateway for admission to NITs, IIITs, and CFTIs, and serves as the qualifying exam for JEE Advanced.',
        highlights: {
            mode: 'Computer Based Test',
            totalMarks: '300 Marks',
            negative: '-1 Mark',
            duration: '3 Hours',
            languages: '13 Languages',
            frequency: 'Twice a year'
        },
        dates: [
            { label: 'Session 1 Exam', date: 'Jan 2026', status: 'Confirmed' },
            { label: 'Session 2 Exam', date: 'Apr 2026', status: 'Expected' }
        ],
        colleges: [
            { label: 'NIT Trichy' },
            { label: 'NIT Surathkal' },
            { label: 'IIIT Hyderabad' }
        ]
    };

    const finalData = { ...defaultData, ...jeeMainDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default JEEMAIN;
