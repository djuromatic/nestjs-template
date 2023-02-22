import { faker } from '@faker-js/faker';

import { Organization } from 'apps/bizzlet/src/organization/entity/organization.entity';
import { OrganizationProfile } from 'apps/bizzlet/src/organization/entity/organization-profile.entity';
import { OrganizationSettings } from 'apps/bizzlet/src/organization/entity/organization-settings.entity';
import { OrganizationContact } from 'apps/bizzlet/src/organization/entity/organization-contact.entity';
import { OrganizationUser } from 'apps/bizzlet/src/organization/entity/organization-user.entity';

const DEFAULT_MAX_CONTACTS: number = 5;
const DEFAULT_MIN_CONTACTS: number = 0;
const DEFAULT_RANDOM_ORGANIZATIONS: number = 5;
const DEFAULT_ORGANIZATIONS_USER_ROLE: string = 'admin';

/**
 * Generate a random organization entity.
 * @returns {Organization} - The generated organization entity
 */
export const generateRandomOrganization = (): Organization => {
  const organization = new Organization();

  organization.id = faker.datatype.uuid();
  organization.name = faker.datatype.uuid();

  return organization;
};

/**
 * Generate a random organization profile entity for a given organization.
 * @param organizationId - The id of the organization the profile will belong to.
 * @returns {OrganizationProfile} - The generated organization profile entity
 */
export const generateRandomOrganizationProfile = (
  organizationId: string,
): OrganizationProfile => {
  const profile = new OrganizationProfile();

  profile.id = faker.datatype.uuid();
  profile.organizationId = organizationId;
  profile.location =
    `${faker.address.streetAddress()}` +
    `, ${faker.address.city()}` +
    `, ${faker.address.country()}`;

  return profile;
};

/**
 * Generate a random organization settings entity for a given organization.
 * @param organizationId - The id of the organization the settings will belong to.
 * @returns {OrganizationSettings} - The generated organization settings entity
 */
export const generateRandomOrganizationSettings = (
  organizationId: string,
): OrganizationSettings => {
  const settings = new OrganizationSettings();

  settings.id = faker.datatype.uuid();
  settings.organizationId = organizationId;
  settings.defaultCurrency = 'USD';
  settings.notificationSettings = JSON.parse(faker.datatype.json());

  return settings;
};

/**
 * Generate an array of random organization contact entities for a given organization.
 * @param organizationId - The id of the organization the contacts will belong to.
 * @param min - The minimum number of contacts to generate (default is DEFAULT_MIN_CONTACTS).
 * @param max - The maximum number of contacts to generate (default is DEFAULT_MAX_CONTACTS).
 * @returns {OrganizationContact[]} - An array of organization contact entities
 */
export const generateRandomOrganizationContacts = (
  organizationId: string,
  min: number = DEFAULT_MIN_CONTACTS,
  max: number = DEFAULT_MAX_CONTACTS,
): OrganizationContact[] => {
  const contacts: OrganizationContact[] = [];

  const len = Math.round(Math.random() * (max - min)) + min;
  for (let i = 0; i < len; i++) {
    const contact = new OrganizationContact();

    contact.id = faker.datatype.uuid();
    contact.organizationId = organizationId;
    contact.email = faker.internet.email();
    contact.invoice = faker.lorem.sentence();

    contacts.push(contact);
  }

  return contacts;
};

/**
 * Generate an organization user entry for the given user and the giver organization.
 * @param organizationId - The id of the organization the user will be added to.
 * @param userId - The id of the user to be added to the organization.
 * @param role - The role the user will have (default is DEFAULT_ORGANIZATIONS_USER_ROLE).
 * @returns {OrganizationUser} - The organization user entry for the given user and the giver organization.
 */
export const generateOrganizationUser = (
  organizationId: string,
  userId: string,
  role?: string,
): OrganizationUser => {
  const organizationUser = new OrganizationUser();

  organizationUser.id = faker.datatype.uuid();
  organizationUser.organizationId = organizationId;
  organizationUser.userId = userId;
  organizationUser.role = role ?? DEFAULT_ORGANIZATIONS_USER_ROLE;

  return organizationUser;
};

/**
 * Interface for exporting the generated organizations and their data
 */
export interface OrganizationGeneratorData {
  organizations: Organization[];
  profiles: OrganizationProfile[];
  settings: OrganizationSettings[];
  contacts: OrganizationContact[];
  users?: OrganizationUser[];
}

/**
 * Generate an object containing arrays of random organization, profile, settings, and contact entities.
 * @dev - Does not generate the organizations users, that has to be done outside of the generator
 * @param len - The number of organizations to generate (default is DEFAULT_RANDOM_ORGANIZATIONS).
 * @returns {OrganizationGeneratorData} - The object containing arrays of random organizations and their data
 */
export const generateOrganizations = (
  len = DEFAULT_RANDOM_ORGANIZATIONS,
): OrganizationGeneratorData => {
  const returnData: OrganizationGeneratorData = {
    organizations: [],
    profiles: [],
    settings: [],
    contacts: [],
  };

  for (let i = 0; i < len; i += 1) {
    const organization = generateRandomOrganization();
    const profile = generateRandomOrganizationProfile(organization.id);
    const setting = generateRandomOrganizationSettings(organization.id);
    const contacts = generateRandomOrganizationContacts(organization.id);

    returnData.organizations.push(organization);
    returnData.profiles.push(profile);
    returnData.settings.push(setting);
    returnData.contacts.push(...contacts);
  }

  return returnData;
};

export const generatedOrganizationData = generateOrganizations();
