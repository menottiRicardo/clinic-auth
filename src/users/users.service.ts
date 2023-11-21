import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findOne(username: string): Promise<User> {
    return this.user.findOne({ username }).exec();
  }

  async create(user: User) {
    const createdUser = new this.user(user);
    return createdUser.save();
  }
}
