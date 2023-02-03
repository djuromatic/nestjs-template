import { HttpException } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(error: Error) {
    super(error.message, 401, { cause: error });
  }
}
