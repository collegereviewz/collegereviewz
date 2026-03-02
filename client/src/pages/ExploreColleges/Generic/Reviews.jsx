import React from 'react';
import Review from '../Review';

const Reviews = ({ collegeData }) => {
    const collegeId = collegeData?._id || collegeData?.data?._id;
    const name = collegeData?.name || 'College Name';

    return <Review collegeId={collegeId} collegeName={name} />;
};

export default Reviews;
