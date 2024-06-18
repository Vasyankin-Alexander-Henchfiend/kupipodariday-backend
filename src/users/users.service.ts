import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  findByName(userName: string): Promise<User> {
    return this.userRepository.findOneBy({ userName });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existName = await this.findByName(createUserDto.userName);
    const existEmail = await this.findByEmail(createUserDto.email);
    if (existName) {
      throw new ForbiddenException(
        'Пользователь с таким именем уже существует',
      );
    }
    if (existEmail) {
      throw new ForbiddenException(
        'Пользователь с такой электронной почтой уже существует',
      );
    }
    const password = this.hashService.getHash(createUserDto.password);
    const user = this.userRepository.create({ ...createUserDto, password });
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new ForbiddenException('Такого пользователя не существует');
    }
    if (updateUserDto.password) {
      updateUserDto.password = this.hashService.getHash(updateUserDto.password);
    }
    await this.userRepository.update(id, updateUserDto);
    return 'Данные пользователя успешно изменены';
  }

  async remove(id: number): Promise<string> {
    await this.userRepository.delete(id);
    return 'Пользователь успешно удален';
  }
}
