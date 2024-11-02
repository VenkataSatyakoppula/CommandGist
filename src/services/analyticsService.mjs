import Analytics from "../models/analyticsModel.mjs";

export const analyticsSet = async (post_id,user_id=null,session_id=null) => {
    return await setAnalytics(post_id,user_id,session_id);
}

export const getAnalyticsByGistId = async (post_id) => {
    return await Analytics.findOne({post_id:post_id});
}
export const UserExistsinAnalytics = async (post_id,user_id=null,sessionId=null) =>{
    try {
        if (user_id){
        return await Analytics.findOne(
                {
                    post_id:post_id,
                    "viewed_by": user_id
                });
    }else if(sessionId){
        return await  Analytics.findOne(
                {
                    post_id:post_id,
                    viewed_sessions: sessionId 
                });
    }
    } catch (error) {
        console.log(error);
    }
    return null;
}
async function setAnalytics(post_id,user_id=null,sessionId=null){
    try {
        if (user_id){
        return await Analytics.findOneAndUpdate(
                {
                    post_id:post_id
                },
                {
                    $addToSet: { viewed_by: user_id },
                    $inc: { views: 1 }
                },
                { new: true, runValidators: true,upsert: true}
            );
    }else if(sessionId){
        return await  Analytics.findOneAndUpdate(
                {
                    post_id:post_id,
                },
                {
                    $addToSet: {"viewed_sessions": String(sessionId)},
                    $inc: { views: 1}
                },
                { new: true, runValidators:true,upsert: true}
            );
    }
    } catch (error) {
        console.log(error);
    }
}