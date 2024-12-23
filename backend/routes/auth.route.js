import {Router} from 'express';
import { LoginController, LogoutController, SignupController } from '../middlewares/auth.middleware.js';

const router = Router();

router.post("/signup",SignupController);
router.post("/login",LoginController);
router.post("/logout",LogoutController);

export default router;