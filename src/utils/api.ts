import { NextFunction, Request, Response, TypedReqQuery } from '@/types';

export enum StatusCodesEnum {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const asyncControllerWrapper =
  (callback: (req: TypedReqQuery, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };

export enum SuccessStatusEnum {
  FAILED,
  OK,
}

export function json<T>(this: Response, data: T): T {
  const dataWithStatus = {
    ...(data && typeof data === 'object' ? data : { data }),
    status: this.statusCode <= 400 ? SuccessStatusEnum.OK : SuccessStatusEnum.FAILED,
  };

  const serializedData = JSON.stringify(dataWithStatus);

  this.setHeader('Content-Type', 'application/json').send(serializedData);
  return data;
}
