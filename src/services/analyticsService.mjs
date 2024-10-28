import Analytics from "../models/analyticsModel.mjs";

export const analyticsSet = async (post_id,user_id=null,session_id=null) => {
    return await setAnalytics(post_id,user_id,session_id);
}

export const getAnalyticsByGistId = async (post_id) => {
    return await Analytics.findOne({post_id:post_id});
}

async function setAnalytics(post_id,user_id=null,session_id=null){
    try {
        console.log(user_id,session_id);
        if (user_id){
        return await Analytics.findOneAndUpdate(
                {
                    post_id:post_id,
                    viewed_by: {$ne: user_id}

                },
                {
                    $addToSet: { viewed_by: user_id },
                    $inc: { views: 1 }
                },
                { new: true, runValidators: true }
            );
    }else if(session_id){
        return await  Analytics.findOneAndUpdate(
                {
                    post_id:post_id,
                    "viewed_sessions.session_id":{$ne: session_id}
                },
                {
                    $addToSet: { viewed_sessions: { session_id: session_id } },
                    $inc: { views: 1 }
                },
                { new: true}
            );
    }
    } catch (error) {
        console.log(error);
    }
}