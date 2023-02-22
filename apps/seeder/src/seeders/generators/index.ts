import { generatedUserData, UserGeneratorData } from './users.generator';
import {
  generatedOrganizationData,
  generateOrganizationUser,
  OrganizationGeneratorData,
} from './organizations.generator';

import { OrganizationUser } from 'apps/bizzlet/src/organization/entity/organization-user.entity';

const addUsersToOrganizations = (): OrganizationUser[] => {
  const organizationUsers: OrganizationUser[] = [];

  const users = generatedUserData.users;
  const organizations = generatedOrganizationData.organizations;

  for (let i = 0; i < users.length; i++) {
    if (i == 0) {
      organizationUsers.push(
        generateOrganizationUser(organizations[0].id, users[i].id, 'admin'),
      );
    }
  }

  return organizationUsers;
};

export const userData: UserGeneratorData = generatedUserData;

export const organizationData: OrganizationGeneratorData = {
  ...generatedOrganizationData,
  users: addUsersToOrganizations(),
};
