import Analytics from "../models/analyticsModel.mjs";
import { analyticsCreate,getAnalyticsByGistId } from "../services/analyticsService.mjs";

// @route   POST /analytics
export const createAnalytics = async (req, res) => {
    try {
        const newAnalytics = await analyticsCreate(req.body);
        res.status(201).json(newAnalytics);
    } catch (error) {
        res.status(400).json({ message: 'Bad request', error: error.message });
    }
};

