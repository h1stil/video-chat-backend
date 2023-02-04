import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/user.entity';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleServise: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(userDto);
    const role = await this.roleServise.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
