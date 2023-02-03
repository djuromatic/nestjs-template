import { Module } from '@nestjs/common';
import { SecretsModule } from 'libs/secrets/module';

@Module({
  imports: [SecretsModule],
  providers: [],
  exports: [],
})
export class LoggerModule {}
