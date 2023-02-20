import { User } from '../../../bizzlet/src/entitis/user.entity';
import { faker } from '@faker-js/faker';

const makeRandomUser = () => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        is_active: faker.datatype.boolean(),
    }
};

const generateUsers = (len = 10) => {
    const users = [];
    let queryString = "";

    for (let i = 0; i < len; i += 1) {
        const user = makeRandomUser();
        users.push(user);
        queryString += `('${user.first_name}', '${user.last_name}', '${user.is_active}')`;

        if (i !== len - 1) {
            queryString += `,\n`;
        }
    }

    return { users, queryString };
}

export const users: Partial<User>[] = generateUsers().users;
