import {
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @MinLength(1, { message: 'Название не может быть короче 1 символа' })
  @MaxLength(250, { message: 'Название не может быть длинее 250 символов' })
  name: string;

  @Column()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    default: 0,
    type: 'decimal',
    scale: 2,
  })
  @IsNumber()
  price: number;

  @Column({
    default: 0,
    type: 'decimal',
    scale: 2,
  })
  @IsNumber()
  raised: number;

  @OneToMany(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @IsString()
  @MinLength(1, { message: 'Описание не может быть короче 1 символа' })
  @MaxLength(1024, { message: 'Описание не может быть длинее 1024 символов' })
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  @IsNumber()
  copied: number;
}
