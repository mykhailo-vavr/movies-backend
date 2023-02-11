import { statusCodes } from '@/utils';
import { BaseError } from './base-error';

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(statusCodes.internalServerError, message);
  }
}
