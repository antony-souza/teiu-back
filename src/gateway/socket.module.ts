import { Module } from '@nestjs/common';
import { SalesRepository } from 'src/repositories/sales.repository';
import { SocketGateway } from './socket.gateway';
import { PrismaService } from 'src/provider/prisma/prisma-client';

@Module({
  providers: [SalesRepository, SocketGateway, PrismaService],
})
export class GatewayModule {}
