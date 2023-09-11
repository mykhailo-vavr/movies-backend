import { StatusCodesEnum } from '@/utils';
import { BaseError } from './base-error';

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(StatusCodesEnum.INTERNAL_SERVER_ERROR, message);
  }
}
