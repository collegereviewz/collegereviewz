import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const GATE = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const gateDetailedData = {
        name: 'GATE 2026',
        fullName: 'Graduate Aptitude Test in Engineering',
        conductingBody: 'IIT Board / IISc',
        category: 'ME/M.Tech',
        summary: 'GATE is a prestigious national-level exam that tests the comprehensive understanding of various undergraduate subjects in engineering and science.',
        highlights: {
            mode: 'Computer Based Test',
            totalMarks: '100 Marks',
            negative: 'Applicable (1/3rd)',
            duration: '3 Hours',
            languages: 'English',
            frequency: 'Annual'
        }
    };

    const finalData = { ...defaultData, ...gateDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default GATE;
