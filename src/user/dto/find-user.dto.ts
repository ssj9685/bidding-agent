import { IsEmail, ValidateIf } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  @ValidateIf((o) => !o.name || o.email)
  email: string;
}
