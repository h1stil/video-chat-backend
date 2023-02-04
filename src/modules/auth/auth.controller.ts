import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/models/user.entity';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: String, description: 'JWT Token' })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, type: String, description: 'JWT Token' })
  @Post('/registrate')
  registrate(@Body() userDto: CreateUserDto) {
    return this.authService.registrate(userDto);
  }
}
