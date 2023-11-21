import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('clinic')
  createClinic(@Request() req) {
    return this.usersService.createClinic(req.body);
  }
}
