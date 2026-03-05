import User from '../models/User.model.js';

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Ideally, we'd get this from a JWT token `req.user.id`, but we'll use a straightforward approach for now. 
        const {
            fullName,
            age,
            stream,
            currentClass,
            budget,
            educationalLoanComfort,
            canAffordCoaching,
            openToAbroad
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                age,
                stream,
                currentClass,
                annualBudget: budget,
                educationalLoanComfort,
                canAffordCoaching,
                openToAbroad
            },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password from the returned object

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: 'Server error updating profile', error: error.message });
    }
};

import Review from '../models/Review.model.js';

export const getUserDashboardStats = async (req, res) => {
    try {
        const identifier = req.params.identifier; // This will be the user's fullName or email

        // Count reviews where author matches the user's full name
        const reviewCount = await Review.countDocuments({ author: identifier });

        // Since we don't have explicit models for Scholarships or College Applications yet,
        // we will mock those specific counts for now but return the real review count.
        res.status(200).json({
            reviewsWritten: reviewCount,
            scholarshipsApplied: 0, // Mocked for now until Scholarship model is implemented
            collegesInterested: 0 // Mocked for now
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: 'Server error fetching dashboard stats', error: error.message });
    }
};
