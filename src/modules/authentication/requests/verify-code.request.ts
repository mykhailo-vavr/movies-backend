import { VerifyCode } from '@/database/models';
import { TypedReqBody, PickModelAttributes } from '@/types';

export type VerifyCodeRequest = TypedReqBody<PickModelAttributes<VerifyCode, 'email' | 'code'>>;
