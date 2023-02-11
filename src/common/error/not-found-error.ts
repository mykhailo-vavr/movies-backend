import { statusCodes } from '@/utils';
import { BaseError } from './base-error';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(statusCodes.notFound, message);
  }
}
