import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({ example: 'ADMIN or USER', description: 'Role' })
  @IsString({ message: 'Should be a string' })
  readonly value: string;

  @ApiProperty({ example: '12', description: "User's id" })
  @IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;
}
