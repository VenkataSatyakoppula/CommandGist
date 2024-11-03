import express from 'express';
import { createTopic,deleteTopic,topicbyID,allTopics, updateTopic } from '../controllers/topicController.mjs';
import passport from 'passport';
import validation from "../middleware/validation.mjs"
const router = express.Router();

router.post('/',
    passport.authenticate('jwt',{session:false}),
    createTopic
);

router.get('/:id',
    passport.authenticate('jwt',{session:false}),
    topicbyID
);

router.get('/',
    passport.authenticate('jwt',{session:false}),
    allTopics
);

router.put('/:id',
    passport.authenticate('jwt',{session:false}),
    updateTopic
);

router.delete('/:id',
    passport.authenticate('jwt',{session:false}),
    deleteTopic
);

export default router;