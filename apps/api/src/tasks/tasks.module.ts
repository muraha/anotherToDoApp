import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
