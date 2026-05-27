import { Injectable } from '@nestjs/common';
import type { DB } from 'shared/db';
import { InjectDb } from 'src/db/db.provider';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectDb() private readonly db: DB) {}

  create(createTodoDto: CreateTodoDto) {
    return createTodoDto;
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, _updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
