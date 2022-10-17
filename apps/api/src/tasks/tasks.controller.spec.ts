import { Test, TestingModule } from '@nestjs/testing';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('AppController', () => {
  let tasks: TestingModule;

  beforeAll(async () => {
    tasks = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();
  });

  describe('getAllTasks', () => {
    it('should return list of tasks', () => {
      const tasksController = tasks.get<TasksController>(TasksController);
      expect(tasksController.getAllTasks()).toEqual({});
    });
  });
});
