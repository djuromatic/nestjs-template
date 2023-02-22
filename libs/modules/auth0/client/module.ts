import { Module } from '@nestjs/common';
import { SecretsModule } from 'libs/modules/global/secrets/module';
import { Auth0ClientService } from './service';

@Module({
  providers: [Auth0ClientService],
  imports: [SecretsModule],
})
export class Auth0ClientModule {}
