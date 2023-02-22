import { faker } from '@faker-js/faker';

import { User } from 'apps/bizzlet/src/user/entity/user.entity';
import { UserProfile } from 'apps/bizzlet/src/user/entity/user-profile.entity';
import { UserSettings } from 'apps/bizzlet/src/user/entity/user-settings.entity';
import { UserNotification } from 'apps/bizzlet/src/user/entity/user-notification.entity';

const DEFAULT_MAX_NOTIFICATIONS: number = 5;
const DEFAULT_MIN_NOTIFICATIONS: number = 0;
const DEFAULT_RANDOM_USERS: number = 10;

/**
 * Creates a random name
 * @returns {Object} containing random firstName and lastName string values
 */
export const generateName = (): {
  firstName: string;
  lastName: string;
} => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return { firstName, lastName };
};

/**
 *
 * @dev firstName and lastName are only used for generating an email that matches the name
 * @param firstName - The first name of the user if already generated
 * @param lastName - The last name of the user if already generated
 * @returns {User} - The generated user entity
 */
export const generateRandomUser = (
  firstName?: string,
  lastName?: string,
): User => {
  const user = new User();

  user.id = faker.datatype.uuid();
  user.publicId = faker.datatype.uuid();
  user.email = faker.internet.email(firstName, lastName);
  user.status = faker.datatype.number({ min: 0, max: 1 });

  return user;
};

/**
 * Creates a random user profile for the specified user
 * @param userId - The id of the user the profile will belong to
 * @param firstName - Optional, The first name of the user (if already generated)
 * @param lastName - Opitonal, The last name of the user (if already generated)
 * @returns {UserProfile} - The generated user profile entity
 */
export const generateRandomUserProfile = (
  userId: string,
  firstName?: string,
  lastName?: string,
): UserProfile => {
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
 * @param userId The id of the user for which to create the settings
 * @returns {UserSettings} - The generated user settings entity
 */
export const generateRandomUserSettings = (userId: string): UserSettings => {
  const settings = new UserSettings();

  settings.id = faker.datatype.uuid();
  settings.defaultCurrency = 'USD';
  settings.userId = userId;

  return settings;
};

/**
 * Generates a random number of notifications (between min and max) for the given user
 * @param userId The id of the user the notifications will belong to
 * @param min The minimum number of notifications to generate (default is DEFAULT_MIN_NOTIFICATIONS)
 * @param max The maximum number of notifications to generate (default is DEFAULT_MAX_NOTIFICATIONS)
 * @returns {UserNotification[]} - An array of notification entites that belong to the user
 */
export const generateRandomUserNotifications = (
  userId: string,
  min: number = DEFAULT_MIN_NOTIFICATIONS,
  max: number = DEFAULT_MAX_NOTIFICATIONS,
): UserNotification[] => {
  const notifications: UserNotification[] = [];

  const len = Math.round(Math.random() * (max - min)) + min;
  for (let i = 0; i < len; i++) {
    const notification = new UserNotification();
    notification.id = faker.datatype.uuid();
    notification.userId = userId;

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
  users: User[];
  profiles: UserProfile[];
  settings: UserSettings[];
  notifications: UserNotification[];
}

export const generateUsers = (
  len = DEFAULT_RANDOM_USERS,
): UserGeneratorData => {
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
