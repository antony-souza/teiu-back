import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { ProductRepository } from 'src/repositories/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    PrismaService,
    UploadFileFactoryService,
    ProductRepository],
})
export class ProductsModule { }
