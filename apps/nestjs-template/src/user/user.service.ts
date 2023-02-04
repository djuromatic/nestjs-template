import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/database/adapter';
import { UserDto } from '../dto/user.dto';
import { User } from '../entitis/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}

  async findPaginated(query: PaginatedQuery): Promise<Paginated<User>> {
    const result = await this.usersRepository.paginated(query);
    return {
      ...result,
      data: result.data.map((user) => plainToInstance(UserDto, user)),
    };
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(user: UserDto): Promise<User> {
    const result = await this.usersRepository.save(
      this.usersRepository.create(user),
    );

    return plainToInstance(UserDto, result, { excludeExtraneousValues: true });
  }
}
