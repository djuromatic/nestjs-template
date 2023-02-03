import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'libs/logger/service';

import { ISecretsService } from 'libs/secrets/adapter';
import { AppExceptionFilter } from 'utils/filters/exception-filter';
import { HttpLoggerInterceptor } from 'utils/interceptors/http-logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const secrets = app.get(ISecretsService);

  const logger = new Logger(secrets);

  // something maybe to implement so we can set application name in logs
  // loggerService.setApplication("template");
  app.useLogger(logger);

  app.useGlobalInterceptors(new HttpLoggerInterceptor(logger));
  app.useGlobalFilters(new AppExceptionFilter(logger));

  // add interceptors here
  // app.useGlobalInterceptors(new HttpLoggerInterceptor(loggerService));

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const { global } = app.get(ISecretsService);

  await app.listen(global.port);
  logger.log(`Listening at port ${global.port}`, 'NestApplication');
}
bootstrap();
