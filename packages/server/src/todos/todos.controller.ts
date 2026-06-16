import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from 'shared/entities';

@Controller('lists')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('new')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Post(':id/add_item')
  createForList(@Body() createTodoDto: CreateTodoDto, @Param('id') id: string) {
    return this.todosService.create(createTodoDto, id);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.todosService.findAll(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
