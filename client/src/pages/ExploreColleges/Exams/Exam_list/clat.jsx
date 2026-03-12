import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const CLAT = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const clatDetailedData = {
        name: 'CLAT 2026',
        fullName: 'Common Law Admission Test',
        conductingBody: 'Consortium of NLUs',
        summary: 'Common Law Admission Test (CLAT) is a centralized test for admission to 22 National Law Universities in India.',
        logo: 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/clat.png',
        applyLink: 'https://consortiumofnlus.ac.in/',
        highlights: {
            mode: 'Offline (Pen-Paper)',
            totalMarks: '120 Marks',
            negative: '-0.25 Marks',
            duration: '2 Hours',
            languages: 'English',
            frequency: 'Once a Year'
        },
        dates: [
            { label: 'Application Start', date: 'July 2025', status: 'Passed' },
            { label: 'Last Date Apply', date: 'Nov 2025', status: 'Passed' },
            { label: 'Exam Date', date: 'Dec 07, 2025', status: 'Confirmed' }
        ],
        updates: [
            { title: 'Result Out', date: 'Dec 25, 2025', text: 'CLAT 2025 results have been declared. Check NLU website.', type: 'info' }
        ]
    };

    const finalData = { ...defaultData, ...clatDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default CLAT;
