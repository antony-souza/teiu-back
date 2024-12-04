import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './services/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './services/user/user.module';
import { PrismaService } from './provider/prisma/prisma-client';
import { SocketGateway } from './gateway/socket.gateway';
import { ChartsModule } from './services/charts/charts.module';
import { ChartsService } from './services/charts/charts.service';
import { ProductsModule } from './services/products/products.module';
import { StoreModule } from './services/store/store.module';
import { CategoriesModule } from './services/categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    JwtModule,
    AuthModule,
    UserModule,
    ChartsModule,
    ProductsModule,
    StoreModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, PrismaService, ChartsService, SocketGateway],
})
export class AppModule { }
