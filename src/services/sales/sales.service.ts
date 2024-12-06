import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesRepository } from 'src/repositories/sales.repository';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SocketGateway } from 'src/gateway/socket.gateway';

@Injectable()
export class SalesService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly gatewayService: SocketGateway,
  ) {}

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

    const totalBilled = checkQuantityStockProduct.price * dto.quantity_sold;

    /* const existingSale = await this.salesRepository.findSaleByProductAndStore(
      dto.product_id,
      dto.store_id,
    );

    if (existingSale) {
      const updatedSale = await this.salesRepository.updateSales(
        existingSale.id,
        dto.quantity_sold,
        totalBilled,
      );

      const allSales = await this.salesRepository.findAllSales(dto.store_id);

      this.gatewayService.sendSalesProducts(allSales);

      return updatedSale;
    } */

    const response = await this.salesRepository.createSale({
      ...dto,
      total_billed: totalBilled,
    });

    await this.salesRepository.updateStock(dto.product_id, dto.quantity_sold);
    this.gatewayService.sendSalesProducts(response);

    return response;
  }

  async findAllSalesByStore(dto: UpdateSaleDto) {
    const response = await this.salesRepository.findAllSales(dto.store_id);

    if (!response) {
      throw new NotFoundException('Sales not found');
    }

    return response;
  }

  async findAllSalesByProductStore(dto: UpdateSaleDto) {
    const response = await this.salesRepository.findAllSalesByProductStore(
      dto.store_id,
    );

    if (!response) {
      throw new NotFoundException('Sales not found');
    }

    return response;
  }
}
