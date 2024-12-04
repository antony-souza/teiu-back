import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/provider/prisma/prisma-client';
import { CreateSaleDto } from 'src/services/sales/dto/create-sale.dto';

@Injectable()
export class SalesRepository {
  constructor(private readonly prismaService: PrismaService) {}

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

  async updateStock(product_id: string, quantity: number) {
    return await this.prismaService.products.update({
      where: { id: product_id },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  }
}
