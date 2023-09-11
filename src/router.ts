import { Router } from 'express';
import { movieRouter, sessionRouter, userRouter } from './modules';

const router = Router();

router.use('/movies', movieRouter);
router.use('/sessions', sessionRouter);
router.use('/users', userRouter);

export default router;
