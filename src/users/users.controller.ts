import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './users.schema';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @MessagePattern('get_user_by_id')
  public async getUserById(@Payload() data: string): Promise<User> {
    const payload = JSON.parse(data);
    return this.usersService.findUserById(payload.sub);
  }

  @Post('clinic')
  createClinic(@Request() req) {
    return this.usersService.createClinic(req.body);
  }
}
