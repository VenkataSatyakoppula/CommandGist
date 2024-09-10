import express from 'express';
import {createComment,commentbyID,allComments,deleteComment,updateComment} from "../controllers/commentController.mjs"
import passport from 'passport';
const router = express.Router();

router.post('/:gistId',passport.authenticate('jwt',{session:false}),createComment);
router.get('/:id',passport.authenticate('jwt',{session:false}),commentbyID);
router.get('/',passport.authenticate('jwt',{session:false}), allComments);
router.put('/:id',passport.authenticate('jwt',{session:false}),updateComment);
router.delete('/:id',passport.authenticate('jwt',{session:false}),deleteComment);

export default router;