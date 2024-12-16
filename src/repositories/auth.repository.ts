import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateAuthDto } from 'src/models/auth/dto/create-auth.dto';
import { UpdateAuthDto } from 'src/models/auth/dto/update-auth.dto';
import { PrismaService } from 'src/provider/prisma/prisma-client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async authUser(dto: CreateAuthDto): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });
  }

  async findUnique(dto: UpdateAuthDto): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id: dto.id,
      },
    });
  }
}
