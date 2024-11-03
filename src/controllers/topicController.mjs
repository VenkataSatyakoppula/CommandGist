import topicService from "../services/topicService.mjs";
import { deleteAllGistsinTopic } from "../services/gistService.mjs";
import util from "../utils/util.mjs";
// @route   POST /topic
export const createTopic = async (req, res) => {
    try {
        let curUser = req.user
        let stringSlug = await util.createUniqueSlug(req.body["title"],"topic");
        const topic = await topicService.TopicCreate({...req.body,slug:stringSlug,user_id:curUser._id});
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @route   GET /topic/:id
export const topicbyID = async (req, res) => {
    try {
        let curUser = req.user
        const topic = await topicService.getTopicById(curUser._id,req.params.id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /topics/
export const allTopics = async (req, res) => {
    try {
        let curUser = req.user
        const topics = await topicService.getAllUserTopics(curUser._id);
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /topic/:Id
export const updateTopic = async (req, res) => {
    try {
        const topic = await topicService.updateTopicById(req.user._id,req.params.id,req.body);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        res.status(200).json(topic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @route   DELETE /topic/:id
export const deleteTopic = async (req, res) => {
    try {
        const singleTopic = await topicService.deleteTopicById(req.user._id,req.params.id);
        if (!singleTopic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        const deleted = await deleteAllGistsinTopic(req.params.id,req.user._id);
        res.status(200).json({ message: `Topic deleted successfully`,deleted_gist_count: deleted.deletedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
