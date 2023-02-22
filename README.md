## Description

## Installation

```bash
# install dependencies
$ yarn app:install

# generate certificate
# you need to have mkcert installed
# https://formulae.brew.sh/formula/mkcert
$ yarn bizzllet:certificate

```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrating and seeding the database

### Running the migrations

```bash
# migrate database tables
npm run migrate:run
```

To generate a new migration for a new table or a change to an existing table run the following command

```bash
# generate migration
npm run migrate:generate --name=<Name_Of_Migration>
```

This will generate a new migration file in the `apps/seeder/src/migrations` folder with the `TIMESTAMP-Name-Of-Migration.ts` file name. To apply the migration to the database simply run the `migrate:run` command again.

### Running the seeders

Seeders will generate sample data for the users and organizations. To seed the database run the following command:

```bash
# seed the database
npm run seeder:run
```

To create a new seeder run the following command

```bash
# create a new seeder
npm run seeder:create --name=<Name_Of_Seeder>
```

This will create a new seeder file in the `apps/seeder/src/seeders` folder with the `TIMESTAMP-Name-Of-Seeder.ts` file name. Add the seeder logic and simply run the `seeder:run` command again.
