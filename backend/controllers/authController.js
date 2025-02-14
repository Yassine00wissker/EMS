import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }

        // Generate Token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );

        // Respond with user data (excluding password)
        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, error: "Server error. Please try again later." });
    }
};

const verify = (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
