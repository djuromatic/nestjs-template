import { Module } from '@nestjs/common';
import { AuthorizationGuard } from './guard';
import { SecretsModule } from 'libs/modules/global/secrets/module';
import { ISecretsService } from 'libs/modules/global/secrets/adapter';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: AuthorizationGuard,
      useFactory: (secretsService: ISecretsService) =>
        new AuthorizationGuard(secretsService),
      inject: [ISecretsService],
    },
  ],
  exports: [AuthorizationGuard],
})
export class AuthorizationModule {}
