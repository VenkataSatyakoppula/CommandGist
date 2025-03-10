import Gist from "../models/gistModel.mjs"
import Comment from "../models/commentsModel.mjs";
import Topic from "../models/topicModel.mjs";
import Analytics from "../models/analyticsModel.mjs";
import util from "../utils/util.mjs";
export const gistCreate = async (body) => {
    const blogPost = new Gist(body);
    return await blogPost.save();
};

export const getGistbyId = async (userId=null,id,publicGist=false) => {
    if(publicGist){
        return await Gist.findOne({_id:id,status:"public"}).populate('author_id', 'username email');
    }
    return await Gist.findOne({_id:id,author_id:userId}).populate('author_id', 'username email');
};

export const getAllGists = async (userId,ispublic=false) => {
    try {
        const query = {};
        if (ispublic) {
            query.status= "public";
        }else{
            query.author_id = userId;
        }
        const [gists, analytics] = await Promise.all([
            Gist.find(query).populate('author_id', 'username email'),
            Analytics.find({})
        ]);
        const analyticsMap = new Map(analytics.map(a => [String(a.post_id), a]));
        const gistsWithAnalytics = gists.map(gist => ({
            ...gist.toObject(),
            analytics: util.analyticsToViewsAndUpvotes(analyticsMap.get(String(gist._id))) // O(1) lookup
        }));
        return gistsWithAnalytics;
    } catch (error) {
        console.error('Error fetching gists and analytics:', error);
        throw error;
    }
    // return await Gist.find({author_id:userId}).populate('author_id', 'username email');
};

export const updateGistById = async (userId,id, body) => {
    return await Gist.findOneAndUpdate(
        {_id:id,author_id:userId},
        body,
        { new: true, runValidators: true }
    );
};

export const deleteGistById = async (userId,id) => {
    return await Gist.findOneAndDelete({_id:id,author_id:userId});
};

export const gistComments = async (userId,gistId) =>{
    return await Comment.find({user_id:userId,gist_id:gistId});
};

export const getPublicGists = async () =>{
    return await Gist.find({status:"public"}).populate('author_id', 'username email');
};

export const getExistingSlugs = async (existingSlug,type) => {
    if (type==="gist"){
        return await Gist.find({slug:existingSlug});
    }else if(type==="topic"){
        return await Topic.find({slug:existingSlug});
    }
};

export const addGisttoTopic = async (gistId,userId,topicId) => {
    return await Gist.findOneAndUpdate({
        _id: gistId,
        author_id: userId,
    },{topic: topicId},{ new: true, runValidators: true });
};

export const removeGistinTopic = async (gistId,userId) => {
    return await Gist.findOneAndUpdate({
        _id: gistId,
        author_id: userId,
    },{$unset:{topic: null}},{ new: true, runValidators: true });
};

export const deleteAllGistsinTopic = async (topicId,userId) =>{
    return await Gist.deleteMany({ author_id:userId ,topic: topicId});
};

export const allGistsinTopic = async (topicId,userId,publicGist=false) => {
    if(publicGist){
        return await Gist.find({ topic: { $exists: true, $eq: topicId },status:"public"}).populate('author_id', 'username email');
    }
    return await Gist.find({author_id:userId ,topic:topicId});
};