import express from 'express';
import {allGists, createGist, deleteGist, gistbyID, updateGist,getGistComments,publicGists,specificPublicGist} from "../controllers/gistController.mjs"
import passport from 'passport';
import validation from "../middleware/validation.mjs"
const router = express.Router();

router.get('/public',publicGists);

router.get('/public/:id',
    validation.checkIntID,
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
    validation.checkIntID,
    passport.authenticate('jwt',{session:false}),
    deleteGist
);

router.get('/comments/:id',
    validation.checkIntID,
    passport.authenticate('jwt',{session:false}),
    getGistComments
);

export default router;