import { ConfigKeysEnum, getConfig } from './config';
import { signJwt, verifyJwt } from './jwt';

export enum TokensTypeEnum {
  ACCESS_TOKEN = 'accessToken',
}

export const tokensHelper = {
  generate: {
    access: (payload: Record<string, any>) =>
      signJwt(payload, getConfig(ConfigKeysEnum.ACCESS_TOKEN_SECRET) || '', { expiresIn: '1h' }),
  },

  verify: {
    access: <T extends Record<string, any>>(token: string) =>
      verifyJwt<T>(token, getConfig(ConfigKeysEnum.ACCESS_TOKEN_SECRET) || ''),
  },
};
