import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EnhancedPrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
