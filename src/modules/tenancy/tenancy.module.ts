import {
  Global,
  InternalServerErrorException,
  Module,
  Scope,
} from '@nestjs/common';
import { TENANT_CONNECTION } from './tenancy.symbols';
import { Request as ExpressRequest } from 'express';
import { getTenantConnection } from './tenancy.utils';
import { REQUEST } from '@nestjs/core';

const connectionFactory = {
  provide: TENANT_CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const { tenantId } = request;

    console.log('TenantId: ', tenantId);

    if (tenantId) {
      return getTenantConnection(tenantId);
    }

    throw new InternalServerErrorException();
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [TENANT_CONNECTION],
})
export class TenancyModule {}
