import { Module } from '@nestjs/common';
import { SecretsModule } from '../secrets/module';

import { TracingService } from './open-telemetry';

@Module({
  imports: [SecretsModule],
  providers: [TracingService],
  exports: [],
})
export class TracingModule {}
