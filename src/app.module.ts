import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './services/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from './services/user/user.module';
import { PrismaService } from './provider/prisma/prisma-client';
import { ProductsModule } from './services/products/products.module';
import { StoreModule } from './services/store/store.module';
import { CategoriesModule } from './services/categories/categories.module';
import { SalesModule } from './services/sales/sales.module';
import { GatewayModule } from './gateway/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    UserModule,
    ProductsModule,
    StoreModule,
    CategoriesModule,
    SalesModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, PrismaService],
})
export class AppModule {}
