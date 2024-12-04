import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateCategoryDto } from 'src/services/categories/dto/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkCategoryByIdCount(id: string): Promise<number> {
    return await this.prismaService.categories.count({
      where: {
        id: id,
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
}
