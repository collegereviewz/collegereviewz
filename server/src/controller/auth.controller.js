import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

export const signup = async (req, res) => {
    try {
        const {
            fullName, email, password, openToAbroad, currentClass,
            annualBudget, canAffordCoaching, educationalLoanComfort, stream, age
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            openToAbroad,
            currentClass,
            annualBudget,
            canAffordCoaching,
            educationalLoanComfort,
            stream,
            age
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

        // Exclude password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ user: userResponse, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ user: userResponse, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
