import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { dataSourceOptions } from '../../db/data-source'
import { TaskModule } from './tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TaskModule,
  ],
})
export class AppModule {}
