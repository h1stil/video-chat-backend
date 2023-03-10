import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { type } from 'node:os';

export class CreateUserDto {
  @ApiProperty({ example: 'Nick', description: 'Name' })
  @IsString({ message: 'Should be a string' })
  readonly name: string;

  @ApiProperty({ example: 'dfj@mail.com', description: 'Unique EMail' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'This is not an email' })
  readonly email: string;

  @ApiProperty({ example: '*******', description: 'Password' })
  @IsString({ message: 'Should be a string' })
  @Length(3, 16, { message: 'Not less than 3, no more than 16' })
  readonly password: string;
}

export type LoginUserDto = Omit<CreateUserDto, 'name'>;
