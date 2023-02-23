import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenTelemetryService {
  private sdk: opentelemetry.NodeSDK;
  constructor() {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

    this.sdk = new opentelemetry.NodeSDK({
      traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
      instrumentations: [getNodeAutoInstrumentations()],
    });

    this.sdk.start();
  }

  start() {
    this.sdk.start();
  }
}
