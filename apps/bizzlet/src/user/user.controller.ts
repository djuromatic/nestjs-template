import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UuidValidator } from 'libs/utils';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get()
  getUsers(@Query() query: PaginatedQuery): Promise<Paginated<User>> {
    return this.userService.findPaginated(query);
  }

  @Get(':id')
  getUser(@Param('id', new UuidValidator()) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() body: UserDto) {
    return this.userService.create(body);
  }
}
