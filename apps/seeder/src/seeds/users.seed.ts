import { User } from '../../../nestjs-template/src/user/entity/user.entity';
import { faker } from '@faker-js/faker';

const makeRandomUser = () => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    is_active: faker.datatype.boolean(),
  };
};

const generateUsers = (len = 10) => {
  const users = [];

  for (let i = 0; i < len; i += 1) {
    users.push(makeRandomUser());
  }

  return users;
};

export const users: Partial<User>[] = generateUsers();
