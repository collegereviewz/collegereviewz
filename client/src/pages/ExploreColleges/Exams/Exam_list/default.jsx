import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExamHub from '../ExamHub';

const DefaultExam = () => {
    const { examName } = useParams();
    const location = useLocation();
    const stateData = location.state?.examData || {};

    const defaultExamData = {
        name: stateData?.name || examName?.toUpperCase() || 'EXAM',
        fullName: stateData?.fullName || 'Information being updated...',
        logo: stateData?.logo,
        conductingBody: stateData?.conductingBody || 'Official Board',
        summary: stateData?.summary || `${stateData?.name || examName?.toUpperCase()} is an entrance examination. Detailed information is currently being updated in our hub.`,
        lastUpdated: stateData?.lastUpdated || 'Recently Updated',
        officialWebsite: stateData?.officialWebsite || 'Official Website',
        status: stateData?.status || 'Notification Awaited',
        daysLeft: stateData?.daysLeft || 'TBA',
        highlights: stateData?.highlights || { 
            mode: 'Computer-Based / Offline', 
            totalMarks: 'As per pattern', 
            negative: 'Applicable', 
            duration: 'Varies', 
            languages: 'English & Regional', 
            frequency: 'Annual' 
        },
        dates: stateData?.dates && stateData.dates.length > 0 ? stateData.dates : [
            { label: 'Application', date: stateData?.appDate || 'TBA', status: 'Expected' },
            { label: 'Exam Date', date: stateData?.examDate || 'TBA', status: 'Expected' },
            { label: 'Result Date', date: stateData?.resultDate || 'TBA', status: 'Expected' }
        ],
        updates: stateData?.updates && stateData.updates.length > 0 ? stateData.updates : [
            { title: 'Information Update', date: 'Recent', text: 'Detailed syllabus and dates will be updated soon once the official notification is released.', type: 'info' }
        ]
    };

    return (
        <div style={{ paddingTop: '80px' }}>
            <ExamHub examData={defaultExamData} />
        </div>
    );
};

export default DefaultExam;
