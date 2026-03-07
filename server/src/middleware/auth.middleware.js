import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decodedData = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodedData.id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Access denied: Admin only" });
        }

        req.userId = decodedData.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
