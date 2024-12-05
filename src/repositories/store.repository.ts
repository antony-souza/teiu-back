import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateStoreDto } from 'src/services/store/dto/create-store.dto';
import { UpdateStoreDto } from 'src/services/store/dto/update-store.dto';

@Injectable()
export class StoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkStoreBy(id: string) {
    return await this.prismaService.store.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findAllStore() {
    return await this.prismaService.store.findMany({
      select: {
        id: true,
        name: true,
        image_url: true,
        enabled: true,
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            enabled: true,
          },
        },
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

  async updateStore(dto: UpdateStoreDto) {
    return await this.prismaService.store.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        image_url: dto.image_url_string,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        image_url: true,
        updatedAt: true,
      },
    });
  }

  async deleteStore(id: string) {
    return await this.prismaService.store.update({
      where: {
        id: id,
      },
      data: {
        enabled: false,
      },
    });
  }
}
