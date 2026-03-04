import Scholarship from '../models/Scholarship.model.js';

export const applyForScholarship = async (req, res) => {
    try {
        const {
            mobile,
            location,
            startYear,
            countries,
            levelOfStudy,
            course,
            specialization,
            class10Year,
            class10Percent,
            studyAbroadExam,
            consent,
            userId
        } = req.body;

        if (!mobile || !consent) {
            return res.status(400).json({ message: 'Mobile number and consent are required.' });
        }

        const newApplication = new Scholarship({
            user: userId || null,
            mobile,
            location,
            startYear,
            countries,
            levelOfStudy,
            course,
            specialization,
            class10Year,
            class10Percent,
            studyAbroadExam,
            consent
        });

        await newApplication.save();

        res.status(201).json({
            message: 'Scholarship application submitted successfully!',
            application: newApplication
        });
    } catch (error) {
        console.error('Scholarship application error:', error);
        res.status(500).json({ message: 'Internal server error while processing scholarship application.' });
    }
};

export const getUserScholarships = async (req, res) => {
    try {
        const { userId } = req.params;
        const applications = await Scholarship.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        console.error('Fetch user scholarships error:', error);
        res.status(500).json({ message: 'Internal server error while fetching user scholarships.' });
    }
};
