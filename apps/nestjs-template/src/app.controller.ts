import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'libs/auth0/auth-guard/guard';
import { PermissionsGuard } from 'libs/auth0/permission-guard/guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  @Get('protected')
  getHelloProtected(): string {
    return this.appService.getHello();
  }
}
