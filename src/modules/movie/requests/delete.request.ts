import { Movie } from '@/database';
import { PickModelAttributes, TypedReqParams } from '@/types';

export type DeleteRequest = TypedReqParams<PickModelAttributes<Movie, 'id'>>;
