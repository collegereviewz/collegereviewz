import User from '../models/User.model.js';
import Review from '../models/Review.model.js';
import Scholarship from '../models/Scholarship.model.js';

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

export const getUserActivity = async (req, res) => {
    try {
        const userId = req.params.id;

        const [reviews, scholarships, user] = await Promise.all([
            Review.find({ user: userId }).sort({ createdAt: -1 }),
            Scholarship.find({ user: userId }).sort({ createdAt: -1 }),
            User.findById(userId).select('openToAbroad')
        ]);

        res.status(200).json({
            reviews,
            scholarships,
            openToAbroad: user?.openToAbroad || false
        });
    } catch (error) {
        console.error("User Activity Fetch Error:", error);
        res.status(500).json({ message: 'Server error fetching user activity', error: error.message });
    }
};
