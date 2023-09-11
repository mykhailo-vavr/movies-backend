import { Router } from 'express';
import { asyncControllerWrapper } from '@/utils';
import { User } from '@/database';
import { SessionController } from './controller';
import { SessionService } from './service';
import { UserService } from '../user';

const sessionRouter = Router();
const userService = new UserService(User);
const sessionService = new SessionService(userService);
const sessionController = new SessionController(sessionService);

sessionRouter.post('/', asyncControllerWrapper(sessionController.signIn.bind(sessionController)));

export { sessionRouter };
