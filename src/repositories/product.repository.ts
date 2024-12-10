import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateProductDto } from 'src/services/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/services/products/dto/update-product.dto';
@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async checkProductByIdCount(id: string) {
    return await this.prismaService.products.count({
      where: {
        id: id,
      },
    });
  }

  async checkProductById(id: string) {
    return await this.prismaService.products.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        image_url: true,
      },
    });
  }

  async findAllProducts() {
    const response = await this.prismaService.products.findMany({
      where: {
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image_url: true,
        quantity: true,
        Store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return response;
  }

  findAllProductsByStoreId(storeId: string) {
    const response = this.prismaService.products.findMany({
      where: {
        store_id: storeId,
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image_url: true,
        quantity: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
        Store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return response;
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

  async updateProduct(dto: UpdateProductDto) {
    return await this.prismaService.products.update({
      where: {
        id: dto.id,
      },
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

  async removeProduct(id: string) {
    return await this.prismaService.products.update({
      where: {
        id: id,
      },
      data: {
        enabled: false,
      },
      select: {
        enabled: true,
      },
    });
  }
}
