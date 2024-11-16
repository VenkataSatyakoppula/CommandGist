import express from 'express';
import {allGists,allGistsbyTopic, createGist, deleteGist, gistbyID, updateGist,getGistComments,publicGists,specificPublicGist,gistTotopic,publicGistsbyTopic} from "../controllers/gistController.mjs"
import passport from 'passport';
import validation from "../middleware/validation.mjs"
const router = express.Router();
router.get('/public',publicGists);
router.get('/public/:id',
    validation.checkIntID,
    validation.optionalAuth,
    validation.allowAnonymousUsers,
    specificPublicGist
);

router.post('/',
    passport.authenticate('jwt',{session:false}),
    createGist
);

router.get('/:id',
    validation.checkIntID,passport.authenticate('jwt',{session:false}),
    gistbyID
);

router.get('/',
    passport.authenticate('jwt',{session:false}),
    allGists
);

router.put('/:id',
    validation.checkIntID,
    passport.authenticate('jwt',{session:false}),
    updateGist
);

router.delete('/:id',
    passport.authenticate('jwt',{session:false}),
    deleteGist
);

router.post('/add/:gistId/:topicId',
    passport.authenticate('jwt',{session:false}),
    gistTotopic
);

router.get('/topic/:topicId',
    passport.authenticate('jwt',{session:false}),
    allGistsbyTopic
);

router.get('/topic/:topicId/public',
    publicGistsbyTopic
);

router.get('/comments/:id',
    validation.checkIntID,
    passport.authenticate('jwt',{session:false}),
    getGistComments
);

export default router;