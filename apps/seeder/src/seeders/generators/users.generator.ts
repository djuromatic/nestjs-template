import { faker } from '@faker-js/faker';

import { User } from 'apps/bizzlet/src/user/entity/user.entity';
import { UserProfile } from 'apps/bizzlet/src/user/entity/user-profile.entity';
import { UserSettings } from 'apps/bizzlet/src/user/entity/user-settings.entity';
import { UserNotification } from 'apps/bizzlet/src/user/entity/user-notification.entity';

/**
 * Creates a random name
 * @returns Object containing a random first and last name
 */
export const generateName = (): {
  firstName: string;
  lastName: string;
} => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return { firstName, lastName };
};

export const generateRandomUser = (
  firstName?: string,
  lastName?: string,
): Partial<User> => {
  const user = new User();

  user.id = faker.datatype.uuid();
  user.publicId = faker.datatype.uuid();
  user.email = faker.internet.email(firstName, lastName);
  user.status = faker.datatype.number({ min: 0, max: 1 });

  return user;
};

/**
 * Creates a random user
 * @param userId Creates a random user profile for the specified userId
 * @returns User profile containing name and address
 */
export const generateRandomUserProfile = (
  userId: string,
  firstName?: string,
  lastName?: string,
): Partial<UserProfile> => {
  const profile = new UserProfile();

  profile.id = faker.datatype.uuid();
  profile.userId = userId;
  profile.firstName = firstName ?? faker.name.firstName();
  profile.lastName = lastName ?? faker.name.lastName();
  profile.location =
    `${faker.address.streetAddress()}` +
    `, ${faker.address.city()}` +
    `, ${faker.address.country()}`;

  return profile;
};

/**
 * Generates the settings for the given user
 * @param user_id The id of the user for which to create the settings
 * @returns User settings, containing the settings id and default currency
 */
export const generateRandomUserSettings = (
  user_id: string,
): Partial<UserSettings> => {
  const settings = new UserSettings();

  settings.id = faker.datatype.uuid();
  settings.defaultCurrency = 'USD';
  settings.userId = user_id;

  return settings;
};

/**
 * Generates a random number of notifications (between min and max) for the given user
 * @param user_id The id of the user to whom the notifications will be connected
 * @param min The minimum number of notifications to generate
 * @param max The maximum number of notifications to generate
 * @returns An array of notifications containing the required fields
 */
export const generateRandomUserNotifications = (
  user_id: string,
  min: number = 0,
  max: number = 5,
): Partial<UserNotification>[] => {
  const notifications: Partial<UserNotification>[] = [];

  const len = Math.round(Math.random() * (max - min)) + min;
  for (let i = 0; i < len; i++) {
    const notification = new UserNotification();
    notification.id = faker.datatype.uuid();
    notification.userId = user_id;

    notification.type = faker.datatype.number({ min: 0, max: 1 });
    notification.message = faker.lorem.sentence();
    notification.metadata = JSON.parse(faker.datatype.json());

    notifications.push(notification);
  }

  return notifications;
};

/**
 * Interface for exporting the generated users and their data
 */
export interface UserGeneratorData {
  users: Partial<User>[];
  profiles: Partial<UserProfile>[];
  settings: Partial<UserSettings>[];
  notifications: Partial<UserNotification>[];
}

export const generateUsers = (len = 10): UserGeneratorData => {
  const returnData: UserGeneratorData = {
    users: [],
    profiles: [],
    settings: [],
    notifications: [],
  };
  for (let i = 0; i < len; i += 1) {
    const { firstName, lastName } = generateName();
    const user = generateRandomUser(firstName, lastName);
    const profile = generateRandomUserProfile(user.id, firstName, lastName);
    const setting = generateRandomUserSettings(user.id);
    const user_notifications = generateRandomUserNotifications(user.id);

    returnData.users.push(user);
    returnData.profiles.push(profile);
    returnData.settings.push(setting);
    returnData.notifications.push(...user_notifications);
  }

  return returnData;
};

export const generatedUserData: UserGeneratorData = generateUsers();
