import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UuidValidator } from 'libs/utils';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() query: PaginatedQuery): Promise<Paginated<User>> {
    return this.userService.getUsersPaginated(query);
  }

  @Get(':id')
  getUserById(@Param('id', new UuidValidator()) id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @Post()
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }
}
