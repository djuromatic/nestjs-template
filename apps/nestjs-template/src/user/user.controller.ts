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
import { UuidValidator } from 'utils';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  // @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  getAllUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get()
  // @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  getUsers(@Query() query: PaginatedQuery): Promise<Paginated<User>> {
    return this.userService.findPaginated(query);
  }

  @Get(':id')
  // @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  getUser(@Param('id', new UuidValidator()) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  // @UseGuards(PermissionsGuard)
  @SetMetadata('permissions', ['read:test'])
  createUser(@Body() body: UserDto) {
    return this.userService.create(body);
  }
}
