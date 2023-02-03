import {
  Controller,
  Get,
  Logger,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

import { PermissionsGuard } from 'libs/auth0/permission-guard/guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  createUser() {
    this.logger.log('Creating user');
    return this.userService.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
    });
  }

  @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  @Get('protected')
  getHelloProtected(): Promise<User[]> {
    return this.userService.findAll();
  }
}
