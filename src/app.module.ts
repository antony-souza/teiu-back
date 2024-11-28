import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostgresService } from './provider/postgres/postgres-client';
import { AuthModule } from './services/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './services/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, PostgresService, JwtService],
})
export class AppModule { }
