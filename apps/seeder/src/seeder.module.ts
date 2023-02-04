import { Module } from '@nestjs/common';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
