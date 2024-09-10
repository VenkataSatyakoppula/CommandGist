import express from 'express';
import { profileView, listUsers, userCreate, userDelete, userUpdate } from '../controllers/userController.mjs';
import passport from 'passport';
const router = express.Router();

router.get('/',listUsers);
router.get('/profile',passport.authenticate('jwt',{session:false}),profileView);
router.post('/',userCreate);
router.delete('/:id',passport.authenticate('jwt',{session:false}),userDelete);
router.put('/update',passport.authenticate('jwt',{session:false}),userUpdate);

export default router;