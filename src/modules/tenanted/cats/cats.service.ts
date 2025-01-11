import { Inject, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Connection, Repository } from 'typeorm';
import { TENANT_CONNECTION } from 'src/modules/tenancy/tenancy.symbols';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<Cat>;

  constructor(@Inject(TENANT_CONNECTION) connection: Connection) {
    this.catsRepository = connection.getRepository(Cat);
  }

  create(createCatDto: CreateCatDto) {
    const cat = new Cat();
    cat.name = createCatDto.name;
    return this.catsRepository.save(cat);
  }

  findAll() {
    return this.catsRepository.find();
  }

  findOne(id: string) {
    return this.findCat(id);
  }

  async update(catId: string, updateCatDto: UpdateCatDto & { id?: string }) {
    await this.findCat(catId);
    const { id, ...newUpdates } = updateCatDto;
    return this.catsRepository.save(newUpdates);
  }

  async remove(id: string) {
    return this.catsRepository.remove(await this.findCat(id));
  }

  findCat(id: string) {
    return this.catsRepository.findOneOrFail({ where: { id } });
  }
}
