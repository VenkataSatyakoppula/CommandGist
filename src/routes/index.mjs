import express from 'express';
import { loginUser, logoutUser, refreshToken, registerUser } from "../controllers/authController.mjs";
import gistRoutes from "./gistRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import commentRoutes from "./commentRoutes.mjs";
import topicRoutes from "./topicRoutes.mjs";
import analyticsRoutes from "./analyticsRoutes.mjs";
const router = express.Router();

router.get('/', (req, res) => {
    res.send({"message":"Welcome to CommandGist APIs"});
});

router.use('/gist',gistRoutes);
router.use('/user',userRoutes);
router.use('/comment',commentRoutes);
router.use('/topic',topicRoutes);
router.use('/analytics',analyticsRoutes);
//Auth
router.post('/auth/login',loginUser);
router.get('/auth/logout',logoutUser);
router.post('/auth/register',registerUser);
router.get('/auth/refresh',refreshToken);
export default router;
