import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import * as opentelemetry from '@opentelemetry/sdk-node';
import {
  ConsoleSpanExporter,
  BatchSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { AWSXRayPropagator } from '@opentelemetry/propagator-aws-xray';
import { AWSXRayIdGenerator } from '@opentelemetry/id-generator-aws-xray';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

export class OpenTelemetryTracing {
  private sdk: opentelemetry.NodeSDK | null;
  constructor(
    private readonly serviceName: string,
    private readonly exporter: string,
  ) {
    // configure the SDK to export telemetry data to the console
    // enable all auto-instrumentations from the meta package
    this.sdk = this.nodeSDKBuilder(this.exporter);

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
      [SemanticResourceAttributes.SERVICE_NAME]: this.serviceName,
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
      [SemanticResourceAttributes.SERVICE_NAME]: this.serviceName,
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

  private buildJaegerSDK(): opentelemetry.NodeSDK {
    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: this.serviceName,
    });
    const traceExporter = new JaegerExporter({
      // for now only used in docker-compose for local environment
      endpoint: 'http://jaeger:14268/api/traces',
    });
    const spanProcessor = new BatchSpanProcessor(traceExporter);
    return new opentelemetry.NodeSDK({
      resource,
      instrumentations: [getNodeAutoInstrumentations()],
      traceExporter,
      spanProcessor,
    });
  }

  private nodeSDKBuilder(type: string): opentelemetry.NodeSDK | null {
    switch (type) {
      case 'console':
        return this.buildConsoleSDK();
      case 'aws':
        return this.buildAwsSDK();
      case 'jaeger':
        return this.buildJaegerSDK();
      case 'none':
        return null;
      default:
        throw new Error(`Invalid opentelemetry exporter type: ${type}`);
    }
  }
}
