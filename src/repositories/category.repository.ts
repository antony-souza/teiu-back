import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateCategoryDto } from 'src/services/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/services/categories/dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkCategoryByIdCount(id: string) {
    return await this.prismaService.categories.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        image_url: true,
      },
    });
  }

  async findAllCategories() {
    return await this.prismaService.categories.findMany({
      where: {
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        image_url: true,
        store_id: true,
        Store: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createCategory(dto: CreateCategoryDto) {
    return await this.prismaService.categories.create({
      data: {
        name: dto.name,
        image_url: dto.image_url_string,
        store_id: dto.store_id,
      },
    });
  }

  async updateCategory(dto: UpdateCategoryDto) {
    return await this.prismaService.categories.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
        image_url: dto.image_url_string,
        store_id: dto.store_id,
      },
    });
  }

  async removeCategory(id: string) {
    return await this.prismaService.categories.update({
      where: {
        id: id,
      },
      data: {
        enabled: false,
      },
    });
  }
}
