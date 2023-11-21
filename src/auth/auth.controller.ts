import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/core/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Public()
  @Post('sign-up')
  async signun(@Body() body) {
    return this.authService.signup(body);
  }
}
