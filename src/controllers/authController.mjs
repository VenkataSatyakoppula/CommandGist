import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";
import dotenv from 'dotenv';
dotenv.config(); 

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check if the password matches
        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT
        const payload = { id: user._id };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET || 'my-secret', { expiresIn: process.env.ACCESS_TOKEN_TIME || '15m' }); // Replace with your JWT secret
        const refresh_token = jwt.sign(payload, process.env.REFRESH_SECRET || 'refresh-secret',{expiresIn: process.env.REFRESH_TOKEN_TIME || '1d'}); // Replace with your REFRESH SECRET
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'Strict',
        })
        res.status(200).json({ access:access_token});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }
    try {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_TIME || '15m' });
            res.status(200).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};