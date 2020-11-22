import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UsePipes,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import { UserEntity } from './entities/user.entity';
import { GetOneResult } from 'src/shared/models/get-one-result.model';
import { CreateResult } from 'src/shared/models/create-result.model';
import { DeleteResult } from 'typeorm';
import { UpdateResult } from 'src/shared/models/update-result.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GetOne
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Observable<GetOneResult<UserEntity>> {
    return this.usersService.getOne(id);
  }

  // Create
  @UseGuards(AuthGuard('local'))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() task: CreateUserDto): Observable<CreateResult<UserEntity>> {
    return this.usersService.create(task);
  }

  // Update
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Observable<UpdateResult<UserEntity>> {
    return this.usersService.update(id, updateUserDto);
  }
  // Delete
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Observable<DeleteResult> {
    return this.usersService.delete(id);
  }
}
