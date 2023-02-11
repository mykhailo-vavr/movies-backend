import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';

export type Response = ExpressResponse;
export type Request = ExpressRequest;
export type NextFunction = ExpressNextFunction;

export type TypedReqBody<T = any> = ExpressRequest<any, any, T>;

export type TypedReqQuery<T = any> = ExpressRequest<any, any, any, T>;

export type TypedReqParams<T = any> = ExpressRequest<T>;
