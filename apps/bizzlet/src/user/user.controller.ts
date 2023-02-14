import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UuidValidator } from 'libs/utils';
import { UserDto } from '../dto/user.dto';
import { User } from '../entitis/user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: UserDto) {
    return this.userService.create(body);
  }

  @Get()
  getUsers(@Query() query: PaginatedQuery): Promise<Paginated<User>> {
    return this.userService.findPaginated(query);
  }

  @Get(':userId')
  getUser(@Param('userId', new UuidValidator()) userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }
}
