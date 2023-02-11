import { ConfigKeysEnum, getConfig } from './config';
import { sign, verify } from './jwt';

export enum TokensTypeEnum {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  VERIFICATION_TOKEN = 'verificationToken',
}

export const tokensHelper = {
  generate: {
    access: (payload: Record<string, any>) =>
      sign(payload, getConfig(ConfigKeysEnum.ACCESS_TOKEN_SECRET) || '', { expiresIn: '15h' }),
    refresh: (payload: Record<string, any>) =>
      sign(payload, getConfig(ConfigKeysEnum.REFRESH_TOKEN_SECRET) || '', { expiresIn: '1h' }),
    verification: (payload: Record<string, any>) =>
      sign(payload, getConfig(ConfigKeysEnum.VERIFICATION_TOKEN_SECRET) || '', { expiresIn: '5m' }),
  },

  verify: {
    access: <T extends Record<string, any>>(token: string) =>
      verify<T>(token, getConfig(ConfigKeysEnum.ACCESS_TOKEN_SECRET) || ''),
    refresh: <T extends Record<string, any>>(token: string) =>
      verify<T>(token, getConfig(ConfigKeysEnum.REFRESH_TOKEN_SECRET) || ''),
    verification: <T extends Record<string, any>>(token: string) =>
      verify<T>(token, getConfig(ConfigKeysEnum.VERIFICATION_TOKEN_SECRET) || ''),
  },
};
