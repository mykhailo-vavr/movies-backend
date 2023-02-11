import { UnauthorizedError } from '@/common/error';
import { NextFunction, Request, Response } from '@/types';
import { tokensHelper } from '@/utils';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError('Access denied');
    }

    tokensHelper.verify.access(token);

    next();
  } catch {
    throw new UnauthorizedError('Access denied');
  }
};
