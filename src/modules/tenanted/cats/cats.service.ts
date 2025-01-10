import { Inject, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Connection, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/modules/tenancy/tenancy.symbols';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<Cat>;

  constructor(@Inject(TENANT_CONNECTION) connection: Connection) {
    console.log('TEST', connection.getRepository(Cat));
    this.catsRepository = connection.getRepository(Cat);
  }

  create(createCatDto: CreateCatDto) {
    const cat = new Cat();
    cat.name = createCatDto.name;
    return this.catsRepository.save(cat);
  }

  findAll() {
    return []; // this.catsRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} cat`;
  // }

  // update(id: number, updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cat`;
  // }
}
