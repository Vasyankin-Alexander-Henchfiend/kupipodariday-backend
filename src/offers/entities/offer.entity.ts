import { IsBoolean, IsUrl } from 'class-validator';
import { BaseEntity } from 'src/common/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Offer extends BaseEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @Column()
  @IsUrl()
  item: string;

  @Column({ type: 'decimal', scale: 2, default: 0 })
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
