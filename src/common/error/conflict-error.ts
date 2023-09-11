import { StatusCodesEnum } from '@/utils';
import { BaseError } from './base-error';

export class ConflictError extends BaseError {
  constructor(message: string) {
    super(StatusCodesEnum.CONFLICT, message);
  }
}
