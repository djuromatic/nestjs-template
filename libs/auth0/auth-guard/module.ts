import { Module } from '@nestjs/common';
import { ISecretsService } from 'libs/global/secrets/adapter';
import { SecretsModule } from 'libs/global/secrets/module';
import { AuthorizationGuard } from './guard';

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
