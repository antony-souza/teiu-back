import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';
import { PostgresService } from 'src/provider/postgres/postgres-client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/provider/prisma/prisma-client';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    AuthJwtService,
    PostgresService,
    PrismaService,
    JwtService],
})
export class AuthModule { }
