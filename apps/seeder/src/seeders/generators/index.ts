import * as fs from 'fs';

import { generatedUserData, UserGeneratorData } from './users.generator';
import {
  generatedOrganizationData,
  generateOrganizationUser,
  OrganizationGeneratorData,
} from './organizations.generator';

import { OrganizationUser } from 'apps/bizzlet/src/organization/entity/organization-user.entity';
import { User } from 'apps/bizzlet/src/user/entity/user.entity';
import { HelperService } from 'libs/utils/helpers';
import { Organization } from 'apps/bizzlet/src/organization/entity/organization.entity';

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

const chooseUsers = (users): User[] => {
  const chosenUsers: User[] = [];
  const numberOfUsersToChoose = Math.ceil(users.length / 2);
  let floor: number = 1;

  while (chosenUsers.length < numberOfUsersToChoose) {
    const ceil: number =
      users.length - (numberOfUsersToChoose - chosenUsers.length) + 1;
    const chosenUserIndex: number = HelperService.randomInt(floor, ceil);

    chosenUsers.push(users[chosenUserIndex]);

    floor = chosenUserIndex;
  }

  return chosenUsers;
};

const addUsersToOrganizations = (): OrganizationUser[] => {
  const organizationUsers: OrganizationUser[] = [];

  const users: User[] = userData.users;
  const organizations: Organization[] = organizationData.organizations;

  for (let organization of organizations) {
    // TODO Change memeber role placeholder
    organizationUsers.push(
      generateOrganizationUser(organization.id, users[0].id, 'admin'),
    );
    const chosenUsers = chooseUsers(users);
    for (let user of chosenUsers) {
      organizationUsers.push(
        generateOrganizationUser(organization.id, user.id, 'member'),
      );
    }
  }

  return organizationUsers;
};

if (!fs.existsSync(seededOrganizationDataPath)) {
  organizationData.users = addUsersToOrganizations();
}

export { userData, organizationData };
