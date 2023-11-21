import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { Clinic } from './clinic.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private users: Model<User>,
    @InjectModel(Clinic.name) private clinics: Model<Clinic>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.users.findOne({ username }).exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.users.findOne({ _id: id }).exec();
  }

  async create(user: User) {
    const createdUser = new this.users(user);
    return createdUser.save();
  }

  async createClinic(clinic: Clinic) {
    const createdClinic = new this.clinics(clinic);
    return createdClinic.save();
  }
}
