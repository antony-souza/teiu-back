import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { PostgresService } from 'src/provider/postgres/postgres-client';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';
import GeneratePasswordService from 'src/utils/generate-password.service';
import { PrismaService } from 'src/provider/prisma/prisma-client';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PostgresService,
    UploadFileFactoryService,
    GeneratePasswordService,
    PrismaService
  ],
})
export class UserModule { }
