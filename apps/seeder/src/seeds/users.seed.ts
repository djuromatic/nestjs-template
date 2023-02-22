import { User } from '../../../nestjs-template/src/user/entity/user.entity';
import { UserProfile } from '../../../nestjs-template/src/user/entity/user-profile.entity';

import { faker } from '@faker-js/faker';

const makeRandomUser = (): Partial<User> => {
  const user = new User();

  user.id = faker.datatype.uuid();
  user.publicId = faker.datatype.number({
    min: 232903201,
    max: 1000000000000000,
  });
  user.email = faker.internet.email();
  user.status = faker.datatype.number({ min: 0, max: 1 });

  return user;
};

const makeRandomUserProfile = (user_id: string): Partial<UserProfile> => {
  const profile = new UserProfile();

  profile.id = user_id;
  profile.firstName = faker.name.firstName();
  profile.lastName = faker.name.lastName();
  profile.location =
    `${faker.address.streetAddress()}` +
    `, ${faker.address.city()}` +
    `, ${faker.address.country()}`;

  return profile;
};

const generateUsers = (len = 10) => {
  const users: Partial<User>[] = [];
  const profiles: Partial<UserProfile>[] = [];

  for (let i = 0; i < len; i += 1) {
    const user = makeRandomUser();
    const profile = makeRandomUserProfile(user.id);

    users.push(user);
    profiles.push(profile);
  }

  return { users, profiles };
};

const toExport = generateUsers();

export const users: Partial<User>[] = toExport.users;
export const profiles: Partial<UserProfile>[] = toExport.profiles;
