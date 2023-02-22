import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthorizationGuard } from 'libs/modules/auth0/auth-guard/guard';
import { Logger } from 'libs/modules/global/logger/service';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';
import { AppExceptionFilter, HttpLoggerInterceptor } from 'libs/utils';

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';

import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const keyFile = fs.readFileSync(path.join(__dirname, 'certs', 'key.pem'));
  const certFile = fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'));

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
    bufferLogs: true,
  });

  setupSwagger(app);

  const secrets = app.get(ISecretsService);

  const logger = new Logger(secrets);

  // something maybe to implement so we can set application name in logs
  // loggerService.setApplication("template");
  app.useLogger(logger);

  app.useGlobalInterceptors(new HttpLoggerInterceptor(logger));
  app.useGlobalFilters(new AppExceptionFilter(logger));
  // app.useGlobalGuards(new AuthorizationGuard(secrets));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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
