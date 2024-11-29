import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './services/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './services/user/user.module';
import { PrismaService } from './provider/prisma/prisma-client';
import { SocketGateway } from './gateway/socket.gateway';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
    JwtModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, PrismaService, SocketGateway],
})
export class AppModule { }
