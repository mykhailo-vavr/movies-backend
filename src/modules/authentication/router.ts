import { Router } from 'express';
import { asyncControllerWrapper } from '@/utils';
import { User, VerifyCode } from '@/database/models';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';
import { UserService } from '../user';

const authenticationRouter = Router();
const userService = new UserService(User);
const authenticationService = new AuthenticationService(VerifyCode, userService);
const authenticationController = new AuthenticationController(authenticationService);

authenticationRouter.post(
  '/sign-up',
  asyncControllerWrapper(authenticationController.signUp.bind(authenticationController)),
);

authenticationRouter.post(
  '/sign-in',
  asyncControllerWrapper(authenticationController.signIn.bind(authenticationController)),
);

authenticationRouter.post(
  '/verify-code',
  asyncControllerWrapper(authenticationController.verifyCode.bind(authenticationController)),
);

authenticationRouter.get(
  '/refresh-token',
  asyncControllerWrapper(authenticationController.refreshToken.bind(authenticationController)),
);

export { authenticationRouter };
