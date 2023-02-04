import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'User', description: 'Role is user' })
  readonly value: string;

  @ApiProperty({ example: 'User', description: 'User role description' })
  readonly description: string;
}
