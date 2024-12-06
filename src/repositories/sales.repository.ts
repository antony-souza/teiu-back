import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateSaleDto } from 'src/services/sales/dto/create-sale.dto';

@Injectable()
export class SalesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findSaleByProductAndStore(product_id: string, store_id: string) {
    return await this.prismaService.sales.findFirst({
      where: {
        product_id: product_id,
        store_id: store_id,
      },
      select: {
        id: true,
        total_billed: true,
        Products: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createSale(dto: CreateSaleDto) {
    return await this.prismaService.sales.create({
      data: {
        total_billed: dto.total_billed,
        quantity_sold: dto.quantity_sold,
        product_id: dto.product_id,
        store_id: dto.store_id,
        user_id: dto.user_id,
      },
    });
  }

  async checkStock(product_id: string) {
    return await this.prismaService.products.findUnique({
      where: { id: product_id },
      select: { id: true, quantity: true, price: true },
    });
  }

  async updateSales(
    id: string,
    quantity_sold: number,
    total_billed: number,
  ): Promise<any[]> {
    const response = await this.prismaService.sales.update({
      where: { id: id },
      data: {
        updatedAt: new Date(),
        quantity_sold: {
          increment: quantity_sold,
        },
        total_billed: {
          increment: total_billed,
        },
      },
      select: {
        total_billed: true,
        Products: {
          select: {
            name: true,
          },
        },
      },
    });

    return [response];
  }

  async updateStock(product_id: string, quantity_sold: number) {
    return await this.prismaService.products.update({
      where: { id: product_id },
      data: {
        updatedAt: new Date(),
        quantity: {
          decrement: quantity_sold,
        },
      },
    });
  }

  async findAllSales(store_id: string): Promise<any[]> {
    return await this.prismaService.sales.findMany({
      where: {
        store_id: store_id,
      },
      select: {
        total_billed: true,
        quantity_sold: true,
        Products: {
          select: {
            name: true,
          },
        },
        User: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAllSalesByProductStore(storeId: string): Promise<any[]> {
    const groupSalesByProductIdAndStoreId =
      await this.prismaService.sales.groupBy({
        where: { store_id: storeId },
        by: ['product_id', 'store_id'],
        _sum: {
          quantity_sold: true,
          total_billed: true,
        },
      });

    const result = await Promise.all(
      groupSalesByProductIdAndStoreId.map(async (previousGroupData) => {
        const product = await this.prismaService.products.findUnique({
          where: {
            id: previousGroupData.product_id,
          },
          select: {
            name: true,
          },
        });
        return {
          name: product.name,
          quantity_sold: previousGroupData._sum.quantity_sold,
          total_billed: previousGroupData._sum.total_billed,
        };
      }),
    );
    return result;
  }
}
