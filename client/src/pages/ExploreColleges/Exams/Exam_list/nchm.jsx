import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';
import { getDefaultExamData } from './utils';

const NCHM = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultData = getDefaultExamData(examName, stateData);

    const nchmDetailedData = {
        name: 'NCHM JEE 2026',
        fullName: 'NCHMCT Joint Entrance Examination',
        conductingBody: 'National Testing Agency (NTA)',
        logo: 'https://raw.githubusercontent.com/Anish-CRZ/Assets/main/jee.png',
        summary: 'NCHM JEE is conducted for admission to B.Sc. in Hospitality and Hotel Administration programs.',
        highlights: {
            mode: 'Computer Based Test',
            totalMarks: '800 Marks',
            negative: '-1 Mark',
            duration: '3 Hours',
            languages: 'English & Hindi',
            frequency: 'Once a Year'
        }
    };

    const finalData = { ...defaultData, ...nchmDetailedData };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={finalData} />
        </div>
    );
};

export default NCHM;
