import { Module } from '@nestjs/common';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { CatsModule } from './modules/tenanted/cats/cats.module';

@Module({
  imports: [TenantsModule, TenancyModule, CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
