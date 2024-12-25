import {Router} from 'express';
import { SendMessageController, GetMessageController } from '../controllers/message.controller.js';
import { protectedRoute } from '../middlewares/protectedRoute.js';

const router = Router();    

router.post("/send/:id",protectedRoute, SendMessageController);
router.get('/:id', protectedRoute, GetMessageController);// getting the message between currentuser and the receiver user
//'/'current user and '/:id' receiver user
export default router;  