import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CollegeProfileTemplate from './ExploreColleges/CollegeProfileTemplate';

const CollegeProfileWrapper = () => {
    const { collegeName } = useParams();
    const location = useLocation();
    const stateData = location.state?.collegeData;

    const collegeDataMap = {
        'IIT Bombay - Indian Institute of Technology - [IITB]': {
            folderName: 'IIT-Bombay',
            detailsFolder: 'IIT-BombayDetails',
            fullName: 'IIT Bombay - Indian Institute of Technology - Fees, Admissions, Placements, Rankings, Cutoff',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
            heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            location: 'Powai, Mumbai',
            type: 'Autonomous University',
            established: '1958'
        },
        'IIT Delhi - Indian Institute of Technology [IITD], New Delhi': {
            folderName: 'IIT-Delhi',
            detailsFolder: 'IIT-DelhiDetails',
            fullName: 'IIT Delhi - Indian Institute of Technology [IITD], New Delhi',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png',
            heroImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            location: 'New Delhi, Delhi NCR',
            type: 'Autonomous University',
            established: '1961'
        },
        'IIT Madras - Indian Institute of Technology - [IITM], Chennai': {
            folderName: 'IIT-Madras',
            detailsFolder: 'IIT-MadrasDetails',
            fullName: 'IIT Madras - Indian Institute of Technology - [IITM], Chennai',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png',
            heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            location: 'Chennai, Tamil Nadu',
            type: 'Autonomous University',
            established: '1959'
        },
        'IIT Kanpur - Indian Institute of Technology - [IITK], Kanpur': {
            folderName: 'IIT-Kanpur',
            detailsFolder: 'IIT-KanpurDetails',
            fullName: 'IIT Kanpur - Indian Institute of Technology - [IITK], Kanpur',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png',
            heroImage: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            location: 'Kanpur, Uttar Pradesh',
            type: 'Autonomous University',
            established: '1959'
        },
        'IIT Kharagpur - Indian Institute of Technology - [IITKGP], Kharagpur': {
            folderName: 'IIT-Kharagpur',
            detailsFolder: 'IIT-KharagpurDetails',
            fullName: 'IIT Kharagpur - Indian Institute of Technology - [IITKGP], Kharagpur',
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png',
            heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            location: 'Kharagpur, West Bengal',
            type: 'AICTE, UGC, NBA Approved',
            established: '1951'
        }
    };

    let collegeInfo = collegeDataMap[decodeURIComponent(collegeName)];

    if (!collegeInfo && stateData) {
        // Build generic info from stateData
        collegeInfo = {
            isGeneric: true,
            folderName: stateData.programme === 'MBBS' || stateData.course === 'MBBS' ? 'MBBS' : 'Generic',
            detailsFolder: '.',
            fullName: stateData.name,
            logo: 'https://via.placeholder.com/100', // Default logo
            heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            location: stateData.location,
            type: stateData.courseName,
            established: 'N/A',
            data: stateData
        };
    }

    if (!collegeInfo) {
        return <div style={{ paddingTop: '200px', textAlign: 'center' }}>College Profile Not Found</div>;
    }

    return (
        <CollegeProfileTemplate key={collegeInfo.fullName} collegeInfo={collegeInfo} />
    );
};

export default CollegeProfileWrapper;