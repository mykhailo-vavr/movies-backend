import { statusCodes } from '@/utils';
import { BaseError } from './base-error';

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(statusCodes.unauthorized, message);
  }
}
