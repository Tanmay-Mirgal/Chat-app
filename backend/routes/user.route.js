import {Router} from 'express';
import { protectedRoute } from '../middlewares/protectedRoute.js';
import { getAllUsersforSideBar} from '../controllers/user.controller.js';

const router = Router();

router.get('/',protectedRoute,getAllUsersforSideBar);

export default router;