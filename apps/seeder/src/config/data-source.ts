import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import migrations from '../migrations';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TypeormDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: false,
  migrationsRun: false,
  logging: true,

  entities: ['../../../nestjs-template/src/**/entity/*.entity.ts'],
  migrations,
});

TypeormDataSource.initialize()
  .then(() => {
    console.log(process.env.DB_NAME);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
