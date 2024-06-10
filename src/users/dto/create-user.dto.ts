import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(2, { message: 'Имя не может быть короче 2 символов' })
  @MaxLength(30, { message: 'Имя не может быть длиннее 30 символов' })
  username: string;

  @MinLength(2, { message: 'Описание не может быть короче 2 символов' })
  @MaxLength(200, { message: 'Описание не может быть длиннее 200 символов' })
  @IsOptional()
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
