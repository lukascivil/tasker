// Packages
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' }
    // })
  ],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
