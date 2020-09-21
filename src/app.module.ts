// Packages
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

// Pipes
import { ParseListQueryPipe } from './shared/pipes/parse-list-query.pipe';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService, ParseListQueryPipe],
})
export class AppModule {}
