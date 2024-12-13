import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { SalesRepository } from 'src/repositories/sales.repository';
import { SocketGateway } from 'src/gateway/socket.gateway';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SalesController],
  providers: [
    SalesService,
    PrismaService,
    SalesRepository,
    SocketGateway,
    JwtAuthGuard,
    JwtService,
    AuthJwtService,
  ],
})
export class SalesModule {}
