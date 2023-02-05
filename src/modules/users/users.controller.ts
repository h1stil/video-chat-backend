import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './models/user.entity';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';
import { RolesGuard } from '../auth/roles.guards';
import { Roles } from '../auth/roles-auth.decorator';
import { RoleDto } from './models/add-role.dto';
import { BanUserDto } from './models/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
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
  @Post('/bun')
  bunUser(@Body() banDto: BanUserDto) {
    return this.usersService.banUser(banDto);
  }
}
