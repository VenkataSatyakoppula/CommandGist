import Analytics from "../models/analyticsModel.mjs";

export const analyticsCreate = async (post_id,user_id=null,session_id=null) => {
    return await setAnalytics(post_id,user_id,session_id);
}

export const getAnalyticsByGistId = async (post_id) => {
    return await recordView(id);
}

async function setAnalytics(post_id,user_id=null,session_id=null){
    try {
        if (user_id){
        return await Analytics.findOneAndUpdate(
                {post_id:post_id},
                {
                    $addToSet: { viewed_by: user_id },
                    $inc: { views: 1 }
                },
                { new: true, runValidators: true }
            );
    }else if(session_id){
        return await  Analytics.findOneAndUpdate(
                {post_id:post_id},
                {
                    $addToSet: { viewed_sessions: session_id },
                    $inc: { views: 1 }
                },
                { new: true, runValidators: true }
            );
    }
    } catch (error) {
        console.log(error);
    }
}