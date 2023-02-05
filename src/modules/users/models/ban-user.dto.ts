import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '12', description: "User's id" })
  @IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;

  @ApiProperty({ example: 'Terrorist', description: 'Reason of ban' })
  @IsString({ message: 'Should be a string' })
  readonly banReason: string;
}
