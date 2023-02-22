import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/models/user.entity';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto): Promise<string> {
    const user = await this.validateLoginUser(userDto);
    return this.generateToken(user);
  }

  async registrate(userDto: CreateUserDto): Promise<string> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
      name: user.name,
    };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  private async validateLoginUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }
}
