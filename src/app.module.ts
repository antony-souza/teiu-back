import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/socket.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { ProductsModule } from './models/products/products.module';
import { StoreModule } from './models/store/store.module';
import { PrismaService } from './provider/prisma/prisma-client';
import { CategoriesModule } from './models/categories/categories.module';
import { SalesModule } from './models/sales/sales.module';

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
