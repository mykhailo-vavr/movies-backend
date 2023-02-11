import { Router } from 'express';
import { authorization } from '@/middlewares';
import { asyncControllerWrapper } from '@/utils';
import { User } from '@/database/models';
import { UserController } from './controller';
import { UserService } from './service';

const userRouter = Router();
const userService = new UserService(User);
const userController = new UserController(userService);

userRouter.get('/', authorization, asyncControllerWrapper(userController.getAll.bind(userController)));

userRouter.get('/:id', authorization, asyncControllerWrapper(userController.getByPk.bind(userController)));

export { userRouter };
