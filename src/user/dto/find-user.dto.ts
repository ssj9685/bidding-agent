import { IsEmail, IsMobilePhone, ValidateIf } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  @ValidateIf((o) => !o.name || o.email)
  email: string;

  @ValidateIf((o) => !o.email || o.name)
  name: string;

  @IsMobilePhone('ko-KR')
  phone: number;

  residence: string;
}
