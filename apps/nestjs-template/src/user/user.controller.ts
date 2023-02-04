import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

import { PermissionsGuard } from 'libs/auth0/permission-guard/guard';
import { Paginated, PaginatedQuery } from 'libs/database/adapter';
import { UserDto } from '../dto/user.dto';
import { User } from '../entitis/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  createUser(@Body() body: UserDto) {
    return this.userService.create(body);
  }

  @Get()
  @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  getUsers(@Query() query: PaginatedQuery): Promise<Paginated<User>> {
    return this.userService.findPaginated(query);
  }

  @Get('/{userId}')
  @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }
}
