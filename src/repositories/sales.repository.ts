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

  async updateSales(id: string, quantity_sold: number, total_billed: number) {
    return await this.prismaService.sales.update({
      where: { id: id },
      data: {
        quantity_sold: {
          increment: quantity_sold,
        },
        total_billed: {
          increment: total_billed,
        },
      },
    });
  }

  async updateStock(product_id: string, quantity_sold: number) {
    return await this.prismaService.products.update({
      where: { id: product_id },
      data: {
        quantity: {
          decrement: quantity_sold,
        },
      },
    });
  }
}
