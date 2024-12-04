import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesRepository } from 'src/repositories/sales.repository';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly salesRepository: SalesRepository) {}

  async createSales(dto: CreateSaleDto) {
    const checkQuantityStockProduct = await this.salesRepository.checkStock(
      dto.product_id,
    );

    if (!checkQuantityStockProduct) {
      throw new NotFoundException('Product not found');
    }

    if (checkQuantityStockProduct.quantity < dto.quantity_sold) {
      throw new NotFoundException('Insufficient stock');
    }

    await this.salesRepository.updateStock(dto.product_id, dto.quantity_sold);

    const totalBilled = checkQuantityStockProduct.price * dto.quantity_sold;

    const existingSale = await this.salesRepository.findSaleByProductAndStore(
      dto.product_id,
      dto.store_id,
    );

    if (existingSale) {
      return await this.salesRepository.updateSales(
        existingSale.id,
        dto.quantity_sold,
        totalBilled,
      );
    }

    return await this.salesRepository.createSale({
      ...dto,
      total_billed: totalBilled,
    });
  }

  async findAllSalesByStore(dto: UpdateSaleDto) {
    const response = await this.salesRepository.findAllSales(dto.store_id);

    if (!response || response.length === 0) {
      throw new NotFoundException('Sales not found');
    }

    const label = response.map((sale) => sale.Products.name);
    const data = response.map((sale) => sale.total_billed);

    return {
      label: label,
      data: data,
    };
  }
}
