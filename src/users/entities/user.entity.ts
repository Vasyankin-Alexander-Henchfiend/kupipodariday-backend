import { BaseEntity } from 'src/common/base.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner, { onDelete: 'CASCADE' })
  @JoinTable()
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user, { onDelete: 'CASCADE' })
  @JoinTable()
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishList) => wishList.owner, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  wishLists: Wishlist[];
}
