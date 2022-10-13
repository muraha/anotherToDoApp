import { Injectable } from '@nestjs/common';
import { Message } from '@todo-vectorsolv-app/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
