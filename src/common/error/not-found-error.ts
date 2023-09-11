import { StatusCodesEnum } from '@/utils';
import { BaseError } from './base-error';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(StatusCodesEnum.NOT_FOUND, message);
  }
}
