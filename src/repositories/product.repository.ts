import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/models/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/models/products/dto/update-product.dto';
import { PrismaService } from 'src/provider/prisma/prisma-client';

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

  async findAllProductsByStoreId(storeId: string) {
    const response = await this.prismaService.products.findMany({
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

    const result = await Promise.all(
      response.map(async (previousResponse) => {
        const existingStore = await this.prismaService.store.findFirst({
          where: {
            id: previousResponse.Store.id,
          },
          select: {
            id: true,
            name: true,
          },
        });
        return {
          store_id: existingStore.id,
          product_id: previousResponse.id,
          store_name: existingStore.name,
          product_name: previousResponse.name,
          category_name: previousResponse.Category.name,
          product_price: previousResponse.price,
          product_quantity: previousResponse.quantity,
          product_image_url: previousResponse.image_url,
          product_description: previousResponse.description,
        };
      }),
    );
    return result;
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
        category_id: dto.category_id,
        quantity: dto.quantity,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image_url: true,
        quantity: true,
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
    });
  }
}
