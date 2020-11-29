// Packages
import { Injectable } from '@nestjs/common';
import { GetOneResult } from 'src/shared/models/get-one-result.model';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<GetOneResult<UserEntity> | null> {
    const user = await this.usersService.getOneByEmail(username).toPromise();

    console.log({ username, password, user });

    if (user && user.data?.password === password) {
      // const { password, ...result } = user;

      return user;
    }

    return null;
  }

  login(user: any): { access_token: string } {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto).toPromise();
  }
}
