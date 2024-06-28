import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateWishlistDto {
  @MinLength(1, { message: 'Название не может быть меньше 1 символа' })
  @MaxLength(250, { message: 'Название не может быть больше 250 символов' })
  @IsString()
  name: string;

  @MaxLength(1500, { message: 'Описание не может быть больше 1500 символов' })
  @IsString()
  description: string;

  @IsUrl()
  image: string;
}
