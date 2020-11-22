// Packages
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';

// Pipes
import { ParseListQueryPipe } from './shared/pipes/parse-list-query.pipe';
import { UsersModule } from './users/users.module';
import { HealthController } from './health/health.controller';

// Health
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TerminusModule,
    HealthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TasksModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, ParseListQueryPipe]
})
export class AppModule {}
