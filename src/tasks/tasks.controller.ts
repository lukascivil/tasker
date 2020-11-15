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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { TaskService } from './shared/services/task.service';
import { Observable, of } from 'rxjs';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

// Models
import { GetListQuery } from 'src/shared/models/GetListQuery.model';

// Pipes
import { ListPaginationInterceptor } from 'src/shared/interceptors/list-pagination.interceptor';
import { isArray } from 'class-validator';
import { CreateTaskDto } from './shared/dto/create-task.dto';
import { TaskEntity } from './shared/entity/task.entity';
import { DeleteResult } from 'typeorm';
import { UpdateTaskDto } from './shared/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  // GetList and GetMany
  @UseInterceptors(ListPaginationInterceptor)
  @Get()
  @HttpCode(200)
  @ApiQuery({ type: '{key: string}', name: 'filter' })
  @ApiQuery({ type: '[number, number]', name: 'range', required: false })
  @ApiQuery({ type: '[number, number]', name: 'sort', required: false })
  @ApiOperation({
    summary: 'getList or getMany methods'
  })
  @ApiResponse({
    status: 200,
    description: 'A list of Task records',
    type: TaskEntity
  })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  getAllWithQuery(
    @Query()
    getListQuery: GetListQuery
  ): Observable<{
    data: Array<TaskEntity>;
    contentRange?: [number, number, number];
  }> {
    const isInvalidQueryWithFilterId =
      getListQuery.filter.id && !isArray(getListQuery.filter.id) && !getListQuery.range && !getListQuery.sort;

    console.log(1);
    console.log(getListQuery);

    if (isInvalidQueryWithFilterId) {
      throw new HttpException('cafe', HttpStatus.BAD_REQUEST);
    }

    if (getListQuery.range && getListQuery.sort) {
      return this.taskService.getList(getListQuery);
    } else if (getListQuery.filter.id) {
      return this.taskService.getMany(getListQuery);
    }

    return of({ data: [], contentRange: [0, 9, 10] });
  }
  // GetOne
  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', ParseIntPipe) id: number): Observable<TaskEntity> {
    return this.taskService.getOne(id);
  }

  // Create
  @Post()
  @HttpCode(200)
  create(@Body() task: CreateTaskDto): Observable<TaskEntity> {
    return this.taskService.create(task);
  }

  // Update
  @Put()
  @HttpCode(200)
  update(@Body() task: UpdateTaskDto): Observable<TaskEntity> {
    return this.taskService.update(task);
  }

  // Delete
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number): Observable<DeleteResult> {
    return this.taskService.delete(id);
  }
}
