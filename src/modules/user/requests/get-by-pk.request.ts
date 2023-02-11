import { User } from '@/database/models';
import { PickModelAttributes, TypedReqParams } from '@/types';

export type GetByPkRequest = TypedReqParams<PickModelAttributes<User, 'id'>>;
