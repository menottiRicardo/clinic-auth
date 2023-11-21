import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    try {
      if (user && user?.password === pass) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  async validateToken(token: string): Promise<any> {
    try {
      const isValid = await this.jwtService.verifyAsync(token);
      return isValid;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  async login(user: any) {
    const userFound = await this.usersService.findOne(user.username);
    const payload = { username: userFound.username, sub: userFound._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: User) {
    const savedUser = await this.usersService.create(user);
    const payload = { username: savedUser.username, sub: savedUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
