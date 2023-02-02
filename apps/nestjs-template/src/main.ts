import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ILoggerService } from 'libs/logger/adapter';
import { ISecretsService } from 'libs/secrets/adapter';
import { AppExceptionFilter } from 'utils/filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(ILoggerService);

  // something maybe to implement so we can set application name in logs
  // loggerService.setApplication("template");

  app.useGlobalFilters(new AppExceptionFilter(loggerService));

  // add interceptors here
  // app.useGlobalInterceptors(new HttpLoggerInterceptor(loggerService));

  app.useLogger(loggerService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const { global } = app.get(ISecretsService);

  await app.listen(global.port);
  loggerService.info({
    message: `Listening at port ${global.port}`,
    context: 'InstanceLoader',
  });
}
bootstrap();
