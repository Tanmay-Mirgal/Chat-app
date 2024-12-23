import {Router} from 'express';
import { LoginController, LogoutController, SignupController } from '../controllers/auth.controller.js';

const router = Router();

router.post("/signup",SignupController);
router.post("/login",LoginController);
router.post("/logout",LogoutController);

export default router;