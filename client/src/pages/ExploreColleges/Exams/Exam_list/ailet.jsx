import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const AILET = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const ailetDetailedData = {
        name: 'AILET 2026',
        fullName: 'All India Law Entrance Test',
        conductingBody: 'NLU Delhi',
        summary: 'AILET is conducted by National Law University, Delhi for admission to undergraduate, postgraduate, and doctorate law programs.',
        applyLink: 'https://nationallawuniversitydelhi.in/',
        highlights: {
            mode: 'Offline (Pen-Paper)',
            totalMarks: '150 Marks',
            negative: '-0.25 Marks',
            duration: '2 Hours',
            languages: 'English',
            frequency: 'Once a Year'
        },
        dates: [
            { label: 'Application Start', date: 'August 2025', status: 'Expected' },
            { label: 'Last Date Apply', date: 'November 2025', status: 'Expected' },
            { label: 'Exam Date', date: 'December 2025', status: 'Expected' }
        ],
        updates: []
    };

    const finalData = { ...defaultData, ...ailetDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default AILET;
