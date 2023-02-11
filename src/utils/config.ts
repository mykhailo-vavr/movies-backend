import dotenv from 'dotenv';

dotenv.config();

export enum ConfigKeysEnum {
  DB_CONNECTION_URI = 'DB_CONNECTION_URI',
  FRONTEND_BASE_URL = 'FRONTEND_BASE_URL',
  ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN_SECRET',
  REFRESH_TOKEN_SECRET = 'REFRESH_TOKEN_SECRET',
  VERIFICATION_TOKEN_SECRET = 'VERIFICATION_TOKEN_SECRET',
  EMAIL_SERVICE = 'EMAIL_SERVICE',
  EMAIL_USER = 'EMAIL_USER',
  EMAIL_PASS = 'EMAIL_PASS',
  CIPHER_PUBLIC_KEY = 'CIPHER_PUBLIC_KEY',
  CIPHER_PRIVATE_KEY = 'CIPHER_PRIVATE_KEY',
  PORT = 'PORT',
}

export const getConfig = <T extends number | string = string>(key: ConfigKeysEnum) => {
  const config = process.env[key];
  return config ? <T>config : undefined;
};
