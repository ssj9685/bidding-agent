import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsMobilePhone('ko-KR')
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  residence: string;
}
