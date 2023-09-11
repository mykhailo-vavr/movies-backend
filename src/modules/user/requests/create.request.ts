import { User } from '@/database';
import { ModelCreationAttributes, PickModelCreationAttributes, TypedReqBody, Values } from '@/types';

interface BodyType extends ModelCreationAttributes<User> {
  confirmPassword: Values<PickModelCreationAttributes<User, 'password'>>;
}

export type CreateRequest = TypedReqBody<BodyType>;
