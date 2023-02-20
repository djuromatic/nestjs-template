import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserSettingsDto } from './dto/user-settings.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsersPaginated(query: PaginatedQuery): Promise<Paginated<User>> {
    const result = await this.userRepository.paginated(query);
    return {
      ...result,
      data: result.data.map((user) => plainToInstance(UserDto, user)),
    };
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
  }

  async createUser(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create({
      ...userDto,
      profile: userDto.profile ? userDto.profile : new UserProfileDto(),
      settings: userDto.settings ? userDto.settings : new UserSettingsDto(),
    });

    let result = await this.userRepository.save(user);

    result = {
      ...result,
      profile: plainToInstance(UserProfileDto, result.profile, {
        excludeExtraneousValues: true,
      }),
      settings: plainToInstance(UserSettingsDto, result.settings, {
        excludeExtraneousValues: true,
      }),
    };

    return plainToInstance(UserDto, result, { excludeExtraneousValues: true });
  }
}
