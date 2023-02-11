import { JwtPayload as BaseJwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';

export type JwtPayload<T extends Record<string, any> = Record<string, never>> = BaseJwtPayload & T;

export type VerifyJwtOptions = VerifyOptions;

export type SignJwtOptions = SignOptions;
