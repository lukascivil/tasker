// Packages
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// Pipes
import { ParseListQueryPipe } from './shared/pipes/parse-list-query.pipe';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, ParseListQueryPipe]
})
export class AppModule {}
