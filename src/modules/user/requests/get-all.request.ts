import { User } from '@/database/models';
import { TypedReqQuery, PickModelAttributes } from '@/types';

export type GetAllRequest = TypedReqQuery<Partial<PickModelAttributes<User, 'id' | 'firstName' | 'lastName'>>>;
