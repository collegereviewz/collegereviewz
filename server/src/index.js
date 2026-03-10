import './config.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

import reviewRoutes from './route/review.route.js';
import authRoutes from './route/auth.route.js';
import userRoutes from './route/user.route.js';
import collegeRoutes from './route/college.route.js';
import { initCronJobs } from './services/cron.service.js';
import voiceRoutes from './route/voice.route.js';
import scholarshipRoutes from './route/scholarship.route.js';
import adminRoutes from './route/admin.route.js';
import newsRoutes from './routes/news.route.js';


//Security
import helmet from "helmet"

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
    })
)
//express rate limit
import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})

app.use(limiter)

import hpp from "hpp"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"

app.use(hpp())
app.use(xss())
app.use(mongoSanitize())

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/voice', voiceRoutes);
console.log('✅ Voice Routes mounted at /api/voice');
app.use('/api/news', newsRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection and Server Start
const startServer = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Initialize cron jobs after DB is connected
        initCronJobs();

        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`\n!!! ERROR: Port ${PORT} is already in use.`);
                console.error(`!!! Try running: npm run kill-port\n`);
                process.exit(1);
            } else {
                throw error;
            }
        });

    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

app.get('/', (req, res) => {
    res.send('CollegeReviewz API is running...');
});
app.get("/api/test", (req, res) => {
    res.send("API IS WORKING");
});

// No need for separate listen call, it's now inside startServer()
