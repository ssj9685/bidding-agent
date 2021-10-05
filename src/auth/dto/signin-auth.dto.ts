import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
