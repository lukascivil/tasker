import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './shared/services/task.service';
import { Task } from './shared/services/models/Task.model';
import { Observable } from 'rxjs';

// Models
import { QueryList } from './shared/services/models/QueryList.model';

// Pipes
import { ParseQueryListPipe } from './shared/pipes/query-list.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  // GetList with filter range sort pattern
  @Get()
  @HttpCode(200)
  getAllWithQuery(
    @Query(ParseQueryListPipe) query: QueryList,
  ): Observable<Array<Task>> {
    return this.taskService.getAllWithQuery(query);
  }

  // GetList
  @Get()
  @HttpCode(200)
  getAll(): Observable<Array<Task>> {
    return this.taskService.getAll();
  }

  // GetOne
  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', ParseIntPipe) id: number): Observable<Task> {
    return this.taskService.getById(id);
  }

  // Create
  @Post()
  @HttpCode(200)
  create(@Body() task: Task): Observable<Task> {
    return this.taskService.create(task);
  }

  // UpdateOne
  @Put()
  @HttpCode(200)
  update(@Body() task: Task): Observable<Task> {
    return this.taskService.update(task);
  }

  // DeleteOne
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number): Observable<void> {
    return this.taskService.deleteBydId(id);
  }
}
