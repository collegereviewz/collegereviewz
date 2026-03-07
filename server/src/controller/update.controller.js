import College from '../models/College.model.js';
import { updateCollegeData } from '../services/update.service.js';

export const getCollegeUpdates = async (req, res) => {
    try {
        const { id } = req.params;
        const college = await College.findById(id);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        // Check cache (24h for manual triggers, cron will keep it fresher)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        if (college.updates?.lastUpdated > oneDayAgo) {
            return res.json(college.updates);
        }

        const result = await updateCollegeData(id);

        if (result && result.updates) {
            return res.json(result.updates);
        }

        res.json(college.updates || { notifications: [], news: [], events: [] });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
