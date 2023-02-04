import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/models/user.entity';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from '../users/users.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registrate')
  registrate(@Body() userDto: CreateUserDto) {
    return this.authService.registrate(userDto);
  }
}
