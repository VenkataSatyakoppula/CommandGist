import express from 'express';
import { loginUser, refreshToken } from "../controllers/authController.mjs";
import gistRoutes from "./gistRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import commentRoutes from "./commentRoutes.mjs"
const router = express.Router();

router.get('/', (req, res) => {
    res.send({"message":"Welcome to CommandGist APIs"});
});

router.use('/gist',gistRoutes);
router.use('/user',userRoutes);
router.use('/comment',commentRoutes);

//Auth
router.post('/auth/login',loginUser);
router.get('/auth/refresh',refreshToken);
export default router;
