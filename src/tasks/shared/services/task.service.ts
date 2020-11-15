// Packages
import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

// Models
import { GetListQuery } from 'src/shared/models/GetListQuery.model';
import { TaskEntity } from '../entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  getAll(): Observable<Array<TaskEntity>> {
    return from(this.taskRepository.find());
  }

  getList(getListQuery: GetListQuery): Observable<{ data: Array<TaskEntity>; contentRange: [number, number, number] }> {
    const query: FindManyOptions<TaskEntity> = {
      where: { id: getListQuery.filter.id },
      take: getListQuery.range[1] - getListQuery.range[0],
      skip: getListQuery.range[0]
    };

    return from(this.taskRepository.findAndCount(query)).pipe(
      map(el => {
        return {
          data: el[0].slice(getListQuery.range[0], getListQuery.range[1]),
          contentRange: [getListQuery.range[0], getListQuery.range[1], el[1]]
        };
      })
    );
  }

  getMany(getListQuery: GetListQuery): Observable<{ data: Array<TaskEntity> }> {
    const query: FindManyOptions<TaskEntity> = { where: { id: getListQuery.filter.id } };

    return from(this.taskRepository.find(query)).pipe(
      map(savedTask => {
        return {
          data: savedTask
        };
      })
    );
  }

  getOne(id: number): Observable<TaskEntity> {
    const savedTask = this.taskRepository.findOne(id);

    return from(savedTask);
  }

  create(task: TaskEntity): Observable<TaskEntity> {
    const newTask = new TaskEntity();
    newTask.description = task.description;
    newTask.completed = task.completed;

    const savedTask = this.taskRepository.save(newTask);

    return from(savedTask);
  }

  update(task: TaskEntity): Observable<TaskEntity> {
    return from(this.taskRepository.findOne(task.id))
      .pipe(
        map(taskToUpdate => {
          taskToUpdate.completed = task.completed;
          taskToUpdate.description = task.description;

          return taskToUpdate;
        }),
        switchMap(taskToUpdate => this.taskRepository.save(taskToUpdate))
      )
      .pipe(from);
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.taskRepository.delete({ id }));
  }
}
