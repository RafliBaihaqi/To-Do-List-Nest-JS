import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  readonly lastName: string;
}
