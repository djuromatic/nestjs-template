import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from 'libs/auth0/auth-guard/module';
import { SecretsModule } from 'libs/secrets/module';
import { SecretsService } from 'libs/secrets/service';
import { PermissionsModule } from 'libs/auth0/permission-guard/module';

@Module({
  imports: [
    AuthorizationModule,
    PermissionsModule,
    SecretsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, SecretsService],
})
export class AppModule {}
