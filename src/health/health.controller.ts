// Packages
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { TasksHealth } from 'src/tasks/tasks.health';
import { UsersHealth } from 'src/users/users.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private usersHealth: UsersHealth,
    private tasksHealth: TasksHealth,
    private memoryHealthIndicator: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.usersHealth.isHealthy(),
      () => this.tasksHealth.isHealthy(),
      () => this.memoryHealthIndicator.checkHeap('memory', 150 * 1024 * 1024)
    ]);
  }
}
