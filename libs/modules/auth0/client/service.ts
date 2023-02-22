import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';

@Injectable()
export class Auth0ClientService {
  private client: ManagementClient;
  constructor(private readonly secretsService: ISecretsService) {
    this.client = new ManagementClient({
      clientId: this.secretsService.auth0.management_client_id,
      clientSecret: this.secretsService.auth0.management_client_secret,
      domain: new URL(this.secretsService.auth0.issuer).hostname,
    });
  }

  public getClient() {
    return this.client;
  }
}

/**
 * @Example of usage
 */
// try {
//     const client = this.authClient.getClient();
//     const users = await client.getUsersByEmail('djuro.matic@mvpworkshop.co');

//     console.log('users', users);
//     return users;
//   } catch (e) {
//     console.log('error', e);
//   }
