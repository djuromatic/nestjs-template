import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import * as opentelemetry from '@opentelemetry/sdk-node';
import {
  ConsoleSpanExporter,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Injectable } from '@nestjs/common';
import { ISecretsService } from '../secrets/adapter';
import { AWSXRayPropagator } from '@opentelemetry/propagator-aws-xray';
import { AWSXRayIdGenerator } from '@opentelemetry/id-generator-aws-xray';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

@Injectable()
export class TracingService {
  private sdk: opentelemetry.NodeSDK | null;
  constructor(private readonly secretService: ISecretsService) {
    // configure the SDK to export telemetry data to the console
    // enable all auto-instrumentations from the meta package
    this.sdk = this.nodeSDKBuilder(this.secretService.trace.exporter);

    if (this.sdk) {
      this.sdk.start();
      process.on('SIGTERM', () => {
        this.sdk
          .shutdown()
          .then(() => console.log('Tracing terminated'))
          .catch((error) => console.log('Error terminating tracing', error))
          .finally(() => process.exit(0));
      });
    }
  }

  private buildConsoleSDK(): opentelemetry.NodeSDK {
    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]:
        this.secretService.global.service_name,
    });
    const exporter = new ConsoleSpanExporter();
    const spanProcessor = new BatchSpanProcessor(exporter);
    return new opentelemetry.NodeSDK({
      resource,
      instrumentations: [getNodeAutoInstrumentations()],
      traceExporter: exporter,
      spanProcessor,
    });
  }

  private buildAwsSDK(): opentelemetry.NodeSDK {
    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]:
        this.secretService.global.service_name,
    });
    const tracerConfig = {
      idGenerator: new AWSXRayIdGenerator(),
    };
    const traceExporter = new OTLPTraceExporter();
    const spanProcessor = new BatchSpanProcessor(traceExporter);
    const propagator = new AWSXRayPropagator();
    const sdk = new opentelemetry.NodeSDK({
      textMapPropagator: propagator,
      instrumentations: [getNodeAutoInstrumentations()],
      resource,
      spanProcessor,
      traceExporter,
    });
    sdk.configureTracerProvider(tracerConfig, spanProcessor);
    return sdk;
  }

  private nodeSDKBuilder(
    type: 'console' | 'aws' | 'none',
  ): opentelemetry.NodeSDK | null {
    switch (type) {
      case 'console':
        return this.buildConsoleSDK();
      case 'aws':
        return this.buildAwsSDK();
      case 'none':
        return null;
      default:
        throw new Error(`Invalid opentelemetry exporter type: ${type}`);
    }
  }
}
