import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';
import { RolesGuard } from '../auth/roles.guards';
import { Roles } from '../auth/roles-auth.decorator';
import { RoleDto } from './models/add-role.dto';
import { BanUserDto } from './models/ban-user.dto';

@ApiTags('Users (only for ADMIN)')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get a user by email' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @Get('/:email')
  getUserById(@Param() params): Promise<User> {
    return this.usersService.getUserByEmail(params.email);
  }

  @ApiOperation({ summary: 'Provide a role' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() roleDto: RoleDto) {
    return this.usersService.addRole(roleDto);
  }

  @ApiOperation({ summary: 'Bun a user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  bunUser(@Body() banDto: BanUserDto) {
    return this.usersService.banUser(banDto);
  }
}
