import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Todo } from '@todo-vectorsolv-app/api-interfaces';

import { AppService } from './app.service';

@Controller('todo')
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

  @Delete('delTodo/:id')
  delTodo(@Param('id') id: string) {
    console.log(id)
    return this.appService.delTodo(id);
  }
}
