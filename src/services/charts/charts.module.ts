import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { SocketGateway } from 'src/gateway/socket.gateway';

@Module({
  controllers: [ChartsController],
  providers: [ChartsService, PrismaService, PrismaService, SocketGateway],
  
})
export class ChartsModule { }
