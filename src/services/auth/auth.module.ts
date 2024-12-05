import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { PassportModule } from '@nestjs/passport';
import { environment } from 'environment/environment';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: environment.secreatKey,
    }),
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthJwtService],
  providers: [
    AuthService,
    AuthRepository,
    AuthJwtService,
    PrismaService,
    JwtService,
  ],
})
export class AuthModule {}
