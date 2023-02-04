import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './models/roles.entity';
import { RolesService } from './roles.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
