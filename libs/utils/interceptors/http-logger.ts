import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { differenceInMilliseconds } from 'date-fns';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(
    executionContext: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const startDate = new Date();
    const context = `${executionContext.getClass().name}/${
      executionContext.getHandler().name
    }`;

    const request = executionContext.switchToHttp().getRequest();
    const response = executionContext.switchToHttp().getResponse();

    request['context'] = context;

    //! redundent code
    if (!request.headers?.traceid) {
      this.logger.warn('missing traceid in header', 'Tracing');
      request.headers.traceid = uuidv4();
      this.logger.warn('Id added on backend', 'Tracing');
    }

    response.on('finish', () => {
      const endDate = new Date();

      const requestDuration = differenceInMilliseconds(endDate, startDate);

      this.logger.log(
        `traceId: ${request.headers.traceid} path: ${
          request.url
        } agent: ${request.get('user-agent')} - ${requestDuration}ms`,
        context,
      );
    });

    return next.handle();
  }
}
