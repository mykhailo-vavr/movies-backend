import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';

export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

export type Request<P = any, B = any, Q = any> = ExpressRequest<P, any, B, Q>;

export type TypedReqParams<P = any> = Request<P>;

export type TypedReqBody<B = any> = Request<any, B>;

export type TypedReqQuery<Q = any> = Request<any, any, Q>;

export type Headers = IncomingHttpHeaders;
