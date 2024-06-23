import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(id: number): Promise<Wish | null> {
    const wish = await this.wishRepository.findOneBy({ id });
    if (!wish) {
      throw new ForbiddenException('Такого пожелания не существует');
    }
    return wish;
  }

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishRepository.create(createWishDto);
    return await this.wishRepository.save(wish);
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    await this.findOne(id);
    await this.wishRepository.update(id, updateWishDto);
    return 'Данные пожелания успешно изменены';
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.wishRepository.delete(id);
    return 'Пожелание успешно удалено';
  }
}
