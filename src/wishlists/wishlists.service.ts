import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  findAll(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find();
  }

  async findOne(id: number): Promise<Wishlist | null> {
    const wishlist = await this.wishlistsRepository.findOneBy({ id });
    if (!wishlist) {
      throw new ForbiddenException('Такого списка пожеланий не существует');
    }
    return wishlist;
  }

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const wishlist = this.wishlistsRepository.create(createWishlistDto);
    return await this.wishlistsRepository.save(wishlist);
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    await this.findOne(id);
    await this.wishlistsRepository.update(id, updateWishlistDto);
    return 'Данные списка пожеланий успешно изменены';
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.wishlistsRepository.delete(id);
    return 'Список пожеланий успешно удален';
  }
}
