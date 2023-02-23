import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Paginated, PaginatedQuery } from 'libs/modules/database/adapter';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserSettingsDto } from './dto/user-settings.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsersPaginated(query: PaginatedQuery): Promise<Paginated<UserDto>> {
    const result = await this.userRepository.paginated(query);
    return {
      ...result,
      data: result.data.map((user) => plainToInstance(UserDto, user)),
    };
  }

  async getUserById(id: string): Promise<UserDto> {
    const result = this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    return plainToInstance(UserDto, result);
  }

  async getUserByEmail(email: string): Promise<UserDto> {
    const result = this.userRepository.findOne({
      where: { email },
      relations: { profile: true },
    });

    return plainToInstance(UserDto, result);
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
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
