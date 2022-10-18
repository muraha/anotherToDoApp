import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import config from '../../ormconfig'
import { TaskModule } from './tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TaskModule,
  ],
})
export class AppModule {}
