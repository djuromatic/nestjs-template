import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { formatDateWithTime } from '../date';
import * as errorStatus from './status';
import { v4 as uuidv4 } from 'uuid';
import { ErrorModel } from './types';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  private logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const res = context.getResponse();
    const req = context.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : [exception['status'], HttpStatus.INTERNAL_SERVER_ERROR].find(Boolean);

    this.logger.error(exception.message, exception.name);

    res.status(status).json({
      error: {
        code: status,
        traceId: req.headers.traceid,
        message: [errorStatus[String(status)], exception.message].find(Boolean),
        timestamp: formatDateWithTime(new Date()),
        path: req.url,
      },
    }) as ErrorModel;
  }
}
