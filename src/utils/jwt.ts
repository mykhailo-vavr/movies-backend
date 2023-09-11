import jwt from 'jsonwebtoken';
import { JwtPayload, SignJwtOptions, VerifyJwtOptions } from '@/types';

export const signJwt = (payload: Record<string, any>, secret: string, options: SignJwtOptions = { expiresIn: '1h' }) =>
  jwt.sign(payload, secret, options);

export const verifyJwt = <T extends Record<string, any>>(token: string, secret: string, options?: VerifyJwtOptions) =>
  jwt.verify(token, secret, options) as JwtPayload & T;
