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
    username: this.get('DB_USERNAME'),
    password: this.get('DB_PASSWORD'),
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
