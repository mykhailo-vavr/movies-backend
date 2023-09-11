import { User } from '@/database';
import { TypedReqBody, PickModelAttributes } from '@/types';

export type SignInRequest = TypedReqBody<PickModelAttributes<User, 'email' | 'password'>>;
