import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { DbModule } from '../db/db.module';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
      imports: [DbModule],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
