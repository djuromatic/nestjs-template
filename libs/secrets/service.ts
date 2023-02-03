import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISecretsService } from './adapter';

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }
  database = {
    host: this.get('DB_HOST'),
    port: this.get('DB_PORT'),
    user: this.get('DB_USER'),
    pass: this.get('DB_PASS'),
    dbname: this.get('DB_NAME'),
  };
  global = {
    node_env: this.get('NODE_ENV') ?? 'prod',
    port: this.get('PORT') ?? 3000,
  };
  logger = { log_level: this.get('LOG_LEVEL') };
  auth0 = {
    audiance: this.get('AUTH_AUDIENCE'),
    issuer: this.get('AUTH_ISSUER'),
  };
}
