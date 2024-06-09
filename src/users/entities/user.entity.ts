import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @MinLength(2, { message: 'Имя не может быть короче 2 символов' })
  @MaxLength(30, { message: 'Имя не может быть длиннее 30 символов' })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @MinLength(2, { message: 'Описание не может быть короче 2 символов' })
  @MaxLength(200, { message: 'Описание не может быть длиннее 200 символов' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner, { onDelete: 'CASCADE' })
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user, { onDelete: 'CASCADE' })
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishList) => wishList.owner, {
    onDelete: 'CASCADE',
  })
  wishLists: Wishlist[];
}
