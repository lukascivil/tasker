// Packages
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// Services
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getAvailableResources(): Observable<Array<string>> {
    return this.appService.getAvailableResources();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request);
  }
}
