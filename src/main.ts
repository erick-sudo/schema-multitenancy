import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';

import { Tenant } from './modules/public/tenants/entities/tenant.entity';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { EntityNotFoundFilter } from './filters/entity-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Public schema datasource
  const publicDataSource = app.get(DataSource);

  // Run public migrations if one is pending
  if (await publicDataSource.showMigrations()) {
    await publicDataSource.runMigrations();
  }

  // Fetch all tenants
  const tenants = await publicDataSource.getRepository(Tenant).find();

  for (const tenant of tenants) {
    const tenantId = tenant.id.replaceAll('-', '_');
    const tenantConnection = await getTenantConnection(tenantId);

    // Create tenant schema if it does not exist
    await tenantConnection.query(
      `CREATE SCHEMA IF NOT EXISTS tenant_${tenantId}`,
    );

    // Check if there exists any pending migrations for the tenant
    if (await tenantConnection.showMigrations()) {
      // console.log(`Running migrations for tenant ${tenant.id}...`);
      await tenantConnection.runMigrations();
      // console.log(`Migrations for tenant ${tenant.id} completed.`);
    }
  }

  app.useGlobalFilters(new EntityNotFoundFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
