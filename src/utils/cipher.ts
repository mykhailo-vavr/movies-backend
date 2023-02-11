import { privateDecrypt, publicEncrypt } from 'crypto';
import { ConfigKeysEnum, getConfig } from './config';

export const encrypt = (message: string) => {
  const buffer = Buffer.from(message);
  const publicKey = getConfig(ConfigKeysEnum.CIPHER_PUBLIC_KEY) || '';
  const encryptedBuffer = publicEncrypt(publicKey, buffer);
  const encryptedMessage = encryptedBuffer.toString('base64');

  return encryptedMessage;
};

export const decrypt = (encryptedMessage: string) => {
  const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');
  const privateKey = getConfig(ConfigKeysEnum.CIPHER_PRIVATE_KEY) || '';
  const decryptedBuffer = privateDecrypt(privateKey, encryptedBuffer);
  const decryptedMessage = decryptedBuffer.toString();

  return decryptedMessage;
};
