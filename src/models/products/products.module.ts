import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { ProductRepository } from 'src/repositories/product.repository';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    UploadFileFactoryService,
    ProductRepository,
    JwtAuthGuard,
    AuthJwtService,
  ],
})
export class ProductsModule {}
