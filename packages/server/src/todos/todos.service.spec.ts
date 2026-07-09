import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { DbModule } from '../db/db.module';
import { ConfigModule } from '@nestjs/config';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
      imports: [DbModule, ConfigModule.forRoot({ isGlobal: true })],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('duplicate items are invalid', async () => {
    const text = 'duplicate item test';

    const { listId } = await service.create({ text });
    expect(service.create({ text }, listId)).rejects.toThrow();
  });

  it('CAN save same item to different lists', async () => {
    const text = 'duplicate item test';

    const { listId } = await service.create({ text });
    const { listId: newListId } = await service.create({ text });
    expect(listId).not.toEqual(newListId);
  });
});
