import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/user.entity';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(userDto);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
