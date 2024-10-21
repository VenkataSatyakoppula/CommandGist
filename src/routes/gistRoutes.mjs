import express from 'express';
import {allGists, createGist, deleteGist, gistbyID, updateGist,getGistComments,publicGists} from "../controllers/gistController.mjs"
import passport from 'passport';
const router = express.Router();

router.get('/public',publicGists);
router.post('/',passport.authenticate('jwt',{session:false}),createGist);
router.get('/:id',passport.authenticate('jwt',{session:false}),gistbyID);
router.get('/',passport.authenticate('jwt',{session:false}), allGists);
router.put('/:id',passport.authenticate('jwt',{session:false}),updateGist);
router.delete('/:id',passport.authenticate('jwt',{session:false}),deleteGist);
router.get('/comments/:id',passport.authenticate('jwt',{session:false}),getGistComments);
export default router;