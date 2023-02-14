import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ISecretsService } from './adapter';
import { SecretsService } from './service';

// const envConfig = () => {
//   const option: ConfigModuleOptions = {
//     isGlobal: true,
//     load: [appConfiguration],
//     cache: true, // env variables will be cached in the memory.
//   };

//   if (process.env.NODE_ENV === 'local') {
//     option.envFilePath = [`.env.local`];
//   }

//   return option;
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: ISecretsService,
      useClass: SecretsService,
    },
  ],
  exports: [ISecretsService],
})
export class SecretsModule {}
