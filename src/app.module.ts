import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { CatsModule } from './modules/tenanted/cats/cats.module';
import { publicDatasourceOptions } from './orm.config';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(publicDatasourceOptions),
    TenantsModule,
    TenancyModule,
    CatsModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
