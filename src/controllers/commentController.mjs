import { commentCreate, getCommentById ,updateCommentById, getAllUserComments,deleteCommentById} from "../services/commentService.mjs"

// @route   POST /comment/:gistId
export const createComment = async (req, res) => {
    try {
        let curUser = req.user
        const comment = await commentCreate({...req.body,user_id:curUser._id,gist_id:req.params.gistId});
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @route   GET /comment/:id
export const commentbyID = async (req, res) => {
    try {
        let curUser = req.user
        const comment = await getCommentById(curUser._id,req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /comment/
export const allComments = async (req, res) => {
    try {
        let curUser = req.user
        const comments = await getAllUserComments(curUser._id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /comment/
export const updateComment = async (req, res) => {
    try {
        const singleComment = await updateCommentById(req.user._id,req.params.id,req.body)
        if (!singleComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(singleComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @route   DELETE /comment/:id
export const deleteComment = async (req, res) => {
    try {
        const singleComment = await deleteCommentById(req.user._id,req.params.id);
        if (!singleComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
