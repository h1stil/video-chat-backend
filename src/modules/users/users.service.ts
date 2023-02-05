import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/user.entity';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { RoleDto } from './models/add-role.dto';
import { BanUserDto } from './models/ban-user.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleServise: RolesService, //  private fileService: FileService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    // TODO file avatar upload
    // const fileName = await this.fileService.createFile(image);
    console.log(userDto, 'userDto');
    const user = await this.userRepository.create(userDto);
    const role = await this.roleServise.getRoleByValue('USER');
    console.log(role, 'role');
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

  async addRole(roleDto: RoleDto): Promise<User> {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleServise.getRoleByValue(roleDto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return user;
    }
    throw new HttpException('User or role are not exist', HttpStatus.NOT_FOUND);
  }

  async banUser(banDto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(banDto.userId);
    if (user) {
      user.banned = true;
      user.banReason = banDto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
  }
}
