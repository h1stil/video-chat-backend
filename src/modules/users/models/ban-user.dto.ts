import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;

  @IsString({ message: 'Should be a string' })
  readonly banReason: string;
}
