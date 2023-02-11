import { statusCodes } from '@/utils';
import { BaseError } from './base-error';

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(statusCodes.conflict, message);
  }
}
