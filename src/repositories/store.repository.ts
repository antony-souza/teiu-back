import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateStoreDto } from 'src/services/store/dto/create-store.dto';

@Injectable()
export class StoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkStoreByIdCount(id: string): Promise<number> {
    return await this.prismaService.store.count({
      where: {
        id: id,
      },
    });
  }

  async createStore(dto: CreateStoreDto) {
    return await this.prismaService.store.create({
      data: {
        name: dto.name,
        image_url: dto.image_url_string,
        User: {
          connect: {
            id: dto.user_id,
          },
        },
      },
    });
  }
}
