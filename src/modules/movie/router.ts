import { Router } from 'express';
import { authorization } from '@/middlewares';
import { asyncControllerWrapper } from '@/utils';
import { Actor, Movie } from '@/database';
import { MovieController } from './controller';
import { MovieService } from './service';
import { ActorService } from '../actor';

const movieRouter = Router();
const actorService = new ActorService(Actor);
const movieService = new MovieService(Movie, actorService);
const movieController = new MovieController(movieService);

movieRouter.use(authorization);

movieRouter.post('/', asyncControllerWrapper(movieController.create.bind(movieController)));

movieRouter.delete('/:id', asyncControllerWrapper(movieController.delete.bind(movieController)));

movieRouter.patch('/:id', asyncControllerWrapper(movieController.update.bind(movieController)));

movieRouter.get('/:id', asyncControllerWrapper(movieController.getByPk.bind(movieController)));

movieRouter.get('/', asyncControllerWrapper(movieController.getAll.bind(movieController)));

movieRouter.post('/import', asyncControllerWrapper(movieController.import.bind(movieController)));

export { movieRouter };
