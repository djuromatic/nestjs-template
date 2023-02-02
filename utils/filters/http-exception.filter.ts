import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException, ErrorModel } from 'utils/exception';

import * as errorStatus from './status';
import { ILoggerService } from 'libs/logger/adapter';
import { formatDateWithTime } from 'utils/date';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: ILoggerService) {}

  catch(exception: ApiException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : [exception['status'], HttpStatus.INTERNAL_SERVER_ERROR].find(Boolean);

    exception.traceid = [exception.traceid, request['id']].find(Boolean);

    this.loggerService.error(exception, exception.message, exception.context);

    response.status(status).json({
      error: {
        code: status,
        traceid: exception.traceid,
        message: [errorStatus[String(status)], exception.message].find(Boolean),
        timestamp: formatDateWithTime(new Date()),
        path: request.url,
      },
    } as ErrorModel);
  }
}
