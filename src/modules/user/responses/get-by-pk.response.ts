import { User } from '@/database/models';
import { OmitModelAttributes } from '@/types';

export type GetByPkResponse = OmitModelAttributes<User, 'password'>;
