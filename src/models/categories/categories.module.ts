import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CategoryRepository } from 'src/repositories/category.repository';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    UploadFileFactoryService,
    PrismaService,
    CategoryRepository,
    JwtAuthGuard,
    AuthJwtService,
    JwtService,
  ],
})
export class CategoriesModule {}
