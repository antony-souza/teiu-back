import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  exports: [AuthJwtService, JwtAuthGuard],
  providers: [
    AuthService,
    AuthRepository,
    AuthJwtService,
    PrismaService,
    JwtService,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
