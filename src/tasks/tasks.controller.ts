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
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './shared/services/task.service';
import { Observable, of } from 'rxjs';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

// Models
import { Task } from './shared/models/Task.model';
import { GetListQuery } from 'src/shared/models/GetListQuery.model';

// Pipes
import { ParseListQueryPipe } from '../shared/pipes/parse-list-query.pipe';
import { GetManyQuery } from 'src/shared/models/GetManyQuery.model';
import { ListValidatorInterceptor } from 'src/shared/interceptors/list-validator.interceptor';
import { isArray } from 'class-validator';
import { map } from 'rxjs/operators';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  // query: {
  //   query: GetListQuery | GetManyQuery;
  //   listType: 'getMany' | 'getList';
  // },
  // GetList with filter range sort pattern
  @UseInterceptors(ListValidatorInterceptor)
  @Get()
  @HttpCode(200)
  @ApiQuery({ type: '{key: string}', name: 'filter' })
  @ApiQuery({ type: '[number, number]', name: 'range', required: false })
  @ApiQuery({ type: '[number, number]', name: 'sort', required: false })
  @ApiOperation({
    summary: 'getList or getMany methods',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of Task records',
    type: Task,
  })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  getAllWithQuery(
    @Query()
    getListQuery: GetListQuery,
  ): Observable<{
    data: Array<Task>;
    contentRange?: [number, number, number];
  }> {
    const isInvalidQueryWithFilterId =
      getListQuery.filter.id &&
      !isArray(getListQuery.filter.id) &&
      !getListQuery.range &&
      !getListQuery.sort;

    console.log(1);
    console.log(getListQuery);

    if (isInvalidQueryWithFilterId) {
      throw new HttpException('cafe', HttpStatus.BAD_REQUEST);
    }

    if (getListQuery.range && getListQuery.sort) {
      return this.taskService.getList(getListQuery);
      // pipe(map(el => el.data))
    } else if (getListQuery.filter.id) {
      return this.taskService.getMany(getListQuery);
    }

    return of({ data: [], contentRange: [0, 9, 10] });
  }

  // GetList
  @Get()
  @HttpCode(200)
  getAll(): Observable<Array<Task>> {
    console.log(2);

    return this.taskService.getAll();
  }

  // GetOne
  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', ParseIntPipe) id: number): Observable<Task> {
    return this.taskService.getOne(id);
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
