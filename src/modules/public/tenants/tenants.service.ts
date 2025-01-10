import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { getManager, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { getTenantConnection } from 'src/modules/tenancy/tenancy.utils';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;

    tenant = await this.tenantsRepository.save(tenant);

    const schemaName = `tenant_${tenant.id}`;
    await getManager('public').query(
      `CREATE SCHEMA IF NOT EXISTS ${schemaName}`,
    );

    const connection = await getTenantConnection(`${tenant.id}`);
    await connection.runMigrations();
    await connection.close();

    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
