import { Module } from '@nestjs/common';
import { ISecretsService } from 'libs/secrets/adapter';
import { SecretsModule } from 'libs/secrets/module';

import { ILoggerService } from './adapter';
import { LoggerService } from './service';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ILoggerService,
      useFactory: (config: ISecretsService) => {
        const logger = new LoggerService(
          config.logger.log_level,
          config.global.node_env,
        );
        return logger;
      },
      inject: [ISecretsService],
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
