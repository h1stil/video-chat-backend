import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Nick', description: 'Name' })
  readonly name: string;

  @ApiProperty({ example: 'dfj@mail.com', description: 'Unique EMail' })
  readonly email: string;

  @ApiProperty({ example: '*******', description: 'Password' })
  readonly password: string;
}
