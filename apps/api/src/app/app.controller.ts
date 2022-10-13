import { Controller, Get, Post } from '@nestjs/common';

import { Todo } from '@todo-vectorsolv-app/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getTodos')
  getData() :Todo[] {
    return this.appService.getData();
  }

  @Post('addTodo')
  addTodo() {
    return this.appService.addTodo();
  }
}
