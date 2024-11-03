import Topic from "../models/topicModel.mjs";


const TopicCreate = async (body) => {
    const singleTopic = new Topic(body);
    return await singleTopic.save();
};

const getTopicById = async (userId,id) => {
    return await Topic.findOne({_id:id,user_id:userId}).populate('user_id', 'username email');
};

const getAllUserTopics = async (userId) => {
    return await Topic.find({user_id:userId}).populate('user_id', 'username email');
};

const updateTopicById = async (userId,id, body) => {
    return await Topic.findOneAndUpdate(
        {_id:id,user_id:userId},
        body,
        { new: true, runValidators: true }
    );
};

const deleteTopicById = async (userId,id) => {
    return await Topic.findOneAndDelete({_id:id,user_id:userId});
};

export default {
    TopicCreate,
    getTopicById,
    getAllUserTopics,
    updateTopicById,
    deleteTopicById
}