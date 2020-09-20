import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { take } from 'rxjs/operators';
import { Task } from './models/Task.model';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  it('should TaskService be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should get 10 tasks in memory', () => {
    taskService
      .getAll()
      .pipe(take(1))
      .subscribe(task => {
        const size = task.length;

        expect(size).toEqual(10);
      });
  });

  it('should get task by id', () => {
    const selectedId = 1;

    taskService
      .getById(selectedId)
      .pipe(take(1))
      .subscribe(task => {
        expect(task.id).toEqual(selectedId);
      });
  });

  it('should create new task and return the same', () => {
    const newTask: Task = {
      description: 'new task was created, and i have to study more',
      completed: false,
    };

    taskService
      .create(newTask)
      .pipe(take(1))
      .subscribe(task => {
        expect(task).toEqual(newTask);
      });
  });

  it('should delete task by id and return empty', () => {
    const selectedId = 3;

    taskService
      .deleteBydId(selectedId)
      .pipe(take(1))
      .subscribe(result => {
        expect(result).toEqual(undefined);
      });
  });
});
