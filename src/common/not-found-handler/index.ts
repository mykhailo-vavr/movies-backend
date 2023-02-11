import { NotFoundError } from '../error';

export const notFoundHandler = () => {
  throw new NotFoundError('There is no such route');
};
