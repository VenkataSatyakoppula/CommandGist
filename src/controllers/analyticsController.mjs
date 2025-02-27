import { getAnalyticsByGistId } from "../services/analyticsService.mjs";
import util from "../utils/util.mjs";


export const singleGistAnalytics = async (req,res) =>{
    try {
        const analytics = await getAnalyticsByGistId(req.params.gistId);
        res.status(200).json(util.analyticsToViewsAndUpvotes(analytics));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}