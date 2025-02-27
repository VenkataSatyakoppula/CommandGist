import express from 'express';
import { singleGistAnalytics } from '../controllers/analyticsController.mjs';

const router = express.Router();

router.get('/:gistId',singleGistAnalytics);
// router.get('/:id',passport.authenticate('jwt',{session:false}),commentbyID);
// router.get('/',passport.authenticate('jwt',{session:false}), allComments);
// router.put('/:id',passport.authenticate('jwt',{session:false}),updateComment);
// router.delete('/:id',passport.authenticate('jwt',{session:false}),deleteComment);

export default router;