import React from 'react';
import { useParams } from 'react-router-dom';

import CUET from './ExploreColleges/Exams/Exam_list/cuet';
import CLAT from './ExploreColleges/Exams/Exam_list/clat';
import CAT from './ExploreColleges/Exams/Exam_list/cat';
import NEET from './ExploreColleges/Exams/Exam_list/neet';
import JEEMAIN from './ExploreColleges/Exams/Exam_list/jeemain';
import GATE from './ExploreColleges/Exams/Exam_list/gate';
import NCHM from './ExploreColleges/Exams/Exam_list/nchm';
import AILET from './ExploreColleges/Exams/Exam_list/ailet';
import DefaultExam from './ExploreColleges/Exams/Exam_list/default';

const ExamProfileWrapper = () => {
    const { examName } = useParams();
    const lowerName = examName?.toLowerCase() || '';
    
    if (lowerName.includes('clat')) {
        return <CLAT />;
    } else if (lowerName.includes('cat')) {
        return <CAT />;
    } else if (lowerName.includes('nchm')) {
        return <NCHM />;
    } else if (lowerName.includes('neet')) {
        return <NEET />;
    } else if (lowerName.includes('jee main') || lowerName.includes('jee-main')) {
        return <JEEMAIN />;
    } else if (lowerName.includes('gate')) {
        return <GATE />;
    } else if (lowerName.includes('ailet')) {
        return <AILET />;
    } else if (lowerName.includes('cuet')) {
        return <CUET />;
    }

    return <DefaultExam />;
};

export default ExamProfileWrapper;
