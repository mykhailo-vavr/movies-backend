import { statusCodes } from '@/utils';

export class BaseError extends Error {
  constructor(public readonly code: (typeof statusCodes)[keyof typeof statusCodes], public readonly message: string) {
    super(message);
  }
}
