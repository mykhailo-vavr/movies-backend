import { StatusCodesEnum } from '@/utils';

export class BaseError extends Error {
  constructor(
    public readonly code: (typeof StatusCodesEnum)[keyof typeof StatusCodesEnum],
    public readonly message: string,
  ) {
    super(message);
  }
}
