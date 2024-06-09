import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @MinLength(1, { message: 'Название не может быть меньше 1 символа' })
  @MaxLength(250, { message: 'Название не может быть больше 250 символов' })
  name: string;

  @Column()
  @MaxLength(1500, { message: 'Описание не может быть больше 1500 символов' })
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => User)
  owner: User;

  @ManyToMany(() => Wish)
  items: Wish[];
}
