import { StatusCodesEnum } from '@/utils';
import { BaseError } from './base-error';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(StatusCodesEnum.BAD_REQUEST, message);
  }
}
