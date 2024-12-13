import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { StoreRepository } from 'src/repositories/store.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [StoreController],
  providers: [
    StoreService,
    PrismaService,
    StoreRepository,
    UploadFileFactoryService,
    JwtAuthGuard,
    AuthJwtService,
    JwtService,
  ],
})
export class StoreModule {}
