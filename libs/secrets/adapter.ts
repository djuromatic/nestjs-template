export abstract class ISecretsService {
  global: {
    node_env: 'local' | 'prod';
    port: string;
  };
  auth0: {
    audiance: string;
    issuer: string;
  };
  logger: {
    log_level: string;
  };
}
