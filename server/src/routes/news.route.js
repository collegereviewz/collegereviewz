import express from 'express';
import News from '../models/News.model.js';

const router = express.Router();

// GET /api/news?category=MBBS&type=Exam%20Alerts
router.get('/', async (req, res) => {
    try {
        const { category, type } = req.query;
        let query = {};

        if (category && category !== 'All') query.category = category;
        if (type) query.type = type;

        const news = await News.find(query).sort({ createdAt: -1 }).limit(10);

        res.status(200).json({
            success: true,
            count: news.length,
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
