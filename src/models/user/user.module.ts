import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import GeneratePasswordService from 'src/utils/generate-password.service';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { AuthJwtService } from 'src/middleware/jwt/jwt-auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-guards.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UploadFileFactoryService,
    GeneratePasswordService,
    PrismaService,
    AuthJwtService,
    JwtAuthGuard,
  ],
})
export class UserModule {}
