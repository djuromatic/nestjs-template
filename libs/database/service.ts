import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ISecretsService } from 'libs/global/secrets/adapter';

@Injectable()
export default class TypeOrmConfig implements TypeOrmOptionsFactory {
  readonly name: string;

  readonly host: string;

  readonly port: number;

  readonly username: string;

  readonly password: string;

  readonly synchronize: boolean;

  readonly logging: boolean;

  constructor(private secrets: ISecretsService) {
    console.log(secrets);
    const { dbname, host, port, username, password, logging } =
      this.secrets.database;
    this.name = dbname;
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.synchronize = true;
    this.logging = logging;
  }

  createTypeOrmOptions = (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.name,
      synchronize: this.synchronize,
      logging: this.logging,
      autoLoadEntities: true,
    };
  };
}
