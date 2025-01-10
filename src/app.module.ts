import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { CatsModule } from './modules/tenanted/cats/cats.module';
import { TenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { publicDatasourceOptions } from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(publicDatasourceOptions),
    TenantsModule,
    TenancyModule,
    CatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware);
  }
}
