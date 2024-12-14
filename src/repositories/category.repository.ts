import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/models/categories/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/models/categories/dto/update-category.dto';
import { PrismaService } from 'src/provider/prisma/prisma-client';

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

  async findAllCategoriesByStoreId(storeId: string) {
    const response = await this.prismaService.categories.findMany({
      where: {
        store_id: storeId,
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        image_url: true,
        Store: {
          select: {
            name: true,
          },
        },
      },
    });

    const result = response.map((category) => {
      return {
        id: category.id,
        name: category.name,
        image_url: category.image_url,
        store_name: category.Store.name,
      };
    });
    return result;
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
