import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CategoryRepository } from 'src/repositories/category.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    UploadFileFactoryService,
    PrismaService,
    CategoryRepository,
  ],
})
export class CategoriesModule {}
