// Packages
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

// Services
import { TaskService } from './shared/services/task.service';

@Module({
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
