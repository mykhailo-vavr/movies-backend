import { Router } from 'express';
import { authenticationRouter, userRouter } from './modules';

const router = Router();

router.use('/auth', authenticationRouter);
router.use('/users', userRouter);

export default router;
