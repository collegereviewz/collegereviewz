import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

import reviewRoutes from './route/review.route.js';
import authRoutes from './route/auth.route.js';
import userRoutes from './route/user.route.js';
import collegeRoutes from './route/college.route.js';
import { initCronJobs } from './services/cron.service.js';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Background Jobs
initCronJobs();

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/colleges', collegeRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

app.get('/', (req, res) => {
    res.send('CollegeReviewz API is running...');
});

// Placeholder for future API routes
app.get('/api/news', (req, res) => {
    res.json([
        { id: 1, title: 'Exam updates for 2026' },
        { id: 2, title: 'Top 10 colleges this year' }
    ]);
});

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
