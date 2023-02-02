import { Module } from '@nestjs/common';
import { ISecretsService } from 'libs/secrets/adapter';
import { SecretsModule } from 'libs/secrets/module';
import { SecretsService } from 'libs/secrets/service';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ISecretsService,
      useClass: SecretsService,
    },
  ],
})
export class AuthorizationModule {}
