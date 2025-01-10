import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection, getManager } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await getConnection(); //.runMigrations();

  // const schemas = await getManager().query(
  //   'select schema_name as name from information_schema.schemata;',
  // );

  // if (Array.isArray(schemas)) {
  //   schemas.forEach((schema) => {
  //     console.log(`SCHEMA: ${schema}`);
  //   });
  // }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
