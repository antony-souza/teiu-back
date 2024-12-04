import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { SalesRepository } from 'src/repositories/sales.repository';

@Module({
  controllers: [SalesController],
  providers: [SalesService, PrismaService, SalesRepository],
})
export class SalesModule {}
