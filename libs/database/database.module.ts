import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISecretsService } from 'libs/global/secrets/adapter';
import TypeOrmConfig from './service';

@Module({
  providers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (secrets: ISecretsService) =>
        new TypeOrmConfig(secrets).createTypeOrmOptions(),
      inject: [ISecretsService],
    }),
  ],
})
export class DatabaseModule {}
