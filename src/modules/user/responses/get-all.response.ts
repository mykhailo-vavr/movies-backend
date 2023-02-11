import { User } from '@/database/models';
import { OmitModelAttributes } from '@/types';

export type GetAllResponse = OmitModelAttributes<User, 'password'>[];
