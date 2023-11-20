import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/core/guards/local.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/core/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
