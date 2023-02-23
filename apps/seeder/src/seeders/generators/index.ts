import * as fs from 'fs';

import { generatedUserData, UserGeneratorData } from './users.generator';
import {
  generatedOrganizationData,
  generateOrganizationUser,
  OrganizationGeneratorData,
} from './organizations.generator';

import { OrganizationUser } from 'apps/bizzlet/src/organization/entity/organization-user.entity';
const seededOrganizationDataPath =
  __dirname + '/../seeded_data/organizations.json';
const seededUserDataPath = __dirname + '/../seeded_data/users.json';

let userData: UserGeneratorData;
if (fs.existsSync(seededUserDataPath)) {
  userData = JSON.parse(
    fs.readFileSync(seededUserDataPath, { encoding: 'utf8' }),
  );
} else {
  userData = generatedUserData;
}

let organizationData: OrganizationGeneratorData;
if (fs.existsSync(seededOrganizationDataPath)) {
  organizationData = JSON.parse(
    fs.readFileSync(seededOrganizationDataPath, { encoding: 'utf8' }),
  );
} else {
  organizationData = generatedOrganizationData;
}

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

if (!fs.existsSync(seededOrganizationDataPath)) {
  organizationData.users = addUsersToOrganizations();
}

export { userData, organizationData };
