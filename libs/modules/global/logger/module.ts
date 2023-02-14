import { Module } from '@nestjs/common';
import { SecretsModule } from '../secrets/module';

@Module({
  imports: [SecretsModule],
  providers: [],
  exports: [],
})
export class LoggerModule {}
