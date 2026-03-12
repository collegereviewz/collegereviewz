import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const CAT = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const catDetailedData = {
        name: 'CAT 2026',
        fullName: 'Common Admission Test',
        conductingBody: 'IIM Board',
        summary: 'The Common Admission Test (CAT) is a computer based test for admission in graduate management programs.',
        highlights: {
            mode: 'Computer Based Test',
            totalMarks: '198 Marks',
            negative: '-1 Mark',
            duration: '2 Hours',
            languages: 'English',
            frequency: 'Annual'
        },
        dates: [
            { label: 'Registration', date: 'Aug - Sep 2026', status: 'Expected' },
            { label: 'Admit Card', date: 'Oct 2026', status: 'Expected' },
            { label: 'Exam Date', date: 'Nov 2026', status: 'Expected' }
        ],
        updates: []
    };

    const finalData = { ...defaultData, ...catDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default CAT;
