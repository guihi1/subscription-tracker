import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', authorize, userController.getUsers);

userRouter.get('/:id', authorize, userController.getUser);

export default userRouter;
