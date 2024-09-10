import Comment from "../models/commentsModel.mjs"

export const commentCreate = async (body) => {
    const singleComment = new Comment(body);
    return await singleComment.save();
};

export const getCommentById = async (userId,id) => {
    return await Comment.findOne({_id:id,user_id:userId}).populate('user_id', 'username email');
};

export const getAllUserComments = async (userId) => {
    return await Comment.find({user_id:userId}).populate('user_id', 'username email');
};

export const updateCommentById = async (userId,id, body) => {
    return await Comment.findOneAndUpdate(
        {_id:id,user_id:userId},
        body,
        { new: true, runValidators: true }
    );
};

export const deleteCommentById = async (userId,id) => {
    return await Comment.findOneAndDelete({_id:id,user_id:userId});
};

