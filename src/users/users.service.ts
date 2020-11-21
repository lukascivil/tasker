// Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Models
import { CreateResult } from 'src/shared/models/create-result.model';
import { GetOneResult } from 'src/shared/models/get-one-result.model';

// Entities
import { UserEntity } from './entities/user.entity';
import { UpdateResult } from 'src/shared/models/update-result.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  getOne(id: number): Observable<GetOneResult<UserEntity | undefined>> {
    const query: FindOneOptions<UserEntity> = { where: { id } };

    return from(this.userRepository.findOne(query)).pipe(
      map(savedTask => {
        return {
          data: savedTask
        };
      })
    );
  }

  create(createUserDto: CreateUserDto): Observable<CreateResult<UserEntity>> {
    const newUser = new UserEntity();

    newUser.name = createUserDto.name;
    newUser.password = createUserDto.password;
    newUser.email = createUserDto.email;
    newUser.birthdate = createUserDto.birthdate;

    return from(this.userRepository.save(newUser)).pipe(
      map(savedUser => {
        return {
          data: savedUser
        };
      })
    );
  }

  update(id: number, updateUserDto: UpdateUserDto): Observable<UpdateResult<UserEntity>> {
    const query: FindOneOptions<UserEntity> = { where: { id } };

    return from(this.userRepository.findOne(query))
      .pipe(
        map(savedUser => {
          savedUser.birthdate = updateUserDto.birthdate || savedUser.birthdate;
          savedUser.name = updateUserDto.name || savedUser.name;
          savedUser.email = updateUserDto.email || savedUser.email;
          savedUser.birthdate = updateUserDto.birthdate || savedUser.birthdate;

          return savedUser;
        }),
        switchMap(userToUpdate => this.userRepository.save(userToUpdate))
      )
      .pipe(map(savedUser => ({ data: savedUser })));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete({ id }));
  }
}
