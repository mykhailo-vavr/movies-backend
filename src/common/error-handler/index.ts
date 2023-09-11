import { StatusCodesEnum } from '@/utils';
import { NextFunction, Request, Response } from '@/types';
import { BaseError } from '../error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(err.code || StatusCodesEnum.INTERNAL_SERVER_ERROR).json({ code: err.code, message: err.message });
};
