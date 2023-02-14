import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/database/adapter';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findPaginated(query: PaginatedQuery): Promise<Paginated<User>> {
    const result = await this.userRepository.paginated(query);
    return {
      ...result,
      data: result.data.map((user) => plainToInstance(UserDto, user)),
    };
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    const result = await this.userRepository.save(user);

    return plainToInstance(UserDto, result, { excludeExtraneousValues: true });
  }
}
