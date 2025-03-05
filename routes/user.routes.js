import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', authorize, userController.getUsers);

userRouter.get('/:id', authorize, userController.getUser);

userRouter.post('/', (req, res) => {
	res.send({ title: 'CREATE user' });
});

userRouter.put('/:id', (req, res) => {
	res.send({ title: 'UPDATE user' });
});

userRouter.get('/:id', (req, res) => {
	res.send({ title: 'DELETE user' });
});

export default userRouter;
