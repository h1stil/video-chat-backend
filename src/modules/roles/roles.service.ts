import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './models/roles.entity';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.create(roleDto);
    return role;
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
