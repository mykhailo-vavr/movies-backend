import { Movie } from '@/database';
import { OmitModelCreationAttributes, PickModelAttributes, Request } from '@/types';

type ParamsType = PickModelAttributes<Movie, 'id'>;

interface BodyType extends Partial<OmitModelCreationAttributes<Movie, 'actors'>> {
  actors?: string[];
}

export type UpdateRequest = Request<ParamsType, BodyType>;
