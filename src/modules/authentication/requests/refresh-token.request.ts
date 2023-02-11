import { TypedReqQuery } from '@/types';

export type RefreshTokenRequest = TypedReqQuery<{
  refreshToken: string;
}>;
