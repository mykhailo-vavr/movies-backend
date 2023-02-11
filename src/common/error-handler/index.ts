import { statusCodes } from '@/utils';
import { NextFunction, Request, Response } from '@/types';
import { BaseError } from '../error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code || statusCodes.internalServerError).json({ code: err.code, message: err.message });
};
