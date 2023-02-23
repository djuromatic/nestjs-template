import { Module } from '@nestjs/common';
import { OpenTelemetryService } from './service';

@Module({
  imports: [],
  providers: [OpenTelemetryService],
  exports: [OpenTelemetryService],
})
export class OpenTelemetryModule {}
