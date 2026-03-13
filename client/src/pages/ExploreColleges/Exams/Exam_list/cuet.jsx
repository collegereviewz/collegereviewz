import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const CUET = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const cuetDetailedData = {
        name: 'CUET-UG 2026',
        fullName: 'Common University Entrance Test (Undergraduate)',
        summary: 'CUET-UG is a unified admission test for 200+ universities across India, conducted in computer-based mode.',
        highlights: { ...defaultData.highlights, mode: 'Computer-Based (CBT)' }
    };

    const finalData = { ...defaultData, ...cuetDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default CUET;