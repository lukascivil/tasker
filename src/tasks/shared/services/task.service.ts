// Packages
import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { map, switchMap } from 'rxjs/operators';

// Models
import { GetListQuery } from 'src/shared/models/get-list-query.model';
import { GetOneResult } from 'src/shared/models/get-one-result.model';

// Entities
import { TaskEntity } from '../entity/task.entity';
import { GetListResult } from 'src/shared/models/get-list-result.model';
import { GetManyResult } from 'src/shared/models/get-many-result.model';
import { CreateResult } from 'src/shared/models/create-result.model';
import { UpdateResult } from 'src/shared/models/update-result.model';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  getList(getListQuery: GetListQuery): Observable<GetListResult<TaskEntity>> {
    const query: FindManyOptions<TaskEntity> = {
      where: { ...getListQuery.filter },
      take: getListQuery.range[1] - getListQuery.range[0],
      skip: getListQuery.range[0]
    };

    return from(this.taskRepository.findAndCount(query)).pipe(
      map(el => {
        return {
          data: el[0].slice(getListQuery.range[0], getListQuery.range[1]),
          contentRange: ['tasks', getListQuery.range[0], getListQuery.range[1], el[1]]
        };
      })
    );
  }

  getMany(getListQuery: GetListQuery): Observable<GetManyResult<TaskEntity>> {
    const query: FindManyOptions<TaskEntity> = { where: { id: getListQuery.filter.id } };

    return from(this.taskRepository.find(query)).pipe(
      map(savedTask => {
        return {
          data: savedTask
        };
      })
    );
  }

  getOne(id: number): Observable<GetOneResult<TaskEntity>> {
    const query: FindOneOptions<TaskEntity> = { where: { id } };

    return from(this.taskRepository.findOne(query)).pipe(
      map(savedTask => {
        return {
          data: savedTask
        };
      })
    );
  }

  create(task: CreateTaskDto): Observable<CreateResult<TaskEntity>> {
    const newTask = new TaskEntity();

    newTask.description = task.description;
    newTask.completed = task.completed;

    return from(this.taskRepository.save(newTask)).pipe(
      map(savedTask => {
        return {
          data: savedTask
        };
      })
    );
  }

  update(id, task: UpdateTaskDto): Observable<UpdateResult<TaskEntity>> {
    const query: FindOneOptions<TaskEntity> = { where: { id } };

    return from(this.taskRepository.findOne(query))
      .pipe(
        map(savedTask => {
          savedTask.completed = task.completed || savedTask.completed;
          savedTask.description = task.description || savedTask.description;
          savedTask.title = task.title || savedTask.title;

          return savedTask;
        }),
        switchMap(taskToUpdate => this.taskRepository.save(taskToUpdate))
      )
      .pipe(map(savedTask => ({ data: savedTask })));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.taskRepository.delete({ id }));
  }
}
