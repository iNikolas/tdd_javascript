import { Test, TestingModule } from '@nestjs/testing';

import { DbModule } from '../db/db.module';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
      imports: [DbModule],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
