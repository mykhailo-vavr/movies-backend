import { Movie } from '@/database';
import { OmitModelCreationAttributes, TypedReqBody } from '@/types';

interface BodyType extends OmitModelCreationAttributes<Movie, 'actors'> {
  actors: string[];
}

export type CreateRequest = TypedReqBody<BodyType>;
