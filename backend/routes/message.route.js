import {Router} from 'express';
import { SendMessageController } from '../controllers/message.controller.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';

const router = Router();    

router.post("/send/:id",protectedRoute, SendMessageController);
export default router;  