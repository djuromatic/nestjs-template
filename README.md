## Description

## Installation

```bash
# install dependencies
$ yarn app:install

# generate certificate
# you need to have mkcert installed
# https://formulae.brew.sh/formula/mkcert
$ yarn nestjs-template:cert

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
yarn migrate:run
```

To generate a new migration for a new table or a change to an existing table first set the name of your migration into the yarn configuration, then you can run the migration, and finally, unset the name of the migration from the configuration.

```bash
# set migration name
yarn config set name name-of-migration
# generate migration
yarn migrate:generate
# unset migration name
yarn config unset name
```

This will generate a new migration file in the `apps/seeder/src/migrations` folder with the `TIMESTAMP-name-of-migration.ts` file name. To apply the migration to the database simply run the `migrate:run` command again.

### Running the seeders

Seeders will generate sample data for the users and organizations. To seed the database run the following command:

```bash
# seed the database
yarn seeder:run
```

To create a new seeder run the following commands

```bash
# set seeder name
yarn config set name name-of-seeder
# create seeder
yarn seeder:create
# unset seeder name
yarn config unset name
```

This will create a new seeder file in the `apps/seeder/src/seeders` folder with the `TIMESTAMP-name-of-seeder.ts` file name. Add the seeder logic and simply run the `seeder:run` command again.
