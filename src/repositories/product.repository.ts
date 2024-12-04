import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateProductDto } from 'src/services/products/dto/create-product.dto';
@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkProductByIdCount(name: string): Promise<number> {
    return await this.prismaService.products.count({
      where: {
        name: name,
      },
    });
  }

  async createProduct(dto: CreateProductDto) {
    return await this.prismaService.products.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        image_url: dto.image_url_string,
        quantity: dto.quantity,
        category_id: dto.category_id,
        store_id: dto.store_id,
      },
    });
  }
}
