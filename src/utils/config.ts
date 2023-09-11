import dotenv from 'dotenv';

dotenv.config();

export enum ConfigKeysEnum {
  NODE_ENV = 'NODE_ENV',
  DIALECT = 'DIALECT',
  STORAGE = 'STORAGE',
  APP_PORT = 'APP_PORT',
  ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN_SECRET',
  URL_PREFIX = 'URL_PREFIX',
}

export const getConfig = <T extends number | string = string>(key: ConfigKeysEnum) => {
  const config = process.env[key];
  return config ? <T>config : undefined;
};
