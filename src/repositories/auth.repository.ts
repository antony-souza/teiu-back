import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateAuthDto } from 'src/services/auth/dto/create-auth.dto';
import { UpdateAuthDto } from 'src/services/auth/dto/update-auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async authUser(dto: CreateAuthDto): Promise<Users> {
    return await this.prismaService.users.findFirst({
      where: {
        email: dto.email,
      },
    });
  }

  async findUnique(dto: UpdateAuthDto): Promise<Users> {
    return await this.prismaService.users.findUnique({
      where: {
        id: dto.id,
      },
    });
  }
}
