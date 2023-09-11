import { Router } from 'express';
import { asyncControllerWrapper } from '@/utils';
import { User } from '@/database';
import { UserController } from './controller';
import { UserService } from './service';

const userRouter = Router();
const userService = new UserService(User);
const userController = new UserController(userService);

userRouter.post('/', asyncControllerWrapper(userController.create.bind(userController)));

export { userRouter };
