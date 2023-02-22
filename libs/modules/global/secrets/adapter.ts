export abstract class ISecretsService {
  global: {
    node_env: 'local' | 'prod';
    port: string;
    service_name: string;
  };
  auth0: {
    audiance: string;
    issuer: string;

    management_client_id: string;
    management_client_secret: string;
  };
  logger: {
    log_level: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    dbname: string;
    logging: boolean;
  };
  trace: {
    exporter: 'console' | 'aws' | 'none';
  };
}
