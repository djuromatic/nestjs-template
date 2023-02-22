import { Module } from '@nestjs/common';
import { SecretsModule } from '../secrets/module';

import { TracingService } from './open-telemetry';

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
  imports: [SecretsModule],
  providers: [TracingService],
  exports: [],
})
export class TracingModule {}
