import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from 'libs/auth0/auth-guard/module';
import { PermissionsModule } from 'libs/auth0/permission-guard/module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'libs/database/database.module';
import { GlobalModule } from 'libs/global/module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    AuthorizationModule,
    PermissionsModule,
    GlobalModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    OrganizationModule,
  ],
})
export class AppModule {}
