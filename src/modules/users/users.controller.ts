import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './models/user.entity';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
}
