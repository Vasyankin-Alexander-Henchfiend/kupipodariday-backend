import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private userService: UsersService,
    private wishService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number): Promise<Offer> {
    const user = await this.userService.findOne(userId);
    const item = await this.wishService.findOne(createOfferDto.itemId);
    if (item.owner.id === userId) {
      throw new ForbiddenException('Вы не можете скидываться на свой подарок');
    }
    const offer = this.offersRepository.create({
      ...createOfferDto,
      user,
      item,
    });
    if (Number(offer.amount) + Number(item.raised) > Number(item.price)) {
      throw new ForbiddenException(
        'Сумма которую вы пытаетесь скинуть превышает сумму подарка',
      );
    }
    let raised = Number(item.raised);
    await this.wishRepository.save({
      ...item,
      raised: (raised += +offer.amount),
    });
    await this.offersRepository.save(offer);
    return;
  }

  async findAll(): Promise<Offer[]> {
    return await this.offersRepository.find({
      relations: { user: true, item: true },
    });
  }

  async findOne(id: number): Promise<Offer | null> {
    const offer = await this.offersRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        item: true,
      },
    });
    if (!offer) {
      throw new ForbiddenException('Такого предложения не существует');
    }
    return offer;
  }
}
