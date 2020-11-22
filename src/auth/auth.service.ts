// Packages
import { Injectable } from '@nestjs/common';
import { GetOneResult } from 'src/shared/models/get-one-result.model';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
