import { User } from '@/database/models';
import { TypedReqBody, PickModelAttributes } from '@/types';

export type SignInRequest = TypedReqBody<PickModelAttributes<User, 'email' | 'password'>>;
