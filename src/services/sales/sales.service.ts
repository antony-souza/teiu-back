import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesRepository } from 'src/repositories/sales.repository';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async createSales(dto: CreateSaleDto) {
    const checkQuantityProduct = await this.salesRepository.checkStock(
      dto.product_id,
    );

    if (!checkQuantityProduct) {
      throw new NotFoundException('Product not found');
    }

    if (checkQuantityProduct.quantity < dto.quantity_sold) {
      throw new NotFoundException('Insufficient stock');
    }

    await this.salesRepository.updateStock(dto.product_id, dto.quantity_sold);

    return await this.salesRepository.createSale(dto);
  }

  findAll() {
    return `This action returns all sales`;
  }
}
