import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISecretsService } from './adapter';

@Injectable()
export class SecretsService extends ConfigService implements ISecretsService {
  constructor() {
    super();
  }
  auth0 = {
    audiance: this.get('AUTH_AUDIENCE'),
    issuer: this.get('AUTH_ISSUER'),
  };
}
