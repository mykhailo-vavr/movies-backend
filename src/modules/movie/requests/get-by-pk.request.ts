import { Movie } from '@/database';
import { PickModelAttributes, TypedReqParams } from '@/types';

export type GetByPkRequest = TypedReqParams<PickModelAttributes<Movie, 'id'>>;
