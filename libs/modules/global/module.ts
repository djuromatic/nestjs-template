import { Global, Module } from '@nestjs/common';

import { LoggerModule } from './logger/module';
import { SecretsModule } from './secrets/module';
import { TracingModule } from './tracing/module';

@Global()
@Module({
  imports: [LoggerModule, SecretsModule, TracingModule],
  exports: [LoggerModule, SecretsModule, TracingModule],
})
export class GlobalModule {}
