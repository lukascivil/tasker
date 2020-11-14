// Packages
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { GetManyQuery } from 'src/shared/models/GetManyQuery.model';

// Models
import { GetListQuery } from 'src/shared/models/GetListQuery.model';
import { Task } from '../models/Task.model';

@Injectable()
export class TaskService {
  tasks: Array<Task> = [
    { id: 1, description: 'Tarefa 1', completed: true },
    { id: 2, description: 'Tarefa 2', completed: false },
    { id: 3, description: 'Tarefa 3', completed: true },
    { id: 4, description: 'Tarefa 4', completed: false },
    { id: 5, description: 'Tarefa 5', completed: false },
    { id: 6, description: 'Tarefa 6', completed: true },
    { id: 7, description: 'Tarefa 7', completed: false },
    { id: 8, description: 'Tarefa 8', completed: true },
    { id: 9, description: 'Tarefa 9', completed: false },
    { id: 10, description: 'Tarefa 10', completed: true },
  ];

  getAll(): Observable<Array<Task>> {
    return of(this.tasks);
  }

  getList(
    getListQuery: GetListQuery,
  ): Observable<{ data: Array<Task>; contentRange: [number, number, number] }> {
    const selectedTasks = this.tasks.slice(
      getListQuery.range[0],
      getListQuery.range[1],
    );
    const contentRange: [number, number, number] = [
      getListQuery.range[0],
      getListQuery.range[1],
      this.tasks.length,
    ];

    return of({ data: selectedTasks, contentRange });
  }

  getMany(getListQuery: GetListQuery): Observable<{ data: Array<Task> }> {
    const ids = getListQuery.filter.id as Array<number>;
    console.log({ ids });

    const selectedTasks = this.tasks.filter(el => {
      return ids.some(id => id === el?.id);
    });

    console.log({ getListQuery, selectedTasks });

    return of({ data: selectedTasks });
  }

  getOne(id: number): Observable<Task> {
    return of(this.tasks.find(el => el.id === id));
  }

  create(task: Task): Observable<Task> {
    const lastId = this.tasks[this.tasks.length - 1].id + 1;

    task.id = lastId;
    this.tasks.push(task);

    return of(task);
  }

  update(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(el => el.id === task.id);

    if (index !== -1) {
      this.tasks[index].description = task.description;
      this.tasks[index].completed = task.completed;
    }

    return of(this.tasks[index]);
  }

  deleteBydId(id: number): Observable<void> {
    const index = this.tasks.findIndex(task => task.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);

      return of();
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Not found',
      },
      404,
    );
  }
}
