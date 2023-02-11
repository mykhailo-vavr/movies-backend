import { User } from '@/database/models';
import { ModelCreationAttributes, TypedReqBody } from '@/types';

export type SignUpRequest = TypedReqBody<ModelCreationAttributes<User>>;
