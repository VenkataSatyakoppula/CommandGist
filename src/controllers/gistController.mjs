import { gistCreate,removeGistinTopic,allGistsinTopic,getGistbyId, getAllGists, updateGistById, deleteGistById, gistComments,getPublicGists, addGisttoTopic } from "../services/gistService.mjs";
import {analyticsSet,getAnalyticsByGistId,UserExistsinAnalytics } from "../services/analyticsService.mjs"
import util from "../utils/util.mjs";

// @route   POST /gist
export const createGist = async (req, res) => {
    try {
        let curUser = req.user;
        let stringSlug = await util.createUniqueSlug(req.body["title"],"gist");
        const singleGist = await gistCreate({...req.body,slug: stringSlug,author_id:curUser._id});
        res.status(200).json(singleGist);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @route   GET /gist/:id
export const gistbyID = async (req, res) => {
    try {
        let curUser = req.user
        const gist = await getGistbyId(curUser._id,req.params.id,false);
        if (!gist) {
            return res.status(404).json({ message: 'Gist not found' });
        }
        res.status(200).json(gist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /gist/
export const allGists = async (req, res) => {
    try {
        let curUser = req.user
        const gists = await getAllGists(curUser._id);
        res.status(200).json(gists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /gist/ TODO: what if user whats to update slug? and other fields like Date fields
export const updateGist = async (req, res) => {
    try {
        const blogPost = await updateGistById(req.user._id,req.params.id,req.body)
        if (!blogPost) {
            return res.status(404).json({ message: 'Gist not found' });
        }
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @route   DELETE /gist/:id
export const deleteGist = async (req, res) => {
    try {
        const blogPost = await deleteGistById(req.user._id,req.params.id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Gist not found' });
        }
        res.status(200).json({ message: 'Gist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /gist/comments/:id
export const getGistComments = async (req,res) =>{
    try {
        const comments = await gistComments(req.user._id,req.params.id);
        if (!comments) {
            return res.status(404).json({ message: 'Gist not found' });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @route GET /gist/public
export const publicGists = async (req, res) => {
    try {
        const gists = await getPublicGists();
        res.status(200).json(gists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route GET /gist/public/:id
export const specificPublicGist = async (req, res) => {
    try {
        const curUser = req.user;
        let gistAnalytics;
        const singleGist = await getGistbyId(curUser,req.params.id,true);
        gistAnalytics = await UserExistsinAnalytics(req.params.id,curUser,req.cookies["annoUser"]);
        if(!gistAnalytics){
            gistAnalytics = await analyticsSet(req.params.id,curUser,req.cookies["annoUser"]);
        }
        res.status(200).json({gist:singleGist,analytics: util.analyticsToViewsAndUpvotes(gistAnalytics)});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route POST /gist/:gistId/:topicId
export const gistTotopic = async (req,res) =>{
    try {
        let action = req.body.action;
        let singleGist;
        if(action == "add"){
            singleGist = await addGisttoTopic(req.params.gistId,req.user._id,req.params.topicId);
        }else if (action == "remove"){
            singleGist = await removeGistinTopic(req.params.gistId,req.user._id,req.params.topicId);
        }else{
            return res.status(404).json({ message: {action:"No action found in body add or remove"} });
        }
        
        if (!singleGist) {
            return res.status(404).json({ message: 'Gist not found' });
        }
        res.status(200).json(singleGist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @route GET /gist/:topicId
export const allGistsbyTopic = async (req,res) =>{
    try {
        const gists = await allGistsinTopic(req.params.topicId,req.user._id);
        if (!gists) {
            return res.status(404).json({ message: 'Gists not found' });
        }
        res.status(200).json(gists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}